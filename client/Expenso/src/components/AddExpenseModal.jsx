import { useEffect, useState } from "react"


function AddExpenseModal({
  closeModal,
  addExpense,
  updateExpense,
  editingExpense,
}) {

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food",
    paymentMethod: "UPI",
    date: "",
  })


  const [loading, setLoading] = useState(false)

  const [error, setError] = useState("")


  // ==========================================
  // LOAD EXPENSE WHEN EDITING
  // ==========================================

  useEffect(() => {

    if (editingExpense) {

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({

        description:
          editingExpense.description || "",

        amount:
          editingExpense.amount || "",

        category:
          editingExpense.category || "Food",

        paymentMethod:
          editingExpense.paymentMethod || "UPI",

        date:
          editingExpense.date
            ? editingExpense.date.substring(0, 10)
            : "",

      })

    } else {

      setFormData({

        description: "",
        amount: "",
        category: "Food",
        paymentMethod: "UPI",
        date: "",

      })

    }

  }, [editingExpense])


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target


    setFormData((previous) => ({

      ...previous,

      [name]: value,

    }))

  }


  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError("")


    if (
      !formData.description ||
      !formData.amount ||
      !formData.date
    ) {

      setError(
        "Please fill all required fields."
      )

      return

    }


    const expenseData = {

      description:
        formData.description,

      amount:
        Number(formData.amount),

      category:
        formData.category,

      paymentMethod:
        formData.paymentMethod,

      date:
        formData.date,

    }


    try {

      setLoading(true)


      // ======================================
      // EDIT EXISTING EXPENSE
      // ======================================

      if (editingExpense) {

        await updateExpense(

          editingExpense._id,

          expenseData

        )

      }


      // ======================================
      // ADD NEW EXPENSE
      // ======================================

      else {

        await addExpense(
          expenseData
        )

      }


      closeModal()


    } catch (error) {

      console.error(
        "Expense operation failed:",
        error
      )


      setError(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      )


    } finally {

      setLoading(false)

    }

  }


  const isEditing =
    Boolean(editingExpense)


  return (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">

      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">

          <div>

            <h2 className="text-xl font-semibold">

              {isEditing
                ? "Edit Expense"
                : "Add Expense"}

            </h2>

            <p className="text-sm text-slate-500 mt-1">

              {isEditing
                ? "Update your transaction."
                : "Add a new transaction."}

            </p>

          </div>


          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-white text-xl"
          >
            ✕
          </button>

        </div>


        {/* ======================================
            FORM
        ====================================== */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* ERROR */}

          {error && (

            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">

              {error}

            </div>

          )}


          {/* DESCRIPTION */}

          <div>

            <label className="block text-sm text-slate-400 mb-2">
              Description
            </label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Dinner at Pizza Hut"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
            />

          </div>


          {/* AMOUNT */}

          <div>

            <label className="block text-sm text-slate-400 mb-2">
              Amount
            </label>

            <div className="relative">

              <span className="absolute left-4 top-3 text-slate-400">
                ₹
              </span>

              <input
                type="number"
                name="amount"
                min="1"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-3 outline-none focus:border-indigo-500"
              />

            </div>

          </div>


          {/* CATEGORY + PAYMENT */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
              >

                <option>Food</option>
                <option>Travel</option>
                <option>Shopping</option>
                <option>Entertainment</option>
                <option>Bills</option>
                <option>Health</option>
                <option>Education</option>
                <option>Other</option>

              </select>

            </div>


            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Payment Method
              </label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
              >

                <option>UPI</option>
                <option>Cash</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Net Banking</option>
                <option>Other</option>

              </select>

            </div>

          </div>


          {/* DATE */}

          <div>

            <label className="block text-sm text-slate-400 mb-2">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
            />

          </div>


          {/* BUTTONS */}

          <div className="flex gap-3 pt-3">

            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl disabled:opacity-50"
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-medium disabled:opacity-50"
            >

              {loading

                ? isEditing
                  ? "Updating..."
                  : "Adding..."

                : isEditing
                  ? "Update Expense"
                  : "Add Expense"

              }

            </button>

          </div>

        </form>

      </div>

    </div>

  )

}


export default AddExpenseModal