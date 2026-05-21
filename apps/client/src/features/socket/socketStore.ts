import { create } from "zustand"

interface SocketState {
    connected: boolean
    setConnected: (status: boolean) => void
}

export const useSocketStore = create<SocketState>((set) => ({
    connected: false,
    setConnected: (status) => set({ connected: status })
}))