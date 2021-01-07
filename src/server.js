const express = require("express")
const server = express()
const listEndpoints = require("express-list-endpoints")

//Routes
const examsRoutes = require("./services/exams")

//Use

server.use("exams", examsRoutes)
server.use(express.json())

const port = process.env.PORT || 3001

console.log(listEndpoints(server))

server.listen(() => console.log("server created on port", port))
