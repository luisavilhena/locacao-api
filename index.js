const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer();
//criar link no ver e no criar que volte para a página do formulário
//h1 para resultado de nome e h2 para resultado de aluguel quando o json é mostrado na tela na url "ver"

// Aqui você tem o controle de como o servidor vai retornar a pagina para o navegador, o que eu aconselho, é cirar um elemento html para cada propriedade do json

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
  } 
  // ///////////////////////////////
  // SE A URL FOR /CRIAR
  else if (parsedUrl.pathname == "/criar") {
    const itensExistente = fs.readdirSync(__dirname + "/dados/inquilinos");
    const numeroDosItensExistentes = itensExistente.length;
    const proximoNumeroExistente = numeroDosItensExistentes + 1;

    const dados = {
      id: proximoNumeroExistente,
      nome: parsedUrl.query.nome,
      endereco: parsedUrl.query.endereco,
      valor: parsedUrl.query.valor
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
      if(parseInt(objeto.valor) >= parseInt(parsedUrl.query.valorMinimo) && parseInt(objeto.valor) <= parseInt(parsedUrl.query.valorMaximo)) {
        guardaItem = creat + guardaItem 
      } else {
        return
      }
    })
    response.end(guardaItem)

  } else {
    response.end("erro: pathname desconhecido");
  }
  console.log(parsedUrl.path)
  console.log("/lista?valorMinimo=" + parsedUrl.query.valorMinimo + "&valorMaximo=" + parsedUrl.query.valorMaximo)
  console.log(parsedUrl.query.valorMaximo)
});

// Outra coisa, ao inves de você ficar concatenando o código com 'string' + variael + 'string', você pude usar assim:
function renderInquilino(dados) {
  // Use aspas invertidas (ali debaixo do ESC)
  const objeto = JSON.parse(dados);
  return `
    <style type="text/css"> code{ white-space: pre-wrap; background-color: red; </style><code> <h1>${objeto.nome}</h1><h2>${objeto.endereco}</h2><h2>${objeto.valor}</h2> <a href="/ver"> link </a> </code>
  `;
}

function renderVer(callback) {
  fs.readFile(__dirname + "/ui/ver-inquilino.html", "utf8", (err, data) => {
    if (err) {
      console.log(err, "erro");
      return;
    } else {
      // E aqui você vai montar o HTML a ser retornado de acordo com os dados do JSON carregado
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
      // E aqui você vai montar o HTML a ser retornado de acordo com os dados do JSON carregado
      callback(data);
    }
  });
}

server.listen(8080);

