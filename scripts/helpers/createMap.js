/*=========================================

TOGGLE BUTTON

=========================================*/

import getBuurten from '../findBuurt.js';
import getWijken from '../findWijk.js';
import createData from './createData.js';
import splitString from './splitID.js'

function createMap(data){
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
  L.geoJSON(data).addTo(map)


  const btn = document.querySelector('#toggle')
  btn.addEventListener('click', (e) =>{
    e.preventDefault()
    if (btn.innerHTML === 'Wijken'){
      if(map != undefined){
        map.remove()
        getWijken();
        btn.innerHTML = "Buurten"
      }
    } else {
      if (map != undefined){
        map.remove()
        getBuurten()
        btn.innerHTML = "Wijken"
      }
    }
  })
  /*=========================================

  STYLING 

  =========================================*/

  // Variabele die gebruikt gaat worden voor de styling 
  let geojson;

  // Schaal voor de kleur adhv data
  function getColor(d) {
    return d > 600000 ? '#004f4a' : //'#800026' :
          d > 500000  ? '#008f83' : //'#BD0026' :
          d > 400000  ? '#00d1c0' : //'#E31A1C' :
          d > 300000  ? '#14ffeb' : //'#FC4E2A' :
          d > 200000   ? '#57fff1' : //'#FD8D3C' : 
          d > 100000   ? '#99fff7' : //'#FEB24C' : hahaha
          d > 50000   ? '#dbfffc' : //'#FED976' :
                      '#ffffff';
  }

  // Functie die de stijl van de kaart definieert
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.Oppervlakte_m2),
        weight: 1.5,
        opacity: 1,
        color: 'white',
        dashArray: '0',
        fillOpacity: 0.5
    };
  }

  // De nieuwe styling toevoegen aan de geoJSON
  L.geoJSON(data, {style: style}).addTo(map);

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
    // const id = splitString(e.target.feature.id)
    // console.log(id)
    // if (id === 'stadsdelen'){
    //   if (map != undefined) {
    //     map.off()
    //     map.remove()
    //     let newId = splitString(e.target.feature.properties.id)
    //     getWijken(newId)
    //     map.fitBounds(e.target.getBounds())
    //     createData(e.target.feature.properties.code)
    //   }
    // }
    // else if (id === 'wijken'){
    //   if (map != undefined) {
    //     map.remove()
    //     let newId = splitString(e.target.feature.properties.id)
    //     getBuurten(newId)
    //     createData(e.target.feature.properties.code)
    //   }
    // }
    createData(e.target.feature.properties.code)
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
  geojson = L.geoJSON(data, {
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
          '<b>' + props.Buurtnaam + '</b><br />' + props.Oppervlakte_m2 + ' people / mi<sup>2</sup>'
          : 'Hover over een buurt');
  };

  info.addTo(map);

  // LEGENDA

  const legend = L.control({position: 'bottomright'});
  legend.onAdd = function (map) {

      const div = L.DomUtil.create('div', 'info legend'),
          grades = [50000, 100000, 200000, 300000, 400000, 600000]
          labels = [];

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