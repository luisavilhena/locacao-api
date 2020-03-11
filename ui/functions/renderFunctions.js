const fs = require("fs");

function renderEditar(dados) {
  // const objeto = JSON.parse(dados)
  return `
  <style>
    form {
      display: flex;
      flex-direction: column;.
    }
  </style>
  <h1> Id: ${dados.id} </h1>
  <form action="http://localhost:8080/salvar-edicao" method="get">
    <input type="hidden" name="id" value="${dados.id}"/>
    <label>Nome <input type="text" name="nome" value="${dados.nome}"></label>
    <label>Endereço <input type="text" name="endereco" value="${dados.endereco}"></label>
    <label>Valor <input type="text" name="valor" value="${dados.valor}"></label>
    <label>Quantidade de pessoas <input type="text" name="quantidade_de_pessoas" value="${dados.quantidade_de_pessoas}"></label>
    <label>Quantidade de crianças <input type="text" name="quantidade_de_criancas" value="${dados.quantidade_de_criancas}"></label>
    <label>Quantidade de cômodos <input type="text" name="quantidade_de_comodos" value="${dados.quantidade_de_comodos}"></label>
    <button type="submit"> Salvar </button>
  </form>
  `;
}
function renderPartialDataInquilino(dados) {
  // Usar aspas invertidas
  // const objeto = JSON.parse(dados);
  return `
    <style type="text/css">
      a {
        display: inline-block; 
        margin-top: 30px; 
        padding: 15px; 
        background-color: #A6959A;
        color: black;
      }
      a:hover {
        background-color: #D9EEF4;
      }
      h1 {
        margin-bottom: 30px;
      }
    </style>
    <code>
      <h1>Perfil:</h1>
      <h2>ID: ${dados.id}</h2>
      <h2>Nome: ${dados.nome}</h2>
      <h2>Endereço: ${dados.endereco}</h2>
      <h2>Valor: ${dados.valor}</h2> 
      <a href="/ver-inquilino-completo?id=${dados.id}">Perfil Completo</a> 
      <a href="/deletar?id=${dados.id}">deletar</a>
      <a href="/editar?id=${dados.id}">editar</a>
    </code>
  `;
}
function renderFilePagamento(dados) {
  // Usar aspas invertidas
  // const objeto = JSON.parse(dados);
  return `
     <style type="text/css">
        body {
          background-color:#D9EEF4
        } 
        code { 
          white-space: pre-wrap;
        } 
        li {
          display: flex;
        }
      </style>
      <body>
        <code>
          <ul> 
            <li><h3>Id: </h3><h3>${dados.id}</h3></li>
            <li><h3>Nome: </h3><h3>${dados.nome}</h3></li>
            <li><h3>Mes: </h3><h3>${dados.mes}</h3></li>
            <li><h3>Valor: </h3><h3>${dados.valor}</h3></li>
          </ul>
          <a href="/criar-pagamento"> Voltar </a>
        </code>
      </body>
  `;
}
function renderPerfilCompleto(dados) {
  // Usar aspas invertidas
  // const objeto = JSON.parse(dados);
  return `
    <style type="text/css">
      a {
        display: inline-block; 
        margin-top: 30px; 
        padding: 15px; 
        background-color: #A6959A;
        color: black;
      }
      a:hover {
        background-color: #D9EEF4;
      }
      h1 {
        margin-bottom: 30px;
      }
      li {
        display: flex;
      } 
    </style>
      <code>
        <h1>Perfil Completo:</h1>
        <ul> 
          <li><h3>Nome: </h3><h3>${dados.nome}</h3></li>
          <li><h3>Endereço: </h3><h3>${dados.endereco}</h3></li>
          <li><h3>Valor: </h3><h3>${dados.valor}</h3></li>
          <li><h3>Quantidade de pessoas: </h3><h3>${dados.quantidade_de_pessoas}</h3></li>
          <li><h3>Quantidade de crianças: </h3><h3>${dados.quantidade_de_criancas}</h3></li>
          <li><h3>Quantidade de cômodos: </h3><h3>${dados.quantidade_de_comodos}</h3></li>
        </ul>
        <a href="/criar-inquilino">Voltar</a>
      </code>
  `;
}

function renderListagemDePerfil(dados) {
  return `
  <style>
    code {
      display: block;
      margin-bottom: 50px;
    }
    a {
      display: inline-block;
      margin-top: 10px; 
      padding: 5px; 
      background-color: #A6959A;
      color: black;
    }
    a:hover {
      background-color: #D9EEF4;
    }
  </style>
  <code>
    <ul>
      <h2>Perfil: </h2>
      <li><h3>Nome: ${dados.nome}</h3></li>
      <li><h3>Valor: ${dados.valor}</h3></li>
      <li><h3>Quantidade de pessoas: ${dados.quantidade_de_pessoas}</h3></li>
      <li><h3>Quantidade de crianças: ${dados.quantidade_de_criancas}</h3></li>
      <li><h3>Quantidade de cômodos: ${dados.quantidade_de_comodos}</h3></li>
    </ul>
    <a href="/ver-inquilino-completo?id=${dados.id}">Perfil Completo</a>
  </code>
  `
}

function renderVer() {
  return fs.readFileSync(__dirname + "/../inquilinos/ver-inquilino.html", "utf8")

  // fs.readFile(__dirname + "/../inquilinos/ver-inquilino.html", "utf8", (err, data) => {
  //   if (err) {
  //     console.log(err, "erro");
  //     return;
  //   } else {
  //     // E aqui  monta o HTML a ser retornado de acordo com os dados do JSON carregado
      // return callback
  //   }
  // });
}
function renderCriar() {
  return fs.readFileSync(__dirname + "/../inquilinos/novo-inquilino.html", "utf8")
  // fs.readFile(__dirname + "/../inquilinos/novo-inquilino.html", "utf8", (err, data) => {
  //   if (err) {
  //     console.log(err, "erro");
  //     return;
  //   } else {
  //     // E aqui  monta o HTML a ser retornado de acordo com os dados do JSON carregado
  //     callback(data);
  //   }
  // });
}
function renderFiltrar() {
  return fs.readFileSync(__dirname + "/../inquilinos/filtragem-inquilino.html", "utf8")
  // fs.readFile(__dirname + "/../inquilinos/filtragem-inquilino.html", "utf8", (err, data) => {
  //   if(err) {
  //     console.log(err, "erro");
  //     return;
  //   } else {
  //     callback(data)
  //   }
  // })
}
function renderCriarPagamento(arrayDeInquilinos) {

  let optionsHtml = ''

  arrayDeInquilinos.forEach(function(item){
    optionsHtml= optionsHtml + '<option value=' + item.id + '>' + item.id + ' - ' + item.nome + '</option>'
  })
  
  return `<!DOCTYPE html>
  <html>
  <head>
    <title>Cadastro pagamento</title>
  </head>
  <style>
    body {
      background-color: #BFAAB0;
    }
    .flex {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }
    h3 {
      width: 190px;
    }
    input {
      margin-bottom: 20px;
      margin-right: 20px;
    }
  </style>
  <body>
    <form action="http://localhost:8080/criar-pagamento" method="get">
      <h3>Cadastro de pagamentos</h3>
      <div class="flex">
        <select name="inquilinoId">
          ${optionsHtml}
        </select>
        <input type="text" name="nome" placeholder="nome">
        <input type="text" name="mes" placeholder="mes">
        <input type="text" name="valor" placeholder="valor">
        <button type="submit">Enviar</button>
      </div>
    </form>
  </body>
  </html>`

  // fs.readFile(__dirname + "/../pagamentos/cadastro-pagamento.html", "utf-8", (err, data) => {
  //   if(err) {
  //     console.log(err, "erro")
  //   } else {
  //     callback(data)
  //   }
  // })
}

exports.renderEditar = renderEditar
exports.renderPartialDataInquilino = renderPartialDataInquilino
exports.renderFilePagamento = renderFilePagamento
exports.renderPerfilCompleto = renderPerfilCompleto
exports.renderVer = renderVer
exports.renderCriar = renderCriar
exports.renderFiltrar = renderFiltrar
exports.renderCriarPagamento = renderCriarPagamento
exports.renderListagemDePerfil = renderListagemDePerfil

