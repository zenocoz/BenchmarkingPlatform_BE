//TOOLS AND MIDDLEWARE
const express = require("express")
const uniqid = require("uniqid")
const {join} = require("path")
const {check, validationResult, matchedData} = require("express-validator")
const {readDB, writeDB, randomizeArray} = require("../../fsUtilities")

//INSTANCES
const examsRouter = express.Router()

//Locations
const questionsFolder = join(__dirname, "questions.json")
const examsFolder = join(__dirname, "./exams.json")

//Routes
examsRouter.post("/start", async (req, res, err) => {
  const questions = await readDB(questionsFolder)
  const randomArray = randomizeArray(questions)
  const randomQuestions = randomArray.slice(0, 4)

  const newExam = {
    ...req.body,
    _id: uniqid(), // server generated
    examDate: new Date(), // server generated
    isCompleted: false, // false on creation
    totalDuration: 30, // used only in extras
    questions: randomQuestions,
  }
  const exams = await readDB(examsFolder)
  exams.push(newExam)
  await writeDB(examsFolder, exams)

  res.send(exams).sendStatus(201)
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
