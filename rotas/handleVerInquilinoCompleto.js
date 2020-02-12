const renderFunctions = require("../ui/functions/renderFunctions")
const fs = require("fs");

function handleVerInquilinoCompleto(parsedUrl, response) {
  const readFileInquilinos= fs.readFileSync(__dirname + "/../dados/inquilinos/" + parsedUrl.query.id + ".json", "utf8")

  response.end(renderFunctions.renderPerfilCompleto(JSON.parse(readFileInquilinos)))
  // console.log(renderFunctions.renderPerfilCompleto(readFileInquilinos))
}

module.exports = handleVerInquilinoCompleto