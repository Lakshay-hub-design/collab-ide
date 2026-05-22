import { AuthenticatedSocket } from "../types/socket/socket";

export const handleTypingStart = (
    socket: AuthenticatedSocket,
    roomId: string
) => {
    socket.to(roomId).emit("typing:start", {
        userId: socket.user?._id,
        username: socket.user?.username
    })
}

export const handleTypingStop = (
    socket: AuthenticatedSocket,
    roomId: string
) => {
    socket.to(roomId).emit("typing:stop", {
        userId: socket.user?._id
    })
}