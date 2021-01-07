//TOOLS AND MIDDLEWARE
const express = require("express")
const {join} = require("path")
const {check, validationResult, matchedData} = require("express-validator")
const {readDB, writeDB} = require("../../fsUtilities")

//INSTANCES
const examsRouter = express.Router()

//Locations
const questionsFolder = join(__dirname, "questions.json")

//Routes
examsRouter.post("/start", async (req, res, err) => {
  console.log("OK")
  const questions = await readDB(questionsFolder)
  console.log(questions)
})
examsRouter.post("/id/answer", async (req, res, err) => {})
examsRouter.get("/exams/id", async (req, res, err) => {})
examsRouter.post("/start", async (req, res, err) => {})

//EXTRA CRUD QUESTIONS
// examsRouter.post("/questions", (req,res,err)=>{})
// examsRouter.put("/questions/id", (req,res,err)=>{})
// examsRouter.get("/questions", (req,res,err)=>{})
// examsRouter.delete("/questions/id", (req,res,err)=>{})

module.exports = examsRouter
