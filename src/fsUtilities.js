const {readJSON, writeJSON} = require("fs-extra")
const {join} = require("path")

const questionsPath = require("./services/exams/questions.json")

const readDB = async (filePath) => {
  try {
    const fileJson = await readJSON(filePath)
    return fileJson
  } catch (error) {
    console.log(error)
  }
}

const writeDB = async (filePath, fileContent) => {
  try {
    await writeJSON(filePath, fileContent)
  } catch (error) {
    console.log(error)
  }
}

//randomize array
const randomizeArray = (arr) => {
  let l = arr.length
  let temp = null
  let i = 0
  while (l) {
    i = Math.floor(Math.random() * l--)
    temp = arr[l]
    arr[l] = arr[i]
    arr[i] = temp
  }
  return arr
}

const getQuestionsByDuration = (array, totalDuration) => {
  const questionsByDuration = []
  let aggregateDuration = array[0].duration
  let i = 0
  while (aggregateDuration <= totalDuration) {
    questionsByDuration.push(array[i])
    aggregateDuration += array[i].duration
    i++
  }
  return questionsByDuration
}

module.exports = {
  writeDB,
  readDB,
  randomizeArray,
  getQuestionsByDuration,
}
