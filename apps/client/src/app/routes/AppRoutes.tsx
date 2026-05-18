import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import DashboardPage from "@/pages/DashboardPage"
import SocketTestPage from "@/pages/SocketTestPage"

function HomePage() {
  return <div>Home Page</div>
}

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />

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
