import { useEffect } from "react"

import { socket } from "@/shared/lib/socket"

function SocketTestPage() {
  useEffect(() => {
    socket.connect()

    socket.on("connect", () => {
      console.log(
        "Connected:",
        socket.id
      )
    })

    socket.on("disconnect", () => {
      console.log("Disconnected")
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className="text-white p-10">
      Socket Test Page
    </div>
  )
}

export default SocketTestPage