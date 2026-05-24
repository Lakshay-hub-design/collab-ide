import { Router } from "express";
import { runCode } from "./terminal.controller";

const router = Router()

router.post("/", runCode)

export default router