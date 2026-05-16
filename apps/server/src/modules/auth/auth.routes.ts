import { Router } from "express"
import { protect } from "../../middleware/auth.middleware"

import { getMe, login, register } from "./auth.controller"

const router = Router()

router.post("/signup", register)

router.post("/login", login)

router.get("/me", protect, getMe)

export default router