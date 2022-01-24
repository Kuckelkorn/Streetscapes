import createCard from './helpers/createCard.js'
import splitString from './helpers/splitID.js'
import getWijken from './findWijk.js'
import createMap from './helpers/createMap.js'
import createData from './helpers/createData.js'

function getStadsdelen(){
  const stadsdelen = fetch(`https://api.data.amsterdam.nl/v1/gebieden/stadsdelen/?_format=geojson`)
  // createMap(stadsdelen)
  stadsdelen
    .then(response => response.json())
    .then(data => {
      createMap(data)
      data = data.features
      return data
    })
    .then(data => {
      const div = document.querySelectorAll("#map div")
      for ( let i = 0; i < div.length; i++){
        div[i].remove()
      }
      data.map((obj) => {
        const id = splitString(obj.properties.id)
        createCard(obj.properties , () => getWijken(id), () => createData(obj.properties.code))
      })
    })
}

export default getStadsdelen