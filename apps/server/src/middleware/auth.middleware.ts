import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken"

import User from "../modules/auth/user.model"

interface JwtPayload{
    userId: string
}

export const protect = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            })
        }

        const token = authHeader?.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload

        const user = await User.findById(decoded.userId)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            })
        }

        req.user = user

        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        })
    }
}