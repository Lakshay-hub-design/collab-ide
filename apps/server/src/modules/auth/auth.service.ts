import User from "./user.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/token";

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
        user, 
        accessToken, 
        refreshToken 
    }        
}