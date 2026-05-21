import { AuthenticatedSocket } from "../types/socket/socket";

import { rooms } from "./roomStore";
import { Server } from "socket.io";

export const handleRoomJoin = (
    socket: AuthenticatedSocket,
    roomId: string
) => {
    socket.join(roomId)

    let room = rooms.get(roomId)

    if(!room){
        room = {
            roomId,
            users: [],
            code: ""
        }

        rooms.set(roomId, room)
    }

    const existingUser = room.users.find((user) => 
        user.userId === socket.user?._id.toString()
    )

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

    socket.emit("code:update", room.code)

    socket.to(roomId).emit(
        "room:users",
        room.users
    )
    console.log("JOIN EVENT", roomId, socket.id)

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

    socket.to(roomId).emit(
        "room:users",
        room.users
    )

    if(room.users.length === 0){
        rooms.delete(roomId)
    }
    console.log("LEAVE EVENT", roomId, socket.id)

}

export const handleDisconnect =
  (
    socket: AuthenticatedSocket
  ) => {
    rooms.forEach((room, roomId) => {
      const existingUser =
        room.users.find(
          (user) =>
            user.socketId === socket.id
        )

      if (!existingUser) return

      room.users =
        room.users.filter(
          (user) =>
            user.socketId !== socket.id
        )

      socket.to(roomId).emit(
        "user:left",
        {
          userId:
            existingUser.userId,
        }
      )

      socket.to(roomId).emit( "room:users", room.users )

      if ( room.users.length === 0 ) {
        rooms.delete(roomId)
      }

      console.log("DISCONNECT", socket.id)
    })
  }