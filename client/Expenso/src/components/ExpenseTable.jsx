function ExpenseTable({
  expenses,
  deleteExpense,
  onEdit,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-800">

        <h2 className="font-semibold text-lg">
          Recent Expenses
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {expenses.length} transactions
        </p>

      </div>


      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-800/50">

            <tr>

              <th className="text-left px-6 py-4 text-sm text-slate-400 font-medium">
                Description
              </th>

              <th className="text-left px-6 py-4 text-sm text-slate-400 font-medium">
                Category
              </th>

              <th className="text-left px-6 py-4 text-sm text-slate-400 font-medium">
                Date
              </th>

              <th className="text-left px-6 py-4 text-sm text-slate-400 font-medium">
                Payment
              </th>

              <th className="text-right px-6 py-4 text-sm text-slate-400 font-medium">
                Amount
              </th>

              <th className="text-right px-6 py-4 text-sm text-slate-400 font-medium">
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {expenses.length > 0 ? (

              expenses.map((expense) => (

                <tr
                  key={expense._id}
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                >

                  <td className="px-6 py-4">
                    <p className="font-medium text-white">
                      {expense.description}
                    </p>
                  </td>


                  <td className="px-6 py-4">

                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm">
                      {expense.category}
                    </span>

                  </td>


                  <td className="px-6 py-4 text-slate-400">
                     <p className="text-sm text-slate-500 mt-1">
                    {new Date(expense.date).toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}</p>
                  </td>


                  <td className="px-6 py-4 text-slate-400">
                    {expense.paymentMethod}
                  </td>


                  <td className="px-6 py-4 text-right font-semibold">
                    ₹{expense.amount.toLocaleString()}
                  </td>


                  <td className="px-6 py-4 text-right">

                   <button
  onClick={() => onEdit(expense)}
  className="text-slate-400 hover:text-white mr-3"
>
  ✏️
</button>

                    <button
                      onClick={() => deleteExpense(expense._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      🗑️
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-12 text-slate-500"
                >
                  No expenses found.

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* Mobile */}
      <div className="md:hidden">

        {expenses.length > 0 ? (

          expenses.map((expense) => (

            <div
              key={expense._id}
              className="p-5 border-t border-slate-800"
            >

              <div className="flex justify-between">

                <div>

                  <p className="font-medium">
                    {expense.description}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    {new Date(expense.date).toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}
                  </p>

                </div>

                <p className="font-semibold">
                  ₹{expense.amount.toLocaleString()}
                </p>

              </div>


              <div className="flex justify-between items-center mt-4">

                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm">
                  {expense.category}
                </span>

                <div>

                  <button onClick={() => onEdit(expense)} className="mr-3">
                    ✏️
                  </button>

                  <button
                    onClick={() => deleteExpense(expense._id)}
                  >
                    🗑️
                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="text-center py-12 text-slate-500">
            No expenses found.
          </div>

        )}

      </div>

    </div>
  )
}

export default ExpenseTable