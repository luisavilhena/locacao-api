const renderFunctions = require("../ui/functions/renderFunctions")
// const inquilinoCtrl = require("../controladores/inquilino")

function handleDeletar(parsedUrl, response) {
  let id = parsedUrl.query.id
  let filePath = __dirname + "/../dados/inquilinos/" + id + '.json'
  try {
    fs.unlinkSync(filePath)
  } catch (err){
    response.end(renderFunctions.renderCriar());
  }
  // inquilinoCtrl.deletarInquilino(id)
}

module.exports = handleDeletar