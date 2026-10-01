const express = require("express")

const {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController")

const authMiddleware =
  require("../middleware/authMiddleware")


const router = express.Router()


// ==========================================
// CREATE
// ==========================================

router.post(
  "/",
  authMiddleware,
  createExpense
)


// ==========================================
// GET ALL
// ==========================================

router.get(
  "/",
  authMiddleware,
  getExpenses
)


// ==========================================
// GET ONE
// ==========================================

router.get(
  "/:id",
  authMiddleware,
  getExpense
)


// ==========================================
// UPDATE
// ==========================================

router.put(
  "/:id",
  authMiddleware,
  updateExpense
)


// ==========================================
// DELETE
// ==========================================

router.delete(
  "/:id",
  authMiddleware,
  deleteExpense
)


module.exports = router