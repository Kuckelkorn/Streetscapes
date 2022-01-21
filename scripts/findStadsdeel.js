import createCard from './helpers/createCard.js'
import splitString from './helpers/splitID.js'
import getWijken from './findWijk.js'
import getData from './helpers/getData.js'

function getStadsdelen(){
  const stadsdelen = fetch(`https://api.data.amsterdam.nl/v1/gebieden/stadsdelen/?_format=geojson`)
  // createMap(stadsdelen)
  stadsdelen
    .then(response => response.json())
    .then(data => {
      data = data.features
      return data
    })
    .then(data => {
      const div = document.querySelectorAll("div")
      for ( let i = 0; i < div.length; i++){
        div[i].remove()
      }
      data.map((obj) => {
        const id = splitString(obj.properties.id)
        createCard(obj.properties , () => getWijken(id), () => getData(obj.properties.code))
      })
    })
}

export default getStadsdelen