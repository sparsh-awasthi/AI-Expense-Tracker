import { NavLink } from "react-router-dom"

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: "🏠",
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: "💳",
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: "📊",
    },
    {
      name: "AI Insights",
      path: "/ai-insights",
      icon: "🤖",
    },
  ]

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-5">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-xl font-bold text-white">
          💰 Expenso
        </h1>

        <p className="text-xs text-slate-500 mt-1">
          Smart money management
        </p>
      </div>


      {/* Navigation */}
      <nav className="space-y-2">

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >

            <span className="text-lg">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>

          </NavLink>

        ))}

      </nav>


      {/* Bottom section */}
      <div className="absolute bottom-5">

        <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white">
          
          <span>Keep Supporting</span>
        </button>

      </div>

    </aside>
  )
}

export default Sidebar