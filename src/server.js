const express = require("express")
const cors = require("cors")
const listEndpoints = require("express-list-endpoints")
const {
  notFoundErrorHandler,
  badRequestErrorHandler,
  catchAllErrorHandler,
} = require("./errorHandlers")

//Routes
const examsRoutes = require("./services/exams")

const server = express()
const port = process.env.PORT || 3001

server.use(cors())
server.use(express.json())

server.use("/exams", examsRoutes)

server.use(notFoundErrorHandler)
server.use(badRequestErrorHandler)
server.use(catchAllErrorHandler)

console.log(listEndpoints(server))

server.listen(port, () => console.log("server created on port", port))

// const express = require("express")
// const listEndpoints = require("express-list-endpoints")
// const examsRoutes = require("./services/exams")
// const cors = require("cors")
// const {
//   notFoundErrorHandler,
//   unauthorizedErrorHandler,
//   forbiddenErrorHandler,
//   badRequestErrorHandler,
//   catchAllErrorHandler,
// } = require("./errorHandlers")

// const server = express()
// const port = process.env.PORT || 3001

// server.use(cors())
// server.use(express.json())

// server.use("/exams", examsRoutes)

// server.use(notFoundErrorHandler)
// server.use(unauthorizedErrorHandler)
// server.use(forbiddenErrorHandler)
// server.use(badRequestErrorHandler)
// server.use(catchAllErrorHandler)

// console.log(listEndpoints(server))

// server.listen(port, () => console.log("server is running on port:", port))
