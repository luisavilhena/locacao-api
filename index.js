const renderFunctions = require("./ui/functions/renderFunctions")
const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer();

const handleEditar = require('./rotas/handleEditar');
const handleSalvarEdicao = require('./rotas/handleSalvarEdicao');
const handleProcurarInquilino = require('./rotas/handleProcurarInquilino')
const handleVerInquilinoCompleto = require('./rotas/handleVerInquilinoCompleto');
const handleDeletar = require('./rotas/handleDeletar');
const handleCriarInquilino = require('./rotas/handleCriarInquilino');
const handleFiltragem = require('./rotas/handleFiltragem');
const handleFiltrarInquilino = require('./rotas/handleFiltrarInquilino');

server.on("request", (request, response) => {
  // Aqui seta o "tipo" da página retornar (pode ser json, html, imagem etc)
  // No caso é HTML
  response.setHeader("Content-Type", "text/html; charset=utf-8");

  if (request.url === "/favicon.ico") {
    response.end(null);
    return;
  }

  // Pega as variaveis da URL (tudo que vem depois do ?), exemplo: http://localhost:999/?nome=luisa
  // O resultado seria parsedUrl.query.name = 'luisa'
  const parsedUrl = url.parse(request.url, true);
  // const pathFileInquilinos = __dirname + "/dados/inquilinos/" + parsedUrl.query.id + ".json"
  // const readFileInquilinos = fs.readFileSync(pathFileInquilinos, "utf8")



  if (parsedUrl.pathname == "/procurar-inquilino") {
    handleProcurarInquilino(parsedUrl, response)

  } else if (parsedUrl.pathname == "/criar-inquilino") {
    handleCriarInquilino(parsedUrl, response)
    
  } else if (parsedUrl.pathname == "/filtrar-inquilino"){
    handleFiltrarInquilino(response)

  } else if (parsedUrl.pathname == "/filtragem") {
    handleFiltragem(parsedUrl, response)
    
  } else if (parsedUrl.pathname == "/ver-inquilino-completo") {
    handleVerInquilinoCompleto(parsedUrl, response)

  } else if (parsedUrl.pathname == "/deletar") {
    handleDeletar(parsedUrl, response)

  } else if (parsedUrl.pathname =="/editar"){
    handleEditar(parsedUrl, response)

  } else if (parsedUrl.pathname == "/salvar-edicao") {
    handleSalvarEdicao(parsedUrl, response)
  }
});

server.listen(8080);