import createBar from './createBar.js'
import createPie from './createPie.js'
import createCard from './createCard.js'
import getDataArea from './getDataArea.js'

async function createCharts(code, naam){

  const data = await getDataArea(code)

  createCard(naam, data)
  createPie('#woonoppervlakte', data.oppervlakte)
  createBar('#leeftijd_bevolking', data.age)
  createPie('#eigendomsverhouding', data.housing)

}

export default createCharts