const fs = require("fs")
const renderFunctions = require("../ui/functions/renderFunctions")
const inquilinoCtrl = require("../controladores/inquilino")

function handleSalvarEdicao (parsedUrl, response) {
  // const pathFileInquilinos = __dirname + "/../dados/inquilinos/" + parsedUrl.query.id + ".json"
  const dadosPerfilInquilino = inquilinoCtrl.atualizarInquilino(parsedUrl.query.id, {
    id: parsedUrl.query.id,
    nome: parsedUrl.query.nome,
    endereco: parsedUrl.query.endereco,
    valor: parsedUrl.query.valor,
    quantidade_de_pessoas: parsedUrl.query.quantidade_de_pessoas,
    quantidade_de_criancas: parsedUrl.query.quantidade_de_criancas,
    quantidade_de_comodos:parsedUrl.query.quantidade_de_comodos
  });

  response.end(renderFunctions.renderPerfilCompleto(dadosPerfilInquilino), 'utf8')
}

module.exports = handleSalvarEdicao