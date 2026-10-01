import { useExpenses } from "../context/ExpenseContext"


function Dashboard() {

  const {
    expenses,
    loading,
  } = useExpenses()


  // ==========================================
  // DATE HELPER
  // ==========================================

  const getDateKey = (date) => {

    if (!date) {
      return ""
    }

    // MongoDB date:
    // 2026-09-01T00:00:00.000Z

    return String(date).substring(0, 10)

  }


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-950">

        <p className="text-slate-400">
          Loading expenses...
        </p>

      </div>

    )

  }


  // ==========================================
  // TOTAL EXPENSE
  // ==========================================

  const totalExpense =
    expenses.reduce(
      (total, expense) =>
        total + Number(expense.amount),
      0
    )


  // ==========================================
  // CATEGORY TOTALS
  // ==========================================

  const categoryTotals =
    expenses.reduce(
      (result, expense) => {

        if (!result[expense.category]) {

          result[expense.category] = 0

        }


        result[expense.category] +=
          Number(expense.amount)


        return result

      },
      {}
    )


  const categoryData =
    Object.entries(categoryTotals)

      .map(([category, amount]) => ({

        category,

        amount,

      }))

      .sort(
        (a, b) =>
          b.amount - a.amount
      )


  // ==========================================
  // TOP CATEGORY
  // ==========================================

  const topCategory =
    categoryData[0] || {

      category: "None",

      amount: 0,

    }


  // ==========================================
  // CURRENT MONTH
  // ==========================================

  const today = new Date()


  const currentYear =
    today.getFullYear()


  const currentMonth =
    String(
      today.getMonth() + 1
    ).padStart(2, "0")


  const currentMonthKey =
    `${currentYear}-${currentMonth}`


  const thisMonthExpenses =
    expenses.filter((expense) => {

      const expenseDate =
        getDateKey(expense.date)


      return expenseDate.startsWith(
        currentMonthKey
      )

    })


  const thisMonthTotal =
    thisMonthExpenses.reduce(
      (total, expense) =>
        total + Number(expense.amount),
      0
    )


  // ==========================================
  // DAILY AVERAGE
  // ==========================================

  const daysPassed =
    today.getDate()


  const dailyAverage =
    daysPassed > 0
      ? thisMonthTotal / daysPassed
      : 0


  // ==========================================
  // RECENT EXPENSES
  // ==========================================

  const recentExpenses =
    [...expenses]

      .sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      )

      .slice(0, 5)


  // ==========================================
  // LAST 7 DAYS
  // ==========================================

  const last7Days = []


  for (
    let i = 6;
    i >= 0;
    i--
  ) {

    const date =
      new Date(today)


    date.setDate(
      today.getDate() - i
    )


    const year =
      date.getFullYear()


    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0")


    const day =
      String(
        date.getDate()
      ).padStart(2, "0")


    const dateKey =
      `${year}-${month}-${day}`


    const dayName =
      date.toLocaleDateString(
        "en-US",
        {
          weekday: "short",
        }
      )


    const dayTotal =
      expenses

        .filter((expense) => {

          return (
            getDateKey(expense.date) ===
            dateKey
          )

        })

        .reduce(
          (total, expense) =>
            total +
            Number(expense.amount),
          0
        )


    last7Days.push({

      day: dayName,

      amount: dayTotal,

      date: dateKey,

    })

  }


  // ==========================================
  // MAX DAILY EXPENSE
  // ==========================================

  const maxDailyExpense =
    Math.max(

      ...last7Days.map(
        (day) => day.amount
      ),

      1

    )


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <div className="p-8">


      {/* ======================================
          HEADER
      ====================================== */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-1">
          Here's your spending overview.
        </p>

      </div>


      {/* ======================================
          STAT CARDS
      ====================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">


        {/* TOTAL EXPENSES */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400 text-sm">
            Total Expenses
          </p>

          <h2 className="text-3xl font-bold mt-2">

            ₹{totalExpense.toLocaleString()}

          </h2>

          <p className="text-slate-500 text-sm mt-2">
            All recorded expenses
          </p>

        </div>


        {/* THIS MONTH */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400 text-sm">
            This Month
          </p>

          <h2 className="text-3xl font-bold mt-2">

            ₹{thisMonthTotal.toLocaleString()}

          </h2>

          <p className="text-slate-500 text-sm mt-2">

            {thisMonthExpenses.length}
            {" "}
            transactions

          </p>

        </div>


        {/* DAILY AVERAGE */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400 text-sm">
            Daily Average
          </p>

          <h2 className="text-3xl font-bold mt-2">

            ₹{Math.round(
              dailyAverage
            ).toLocaleString()}

          </h2>

          <p className="text-slate-500 text-sm mt-2">
            Based on this month
          </p>

        </div>


        {/* TOP CATEGORY */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400 text-sm">
            Top Category
          </p>

          <h2 className="text-2xl font-bold mt-2">

            {topCategory.category}

          </h2>

          <p className="text-slate-500 text-sm mt-2">

            ₹{topCategory.amount.toLocaleString()}
            {" "}
            spent

          </p>

        </div>

      </div>


      {/* ======================================
          CHART + CATEGORIES
      ====================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">


        {/* ====================================
            SPENDING OVERVIEW
        ==================================== */}

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div>

            <h2 className="text-xl font-semibold">
              Spending Overview
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Your expenses over the last 7 days
            </p>

          </div>


          {/* CHART */}

          <div className="mt-8">

            <div className="h-64 flex items-end gap-3 sm:gap-5">

              {last7Days.map((day) => {

                const barHeight =
                  day.amount > 0

                    ? (
                        day.amount /
                        maxDailyExpense
                      ) * 100

                    : 0


                return (

                  <div
                    key={day.date}
                    className="flex-1 h-full flex flex-col justify-end items-center"
                  >

                    {/* AMOUNT */}

                    <div className="h-6 text-xs text-slate-400 mb-2">

                      {day.amount > 0
                        ? `₹${day.amount.toLocaleString()}`
                        : ""}

                    </div>


                    {/* BAR */}

                    <div className="w-full flex-1 flex items-end justify-center">

                      <div
                        className="w-full max-w-14 bg-indigo-500 hover:bg-indigo-400 rounded-t-lg transition-all duration-300"
                        style={{
                          height:
                            day.amount > 0
                              ? `${Math.max(
                                  barHeight,
                                  8
                                )}%`
                              : "2px",
                        }}
                        title={`${day.day}: ₹${day.amount.toLocaleString()}`}
                      />

                    </div>


                    {/* DAY */}

                    <div className="h-5 mt-3 text-xs text-slate-500">

                      {day.day}

                    </div>

                  </div>

                )

              })}

            </div>

          </div>

        </div>


        {/* ====================================
            CATEGORY BREAKDOWN
        ==================================== */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-semibold">
            Categories
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Where your money goes
          </p>


          <div className="space-y-5 mt-8">

            {categoryData.length > 0 ? (

              categoryData

                .slice(0, 5)

                .map((item) => {

                  const percentage =
                    totalExpense > 0

                      ? (
                          item.amount /
                          totalExpense
                        ) * 100

                      : 0


                  return (

                    <div
                      key={item.category}
                    >

                      <div className="flex justify-between text-sm mb-2">

                        <span>
                          {item.category}
                        </span>

                        <span>
                          ₹{item.amount.toLocaleString()}
                        </span>

                      </div>


                      <div className="h-2 bg-slate-800 rounded-full">

                        <div
                          className="h-2 bg-indigo-500 rounded-full transition-all"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>

                  )

                })

            ) : (

              <p className="text-slate-500 text-sm">
                No expenses yet.
              </p>

            )}

          </div>

        </div>

      </div>


      {/* ======================================
          RECENT EXPENSES
      ====================================== */}

      <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">


        <div className="px-6 py-5 border-b border-slate-800">

          <h2 className="text-xl font-semibold">
            Recent Expenses
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Your latest transactions
          </p>

        </div>


        {recentExpenses.length > 0 ? (

          <div className="divide-y divide-slate-800">

            {recentExpenses.map(
              (expense) => (

                <div
                  key={expense._id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition"
                >

                  <div>

                    <p className="font-medium">
                      {expense.description}
                    </p>


                    <div className="flex gap-3 mt-1">

                      <span className="text-xs text-indigo-400">
                        {expense.category}
                      </span>

                      <span className="text-xs text-slate-500">
                        {expense.paymentMethod}
                      </span>

                    </div>

                  </div>


                  <div className="text-right">

                    <p className="font-semibold">

                      ₹{Number(
                        expense.amount
                      ).toLocaleString()}

                    </p>


                    <p className="text-xs text-slate-500 mt-1">

                      {new Date(
                        expense.date
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}

                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        ) : (

          <div className="py-12 text-center">

            <p className="text-slate-500">
              No expenses recorded yet.
            </p>

          </div>

        )}

      </div>


      {/* ======================================
          AI INSIGHT
      ====================================== */}

      <div className="mt-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-6">

        <div className="flex items-start gap-4">

          <div className="text-3xl">
            🤖
          </div>


          <div>

            <h2 className="text-lg font-semibold">
              AI Insight
            </h2>


            {expenses.length > 0 ? (

              <p className="text-slate-300 mt-2">

                Your highest spending category is{" "}

                <span className="font-semibold text-white">
                  {topCategory.category}
                </span>

                {" "}with{" "}

                <span className="font-semibold text-white">

                  ₹{topCategory.amount.toLocaleString()}

                </span>

                {" "}spent so far.

              </p>

            ) : (

              <p className="text-slate-400 mt-2">

                Add some expenses and your
                AI-powered spending insights
                will appear here.

              </p>

            )}

          </div>

        </div>

      </div>


    </div>

  )

}


export default Dashboard