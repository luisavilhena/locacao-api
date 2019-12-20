const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer();
//criar link no ver e no criar que volte para a página do formulário
//h1 para resultado de nome e h2 para resultado de aluguel quando o json é mostrado na tela na url "ver"

// Aqui tem o controle de como o servidor vai retornar a pagina para o navegador, o que eu aconselho, é cirar um elemento html para cada propriedade do json

// Isso quer dizer que toda vez que o navegador fazer uma requisição em alguma pagina, era passar por essa função
server.on("request", (request, response) => {
  // Aqui você seta o "tipo" da pagina retornar (pode ser json, html, imagem etc)
  // No nosso caso é HTML
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  // response.setHeader("Content-Type", "application/json");

  if (request.url === "/favicon.ico") {
    response.end(null);
    return;
  }

  // Aqui a gente pega as variaveis da URL (tudo que vem depois do ?), exemplo: http://localhost:999/?nome=luisa
  //Ai o resultado seria parsedUrl.query.name = 'luisa'
  const parsedUrl = url.parse(request.url, true);

  // console.log(parsedUrl)

  if (parsedUrl.pathname == "/ver") {
    ///////////////////////////////////////////
    // SE A URL TIVER UM ID, CARREGUE O JSON E PRINTE NA TELA
    console.log(parsedUrl.query.id)
    if (parsedUrl.query.id) {
      fs.readFile(
        __dirname + "/dados/inquilinos/" + parsedUrl.query.id + ".json",
        "utf8",
        (err, data) => {
          if (err) {
            console.log(err, "erro");
            return;
          } else {
            // E aqui você vai montar o HTML a ser retornado de acordo com os dados do JSON carregado
            response.end(renderInquilino(data), "utf8");
          }
        }
      );
    } else {
      ///////////////////////////////////////////
      // SE A URL NAO TIVER ID, CARREGUE O ARQUIVO ver-inquilino.html E PRINTE NA TELA
      renderVer(function(html) {
        response.end(html, "utf8");
      });
    }
  } else if (parsedUrl.pathname == "/criar") {
    const itensExistente = fs.readdirSync(__dirname + "/dados/inquilinos");
    const numeroDosItensExistentes = itensExistente.length;
    const proximoNumeroExistente = numeroDosItensExistentes + 1;

    const dados = {
      id: proximoNumeroExistente,
      nome: parsedUrl.query.nome,
      endereco: parsedUrl.query.endereco,
      valor: parsedUrl.query.valor,
      quantidade_de_pessoas: parsedUrl.query.quantidade_de_pessoas,
      quantidade_de_criancas: parsedUrl.query.quantidade_de_criancas,
      quantidade_de_comodos:parsedUrl.query.quantidade_de_comodos
    };

    //////////////////////////////
    // SE TIVER UM nome NA URL, CRIE UM JSON COM OS DADOS ENVIADOS, E PRINTE O RESULTADO NA TELA
    if (parsedUrl.query.nome) {
      const filePath =
        __dirname + "/dados/inquilinos/" + proximoNumeroExistente + ".json";

      fs.writeFile(filePath, JSON.stringify(dados, null, "  "), err => {
        if (err) {
          console.log("Erro");
          return
        } else {
          console.log('sim')
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
              console.log(err, "erro");
              return;
            } else {
              response.end(renderInquilino(data), "utf8");
            }
          });
        }
      });
    } 
    //////////////////////////////////////////
    // CASO NAO TENHA NENHUM nome NA URL, CARREGUE O ARQUIVO novo-inquilino.html E PRINTE NA TELA
    else {
      renderCriar(function(html) {
        response.end(html, "utf8");
      });
    }
  } else if (parsedUrl.path == "/lista?valorMinimo=" + parsedUrl.query.valorMinimo + "&valorMaximo=" + parsedUrl.query.valorMaximo) {
    const nomeArquivos = fs.readdirSync(__dirname + "/dados/inquilinos");
    // const objetosNomeArquivos = JSON.stringify(nomeArquivos));
    // function cadaArquivo (item) {
    //   response.end(item)
    // }
    // valorMinimo = parsedUrl.query.valor

    let guardaItem = '';
    nomeArquivos.forEach(function (item){

      let filePath = __dirname + "/dados/inquilinos/" + item;
      let read = fs.readFileSync(filePath, 'utf8')
      let objeto = JSON.parse(read)
      let creat = `
      <code><ul><li> ${objeto.nome} </li><li>${objeto.valor} </li></ul></code>
      `
      //Compara os valores para depois printar na tela
      if(parseInt(objeto.valor) >= parseInt(parsedUrl.query.valorMinimo) && parseInt(objeto.valor) <= parseInt(parsedUrl.query.valorMaximo)) {
        guardaItem = creat + guardaItem 
      } else {
        return
      }
    })
    response.end(guardaItem)
  } else if (parsedUrl.path == "/filtragem") {
    renderFiltrar(function(html) {
      response.end(html, "utf8");
    });
  } else if (parsedUrl.pathname == "/filtragem") {
    const nomeTodosOsArquivos = fs.readdirSync(__dirname + "/dados/inquilinos")

    const valorMinimo = parsedUrl.query.valorMinimo ? parseInt(parsedUrl.query.valorMinimo) : null
    const valorMaximo = parsedUrl.query.valorMaximo ? parseInt(parsedUrl.query.valorMaximo) : null
    const quantidadeDePessoasMinimo = parsedUrl.query.quantidadeDePessoasMinimo ? parseInt(parsedUrl.query.quantidadeDePessoasMinimo) : null
    const quantidadeDePessoasMaximo = parsedUrl.query.quantidadeDePessoasMaximo ? parseInt(parsedUrl.query.quantidadeDePessoasMaximo) : null
    const quantidadeDeCriancasMinimo = parsedUrl.query.quantidadeDeCriancasMinimo ? parseInt(parsedUrl.query.quantidadeDeCriancasMinimo) : null
    const quantidadeDeCriancasMaximo = parsedUrl.query.quantidadeDeCriancasMaximo ? parseInt(parsedUrl.query.quantidadeDeCriancasMaximo) : null
    const quantidadeDeComodosMinimo = parsedUrl.query.quantidadeDeComodosMinimo ? parseInt(parsedUrl.query.quantidadeDeComodosMinimo) : null
    const quantidadeDeComodosMaximo = parsedUrl.query.quantidadeDeComodosMaximo ? parseInt(parsedUrl.query.quantidadeDeComodosMaximo) : null
    let guardaConteudoDosArquivos = "";
    console.log('quantidade de cômodos', quantidadeDeComodosMinimo, quantidadeDeComodosMaximo)
    nomeTodosOsArquivos.forEach(function(item){
      let caminhoDoArquivo = __dirname + "/dados/inquilinos/" + item;
      let ler = fs.readFileSync(caminhoDoArquivo, 'utf8')
      let novoObjeto = JSON.parse(ler)
      let criar = `
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
          <li><h3>Nome: ${novoObjeto.nome}</h3></li>
          <li><h3>Valor: ${novoObjeto.valor}</h3></li>
          <li><h3>Quantidade de pessoas: ${novoObjeto.quantidade_de_pessoas}</h3></li>
          <li><h3>Quantidade de crianças: ${novoObjeto.quantidade_de_criancas}</h3></li>
          <li><h3>Quantidade de cômodos: ${novoObjeto.quantidade_de_comodos}</h3></li>
        </ul>
        <a href="/verPerfil?id=${novoObjeto.id}">Perfil Completo</a>
      </code>
      `

      // if (novoObjeto.quantidade_de_comodos) {

      //   console.log({
      //     'novoObjeto.quantidade_de_comodos': parseInt(novoObjeto.quantidade_de_comodos),
      //     quantidadeDeComodosMinimo,
      //     quantidadeDeComodosMaximo,
      //     typeMin: typeof quantidadeDeComodosMinimo,
      //     typeMax: typeof quantidadeDeComodosMaximo,
      //     condicaoMinima: (parseInt(novoObjeto.quantidade_de_comodos) >= quantidadeDeComodosMinimo),
      //     condicaoMaxima: (parseInt(novoObjeto.quantidade_de_comodos) <= quantidadeDeComodosMaximo)
      //   })
      // }
      // console.log('quantidade minima', parseInt(novoObjeto.quantidade_de_comodos))
      // console.log('quantidade maxima', parseInt(novoObjeto.quantidade_de_comodos))
    
      if((valorMinimo === null || parseInt(novoObjeto.valor) >= valorMinimo) &&
        (valorMaximo === null || parseInt(novoObjeto.valor) <= valorMaximo) && 
        (quantidadeDePessoasMinimo === null || parseInt(novoObjeto.quantidade_de_pessoas) >= quantidadeDePessoasMinimo) &&
        (quantidadeDePessoasMaximo === null || parseInt(novoObjeto.quantidade_de_pessoas) <= quantidadeDePessoasMaximo) &&
        (quantidadeDeCriancasMinimo === null || parseInt(novoObjeto.quantidade_de_criancas) >= quantidadeDeCriancasMinimo) &&
        (quantidadeDeCriancasMaximo === null || parseInt(novoObjeto.quantidade_de_criancas) <= quantidadeDeCriancasMaximo) &&
        (quantidadeDeComodosMinimo === null || parseInt(novoObjeto.quantidade_de_comodos) >= quantidadeDeComodosMinimo) &&
        (quantidadeDeComodosMaximo === null || parseInt(novoObjeto.quantidade_de_comodos) <= quantidadeDeComodosMaximo)
      ){
        guardaConteudoDosArquivos = criar + guardaConteudoDosArquivos 
      } else {
        return
      }
    })
    response.end(guardaConteudoDosArquivos)
  } else if (parsedUrl.path == "/verPerfil?id=" + parsedUrl.query.id) {
    fs.readFile(__dirname + "/dados/inquilinos/" + parsedUrl.query.id + ".json", "utf8",(err, data) => {
      if (err) {
        console.log(err, "erro");
        return;
      } else {
        // E aqui você vai montar o HTML a ser retornado de acordo com os dados do JSON carregado
        response.end(renderPerfilCompleto(data), "utf8");
      }
    });
  } else if (parsedUrl.path == "/delete?id=" + parsedUrl.query.id) {
    let id = parsedUrl.query.id
    let filePath = __dirname + "/dados/inquilinos/" + id + '.json'


    /////////////////////////////
    /////ARRUMAR O TRY/CATCH/////
    /////////////////////////////
    try {
      if(fs.readFileSync(filePath)) {
        console.log('vai apagar')
        fs.unlinkSync(filePath)
      // response.end(fs.readFileSync('http://localhost:8080/criar-pagamento'))
        return
      } else {
        console.log('esse arquivo não existe')
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        fileExists = false
      } else {
        throw err
      }
    } finally {
    }
  }




  /////////////////////////
  ///Entidade pagamento////
  /////////////////////////
  
  else if(parsedUrl.pathname == "/criar-pagamento"){
    const dadosPagamento = {
      id: parsedUrl.query.id,
      nome: parsedUrl.query.nome,
      mes: parsedUrl.query.mes,
      valor: parsedUrl.query.valor
    }
    if (parsedUrl.query.id) {
      fs.writeFile(__dirname + "/dados/pagamentos/"+ parsedUrl.query.id + ".json",
      JSON.stringify(dadosPagamento, null, ' '),
      err => {
        if (err) {
          console.log(err, "erro")
        } else {
          console.log('oi')
          fs.readFile(__dirname + "/dados/pagamentos/" + parsedUrl.query.id + ".json",
          "utf8",
          (err, data) => {
            if (err) {
              console.log(err, "data")
            } else {
              response.end(renderFilePagamentos(data))
            }
          })
        }
      })
    } else {
      renderCriarPagamento(function(html){
        response.end(html, "utf8")
      })
    }
  }

  else {
    response.end("erro: pathname desconhecido");
  }
  // console.log(parsedUrl.pathname)
  // console.log(parsedUrl.path)
  // console.log("/filtragem?valorMinimo=" + parsedUrl.query.valorMinimo + "&valorMaximo=" + parsedUrl.query.valorMaximo)
  // console.log(parsedUrl.query.valorMaximo)
  // console.log("teste", "/verPerfil?id=" + parsedUrl.query.id)
});

//  Ao inves de você ficar concatenando o código com 'string' + variael + 'string', você pude usar assim:
function renderInquilino(dados) {
  // Usar aspas invertidas
  const objeto = JSON.parse(dados);
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
      <h2>Nome: ${objeto.nome}</h2>
      <h2>Endereço: ${objeto.endereco}</h2>
      <h2>Valor: ${objeto.valor}</h2> 
      <a href="/verPerfil?id=${objeto.id}">Perfil Completo</a> 
      <a href="/delete?id=${objeto.id}"> delete </a>
    </code>
  `;
}
function renderFilePagamentos(dados) {
  // Usar aspas invertidas
  const objeto = JSON.parse(dados);
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
            <li><h3>Id: </h3><h3>${objeto.id}</h3></li>
            <li><h3>Nome: </h3><h3>${objeto.nome}</h3></li>
            <li><h3>Mes: </h3><h3>${objeto.mes}</h3></li>
            <li><h3>Valor: </h3><h3>${objeto.valor}</h3></li>
          </ul>
          <a href="/cria-pagamento"> Voltar </a>
        </code>
      </body>
  `;
}

function renderPerfilCompleto(dados) {
  // Usar aspas invertidas
  const objeto = JSON.parse(dados);
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
          <li><h3>Nome: </h3><h3>${objeto.nome}</h3></li>
          <li><h3>Endereço: </h3><h3>${objeto.endereco}</h3></li>
          <li><h3>Valor: </h3><h3>${objeto.valor}</h3></li>
          <li><h3>Quantidade de pessoas: </h3><h3>${objeto.quantidade_de_pessoas}</h3></li>
          <li><h3>Quantidade de crianças: </h3><h3>${objeto.quantidade_de_criancas}</h3></li>
          <li><h3>Quantidade de cômodos: </h3><h3>${objeto.quantidade_de_comodos}</h3></li>
        </ul>
        <a href="/criar"> Voltar </a>
      </code>
  `;
}

function renderVer(callback) {
  fs.readFile(__dirname + "/ui/inquilinos/ver-inquilino.html", "utf8", (err, data) => {
    if (err) {
      console.log(err, "erro");
      return;
    } else {
      // E aqui  monta o HTML a ser retornado de acordo com os dados do JSON carregado
      callback(data);
    }
  });
}

function renderCriar(callback) {
  fs.readFile(__dirname + "/ui/inquilinos/novo-inquilino.html", "utf8", (err, data) => {
    if (err) {
      console.log(err, "erro");
      return;
    } else {
      // E aqui  monta o HTML a ser retornado de acordo com os dados do JSON carregado
      callback(data);
    }
  });
}

function renderFiltrar(callback) {
  fs.readFile(__dirname + "/ui/inquilinos/filtragem-inquilino.html", "utf8", (err, data) => {
    if(err) {
      console.log(err, "erro");
      return;
    } else {
      callback(data)
    }
  })
}

function renderCriarPagamento(callback) {
  fs.readFile(__dirname + "/ui/pagamentos/cadastro-pagamento.html", "utf-8", (err, data) => {
    if(err) {
      console.log(err, "erro")
    } else {
      callback(data)
    }
  })
}

server.listen(8080);

