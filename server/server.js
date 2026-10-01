const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

const connectDB = require("./config/db")

const expenseRoutes = require("./routes/expenseRoutes")
const authRoutes = require("./routes/authRoutes")

const errorMiddleware = require("./middleware/errorMiddleware")


dotenv.config()


// ==========================================
// CONNECT MONGODB
// ==========================================

connectDB()


const app = express()


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors()
)

app.use(
  express.json()
)


// ==========================================
// ROUTES
// ==========================================

app.get(
  "/",
  (req, res) => {

    res.json({
      message: "AI Expense Tracker API is running",
    })

  }
)


app.use(
  "/api/expenses",
  expenseRoutes
)


app.use(
  "/api/auth",
  authRoutes
)


// ==========================================
// ERROR MIDDLEWARE
// ==========================================

app.use(errorMiddleware)


// ==========================================
// SERVER
// ==========================================

const PORT =
  process.env.PORT || 5000


app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    )

  }
)