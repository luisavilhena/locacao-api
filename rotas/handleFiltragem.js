const fs = require("fs");
const renderFunctions = require("../ui/functions/renderFunctions")
const inquilinoCtrl = require("../controladores/inquilino")

function handleFiltragem(parsedUrl, response) {

  // const nomeTodosOsArquivos = fs.readdirSync(__dirname + "/../dados/inquilinos")

  const dadosFiltrados = inquilinoCtrl.listarInquilinos({
    valorMinimo: parsedUrl.query.valorMinimo,
    valorMaximo: parsedUrl.query.valorMaximo,
    quantidadeDePessoasMinimo: parsedUrl.query.quantidadeDePessoasMinimo,
    quantidadeDePessoasMaximo: parsedUrl.query.quantidadeDePessoasMaximo,
    quantidadeDeCriancasMinimo: parsedUrl.query.quantidadeDeCriancasMinimo,
    quantidadeDeCriancasMaximo: parsedUrl.query.quantidadeDeCriancasMaximo,
    quantidadeDeComodosMinimo: parsedUrl.query.quantidadeDeComodosMinimo,
    quantidadeDeComodosMaximo: parsedUrl.query.quantidadeDeComodosMaximo,
  })

  let somaDeHtml = ''
  dadosFiltrados.forEach(function(objeto) {
    let criarHtml = renderFunctions.renderListagemDePerfil(objeto)
    somaDeHtml = somaDeHtml + criarHtml
  })
  response.end(somaDeHtml)
}

module.exports = handleFiltragem
