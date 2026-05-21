import http from 'http'
import { Server } from 'socket.io'

import { socketAuthMiddleware } from './socketAuth'
import { AuthenticatedSocket } from '../types/socket/socket'
import { handleDisconnect, handleLeaveRoom, handleRoomJoin } from './roomHandlers'
import { handleCodeChange } from './codeHandlers'
import { handleCursorMove } from './cursorHandlers'

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
        
        socket.on("disconnect", () => {
            handleDisconnect(socket)

            console.log(
                `User disconnected: ${socket.user?.username}`
            )
        })

        socket.on("code:change", ({roomId, code}) => {
            handleCodeChange(socket, roomId, code)
        })

        socket.on("cursor:move", ({roomId, position}) => {
            handleCursorMove(socket, roomId, position)
        })
    })

    return io
}