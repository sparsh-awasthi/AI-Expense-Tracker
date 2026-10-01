const mongoose = require("mongoose")


const expenseSchema = new mongoose.Schema(
  {

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    description: {
      type: String,
      required: true,
      trim: true,
    },


    amount: {
      type: Number,
      required: true,
      min: 1,
    },


    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Travel",
        "Shopping",
        "Entertainment",
        "Bills",
        "Health",
        "Education",
        "Other",
      ],
    },


    paymentMethod: {
      type: String,
      required: true,
      enum: [
        "UPI",
        "Cash",
        "Credit Card",
        "Debit Card",
        "Net Banking",
        "Other",
      ],
    },


    date: {
      type: Date,
      required: true,
    },

  },

  {
    timestamps: true,
  }
)


const Expense = mongoose.model(
  "Expense",
  expenseSchema
)


module.exports = Expense