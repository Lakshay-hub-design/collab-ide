import { create } from "zustand"

interface RoomUser {
    socketId: string
    userId: string
    username: string
}

interface RoomState {
    roomId: string | null
    users: RoomUser[]
    setRoomId: (roomId: string) => void
    setUsers: (users: RoomUser[]) => void
    addUser: (user: RoomUser) => void
    removeUser: (userId: string) => void
    clearRoom: () => void
}

export const useRoomStore = create<RoomState>((set) => ({
    roomId: null,
    users: [],
    setRoomId: (roomId) => set({ roomId }),
    setUsers: (users) => set({ users }),
    addUser: (user) => set((state) => ({
        users: [...state.users, user]
    })),
    removeUser: (userId) => set((state) => ({
        users: state.users.filter((u) => u.userId !== userId)
    })),
    clearRoom: () => set({ roomId: null, users: [] })
}))