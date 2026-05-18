import { useAuthStore } from "@/shared/store/authStore"
import { Navigate } from "react-router-dom"

interface Props{
    children: React.ReactNode
}

const ProtectedRoute = ({children}: Props) => {

    const accessToken = useAuthStore(
        (state) => state.accessToken
    )

    if(!accessToken){
        return <Navigate to='/' replace />
    }
  return children
}

export default ProtectedRoute