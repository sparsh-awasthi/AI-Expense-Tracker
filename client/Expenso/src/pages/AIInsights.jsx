
import { useState } from "react"

import { useExpenses } from "../context/ExpenseContext"


function AIInsights() {

  const { expenses } = useExpenses()


  // --------------------------------
  // AI CHAT STATE
  // --------------------------------

  const [question, setQuestion] = useState("")

  const [messages, setMessages] = useState([])

  const [loading, setLoading] = useState(false)


  // --------------------------------
  // TOTAL SPENDING
  // --------------------------------

  const totalExpense = expenses.reduce(
    (total, expense) =>
      total + expense.amount,
    0
  )


  // --------------------------------
  // CATEGORY TOTALS
  // --------------------------------

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


  // --------------------------------
  // TOP CATEGORY
  // --------------------------------

  const categoryData = Object.entries(
    categoryTotals
  )
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort(
      (a, b) =>
        b.amount - a.amount
    )


  const topCategory = categoryData[0] || {
    category: "None",
    amount: 0,
  }


  // --------------------------------
  // BIGGEST EXPENSE
  // --------------------------------

  const biggestExpense = expenses.reduce(
    (biggest, expense) =>
      expense.amount > biggest.amount
        ? expense
        : biggest,
    {
      amount: 0,
      description: "None",
    }
  )


  // --------------------------------
  // AI SIMULATION
  // --------------------------------

  const generateAIResponse = (userQuestion) => {

    const question =
      userQuestion.toLowerCase()


    if (expenses.length === 0) {

      return "You don't have any expenses yet. Add some expenses and I'll be able to analyze your spending."

    }


    if (
      question.includes("most") ||
      question.includes("highest") ||
      question.includes("category")
    ) {

      return `Your highest spending category is ${topCategory.category}, with ₹${topCategory.amount.toLocaleString()} spent.`

    }


    if (
      question.includes("biggest") ||
      question.includes("largest")
    ) {

      return `Your biggest expense is "${biggestExpense.description}" at ₹${biggestExpense.amount.toLocaleString()}.`

    }


    if (
      question.includes("save") ||
      question.includes("reduce")
    ) {

      return `Your current spending is ₹${totalExpense.toLocaleString()}. Since ${topCategory.category} is your largest category, reducing spending there could have the biggest impact.`

    }


    if (
      question.includes("total") ||
      question.includes("spend")
    ) {

      return `You have spent ₹${totalExpense.toLocaleString()} across ${expenses.length} transactions.`

    }


    return `Based on your ${expenses.length} expenses, you have spent ₹${totalExpense.toLocaleString()} in total. Your largest category is ${topCategory.category}.`

  }


  // --------------------------------
  // ASK AI
  // --------------------------------

  const handleAskAI = () => {

    if (!question.trim()) {
      return
    }


    const userMessage = {
      role: "user",
      content: question,
    }


    setMessages((previous) => [
      ...previous,
      userMessage,
    ])


    setQuestion("")

    setLoading(true)


    // Simulate API delay

    setTimeout(() => {

      const response =
        generateAIResponse(question)


      const aiMessage = {
        role: "assistant",
        content: response,
      }


      setMessages((previous) => [
        ...previous,
        aiMessage,
      ])


      setLoading(false)

    }, 800)

  }


  // --------------------------------
  // QUICK QUESTIONS
  // --------------------------------

  const askQuickQuestion = (text) => {

    setQuestion(text)

  }


  return (

    <div className="p-8">

      {/* ============================
          HEADER
      ============================= */}

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-2xl">
            🤖
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Financial Assistant
            </h1>

            <p className="text-slate-400 mt-1">
              Get intelligent insights about your spending.
            </p>

          </div>

        </div>

      </div>


      {/* ============================
          SUMMARY CARDS
      ============================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">


        {/* Total */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400 text-sm">
            Total Spending
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{totalExpense.toLocaleString()}
          </h2>

          <p className="text-slate-500 text-sm mt-2">
            {expenses.length} transactions
          </p>

        </div>


        {/* Top Category */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400 text-sm">
            Highest Category
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {topCategory.category}
          </h2>

          <p className="text-slate-500 text-sm mt-2">
            ₹{topCategory.amount.toLocaleString()}
          </p>

        </div>


        {/* Biggest Expense */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-slate-400 text-sm">
            Biggest Expense
          </p>

          <h2 className="text-xl font-bold mt-2">
            {biggestExpense.description}
          </h2>

          <p className="text-slate-500 text-sm mt-2">
            ₹{biggestExpense.amount.toLocaleString()}
          </p>

        </div>

      </div>


      {/* ============================
          INSIGHTS
      ============================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">


        {/* Spending Pattern */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex gap-4">

            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center text-xl">
              💡
            </div>

            <div>

              <h2 className="text-lg font-semibold">
                Spending Pattern
              </h2>

              <p className="text-slate-400 mt-2 leading-relaxed">

                {expenses.length > 0

                  ? `Your largest spending category is ${topCategory.category}. You have spent ₹${topCategory.amount.toLocaleString()} in this category.`

                  : "Add expenses to discover your spending patterns."

                }

              </p>

            </div>

          </div>

        </div>


        {/* Recommendation */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex gap-4">

            <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-xl">
              ⚠️
            </div>

            <div>

              <h2 className="text-lg font-semibold">
                Recommendation
              </h2>

              <p className="text-slate-400 mt-2 leading-relaxed">

                {expenses.length > 0

                  ? `Consider reviewing your ${topCategory.category} expenses. Reducing this category could have the biggest impact on your overall spending.`

                  : "Add expenses to receive personalized recommendations."

                }

              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ============================
          CATEGORY BREAKDOWN
      ============================= */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">

        <h2 className="text-xl font-semibold">
          AI Spending Summary
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Overview generated from your expense data.
        </p>


        {categoryData.length > 0 ? (

          <div className="mt-6 space-y-4">

            {categoryData.map(
              (item) => {

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

                    <div className="flex justify-between mb-2 text-sm">

                      <span>
                        {item.category}
                      </span>

                      <span className="text-slate-400">
                        ₹{item.amount.toLocaleString()}
                        {" "}
                        ({percentage.toFixed(1)}%)
                      </span>

                    </div>


                    <div className="h-2 bg-slate-800 rounded-full">

                      <div
                        className="h-2 bg-indigo-500 rounded-full"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </div>

                )

              }
            )}

          </div>

        ) : (

          <p className="text-slate-500 mt-6">
            No expense data available.
          </p>

        )}

      </div>


      {/* ============================
          AI CHAT
      ============================= */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">


        {/* Chat Header */}

        <div className="px-6 py-5 border-b border-slate-800">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              🤖
            </div>

            <div>

              <h2 className="font-semibold">
                Ask your AI Assistant
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Ask questions about your expenses.
              </p>

            </div>

          </div>

        </div>


        {/* Chat Messages */}

        <div className="min-h-64 max-h-96 overflow-y-auto p-6 space-y-4">

          {messages.length === 0 ? (

            <div className="flex flex-col items-center justify-center text-center py-8">

              <div className="text-4xl mb-4">
                🤖
              </div>

              <h3 className="font-semibold">
                How can I help?
              </h3>

              <p className="text-slate-500 text-sm mt-2">
                Ask me anything about your spending.
              </p>


              {/* Quick Questions */}

              <div className="flex flex-wrap justify-center gap-2 mt-5">

                <button
                  onClick={() =>
                    askQuickQuestion(
                      "Where am I spending the most?"
                    )
                  }
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm"
                >
                  Where am I spending the most?
                </button>


                <button
                  onClick={() =>
                    askQuickQuestion(
                      "What is my biggest expense?"
                    )
                  }
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm"
                >
                  What is my biggest expense?
                </button>


                <button
                  onClick={() =>
                    askQuickQuestion(
                      "How can I save money?"
                    )
                  }
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm"
                >
                  How can I save money?
                </button>

              </div>

            </div>

          ) : (

            messages.map(
              (message, index) => (

                <div
                  key={index}
                  className={
                    message.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >

                  <div
                    className={
                      message.role === "user"
                        ? "max-w-[80%] bg-indigo-600 px-4 py-3 rounded-2xl rounded-br-md"
                        : "max-w-[80%] bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-md"
                    }
                  >

                    <p className="text-sm leading-relaxed">
                      {message.content}
                    </p>

                  </div>

                </div>

              )
            )

          )}


          {/* Loading */}

          {loading && (

            <div className="flex justify-start">

              <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-md">

                <div className="flex gap-1">

                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" />

                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:150ms]" />

                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:300ms]" />

                </div>

              </div>

            </div>

          )}

        </div>


        {/* Input */}

        <div className="border-t border-slate-800 p-4">

          <div className="flex gap-3">

            <input
              type="text"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {

                if (
                  e.key === "Enter" &&
                  !loading
                ) {
                  handleAskAI()
                }

              }}
              placeholder="Ask something about your expenses..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
            />


            <button
              onClick={handleAskAI}
              disabled={
                !question.trim() ||
                loading
              }
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 rounded-xl font-medium transition"
            >
              {loading ? "Thinking..." : "Ask AI"}
            </button>

          </div>

        </div>

      </div>

    </div>

  )
}


export default AIInsights

