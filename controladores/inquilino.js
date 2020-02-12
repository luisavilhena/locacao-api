const fs = require('fs')
const path = require('path')

exports.registrarInquilino = function (dados) {

  const itensExistente = fs.readdirSync(__dirname + "/../dados/inquilinos");
  const numeroDosItensExistentes = itensExistente.length;
  const proximoNumeroExistente = numeroDosItensExistentes + 1;


  dados.id = proximoNumeroExistente

  const pathFileInquilinosCreateId = __dirname + "/../dados/inquilinos/" + proximoNumeroExistente + ".json";
  const dataString = JSON.stringify(dados, null, "  ")
  
  fs.writeFileSync(pathFileInquilinosCreateId, dataString, "utf8")
  return dados
}

exports.deletarInquilino = function (id) {
  // let filePath = __dirname + "/../dados/inquilinos/" + id + '.json'
  // try {
  //   fs.unlinkSync(filePath)
  // } catch (err){
  //   response.end(renderFunctions.renderCriar());
  // }
}

exports.lerInquilino = function (id) {
  const pathFileInquilinos = path.join(__dirname,  "../dados/inquilinos", id + ".json")
  const readFileInquilinos = fs.readFileSync(pathFileInquilinos, "utf8")
  console.log(readFileInquilinos)
  return readFileInquilinos
}

exports.atualizarInquilino = function (id, dados) {
  const pathFileInquilinos = path.join(__dirname, "../dados/inquilinos/", id + ".json")
  const dataString = JSON.stringify(dados, null, "  ")
  fs.writeFileSync(pathFileInquilinos, dataString,"utf8")
  const inquilinoDataText = fs.readFileSync(pathFileInquilinos, "utf8")

  return JSON.parse(inquilinoDataText) 
}

exports.listarInquilinos = function (parametros) {
  const nomeTodosOsArquivos = fs.readdirSync(__dirname + "/../dados/inquilinos")

  const valorMinimo = parametros.valorMinimo ? parseInt(parametros.valorMinimo) : null
  const valorMaximo = parametros.valorMaximo ? parseInt(parametros.valorMaximo) : null
  const quantidadeDePessoasMinimo = parametros.quantidadeDePessoasMinimo ? parseInt(parametros.quantidadeDePessoasMinimo) : null
  const quantidadeDePessoasMaximo = parametros.quantidadeDePessoasMaximo ? parseInt(parametros.quantidadeDePessoasMaximo) : null
  const quantidadeDeCriancasMinimo = parametros.quantidadeDeCriancasMinimo ? parseInt(parametros.quantidadeDeCriancasMinimo) : null
  const quantidadeDeCriancasMaximo = parametros.quantidadeDeCriancasMaximo ? parseInt(parametros.quantidadeDeCriancasMaximo) : null
  const quantidadeDeComodosMinimo = parametros.quantidadeDeComodosMinimo ? parseInt(parametros.quantidadeDeComodosMinimo) : null
  const quantidadeDeComodosMaximo = parametros.quantidadeDeComodosMaximo ? parseInt(parametros.quantidadeDeComodosMaximo) : null

  const todosOsDados = nomeTodosOsArquivos.map(function(nomeDoArquivo){
    let caminhoDoArquivo = __dirname + "/../dados/inquilinos/" + nomeDoArquivo;
    let ler = fs.readFileSync(caminhoDoArquivo, 'utf8')
    return JSON.parse(ler)
  })

  const dadosFiltrados = todosOsDados.filter(function(dado){
    return (
      (dado.valor >= valorMinimo || valorMinimo === null) &&
      (dado.valor <= valorMaximo || valorMaximo === null) &&
      (dado.quantidade_de_pessoas >= quantidadeDePessoasMinimo || quantidadeDePessoasMinimo === null) &&
      (dado.quantidade_de_pessoas <= quantidadeDePessoasMaximo || quantidadeDePessoasMaximo === null) &&
      (dado.quantidade_de_criancas >= quantidadeDeCriancasMinimo || quantidadeDeCriancasMinimo === null) &&
      (dado.quantidade_de_criancas <= quantidadeDeCriancasMaximo || quantidadeDeCriancasMaximo === null) &&
      (dado.quantidade_de_comodos >= quantidadeDePessoasMinimo || quantidadeDePessoasMinimo === null) &&
      (dado.quantidade_de_comodos <= quantidadeDeComodosMaximo || quantidadeDeComodosMaximo === null)
    )
  })
  return dadosFiltrados
}

