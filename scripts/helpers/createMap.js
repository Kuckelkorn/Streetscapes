import getBuurten from '../findBuurt.js';
import getWijken from '../findWijk.js';
import createCharts from './createCharts.js';



async function createMap(data){
  const newData = await data
  // Inladen van de openstreetmap kaart + centreren boven amsterdam
  // Selecteren van de div
  const map = L.map("kaart").setView([52.3546,4.9039], 11);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 15,
      minZoom: 11,
      id: 'voegdoe/ckyoeih10eoom15qqn81cut07',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoidm9lZ2RvZSIsImEiOiJja3lrOHNkOWgyYzg5Mm5xaGUyZzNjaTBrIn0.ks4WYqbTFNJOrr8TQj8shw'
  }).addTo(map);

  // geoJSON toevoegen aan de kaart 
  L.geoJSON(await newData).addTo(map)


  const btn = document.querySelector('#toggle')
  btn.addEventListener('click', (e) =>{
    e.preventDefault()
    if (btn.innerHTML === 'Buurten'){
      if(map != undefined){
        map.remove()
        getBuurten();
        btn.innerHTML = "Wijken"
      }
    } else {
      if (map != undefined){
        map.remove()
        getWijken()
        btn.innerHTML = "Buurten"
      }
    }
  })
  /*=========================================

  STYLING 

  =========================================*/

  // Variabele die gebruikt gaat worden voor de styling 
  let geojson;

  // function findLargestVal(){
  //   const arr = [];
  //   data.features.map((obj) =>{
  //     console.log(obj.properties)
  //     arr.push(obj.properties.WDICHT)
  //   })

  //   arr = arr.filter(Number)
  //   console.log(arr)
  //   const number = Math.max.apply(null, arr)
  //   console.log(number)
  // }

  // findLargestVal();

  

  // Schaal voor de kleur adhv data
  function getColor(d) {
    return d > 15000 ? '#004f4a' : //'#800026' :
          d > 10000 ? '#008f83' : //'#BD0026' :
          d >  7500 ? '#00d1c0' : //'#E31A1C' :
          d > 5000 ? '#14ffeb' : //'#FC4E2A' :
          d > 1000 ? '#57fff1' : //'#FD8D3C' : 
          d > 100 ? '#99fff7' : //'#FEB24C' : hahaha
          d === null ? '#dbfffc' : //'#FED976' :
                      '#ffffff';
  }

  // Functie die de stijl van de kaart definieert
  function style(feature) {
   if(feature.properties.WDICHT !== undefined){
    return {
      fillColor: getColor(feature.properties.WDICHT),
      weight: 1.5,
      opacity: 1,
      color: 'white',
      dashArray: '0',
      fillOpacity: 0.5
      };
    } 
  }

  // De nieuwe styling toevoegen aan de geoJSON
  L.geoJSON(await newData, {style: style}).addTo(map);

  // Functie voor "mouseOver", er wordt een border gecreerd rondom de buurt waarover je hovered
  // De border wordt naar voren gebracht zodat het beter te zien is, behalve in verouderde browsers
  function createBorder(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#FEC813',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
  }

  // In deze functie wordt de border gereset, deze functie zal voor "mouseOut" gebruikt worden
  function removeBorder(e) {
    geojson.resetStyle(e.target);
    info.update();
  }

  // Deze functie zorgt ervoor dat er ingezoomd wordt op het target, deze zal voor "click" gebruikt worden

  function Clickaction(e) {
    createCharts(e.target.feature.properties.code, e.target.feature.properties.naam)
    map.fitBounds(e.target.getBounds());
  }

  // Hier koppelen we de vorige functies aan eventListeners zodat elke functie uitgevoerd wordt wanneer nodig
  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: createBorder,
        mouseout: removeBorder,
        click: Clickaction
    });
  }

  // Hier wordt de benodigde styling daadwerkelijk toegevoegd aan de data
  geojson = L.geoJSON(await newData, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);



  const info = L.control();

  info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  info.update = function (props) {
      this._div.innerHTML = '<h4>Bevolkingsdichtheid per wijk</h4>' +  (props ?
          '<b>' + props.naam + '</b><br />' + props.WDICHT + ' woningen per km2'
          : 'Hover over een buurt');
  };

  info.addTo(map);

  // LEGENDA

  const legend = L.control({position: 'bottomright'});
  legend.onAdd = function (map) {

      const div = L.DomUtil.create('div', 'info legend'),
          grades = [100, 1000, 5000, 7500, 10000, 15000];
          // labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };

  legend.addTo(map);

}

export default createMap