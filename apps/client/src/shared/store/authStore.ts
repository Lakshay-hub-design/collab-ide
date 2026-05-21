import { create } from 'zustand'

interface User {
    _id: string,
    username: string,
    email: string
}

interface AuthState {
    user: User | null,
    accessToken: string | null
    isAuthenticated: boolean
    isRestoring: boolean

    setAuth: (
        user: User,
        token: string
    ) => void

    clearAuth: () => void
    setRestoring: (value: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isRestoring: true,

    setAuth: (user, token) =>
        set({
            user,
            accessToken: token,
            isAuthenticated: true
        }),

    clearAuth: () =>
        set({
            user: null,
            accessToken :null,
            isAuthenticated: false
        }),

        setRestoring: (value) => set({ isRestoring: value })
}))