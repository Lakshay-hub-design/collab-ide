import { useEffect } from "react"

import { socket } from "@/shared/lib/socket"

import { useAuthStore } from "@/shared/store/authStore"

function SocketTestPage() {
  console.log(useAuthStore.getState())
  const accessToken =
    useAuthStore(
      (state) => state.accessToken
    )

  useEffect(() => {
    if (!accessToken) return

    socket.auth = {
      token: accessToken,
    }

    socket.connect()

    socket.on("connect", () => {
      console.log(
        "Connected:",
        socket.id
      )
    })

    socket.on(
      "connect_error",
      (error) => {
        console.log(
          "Socket auth failed:",
          error.message
        )
      }
    )

    return () => {
      socket.disconnect()
    }
  }, [accessToken])

  return (
    <div className="text-black p-10">
      Socket Auth Test
    </div>
  )
}

export default SocketTestPage