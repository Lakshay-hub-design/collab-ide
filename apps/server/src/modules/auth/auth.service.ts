import User from "./user.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/token";
import jwt from "jsonwebtoken"

export const registerUser = async (
    username: string,
    email: string,
    password: string
) => {
    const existingUser = await User.findOne({ email })

    if(existingUser){
        throw new Error('User with this email already exists')
    }

    const user = await User.create({
        username,
        email,
        password
    })

    const accessToken = generateAccessToken(user._id.toString())
    const refreshToken = generateRefreshToken(user._id.toString())

    return { 
        user : {
            userId: user._id,
            username: user.username,
            email: user.email
        }, 
        accessToken, 
        refreshToken 
    }        
}

export const loginUser = async (
    email: string,
    password: string
) => {
    const user = await User.findOne({ email, }).select("+password")

    if(!user){
        throw new Error('Invalid Credentials')
    }

    const isPasswordValid = user.comparePassword(password)

    if(!isPasswordValid){
        throw new Error('Invalid Credentials')
    }

    const accessToken = generateAccessToken(user._id.toString())
    const refreshToken = generateRefreshToken(user._id.toString())

    return {
        user: {
            userId: user._id,
            username: user.username,
            email: user.email
        },
        accessToken,
        refreshToken
    }
}

export const refreshAccessToken = async (
    refreshToken: string
) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as {
            userId: string
        }

        const user = await User.findById(decoded.userId)

        if(!user){
            throw new Error("User not found")
        }

        const accessToken = generateAccessToken(user._id.toString())

        return accessToken
    } catch (error) {
        throw new Error("Invalid refresh token")
    }
}