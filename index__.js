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
        } else {
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
  } else if(parsedUrl.pathname == "/filtragem") {
    const nomeTodosOsArquivos = fs.readdirSync(__dirname + "/dados/inquilinos")

    const valorMinimo = parsedUrl.query.valorMinimo ? parseInt(parsedUrl.query.valorMinimo) : null
    const valorMaximo = parsedUrl.query.valorMaximo ? parseInt(parsedUrl.query.valorMaximo) : null


    console.log({
      valorMinimo,
      valorMaximo,
    })

    let guardaConteudoDosArquivos = "";
    nomeTodosOsArquivos.forEach(function(item){
      let caminhoDoArquivo = __dirname + "/dados/inquilinos/" + item;
      let ler = fs.readFileSync(caminhoDoArquivo, 'utf8')
      let novoObjeto = JSON.parse(ler)
      let criar = `
      <code><ul><li> ${novoObjeto.nome} </li><li>${novoObjeto.valor} </li></ul></code>
      `

      if((valorMinimo === null || parseInt(novoObjeto.valor) >= valorMinimo) &&
         (valorMaximo === null || parseInt(novoObjeto.valor) <= valorMaximo)) {
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
      }
    );
  }
  else {
    response.end("erro: pathname desconhecido");
  }
  console.log(parsedUrl.pathname)
  console.log(parsedUrl.path)
  console.log("/filtragem?valorMinimo=" + parsedUrl.query.valorMinimo + "&valorMaximo=" + parsedUrl.query.valorMaximo)
  console.log(parsedUrl.query.valorMaximo)
  console.log("teste", "/verPerfil?id=" + parsedUrl.query.id)
});

//  Ao inves de você ficar concatenando o código com 'string' + variael + 'string', você pude usar assim:
function renderInquilino(dados) {
  // Usar aspas invertidas
  const objeto = JSON.parse(dados);
  return `
    <style type="text/css"> code{ white-space: pre-wrap; background-color: red; </style><code> <h1>${objeto.nome}</h1><h2>${objeto.endereco}</h2><h2>${objeto.valor}</h2> <a href="/verPerfil?id=${objeto.id}"> link </a> </code>
  `;
}

function renderPerfilCompleto(dados) {
  // Usar aspas invertidas
  const objeto = JSON.parse(dados);
  return `
    <style type="text/css"> code{ white-space: pre-wrap; li {display: flex;}}</style>
      <code>
      <ul> 
        <li><h1>Nome<h1><h1>${objeto.nome}</h1></li>
        <li><h2>Endereço<h2><h2>${objeto.endereco}</h2></li>
        <li><h2>Valor<h2><h2>${objeto.valor}</h2></li>
        <li><h2>Quantidade de pessoas<h2><h2>${objeto.quantidade_de_pessoas}</h2></li>
        <li><h2>Quantidade de crianças<h2><h2>${objeto.quantidade_de_criancas}</h2></li>
        <li><h2>Quantidade de cômodos<h2><h2>${objeto.quantidade_de_comodos}</h2></li>
      </ul>
      <a href="/criar"> Voltar </a>
      </code>
  `;
}

function renderVer(callback) {
  fs.readFile(__dirname + "/ui/ver-inquilino.html", "utf8", (err, data) => {
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
  fs.readFile(__dirname + "/ui/novo-inquilino.html", "utf8", (err, data) => {
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
  fs.readFile(__dirname + "/ui/filtragem-inquilino.html", "utf8", (err, data) => {
    if(err) {
      console.log(err, "erro");
      return;
    } else {
      callback(data)
    }
  })
}
server.listen(8080);

