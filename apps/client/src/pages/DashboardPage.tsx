import { logoutUser } from "@/features/auth/auth.api"
import { useAuthStore } from "@/shared/store/authStore"
import { Link } from "react-router-dom"

function DashboardPage() {
  const clearAuth = useAuthStore(
    (state) => state.clearAuth
  )
  const handleLogout = async () => {
    try {
      await logoutUser()
      
      clearAuth()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="text-white bg-black p-10">
      Dashboard Protected Route
      <br />
      <button onClick={() => handleLogout()}>Logout</button>

      <br />
      <Link to={'/room'}>Room</Link>
    </div>
  )
}

export default DashboardPage