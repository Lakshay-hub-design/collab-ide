import SocketProvider from "./SocketProvider"
import { useRestoreSession } from "@/features/auth/useRestoreSession"

function AppProvider({ children }: { children: React.ReactNode }) {
    useRestoreSession()

    return (
        <SocketProvider>
            {children}
        </SocketProvider>
    )
}

export default AppProvider