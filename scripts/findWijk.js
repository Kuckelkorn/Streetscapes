import createCard from './helpers/createCard.js'
import getData from './helpers/getData.js'
import splitString from './helpers/splitID.js'
import getBuurten from "./findBuurt.js"

function getWijken(stadsdeel){
  const wijken = fetch(`https://api.data.amsterdam.nl/v1/gebieden/wijken/?_format=geojson&ligtInStadsdeel.identificatie=${stadsdeel}`)
  wijken
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
        createCard(obj.properties , () => getBuurten(id), () => getData(obj.properties.code))
      })
    })
}

export default getWijken