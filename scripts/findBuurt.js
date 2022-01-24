import createCard from './helpers/createCard.js'
import createData from './helpers/createData.js'
import createMap from './helpers/createMap.js'

async function getBuurten(){
  // const buurten = fetch(`https://api.data.amsterdam.nl/v1/gebieden/buurten/?_format=geojson&ligtInWijk.identificatie=${wijk}`)
  const buurten = await fetch(`https://api.data.amsterdam.nl/v1/gebieden/buurten/?_format=geojson`)
  const geoBuurten = await buurten.json()
  createMap(await geoBuurten)
}

export default getBuurten