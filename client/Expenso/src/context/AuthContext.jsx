import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import api from "../api/api"


const AuthContext =
  createContext()


export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null)

  const [loading, setLoading] =
    useState(true)


  // ==========================================
  // LOAD USER WHEN APP STARTS
  // ==========================================

  useEffect(() => {

    const token =
      localStorage.getItem("token")


    if (!token) {

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false)

      return

    }


    api.get("/auth/me", {

      headers: {
        Authorization: `Bearer ${token}`,
      },

    })

      .then((response) => {

        setUser(
          response.data.user
        )

      })

      .catch(() => {

        localStorage.removeItem("token")

        setUser(null)

      })

      .finally(() => {

        setLoading(false)

      })

  }, [])


  // ==========================================
  // LOGIN
  // ==========================================

  const login = async (
    email,
    password
  ) => {

    const response =
      await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      )


    const {
      token,
      user,
    } = response.data


    localStorage.setItem(
      "token",
      token
    )


    setUser(user)


    return response.data

  }


  // ==========================================
  // REGISTER
  // ==========================================

  const register = async (
    name,
    email,
    password
  ) => {

    const response =
      await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      )


    const {
      token,
      user,
    } = response.data


    localStorage.setItem(
      "token",
      token
    )


    setUser(user)


    return response.data

  }


  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {

    localStorage.removeItem(
      "token"
    )

    setUser(null)

  }


  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  )

}


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {

  return useContext(
    AuthContext
  )

}