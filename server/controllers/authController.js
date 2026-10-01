const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User")


// ==========================================
// GENERATE JWT
// ==========================================

const generateToken = (userId) => {

  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  )

}


// ==========================================
// REGISTER
// ==========================================

const registerUser = async (
  req,
  res,
  next
) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body


    // Check required fields

    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required",
      })

    }


    // Check if user already exists

    const existingUser =
      await User.findOne({ email })


    if (existingUser) {

      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      })

    }


    // Hash password

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      )


    // Create user

    const user = await User.create({

      name,

      email,

      password: hashedPassword,

    })


    // Generate token

    const token =
      generateToken(user._id)


    res.status(201).json({

      success: true,

      message:
        "User registered successfully",

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

      },

    })

  } catch (error) {

    next(error)

  }

}


// ==========================================
// LOGIN
// ==========================================

const loginUser = async (
  req,
  res,
  next
) => {

  try {

    const {
      email,
      password,
    } = req.body


    if (
      !email ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      })

    }


    // Find user

    const user =
      await User.findOne({
        email,
      })


    if (!user) {

      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      })

    }


    // Compare password

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      )


    if (!passwordMatch) {

      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      })

    }


    // Generate token

    const token =
      generateToken(user._id)


    res.status(200).json({

      success: true,

      message:
        "Login successful",

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

      },

    })

  } catch (error) {

    next(error)

  }

}


// ==========================================
// GET CURRENT USER
// ==========================================

const getMe = async (
  req,
  res,
  next
) => {

  try {

    const user =
      await User.findById(
        req.user.id
      ).select("-password")


    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      })

    }


    res.status(200).json({

      success: true,

      user,

    })

  } catch (error) {

    next(error)

  }

}


module.exports = {
  registerUser,
  loginUser,
  getMe,
}