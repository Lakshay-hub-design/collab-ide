import { AuthenticatedSocket } from "../types/socket/socket";

import { rooms } from "./roomStore";

export const handleFileContentChange = (
  socket: AuthenticatedSocket,
  roomId: string,
  fileId: string,
  content: string,
) => {
  const room = rooms.get(roomId);

  if (!room) return;

  const file = room.files.find((f) => f.fileId === fileId);

  if (!file) return;

  file.content = content;

  socket.to(roomId).emit("file:update", {
    fileId,
    content,
  });
};
