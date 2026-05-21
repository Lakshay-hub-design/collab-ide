import { AuthenticatedSocket } from "../types/socket/socket"

export const handleCursorMove = (
  socket: AuthenticatedSocket,
  roomId: string,
  position: {
    lineNumber: number
    column: number
  }
) => {
  socket.to(roomId).emit(
    "cursor:update",
    {
      userId:
        socket.user?._id,
      username:
        socket.user?.username,

      position,
    }
  )
}