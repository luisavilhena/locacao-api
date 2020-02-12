const fs = require("fs")
const renderFunctions = require("../ui/functions/renderFunctions")
const inquilinoCtrl = require("../controladores/inquilino")

function handleProcurarInquilino(parsedUrl, response) {
  if (parsedUrl.query.id) {
    const id = parsedUrl.query.id
    console.log(id)
    //versão síncrona
    // const pathFileInquilinos = __dirname + "/../dados/inquilinos/" + parsedUrl.query.id + ".json"
    // const readFileInquilinos = fs.readFileSync(pathFileInquilinos, "utf8")
    // console.log(inquilinoCtrl.lerInquilino(id))
    response.end(renderFunctions.renderPartialDataInquilino(JSON.parse(inquilinoCtrl.lerInquilino(id))), "utf8");
    
    //versão assíncrona
    // fs.readFile(
    //   __dirname + "/dados/inquilinos/" + parsedUrl.query.id + ".json",
    //   "utf8",
    //   (err, data) => {
    //     if (err) {
    //       console.log(err, "erro");
    //       return;
    //     } else {
    //       response.end(renderFunctions.renderPartialDataInquilino(data), "utf8");
    //     }
    //   }
    // );
  } else {
    // SE A URL NAO TIVER ID, CARREGUE O ARQUIVO ver-inquilino.html E PRINTE NA TELA
    // const html = fs.readFileSync("./ui/inquilinos/ver-inquilino.html", "utf8")
    response.end(renderFunctions.renderVer())

    // renderFunctions.renderVer(function(html) {
    //   response.end(html);
    // });
  }
}

module.exports = handleProcurarInquilino