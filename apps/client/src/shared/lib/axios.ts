import axios, { AxiosError } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { refreshToken } from '@/features/auth/auth.api'
import { useAuthStore } from '../store/authStore'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true
})

interface RetryRequestConfig extends InternalAxiosRequestConfig{
    _retry?: boolean
}

let isRefreshing = false

let refreshPromise: | Promise<string> | null = null

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    }
)

api.interceptors.response.use(
    (response) => response,

    async(error: AxiosError) => {
        const originalRequest = error.config as RetryRequestConfig

        if(
            error.response?.status === 401 &&
            !originalRequest._retry
        ){
            originalRequest._retry = true

            try {
                if(!isRefreshing){
                    isRefreshing = true

                    refreshPromise = refreshToken().then(
                        (response) => {
                            const newToken = response.accessToken

                            const user = useAuthStore.getState().user

                            if(user){
                                useAuthStore.getState().setAuth(
                                    user,
                                    newToken
                                )
                            }

                            return newToken
                        }
                    )
                }
                const newToken = await refreshPromise

                isRefreshing = false
                refreshPromise = null

                originalRequest.headers.Authorization =
                `Bearer ${newToken}`

                return api(originalRequest)
            } catch (refreshError) {
                isRefreshing = false
                refreshPromise = null

                useAuthStore.getState().clearAuth()

                 return Promise.reject(
                    refreshError
                )
            }
        }

        return Promise.reject(error)
    }
)

export default api