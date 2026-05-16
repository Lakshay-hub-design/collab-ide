import { Router } from "express"
import { protect } from "../../middleware/auth.middleware"

import { getMe, login, logout, refresh, register } from "./auth.controller"

const router = Router()

router.post("/signup", register)

router.post("/login", login)

router.get("/me", protect, getMe)

router.post("/refresh", refresh)

router.post("logout", logout)

export default router