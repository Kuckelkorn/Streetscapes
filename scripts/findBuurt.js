import createMap from './helpers/createMap.js'
import {getDichtheid, getHuishoudens} from './helpers/getData.js'

async function getBuurten(){
  const buurten = await fetch(`https://api.data.amsterdam.nl/v1/gebieden/buurten/?_format=geojson`)
  const geoBuurten = await buurten.json()

  const dichtheden = await getDichtheid()
  const huishoudens = await getHuishoudens()


  geoBuurten.features.map(async (obj) => {
    const code = obj.properties.code

    const dichtheid = await dichtheden.find(el => el.gebiedcode15 === code)

    if (dichtheid !== undefined){
      const indicatorDichtheid = await dichtheid.indicatorDefinitieId
      const waardeDichtheid = await dichtheid.waarde
      Object.assign(obj.properties, {
        [await indicatorDichtheid]: await waardeDichtheid
      })
    }
  
    const huishouden = await huishoudens.find(el => el.gebiedcode15 === code)
    if (huishouden !== undefined){
      const indicatorHuishouden = await huishouden.indicatorDefinitieId
      const waardeHuishouden = await huishouden.waarde
      Object.assign(obj.properties, {
        [await indicatorHuishouden]: await waardeHuishouden
      })
    }
  })
  createMap(await geoBuurten)
}

export default getBuurten