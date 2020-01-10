const fs = require('fs')

const FILE_PATH = __dirname + '/error.js'



const checkIfFileExists = filePath => {

  var fileExists = false

  try {
    fs.readFileSync(FILE_PATH)
    fileExists = true
  } catch (err) {
    fileExists = false

  }

  return fileExists
}

console.log(`${FILE_PATH} exists: ${checkIfFileExists(FILE_PATH)}`)