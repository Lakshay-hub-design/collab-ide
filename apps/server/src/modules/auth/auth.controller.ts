import { Request, Response } from "express";
import { registerUser } from "./auth.service";

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body

        const result = await registerUser(username, email, password)

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : 'Registration failed'
        })
    }
}