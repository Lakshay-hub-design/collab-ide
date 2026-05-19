import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { loginUser } from "@/features/auth/auth.api"

import { useAuthStore } from "@/shared/store/authStore"

function LoginPage() {
  const navigate = useNavigate()

  const setAuth = useAuthStore(
    (state) => state.setAuth
  )

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      setLoading(true)

      const response =
        await loginUser({
          email,
          password,
        })

      setAuth(
        response.user,
        response.accessToken
      )
      console.log(useAuthStore.getState())

      navigate("/dashboard")
    } catch (error) {
      console.log(error)
      alert("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-4 border border-zinc-800 p-8 rounded-xl"
      >
        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded font-semibold"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>
    </div>
  )
}

export default LoginPage