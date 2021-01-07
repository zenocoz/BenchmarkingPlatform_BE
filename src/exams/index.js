//TOOLS AND MIDDLEWARE
const express = require("express")
const {join} = require("path")

//INSTANCES
const examsRouter = express.Router()

//Locations
const questionsFolder = join(__dirname, "questions.json")

//Routes
examsRouter.post("/start", (req, res, err) => {})
examsRouter.post("/id/answer", (req, res, err) => {})
examsRouter.get("/exams/id", (req, res, err) => {})
examsRouter.post("/start", (req, res, err) => {})

//EXTRA CRUD QUESTIONS
// examsRouter.post("/questions", (req,res,err)=>{})
// examsRouter.put("/questions/id", (req,res,err)=>{})
// examsRouter.get("/questions", (req,res,err)=>{})
// examsRouter.delete("/questions/id", (req,res,err)=>{})

module.exports = examsRouter
