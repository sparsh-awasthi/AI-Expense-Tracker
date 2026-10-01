const dns = require("dns")

// Use Google's DNS servers for MongoDB Atlas SRV lookup
dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
])


const mongoose = require("mongoose")


const connectDB = async () => {

  try {

    const connection = await mongoose.connect(
      process.env.MONGODB_URI
    )

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    )

  } catch (error) {

    console.error("MongoDB connection failed")

    console.error("Name:", error.name)

    console.error("Message:", error.message)

    console.error("Code:", error.code)

    process.exit(1)

  }

}


module.exports = connectDB