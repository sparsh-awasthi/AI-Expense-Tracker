import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import api from "../api/api"


const ExpenseContext =
  createContext()


export const ExpenseProvider = ({
  children,
}) => {

  const [expenses, setExpenses] =
    useState([])

  const [loading, setLoading] =
    useState(true)


  // ==========================================
  // GET EXPENSES
  // ==========================================

  const fetchExpenses = async () => {

    try {

      setLoading(true)


      const response =
        await api.get(
          "/expenses"
        )


      setExpenses(
        response.data.data
      )

    } catch (error) {

      console.error(
        "Failed to fetch expenses:",
        error
      )

    } finally {

      setLoading(false)

    }

  }


  // ==========================================
  // FETCH ON APP LOAD
  // ==========================================

  useEffect(() => {

    const token =
      localStorage.getItem("token")


    if (token) {

      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchExpenses()

    } else {

      setLoading(false)

    }

  }, [])


  // ==========================================
  // ADD EXPENSE
  // ==========================================

  const addExpense = async (
    expenseData
  ) => {

    try {

      const response =
        await api.post(
          "/expenses",
          expenseData
        )


      const newExpense =
        response.data.data


      setExpenses(
        (previous) => [
          newExpense,
          ...previous,
        ]
      )


      return newExpense

    } catch (error) {

      console.error(
        "Failed to add expense:",
        error
      )

      throw error

    }

  }


  // ==========================================
  // UPDATE EXPENSE
  // ==========================================

  const updateExpense = async (
    id,
    expenseData
  ) => {

    try {

      const response =
        await api.put(
          `/expenses/${id}`,
          expenseData
        )


      const updatedExpense =
        response.data.data


      setExpenses(
        (previous) =>
          previous.map(
            (expense) =>
              expense._id === id
                ? updatedExpense
                : expense
          )
      )


      return updatedExpense

    } catch (error) {

      console.error(
        "Failed to update expense:",
        error
      )

      throw error

    }

  }


  // ==========================================
  // DELETE EXPENSE
  // ==========================================

  const deleteExpense = async (
    id
  ) => {

    try {

      await api.delete(
        `/expenses/${id}`
      )


      setExpenses(
        (previous) =>
          previous.filter(
            (expense) =>
              expense._id !== id
          )
      )

    } catch (error) {

      console.error(
        "Failed to delete expense:",
        error
      )

      throw error

    }

  }


  return (

    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >

      {children}

    </ExpenseContext.Provider>

  )

}


// eslint-disable-next-line react-refresh/only-export-components
export const useExpenses = () => {

  return useContext(
    ExpenseContext
  )

}