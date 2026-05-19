import { ExtendedError } from "socket.io"
import { AuthenticatedSocket } from "../types/socket/socket"

import jwt from 'jsonwebtoken'
import User from "../modules/auth/user.model"

interface JwtPayload{
    userId: string
}

export const socketAuthMiddleware = async (
    socket: AuthenticatedSocket,
    next: (err?: ExtendedError) => void
) => {
    try {
        const token = socket.handshake.auth.token

        if(!token){
            throw new Error("Authintication failed")
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload

        const user = await User.findById(decoded.userId)

        if(!user){
            throw new Error('User not found')
        }

        socket.user = user

        next()
    } catch (error) {
        next(new Error("Unauthorized"))
    }
}