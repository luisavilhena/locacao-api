const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer()
//criar link no ver e no criar que volte para a página do formulário
//h1 para resultado de nome e h2 para resultado de aluguel quando o json é mostrado na tela na url "ver"

const link = 'file:///home/habemus/Documents/studies/locacao/locacao-api/ui/ver-inquilino.html' 

function renderInquilino(dados) {
  return '<style type="text/css"> code{ white-space: pre-wrap; background-color: red; </style>' + '<code>' + dados + '<a href="' + link + '"> link </a> </code>'
}

server.on('request', (request, response) => {
  response.setHeader('Content-Type', 'text/html; charset=utf-8') 

  if (request.url === '/favicon.ico') {
    response.end(null)
    return
  }

  const parsedUrl = url.parse(request.url, true)

  // console.log(parsedUrl)

  if (parsedUrl.pathname == "/ver") {

    fs.readFile(__dirname + "/dados/inquilinos/" + parsedUrl.query.id + ".json", "utf8", (err, data) => {
      if(err) {
        console.log(err, 'erro')
        return
      }else{
        response.end(renderInquilino(data), "utf8")
      }
    })
  } else if (parsedUrl.pathname == "/criar"){
    const itensExistente = fs.readdirSync(__dirname + "/dados/inquilinos")
    const numeroDosItensExistentes = itensExistente.length
    const proximoNumeroExistente = numeroDosItensExistentes  + 1
    console.log(itensExistente, numeroDosItensExistentes, proximoNumeroExistente)

    const dados = {id: proximoNumeroExistente, nome: parsedUrl.query.nome, endereco: parsedUrl.query.endereco, valor: parsedUrl.query.valor}
    const filePath = __dirname + "/dados/inquilinos/" + proximoNumeroExistente + ".json"

    fs.writeFile(filePath, JSON.stringify(dados, null, '  '), (err) => {
      if (err) {
        console.log("Erro")
      } else {
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            console.log(err, 'erro')
            return
          } else {
            response.end(renderInquilino(data), 'utf8')
          }
        })
      }
    })
  } else {
    response.end("erro: pathname desconhecido")
  }

  
})

server.listen(9999)
