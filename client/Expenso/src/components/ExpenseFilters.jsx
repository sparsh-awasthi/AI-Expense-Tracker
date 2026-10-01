function ExpenseFilters({
  search,
  setSearch,
  category,
  setCategory,
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-indigo-500"
        />


        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 outline-none focus:border-indigo-500"
        >
          <option value="">All Categories</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Bills</option>
          <option>Health</option>
          <option>Education</option>
          <option>Other</option>
        </select>


        {/* Payment */}
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 outline-none focus:border-indigo-500"
        >
          <option value="">All Payment Methods</option>
          <option>UPI</option>
          <option>Cash</option>
          <option>Credit Card</option>
          <option>Debit Card</option>
          <option>Net Banking</option>
          <option>Other</option>
        </select>

      </div>

    </div>
  )
}

export default ExpenseFilters