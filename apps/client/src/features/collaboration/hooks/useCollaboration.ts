import { useEffect } from "react";

import { socket } from "@/shared/lib/socket";

import { useCollabStore } from "../collabStore";
import { useEditorStore } from "@/features/editor/editorStore";

export function useCollaboration() {

  const {
    roomId,

    setConnected,

    setCollaborators,

    setMessages,
    addMessage
  } = useCollabStore();

  const {
  updateFileContentRemote,
} = useEditorStore();

  useEffect(() => {

    function handleConnect() {

      console.log(
        "Socket connected"
      );

      setConnected(true);
    }

    function handleDisconnect() {

      console.log(
        "Socket disconnected"
      );

      setConnected(false);
    }

    function handleRoomUsers(
      users: any[]
    ) {

      setCollaborators(
        users.map((user) => ({
          id: user.userId,

          name:
            user.username,

          color:
            "#8b5cf6",
        }))
      );
    }

    function handleFileUpdate({
      fileId,
      content,
    }: {
      fileId: string;

      content: string;
    }) {
      updateFileContentRemote(fileId, content);
    }

    socket.on(
      "connect",
      handleConnect
    );

    socket.on(
      "disconnect",
      handleDisconnect
    );

    socket.on(
      "room:users",
      handleRoomUsers
    );

    socket.on(
      "file:update",
      handleFileUpdate
    );

    socket.on(
      "chat:history",
      (messages) => {
        setMessages(messages)
      }
    )

    socket.on(
      "chat:new",
      (message) => {
        addMessage(message);
      }
    );

    socket.connect();

    return () => {

      socket.off(
        "connect",
        handleConnect
      );

      socket.off(
        "disconnect",
        handleDisconnect
      );

      socket.off(
        "room:users",
        handleRoomUsers
      );

      socket.off(
        "file:update",
        handleFileUpdate
      );
    };
  }, []);

  useEffect(() => {

    if (!roomId) return;

    socket.emit(
      "room:join",
      roomId
    );

    return () => {

      socket.emit(
        "room:leave",
        roomId
      );
    };
  }, [roomId]);
}