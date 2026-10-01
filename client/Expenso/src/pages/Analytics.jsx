
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

import { useExpenses } from "../context/ExpenseContext"


function Analytics() {

  const { expenses } = useExpenses()


  // -----------------------------
  // CATEGORY DATA
  // -----------------------------

  const categoryTotals = expenses.reduce(
    (result, expense) => {

      if (!result[expense.category]) {
        result[expense.category] = 0
      }

      result[expense.category] += expense.amount

      return result

    },
    {}
  )


  const categoryData = Object.entries(categoryTotals)
    .map(([name, value]) => ({
      name,
      value,
    }))


  // -----------------------------
  // PAYMENT METHOD DATA
  // -----------------------------

  const paymentTotals = expenses.reduce(
    (result, expense) => {

      if (!result[expense.paymentMethod]) {
        result[expense.paymentMethod] = 0
      }

      result[expense.paymentMethod] += expense.amount

      return result

    },
    {}
  )


  const paymentData = Object.entries(paymentTotals)
    .map(([name, value]) => ({
      name,
      value,
    }))


  // -----------------------------
  // TOTAL EXPENSE
  // -----------------------------

  const totalExpense = expenses.reduce(
    (total, expense) =>
      total + expense.amount,
    0
  )


  // -----------------------------
  // HIGHEST CATEGORY
  // -----------------------------

  const highestCategory = categoryData.reduce(
    (highest, item) =>
      item.value > highest.value
        ? item
        : highest,
    {
      name: "None",
      value: 0,
    }
  )


  // -----------------------------
  // MONTHLY DATA
  // -----------------------------

  const monthlyTotals = expenses.reduce(
    (result, expense) => {

      const date = new Date(expense.date)

      const month = date.toLocaleString(
        "en-US",
        {
          month: "short",
        }
      )

      if (!result[month]) {
        result[month] = 0
      }

      result[month] += expense.amount

      return result

    },
    {}
  )


  const monthlyData = Object.entries(monthlyTotals)
    .map(([month, amount]) => ({
      month,
      amount,
    }))


  // -----------------------------
  // MONTHLY AVERAGE
  // -----------------------------

  const averageMonthly =
    monthlyData.length > 0
      ? totalExpense / monthlyData.length
      : 0


  // -----------------------------
  // COLORS
  // -----------------------------

  const categoryColors = [
    "#6366f1",
    "#8b5cf6",
    "#3b82f6",
    "#ec4899",
    "#14b8a6",
    "#64748b",
    "#f59e0b",
    "#ef4444",
  ]


  const paymentColors = [
    "#6366f1",
    "#8b5cf6",
    "#3b82f6",
    "#14b8a6",
    "#f59e0b",
  ]


  return (

    <div className="p-8">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="text-slate-400 mt-1">
          Understand where your money is going.
        </p>

      </div>


      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">


        {/* Total */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400 text-sm">
            Total Spending
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{totalExpense.toLocaleString()}
          </h2>

          <p className="text-slate-500 text-sm mt-2">
            Across all categories
          </p>

        </div>


        {/* Average */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400 text-sm">
            Monthly Average
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{Math.round(averageMonthly).toLocaleString()}
          </h2>

          <p className="text-slate-500 text-sm mt-2">
            Based on recorded months
          </p>

        </div>


        {/* Highest Category */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400 text-sm">
            Highest Category
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {highestCategory.name}
          </h2>

          <p className="text-slate-500 text-sm mt-2">
            ₹{highestCategory.value.toLocaleString()}
          </p>

        </div>


        {/* Transactions */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400 text-sm">
            Transactions
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {expenses.length}
          </h2>

          <p className="text-slate-500 text-sm mt-2">
            Recorded expenses
          </p>

        </div>

      </div>


      {/* Monthly Spending */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">

        <div className="mb-6">

          <h2 className="text-xl font-semibold">
            Monthly Spending
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Your spending trend.
          </p>

        </div>


        <div className="h-80">

          {monthlyData.length > 0 ? (

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={monthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                />

                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                />

                <YAxis
                  stroke="#64748b"
                />

                <Tooltip
                  formatter={(value) => [
                    `₹${value.toLocaleString()}`,
                    "Spending",
                  ]}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "10px",
                  }}
                />

                <Bar
                  dataKey="amount"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          ) : (

            <div className="h-full flex items-center justify-center text-slate-500">
              No expense data available.
            </div>

          )}

        </div>

      </div>


      {/* Category + Payment */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        {/* Category */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-semibold">
            Spending by Category
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Distribution of your expenses.
          </p>


          <div className="h-80 mt-4">

            {categoryData.length > 0 ? (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    innerRadius={65}
                    paddingAngle={3}
                  >

                    {categoryData.map(
                      (entry, index) => (

                        <Cell
                          key={`category-${index}`}
                          fill={
                            categoryColors[
                              index %
                              categoryColors.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `₹${value.toLocaleString()}`
                    }
                  />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            ) : (

              <div className="h-full flex items-center justify-center text-slate-500">
                No category data available.
              </div>

            )}

          </div>

        </div>


        {/* Payment Methods */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-semibold">
            Payment Methods
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            How you usually pay.
          </p>


          <div className="h-80 mt-4">

            {paymentData.length > 0 ? (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={paymentData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    innerRadius={65}
                    paddingAngle={3}
                  >

                    {paymentData.map(
                      (entry, index) => (

                        <Cell
                          key={`payment-${index}`}
                          fill={
                            paymentColors[
                              index %
                              paymentColors.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `₹${value.toLocaleString()}`
                    }
                  />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            ) : (

              <div className="h-full flex items-center justify-center text-slate-500">
                No payment data available.
              </div>

            )}

          </div>

        </div>

      </div>


      {/* AI Analysis */}

      <div className="mt-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-6">

        <div className="flex gap-4">

          <div className="text-3xl">
            🤖
          </div>

          <div>

            <h2 className="text-lg font-semibold">
              AI Spending Analysis
            </h2>

            <p className="text-slate-300 mt-2 leading-relaxed">
              Your highest spending category is{" "}
              <span className="font-semibold text-white">
                {highestCategory.name}
              </span>
              , with total spending of{" "}
              <span className="font-semibold text-white">
                ₹{highestCategory.value.toLocaleString()}
              </span>
              .
            </p>

          </div>

        </div>

      </div>

    </div>

  )
}


export default Analytics
