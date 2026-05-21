import { AuthenticatedSocket } from "../types/socket/socket"

import { rooms } from "./roomStore"

export const handleCodeChange = (
  socket: AuthenticatedSocket,
  roomId: string,
  code: string
) => {
  const room = rooms.get(roomId)

  if (!room) return

  room.code = code

  socket.to(roomId).emit(
    "code:update",
    code
  )
}