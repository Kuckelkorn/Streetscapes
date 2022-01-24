import createCard from './helpers/createCard.js'
import splitString from './helpers/splitID.js'
import getBuurten from "./findBuurt.js"
import createMap from './helpers/createMap.js'
import createData from './helpers/createData.js'

async function getWijken(){
  // const wijken = fetch(`https://api.data.amsterdam.nl/v1/gebieden/wijken/?_format=geojson&ligtInStadsdeel.identificatie=${stadsdeel}`)
  const wijken = await fetch(`https://api.data.amsterdam.nl/v1/gebieden/wijken/?_format=geojson`)
  const geoWijken = await wijken.json()
  geoWijken.features.map(async function(obj){
    createData(obj.properties.code)
  })
  createMap(await geoWijken)
}

export default getWijken