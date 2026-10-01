const errorMiddleware = (
  error,
  req,
  res,
  next
) => {

  console.error(error.stack)


  res.status(500).json({

    success: false,

    message:
      error.message ||
      "Internal Server Error",

  })

}


module.exports = errorMiddleware