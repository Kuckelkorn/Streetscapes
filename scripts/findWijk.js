import createMap from './helpers/createMap.js'
import getData from './helpers/getData.js'

async function getWijken(){
  // const wijken = fetch(`https://api.data.amsterdam.nl/v1/gebieden/wijken/?_format=geojson&ligtInStadsdeel.identificatie=${stadsdeel}`)
  const wijken = await fetch(`https://api.data.amsterdam.nl/v1/gebieden/wijken/?_format=geojson`)
  const geoWijken = await wijken.json()
  geoWijken.features.map(async function(obj){
    getData(obj.properties.code)
  })
  createMap(await geoWijken)
}

export default getWijken