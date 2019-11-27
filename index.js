const http = require('http')
const fs = require('fs')

const server = http.createServer()

server.on('request', (request, response) => {
  response.setHeader('Content-Type', 'text/plain; charset=utf-8') 
  console.log(__dirname + request.url)

  fs.readFile(__dirname + request.url, "utf8", (err, data) => {
    if(err) {
      console.log(err, 'erro')
      return
    }
    response.end(data, "utf8")
  })
})

server.listen(9999)

