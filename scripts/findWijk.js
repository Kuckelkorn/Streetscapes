import createCard from './helpers/createCard.js'
import splitString from './helpers/splitID.js'
import getBuurten from "./findBuurt.js"
import createMap from './helpers/createMap.js'
import createData from './helpers/createData.js'

function getWijken(){
  // const wijken = fetch(`https://api.data.amsterdam.nl/v1/gebieden/wijken/?_format=geojson&ligtInStadsdeel.identificatie=${stadsdeel}`)
  const wijken = fetch(`https://api.data.amsterdam.nl/v1/gebieden/wijken/?_format=geojson`)
  wijken
    .then(response => response.json())
    .then(data => {
      createMap(data)
      data = data.features
      return data
    })
    .then(data => {
      const div = document.querySelectorAll("#map")
      for ( let i = 0; i < div.length; i++){
        div[i].remove()
      }
      data.map((obj) => {
        const id = splitString(obj.properties.id)
        createCard(obj.properties , () => getBuurten(id), () => createData(obj.properties.code))
      })
    })
}

export default getWijken