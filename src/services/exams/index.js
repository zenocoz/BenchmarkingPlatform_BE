//TOOLS AND MIDDLEWARE
const express = require("express")
const uniqid = require("uniqid")
const {join} = require("path")
const {check, validationResult, matchedData} = require("express-validator")
const {readDB, writeDB, randomizeArray} = require("../../fsUtilities")
const {nextTick} = require("process")

//INSTANCES
const examsRouter = express.Router()

//Locations
const questionsFolder = join(__dirname, "questions.json")
const examsFolder = join(__dirname, "./exams.json")

//Routes
examsRouter.post("/start", async (req, res, next) => {
  const questions = await readDB(questionsFolder)
  const randomArray = randomizeArray(questions)
  const randomQuestions = randomArray.slice(0, 4)

  const newExam = {
    ...req.body,
    _id: uniqid(),
    examDate: new Date(),
    isCompleted: false,
    totalDuration: 30, // used only in extras
    questions: randomQuestions,
  }
  const exams = await readDB(examsFolder)
  exams.push(newExam)
  await writeDB(examsFolder, exams)

  res.send(exams).sendStatus(201)
})
examsRouter.post("/:id/answer", async (req, res, next) => {
  //get exam

  try {
    const exams = await readDB(examsFolder)
    const selectedExam = exams.find((exam) => exam._id === req.params.id)

    if (selectedExam) {
      if (!selectedExam.hasOwnProperty("score")) {
        selectedExam.score = {
          rightAnswers: 0,
          wrongAnswers: 0,
          answeredQuestions: [],
        }
      }
      const questions = selectedExam.questions
      let selectedQuestion = questions[req.body.question]

      if (selectedQuestion) {
        if (
          selectedExam.score.answeredQuestions.indexOf(req.body.question) === -1
        ) {
          const answers = selectedQuestion.answers
          const selectedAnswer = answers[req.body.answer]
          selectedExam.score.answeredQuestions.push(req.body.question)
          if (selectedAnswer.isCorrect === true) {
            selectedExam.score.rightAnswers++
          } else {
            selectedExam.score.wrongAnswers++
          }
          await writeDB(examsFolder, exams)
          res.send(exams)
        } else {
          const error = new Error("question already answered")
          error.httpStatusCode = 403
          next(error)
        }
      } else {
        const error = new Error("question not found")
        error.httStatusCode = 404
        next(error)
      }
    } else {
      const error = new Error("exam not found")
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
  }
})
examsRouter.get("/:id", async (req, res, next) => {
  try {
    const exams = await readDB(examsFolder)
    const selectedExam = exams.find((exam) => exam._id === req.params.id)
    if (selectedExam) {
      res.send(selectedExam)
    } else {
      const error = new Error("Exam not found")
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
  }
})
// examsRouter.post("/start", async (req, res, err) => {})

//EXTRA CRUD QUESTIONS
// examsRouter.post("/questions", (req,res,err)=>{})
// examsRouter.put("/questions/id", (req,res,err)=>{})
// examsRouter.get("/questions", (req,res,err)=>{})
// examsRouter.delete("/questions/id", (req,res,err)=>{})

module.exports = examsRouter
