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
