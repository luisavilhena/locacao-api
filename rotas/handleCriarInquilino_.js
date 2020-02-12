const fs = require("fs");
const renderFunctions = require("../ui/functions/renderFunctions")

const inquilinoCtrl = require('../controladores/inquilino')

function handleCriarInquilino (parsedUrl, response) {

  // console.log('handleCriarInquilino', parsedUrl)

  // SE TIVER UM nome NA URL, CRIE UM JSON COM OS DADOS ENVIADOS, E PRINTE O RESULTADO NA TELA
  if (parsedUrl.query.nome) {


    const novoInquilino = inquilinoCtrl.registrarInquilino({
      nome: parsedUrl.query.nome,
      endereco: parsedUrl.query.endereco,
      valor: parsedUrl.query.valor,
      quantidade_de_pessoas: parsedUrl.query.quantidade_de_pessoas,
      quantidade_de_criancas: parsedUrl.query.quantidade_de_criancas,
      quantidade_de_comodos:parsedUrl.query.quantidade_de_comodos
    })

    console.log(novoInquilino)
    
    response.end(renderFunctions.renderPartialDataInquilino(novoInquilino), "utf8")
    

    //versão assíncrona
    // fs.writeFile(filePath, JSON.stringify(dados, null, "  "), err => {
    //   if (err) {
    //     console.log("Erro");
    //     return
    //   } else {
    //     console.log('sim')
    //     fs.readFile(filePath, "utf8", (err, data) => {
    //       if (err) {
    //         console.log(err, "erro");
    //         return;
    //       } else {
    //         response.end(renderFunctions.renderPartialDataInquilino(data), "utf8");
    //       }
    //     });
    //   }
    // });
  } else {
    response.end(renderFunctions.renderCriar());
  }
}

module.exports = handleCriarInquilino