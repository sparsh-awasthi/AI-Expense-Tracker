import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"

import Dashboard from "./pages/Dashboard"
import Expenses from "./pages/Expenses"
import Analytics from "./pages/Analytics"
import AIInsights from "./pages/AIInsights"

import Login from "./pages/Login"
import Register from "./pages/Register"


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ==========================================
            AUTHENTICATION ROUTES
        ========================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ==========================================
            PROTECTED APPLICATION ROUTES
        ========================================== */}

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/expenses"
            element={<Expenses />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/ai-insights"
            element={<AIInsights />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  )

}


export default App