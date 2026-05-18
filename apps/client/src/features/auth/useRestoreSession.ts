import { useAuthStore } from "@/shared/store/authStore"
import { getCurrentUser, refreshToken } from "./auth.api"
import { useEffect } from "react"

export const useRestoreSession = () => {
    const setAuth = useAuthStore(
        (state) => state.setAuth
    )

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const refreshResponse = await refreshToken()

                const accessToken = refreshResponse.accessToken

                const userResponse = await getCurrentUser(accessToken)

                setAuth(userResponse.user, accessToken)
            } catch (error) {
                console.log('No active session')
            }
        }

        restoreSession()
    }, [setAuth])
    
}