import { useEffect, useMemo, useRef } from "react"
import type { editor as MonacoEditor } from "monaco-editor"

import Editor from "@monaco-editor/react"
import debounce from "lodash.debounce"

import { socket } from "@/shared/lib/socket"

import { useRoomStore } from "@/features/room/roomStore"
import { useCursorStore } from "@/features/collaboration/cursorStore"

import { useCollaborationStore } from "@/features/collaboration/collaborationStore"
import { Link } from "react-router-dom"

function RoomPage() {
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null)

  const cursors = useCursorStore((state) => state.cursors);

  const updateCursor = useCursorStore((state) => state.updateCursor);

   const handleEditorDidMount = (editor: MonacoEditor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    editor.onDidChangeCursorPosition((event: MonacoEditor.ICursorPositionChangedEvent) => {
      socket.emit("cursor:move", {
        roomId,

        position: {
          lineNumber: event.position.lineNumber,

          column: event.position.column,
        },
      });
    });
  };

  const roomId = "room-123"

  const code =
    useCollaborationStore(
      (state) => state.code
    )

  const setCode =
    useCollaborationStore(
      (state) => state.setCode
    )

  const users = useRoomStore(
    (state) => state.users
  )

  const setUsers = useRoomStore(
    (state) => state.setUsers
  )

  const isRemoteChange = useRef(false)

  useEffect(() => {
    socket.emit(
      "room:join",
      roomId
    )

    socket.on(
      "room:users",
      (users) => {
        setUsers(users)
      }
    )

    socket.on(
      "code:update",
      (incomingCode) => {
        isRemoteChange.current = true
        setCode(incomingCode)
      }
    )

    socket.on("cursor:update", ({ userId, username, position }) => {
      updateCursor({
        userId,
        username,

        lineNumber: position.lineNumber,

        column: position.column,
      });
    });

    return () => {
      socket.emit(
        "room:leave",
        roomId
      )

      socket.off("room:users")

      socket.off("code:update")

      socket.off("cursor:update")
    }
  }, [])

 

  

  const emitCodeChange = useMemo(() => debounce(
    (newCode: string) => {
      socket.emit("code:change",  {
        roomId,
        code: newCode
      })
    }, 150
  ), [])

  const handleEditorChange = (value?: string) => {
    const newCode = value || ""

    setCode(newCode)

    if(isRemoteChange.current){
      isRemoteChange.current = false

      return
    }
    
    emitCodeChange(newCode)
  }

  return (
    <div className="h-screen bg-black text-white flex">
      <div className="w-64 border-r border-zinc-800 p-4">
        <h2 className="text-xl font-bold mb-4">
          Active Users
        </h2>

        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.socketId}
              className="p-2 border border-zinc-800 rounded"
            >
              {user.username}
            </div>
          ))}
        </div>

        <div className="mt-8">
  <h2 className="text-xl font-bold mb-4">
    Live Cursors
  </h2>

  <div className="space-y-2">
    {cursors.map((cursor) => (
      <div
        key={cursor.userId}
        className="border border-zinc-800 p-2 rounded"
      >
        {cursor.username}

        <div className="text-sm text-zinc-400">
          Line:
          {" "}
          {cursor.lineNumber}
          {" "}
          | Col:
          {" "}
          {cursor.column}
        </div>
      </div>
    ))}
  </div>
</div>
      </div>

      <Link to={'/dashboard'} >Dash</Link>

      <div className="flex-1">
        <Editor
          height="100vh"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={
            handleEditorChange
          }
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  )
}

export default RoomPage