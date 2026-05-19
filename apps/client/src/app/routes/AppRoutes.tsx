import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import DashboardPage from "@/pages/DashboardPage"
import SocketTestPage from "@/pages/SocketTestPage"
import LoginPage from "@/pages/LoginPage"
import SignupPage from "@/pages/SignupPage"
import Home from "@/pages/Home"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />

        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/socket"
          element={<SocketTestPage />}
        />
    </Routes>
  )
}

export default AppRoutes
