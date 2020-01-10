const math = require('./modules/math')
const templates = require('./modules/templates')

function doSomething(a, b) {
  console.log(`a * b = ${math.multiply(a, b)}`)
  console.log(templates.renderInquilino({
    nome: "Pedro"
  }))
}

doSomething(9, 7)
