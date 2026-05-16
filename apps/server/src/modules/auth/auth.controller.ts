import { Request, Response } from "express";
import { loginUser, refreshAccessToken, registerUser } from "./auth.service";

interface RegisterBody {
    username: string
    email: string
    password: string
}

export const register = async (req: Request<RegisterBody>, res: Response) => {
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

interface LoginBody {
    email: string,
    password: string
}

export const login = async(req: Request<LoginBody>, res: Response) => {
    try {
        const { email, password } = req.body

        const result = await loginUser(email, password)

        res.cookie(
            "refreshToken",
            result.refreshToken,
            {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 1000
            }
        )

        res.status(200).json({
            success: true,
            accessToken: result.accessToken,
            user: result.user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went worng"
        })
    }
}

export const getMe = async (
  req: Request,
  res: Response
) => {
  res.status(200).json({
    success: true,
    user: req.user,
  })
}

export const refresh = async (
    req: Request,
    res: Response
) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if(!refreshToken){
            return res.status(401).json({
                success: false,
                message: "Refresh token missing"
            })
        }

        const accessToken = await refreshAccessToken(refreshToken)
        
        res.status(200).json({
            success: true,
            accessToken,
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message:
                error instanceof Error
                ? error.message
                : "Unauthorized",
        })
    }
}

export const logout = async (
  _req: Request,
  res: Response
) => {
  res.clearCookie("refreshToken")

  res.status(200).json({
    success: true,
    message: "Logged out",
  })
}