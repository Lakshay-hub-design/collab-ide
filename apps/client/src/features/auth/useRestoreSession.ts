import { useEffect } from "react"
import { getCurrentUser, refreshToken } from "./auth.api"
import { useAuthStore } from "@/shared/store/authStore"
import { socket } from "@/shared/lib/socket"

export const useRestoreSession = () => {
    useEffect(() => {
        const restore = async () => {
            try {
                const { accessToken } = await refreshToken()
                const { user } = await getCurrentUser(accessToken)

                useAuthStore.getState().setAuth(user, accessToken)

                socket.auth = { token: accessToken }
            } catch {
                console.log("No active session")
            } finally{
                useAuthStore.getState().setRestoring(false)
            }
        }

        restore()
    }, [])
}