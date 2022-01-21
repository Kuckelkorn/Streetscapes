import createCard from './helpers/createCard.js'
import getData from './helpers/getData.js'

function getBuurten(wijk){
  const buurten = fetch(`https://api.data.amsterdam.nl/v1/gebieden/buurten/?_format=geojson&ligtInWijk.identificatie=${wijk}`)
  buurten
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
        createCard(obj.properties, () => getData(obj.properties.code))
      })
    })
}

export default getBuurten