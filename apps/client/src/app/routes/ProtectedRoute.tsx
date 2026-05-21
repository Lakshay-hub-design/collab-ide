import { useAuthStore } from "@/shared/store/authStore"
import { Navigate } from "react-router-dom"

interface Props{
    children: React.ReactNode
}

const ProtectedRoute = ({children}: Props) => {

    const accessToken = useAuthStore(
        (state) => state.accessToken
    )

    const isRestoring = useAuthStore(
        (state) => state.isRestoring
    )

    if(isRestoring){
        return <div>Loading...</div>
    }

    if(!accessToken){
        return <Navigate to='/' replace />
    }
  return children
}

export default ProtectedRoute