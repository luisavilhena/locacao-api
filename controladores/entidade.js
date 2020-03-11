const renderFunctions = require("../ui/functions/renderFunctions")
const fs = require("fs");

function registrarEntidade (dados, response) {


  const itensExistente = fs.readdirSync(__dirname + "/../dados/pagamentos", "utf8");
  const numeroDosItensExistentes = itensExistente.length;
  const proximoNumeroExistente = numeroDosItensExistentes + 1;
  const pathFilePagamentosCreateId = __dirname + "/../dados/pagamentos/" + proximoNumeroExistente + ".json";
  
  dados.id = proximoNumeroExistente

  const dataString = JSON.stringify(dados, null, "  ")
  fs.writeFileSync(pathFilePagamentosCreateId, dataString, "utf8")

  // response.end(renderFunctions.renderFilePagamentos(dataString), "utf8")

  return dados
}
exports.registrarEntidade = registrarEntidade