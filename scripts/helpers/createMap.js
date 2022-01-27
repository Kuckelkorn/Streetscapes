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
      maxZoom: 14,
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

  

  //Schaal voor de kleur adhv data
  // function getColor(d) {
  //   return d > 15000 ? '#004f4a' : //'#800026' :
  //          d > 10000 ? '#008f83' : //'#BD0026' :
  //          d > 7500 ? '#00d1c0' : //'#E31A1C' :
  //          d > 5000 ? '#14ffeb' : //'#FC4E2A' :
  //          d > 1000 ? '#57fff1' : //'#FD8D3C' : 
  //          d > 100 ? '#99fff7' : //'#FEB24C' : 
  //          d === null ? '#dbfffc' : //'#FED976' :
  //                     '#ffffff';
  // }

  function getColor(d) {
    return d > 15000 ? '#000101' : //'#800026' :
           d > 12000 ? '#00241D' : //'#BD0026' :
           d > 9000 ? '#003E36' : //'#E31A1C' :
           d > 7000 ? '#146053' : //'#FC4E2A' :
           d > 5000 ? '#27705B' : //'#FD8D3C' : 
           d > 3000 ? '#3A8063' : //'#FEB24C' : 
           d > 1000 ? '#4E8F6C' : //'#FEB24C' :
           d > 750 ? '#619D75' : //'#FEB24C' :
           d > 500? '#75AB7F' : //'#FEB24C' :
           d > 250? '#88B98A' : //'#FEB24C' :
           d > 100? '#9CC69C' : //'#FEB24C' :
           d > 50? '#AFD2AF' : //'#FEB24C' :
           d > 25? '#C3DEC3' : //'#FEB24C' :
           d > 10? '#D6E9D6' : //'#FEB24C' :
           d === null ? '#2e73cf' : //'#FED976' :
           d === undefined ? '#2e73cf' : //'#FED976'
                      '#ffffff';
  }

  // function getColor(d) {
  //   return d > 15000 ? '#004F4A' : //'#800026' :
  //          d > 12000 ? '#0F7871' : //'#BD0026' :
  //          d > 9000 ? '#27A199' : //'#E31A1C' :
  //          d > 7000 ? '#4AC9C1' : //'#FC4E2A' :
  //          d > 5000 ? '#76F2EA' : //'#FD8D3C' : 
  //          d > 3000 ? '#94FFF8' : //'#FEB24C' : 
  //          d > 1000 ? '#ABFFF9' : //'#FEB24C' :
  //          d > 750 ? '#C3FFFB' : //'#FEB24C' :
  //          d > 500? '#DAFFFC' : //'#FEB24C' :
  //          d > 250? '#F2FFFE' : //'#FEB24C' :
  //          d === null ? '#dbfffc' : //'#FED976' :
  //                     '#ffffff';
  // }

  // Functie die de stijl van de kaart definieert
  function style(feature) {
   if(feature.properties.WDICHT !== undefined){
    return {
      fillColor: getColor(feature.properties.WDICHT),
      weight: 1.5,
      opacity: 0.7,
      color: 'white',
      dashArray: '0',
      fillOpacity: 0.8
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
        opacity: 1,
        color: '#FEC813',
        dashArray: '',
        fillOpacity: 1
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
      this._div.innerHTML = '<h4>Woningdichtheid per wijk</h4>' +  (props ?
          '<b>' + props.naam + '</b><br />' + props.WDICHT + ' woningen per km2'
          : 'Hover over een buurt');
  };

  info.addTo(map);

  // LEGENDA

  const legend = L.control({position: 'bottomright'});
  legend.onAdd = function (map) {

      const div = L.DomUtil.create('div', 'info legend'),
          grades = [10, 50, 100, 250, 500, 750, 1000, 3000, 5000, 7000, 9000, 11000, 13000, 15000];
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