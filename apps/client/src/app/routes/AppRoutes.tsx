import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import DashboardPage from "@/pages/DashboardPage"
import LoginPage from "@/pages/LoginPage"
import SignupPage from "@/pages/SignupPage"
import RoomPage from "@/pages/RoomPage"
import Home from "@/pages/Home"
import EditorPage from "@/pages/EditorPage"

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
            
              <DashboardPage />
            
          }
        />

        <Route
          path="/editor/:projectId"
          element={
            <EditorPage />
          }
        />

        <Route
          path="/room"
          element={<RoomPage />}
        />
    </Routes>
  )
}

export default AppRoutes
