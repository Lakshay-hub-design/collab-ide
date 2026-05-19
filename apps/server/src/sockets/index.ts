import http from 'http'
import { Server } from 'socket.io'

import { socketAuthMiddleware } from './socketAuth'
import { AuthenticatedSocket } from '../types/socket/socket'
import { handleLeaveRoom, handleRoomJoin } from './roomHandlers'

export const initilizeSocket = (
    server: http.Server
) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true
        }
    })

    io.use(socketAuthMiddleware)

    io.on('connection', (socket: AuthenticatedSocket) => {
        console.log(`User connected: ${socket.user?.username}`);

        socket.on("room:join", (roomId: string) => {
            handleRoomJoin(socket, roomId)
        })

        socket.on("room:leave", (roomId: string) => {
            handleLeaveRoom(socket, roomId)
        })
        
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.user?.username}`);
        })
    })

    return io
}