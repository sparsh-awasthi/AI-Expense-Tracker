import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App.jsx"

import { AuthProvider } from "./context/AuthContext"
import { ExpenseProvider } from "./context/ExpenseContext"

import "./index.css"


createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    <AuthProvider>

      <ExpenseProvider>

        <App />

      </ExpenseProvider>

    </AuthProvider>

  </StrictMode>

)