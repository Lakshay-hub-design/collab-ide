import api from "@/shared/lib/axios";

export const signupUser = async (
    data: {
        username: string,
        email: string,
        password: string
    }
) => {
    const response = await api.post(
        '/auth/signup',
        data
    )

    return response.data
}

export const loginUser = async(
    data:{
        email: string,
        password: string
    }
) => {
    const response = await api.post(
        '/auth/login',
        data
    )

    return response.data
}

export const getCurrentUser = async(token: string) => {
    const response = await api.get(
        '/auth/me',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data
}

export const refreshToken = async() => {
    const response = await api.post(
        '/auth/refresh'
    )

    return response.data
}

export const logoutUser = async () => {
    const response = await api.post(
      "/auth/logout"
    )

    return response.data
  }