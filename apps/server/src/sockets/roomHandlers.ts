import { AuthenticatedSocket } from "../types/socket/socket";

import { rooms } from "./roomStore";

export const handleRoomJoin = (
    socket: AuthenticatedSocket,
    roomId: string
) => {
    socket.join(roomId)

    let room = rooms.get(roomId)

    if(!room){
        room = {
            roomId,
            users: []
        }

        rooms.set(roomId, room)
    }

    const existingUser = room.users.find((user) => {
        user.userId === socket.user?._id.toString()
    })

    if(!existingUser){
        room.users.push({
            socketId: socket.id,
            userId: socket.user?._id.toString() || "",
            username: socket.user?.username || "",
        })
    }

    socket.to(roomId).emit(
        "user:joined",
        {
            user: {
                userId: socket.user?._id,
                username: socket.user?.username
            }
        }
    )

    socket.emit(
        "room:users",
        room.users
    )

    console.log(
        `${socket.user?.username}
            joined ${roomId}`
    )
}

export const handleLeaveRoom = (
    socket: AuthenticatedSocket,
    roomId: string
) => {
    socket.leave(roomId)

    const room = rooms.get(roomId)

    if(!room) return

    room.users = room.users.filter((user) => user.socketId !== socket.id)

    socket.to(roomId).emit(
        "user:left",
        {
            userId: socket.user?._id,
        }
    )

    socket.emit(
        "room:users",
        room.users
    )

    if(room.users.length === 0){
        rooms.delete(roomId)
    }

    console.log(`${socket.user?.username} left ${roomId}`)
}