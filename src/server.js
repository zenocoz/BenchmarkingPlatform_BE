const express = require("express")
const server = express()

const examsRoutes = require("./services/exams")

//Routes

//Use

const port = process.env.PORT || 3001

server.listen(() => console.log("server created on port", port))
