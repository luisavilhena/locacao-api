const fs = require('fs')

function ifNotAThrow(value) {
  if (value !== 'A') {
    throw new Error('Value is not A')
  } else {
    console.log('OK')
  }
}
ifNotAThrow('C')
ifNotAThrow('A')
ifNotAThrow('A')
ifNotAThrow('A')

try {
  ifNotAThrow('B')
} catch (err) {
  console.log('Ocorreu um erro', err.message)
}


var fileExists
try {
  const contents = fs.readFileSync(__dirname + '/error.js')
  fileExists = true
} catch (err) {
  if (err.code === 'ENOENT') {
    fileExists = false
  } else {
    throw err
  }
}
console.log({ fileExists })
ifNotAThrow('A')
ifNotAThrow('A')
ifNotAThrow('A')
ifNotAThrow('A')
ifNotAThrow('A')



