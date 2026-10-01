import { useAuth } from "../context/AuthContext"
function Navbar() {
  const {
  user,
  logout,
} = useAuth()
  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8">

      {/* Left */}
      <div>
        <p className="text-sm text-slate-400">
          Welcome back 👋
        </p>

        <p className="text-white font-semibold">
          {user?.name}
        </p>
      </div>


      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button className="relative text-slate-400 hover:text-white text-xl">
          🔔

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>


        {/* Profile */}
        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-semibold">
            S
          </div>

          <div className="hidden md:block">
            <p className="text-sm text-white">
             {user?.name}
            </p>

            <p className="text-xs text-slate-500">
              Personal Account
            </p>
          </div>

        </div>

      </div>
      <button
  onClick={logout}
  className="..."
>
  Logout
</button>

    </header>
  )
}

export default Navbar