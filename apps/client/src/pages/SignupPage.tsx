import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { signupUser } from "@/features/auth/auth.api"

function SignupPage() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      setLoading(true)

      await signupUser({
        username,
        email,
        password,
      })

      navigate("/login")
    } catch (error) {
      console.log(error)
      alert("Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md space-y-4 border border-zinc-800 p-8 rounded-xl"
      >
        <h1 className="text-3xl font-bold">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
        />

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
            ? "Creating..."
            : "Signup"}
        </button>
      </form>
    </div>
  )
}

export default SignupPage