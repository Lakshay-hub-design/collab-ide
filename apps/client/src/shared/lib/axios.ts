import axios from "axios"
import type { InternalAxiosRequestConfig } from "axios"
import { useAuthStore } from "../store/authStore"
import { socket } from "./socket"

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
})

interface RetryConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}

let isRefreshing = false
let refreshPromise: Promise<string> | null = null

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config as RetryConfig

        if (error.response?.status === 401 && !original._retry) {
            original._retry = true

            try {
                if (!isRefreshing) {
                    isRefreshing = true
                    refreshPromise = api.post("/auth/refresh")
                        .then((res) => {
                            const newToken = res.data.accessToken
                            const user = useAuthStore.getState().user
                            if (user) useAuthStore.getState().setAuth(user, newToken)
                            // ✅ Keep socket auth in sync — no reconnect triggered
                            socket.auth = { token: newToken }
                            return newToken
                        })
                        .finally(() => {
                            isRefreshing = false
                            refreshPromise = null
                        })
                }

                const newToken = await refreshPromise
                original.headers.Authorization = `Bearer ${newToken}`
                return api(original)
            } catch {
                useAuthStore.getState().clearAuth()
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)

export default api