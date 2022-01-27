import createMap from './helpers/createMap.js'
import {getDichtheid, getHuishoudens} from './helpers/getData.js'

async function getStadsdelen(){
  const stadsdelen = await fetch(`https://api.data.amsterdam.nl/v1/gebieden/wijken/?_format=geojson`)
  const geoStadsdelen = await stadsdelen.json()

  const dichtheden = await getDichtheid()
  const huishoudens = await getHuishoudens()

  await geoStadsdelen.features.map(async function(obj){
    const code = obj.properties.code

    const dichtheid = await dichtheden.find(el => el.gebiedcode15 === code)
    const indicatorDichtheid = await dichtheid.indicatorDefinitieId
    const waardeDichtheid = await dichtheid.waarde

    const huishouden = await huishoudens.find(el => el.gebiedcode15 === code)
    const indicatorHuishouden = await huishouden.indicatorDefinitieId
    const waardeHuishouden = await huishouden.waarde
    
    Object.assign(obj.properties, {
      [await indicatorDichtheid]: await waardeDichtheid, 
      [await indicatorHuishouden]: await waardeHuishouden})
  })

  createMap(await geoStadsdelen)
}

export default getStadsdelen