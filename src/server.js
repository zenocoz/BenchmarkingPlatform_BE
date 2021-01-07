const express = require("express")
const server = express()

const port = "http://localhost:" + process.env.PORT || 3001

server.listen(() => console.log("server created on port", port))
