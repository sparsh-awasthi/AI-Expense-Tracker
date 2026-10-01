import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"


function Register() {

  const navigate = useNavigate()

  const {
    register,
  } = useAuth()


  const [name, setName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [error, setError] =
    useState("")

  const [loading, setLoading] =
    useState(false)


  const handleSubmit = async (e) => {

    e.preventDefault()

    setError("")

    setLoading(true)


    try {

      await register(
        name,
        email,
        password
      )

      navigate("/")

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration failed"
      )

    } finally {

      setLoading(false)

    }

  }


  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-white">
            AI Expense Tracker
          </h1>

          <p className="text-slate-400 mt-2">
            Create your account
          </p>

        </div>


        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-semibold text-white mb-6">
            Register
          </h2>


          {error && (

            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-3 mb-5 text-sm">

              {error}

            </div>

          )}


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}

            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Your name"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"
              />

            </div>


            {/* Email */}

            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"
              />

            </div>


            {/* Password */}

            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Minimum 6 characters"
                minLength={6}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"
              />

            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition"
            >

              {loading
                ? "Creating account..."
                : "Create Account"
              }

            </button>

          </form>


          <p className="text-center text-slate-400 text-sm mt-6">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  )
}


export default Register