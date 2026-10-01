const Expense = require("../models/Expense")


// ==========================================
// CREATE EXPENSE
// ==========================================

const createExpense = async (req, res, next) => {

  try {

    const {
      description,
      amount,
      category,
      paymentMethod,
      date,
    } = req.body


    const expense = await Expense.create({

      user: req.user.id,

      description,

      amount,

      category,

      paymentMethod,

      date,

    })


    res.status(201).json({

      success: true,

      data: expense,

    })

  } catch (error) {

    next(error)

  }

}


// ==========================================
// GET ALL EXPENSES
// ==========================================

const getExpenses = async (req, res, next) => {

  try {

    const expenses =
      await Expense.find({

        user: req.user.id,

      }).sort({

        date: -1,

      })


    res.status(200).json({

      success: true,

      count: expenses.length,

      data: expenses,

    })

  } catch (error) {

    next(error)

  }

}


// ==========================================
// GET SINGLE EXPENSE
// ==========================================

const getExpense = async (req, res, next) => {

  try {

    const expense =
      await Expense.findOne({

        _id: req.params.id,

        user: req.user.id,

      })


    if (!expense) {

      return res.status(404).json({

        success: false,

        message: "Expense not found",

      })

    }


    res.status(200).json({

      success: true,

      data: expense,

    })

  } catch (error) {

    next(error)

  }

}


// ==========================================
// UPDATE EXPENSE
// ==========================================

const updateExpense = async (
  req,
  res,
  next
) => {

  try {

    const expense =
      await Expense.findOneAndUpdate(

        {
          _id: req.params.id,

          user: req.user.id,

        },

        req.body,

        {
          new: true,

          runValidators: true,

        }

      )


    if (!expense) {

      return res.status(404).json({

        success: false,

        message: "Expense not found",

      })

    }


    res.status(200).json({

      success: true,

      data: expense,

    })

  } catch (error) {

    next(error)

  }

}


// ==========================================
// DELETE EXPENSE
// ==========================================

const deleteExpense = async (
  req,
  res,
  next
) => {

  try {

    const expense =
      await Expense.findOneAndDelete({

        _id: req.params.id,

        user: req.user.id,

      })


    if (!expense) {

      return res.status(404).json({

        success: false,

        message: "Expense not found",

      })

    }


    res.status(200).json({

      success: true,

      message:
        "Expense deleted successfully",

    })

  } catch (error) {

    next(error)

  }

}


module.exports = {

  createExpense,

  getExpenses,

  getExpense,

  updateExpense,

  deleteExpense,

}