import { Route, Routes } from "react-router-dom"

function HomePage() {
  return <div>Home Page</div>
}

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default AppRoutes
