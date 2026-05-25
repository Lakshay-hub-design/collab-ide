import http from 'http'
import { Server } from 'socket.io'

import { socketAuthMiddleware } from './socketAuth'
import { AuthenticatedSocket } from '../types/socket/socket'
import { handleDisconnect, handleLeaveRoom, handleRoomJoin } from './roomHandlers'
import { handleCodeChange } from './codeHandlers'
import { handleCursorMove } from './cursorHandlers'
import { handleChatMessage } from './chatHandlers'
import { handleTypingStart, handleTypingStop } from './typingHandlers'
import { handleFileContentChange } from './fileHandlers'

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

        socket.on("chat:send", ({roomId, text}) => {
            handleChatMessage(io, socket, roomId, text)
        })

        socket.on("typing:start", (roomId: string) => {
            handleTypingStart(socket, roomId)
        })

        socket.on("typing:stop", (roomId: string) => {
            handleTypingStop(socket, roomId)
        })

        socket.on("file:change", ({ roomId, fileId, content }) => {
            handleFileContentChange( socket, roomId, fileId, content)
        })
    })

    return io
}