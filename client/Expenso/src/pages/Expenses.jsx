import { useState } from "react"

import { useExpenses } from "../context/ExpenseContext"

import ExpenseFilters from "../components/ExpenseFilters"
import ExpenseTable from "../components/ExpenseTable"
import AddExpenseModal from "../components/AddExpenseModal"


function Expenses() {

  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useExpenses()


  const [editingExpense, setEditingExpense] =
    useState(null)

  const [showModal, setShowModal] =
    useState(false)


  const [search, setSearch] =
    useState("")

  const [category, setCategory] =
    useState("")

  const [paymentMethod, setPaymentMethod] =
    useState("")


  // ==========================================
  // FILTER EXPENSES
  // ==========================================

  const filteredExpenses =
    expenses.filter((expense) => {

      const matchesSearch =
        expense.description
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )


      const matchesCategory =
        category === "" ||
        expense.category === category


      const matchesPayment =
        paymentMethod === "" ||
        expense.paymentMethod === paymentMethod


      return (
        matchesSearch &&
        matchesCategory &&
        matchesPayment
      )

    })


  return (

    <div className="p-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Expenses
          </h1>

          <p className="text-slate-400 mt-1">
            Track and manage your spending.
          </p>

        </div>


        <button
          onClick={() => {
            setEditingExpense(null)
            setShowModal(true)
          }}
          className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl font-medium transition"
        >
          + Add Expense
        </button>

      </div>


      {/* Filters */}

      <ExpenseFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />


      {/* Table */}

      <ExpenseTable
        expenses={filteredExpenses}
        deleteExpense={deleteExpense}
        onEdit={(expense) =>
          setEditingExpense(expense)
        }
      />


      {/* Add / Edit Modal */}

      {(showModal || editingExpense) && (

        <AddExpenseModal

          closeModal={() => {
            setShowModal(false)
            setEditingExpense(null)
          }}

          addExpense={addExpense}

          updateExpense={updateExpense}

          editingExpense={editingExpense}

        />

      )}

    </div>

  )

}


export default Expenses