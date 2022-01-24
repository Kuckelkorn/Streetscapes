import createCard from './helpers/createCard.js'
import createData from './helpers/createData.js'
import createMap from './helpers/createMap.js'

function getBuurten(){
  // const buurten = fetch(`https://api.data.amsterdam.nl/v1/gebieden/buurten/?_format=geojson&ligtInWijk.identificatie=${wijk}`)
  const buurten = fetch(`https://api.data.amsterdam.nl/v1/gebieden/buurten/?_format=geojson`)
  buurten
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
        createCard(obj.properties, () => createData(obj.properties.code))
      })
    })
}

export default getBuurten