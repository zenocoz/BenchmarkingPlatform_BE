const {readJSON, writeJSON} = require("fs-extra")
const {join} = require("path")

const questionsPath = require("./services/exams/questions.json")

const readDB = async (filePath) => {
  try {
    const fileJson = await readJSON(filePath)
    return fileJson
  } catch (error) {
    throw new Error(error)
  }
}

const writeDB = async (filePath, fileContent) => {
  try {
    await writeJSON(filePath, fileContent)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  writeDB,
  readDB,
}
