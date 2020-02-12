const renderFunctions = require("../ui/functions/renderFunctions")
const fs = require("fs")
const inquilinoCtrl = require("../controladores/inquilino")

function handleEditar(parsedUrl, response) {
  const id = parsedUrl.query.id
  // console.log(id, "yyy")
  // const readFileInquilinos= fs.readFileSync(__dirname + "/../dados/inquilinos/" + parsedUrl.query.id + ".json", "utf8")
  // response.end(renderFunctions.renderEditar(readFileInquilinos))
  response.end(renderFunctions.renderEditar(JSON.parse(inquilinoCtrl.lerInquilino(id))), "utf8")

}

module.exports = handleEditar