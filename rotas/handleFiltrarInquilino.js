const renderFunctions = require("../ui/functions/renderFunctions")

function handleFiltrarInquilino(response) {
  response.end(renderFunctions.renderFiltrar())
}

module.exports = handleFiltrarInquilino