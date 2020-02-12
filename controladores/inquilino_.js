const fs = require('fs')

exports.registrarInquilino = function (dados) {
  const itensExistente = fs.readdirSync(__dirname + "/../dados/inquilinos");
  const numeroDosItensExistentes = itensExistente.length;
  const proximoNumeroExistente = numeroDosItensExistentes + 1;

  dados.id = proximoNumeroExistente
    
  //versão síncrona
  const pathFileInquilinosCreateId = __dirname + "/../dados/inquilinos/" + proximoNumeroExistente + ".json";
  const dataString = JSON.stringify(dados, null, "  ")
  
  fs.writeFileSync(pathFileInquilinosCreateId, dataString, "utf8")

  return dados
}

exports.deletarInquilino = function (id) {

}

exports.lerInquilino = function (id) {

}

exports.atualizarInquilino = function (id, dados) {

}

exports.listarInquilino = function (parametros) {
  
}
