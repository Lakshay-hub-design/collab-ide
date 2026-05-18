import { useRestoreSession } from "@/features/auth/useRestoreSession"

interface Props {
  children: React.ReactNode
}

function AppProvider({
  children,
}: Props) {
  useRestoreSession()

  return <>{children}</>
}

export default AppProvider