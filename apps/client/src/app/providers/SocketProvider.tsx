import { useEffect } from "react"
import { socket } from "@/shared/lib/socket"
import { useAuthStore } from "@/shared/store/authStore"
import { useSocketStore } from "@/features/socket/socketStore"

// Listeners registered once at module level — never inside React lifecycle
socket.on("connect", () => {
    useSocketStore.getState().setConnected(true)
    console.log("🟢 Socket connected:", socket.id)
})

socket.on("disconnect", (reason) => {
    useSocketStore.getState().setConnected(false)
    console.log("🔴 Socket disconnected:", reason)
})

function SocketProvider({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    useEffect(() => {
        if (!isAuthenticated) {
            // User logged out
            if (socket.connected) {
                socket.disconnect()
            }
            return
        }

        // Already connected — token rotation or re-render, do nothing
        if (socket.connected) return

        // Read token at connect time — not reactive
        const { accessToken } = useAuthStore.getState()
        socket.auth = { token: accessToken }
        socket.connect()

    }, [isAuthenticated]) // ✅ only auth state — never token value

    return <>{children}</>
}

export default SocketProvider