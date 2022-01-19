import { useState, useEffect, useRef } from 'react'
import Header from './components/Header.js'
import Tool from './components/Tool.js'

function App() {
  const [gebieden, setGebieden] = useState([])
  const [soort, setSoort] = useState('stad')
  const [data, setData] = useState([])
  const [code, setCode] = useState('STAD')
  const [id, setId] = useState('')

  const svgRef = useRef()

  useEffect(() =>{
    getGebieden(soort, id)
    getData(code)
    // eslint-disable-next-line
  }, [code])


  function splitString(str) {
    const id = str.split('.')
    return id[0]
  }

  async function getGebieden (soort, id){
    if(soort === 'stad'){
      fetchStadsdelen()
    } else if(soort === 'stadsdeel'){
      fetchWijken(id)
    } else if (soort ==="wijk"){
      fetchBuurten(id)
    }
  }

  async function fetchStadsdelen (){
    const stadsdelen = await fetch(`https://api.data.amsterdam.nl/v1/gebieden/stadsdelen/?_format=geojson`)
    const gebieden = await stadsdelen.json()
    setSoort('stadsdeel')
    setGebieden(gebieden.features)
  }

  async function fetchWijken (str){
    const stadsdeel = splitString(str)
    const url= `https://api.data.amsterdam.nl/v1/gebieden/wijken/?_format=geojson&ligtInStadsdeel.identificatie=${stadsdeel}`
    const wijken = await fetch(url)
    const gebieden = await wijken.json()
    setSoort('wijk')
    setGebieden(gebieden.features)
  }

  async function fetchBuurten (str){
    const wijk = splitString(str)
    const buurten = await fetch(`https://api.data.amsterdam.nl/v1/gebieden/buurten/?_format=geojson&ligtInWijk.identificatie=${wijk}`)
    const gebieden = await buurten.json()
    setSoort('buurt')
    setGebieden(gebieden.features)
  }

  async function getData (code) {
    const url = `https://api.data.amsterdam.nl/v1/bbga/kerncijfers/?jaar=2021&gebiedcode15=${code}&_count=true&_format=json`
    let data = await fetch(url)
    data = await data.json()
    const number = await data.page.totalElements
    let allData = await fetch(url + `&_pageSize=${number}`)
    allData = await allData.json()
    const items = allData._embedded.kerncijfers
    const getOppervlakte = items.filter(obj =>
      obj.indicatorDefinitieId === 'WOPP0040_P' 
      | obj.indicatorDefinitieId === 'WOPP4060_P' 
      | obj.indicatorDefinitieId === 'WOPP6080_P' 
      | obj.indicatorDefinitieId === 'WOPP80100_P' 
      | obj.indicatorDefinitieId === 'WOPP100PLUS_P' 
      | obj.indicatorDefinitieId === 'WOPPONB_P' 
    )
    const getHousing = items.filter(obj => 
      obj.indicatorDefinitieId === 'WCORHUUR_P'  | 
      obj.indicatorDefinitieId === 'WKOOP_P' | 
      obj.indicatorDefinitieId === 'WPARTHUUR_P'
    )
    const getAge = items.filter(obj => 
      obj.indicatorDefinitieId === 'BEV0_4' 
      | obj.indicatorDefinitieId === 'BEV5_9' 
      | obj.indicatorDefinitieId === 'BEV10_14' 
      | obj.indicatorDefinitieId === 'BEV15_19' 
      | obj.indicatorDefinitieId === 'BEV20_24' 
      | obj.indicatorDefinitieId === 'BEV25_29' 
      | obj.indicatorDefinitieId === 'BEV30_34' 
      | obj.indicatorDefinitieId === 'BEV35_39' 
      | obj.indicatorDefinitieId === 'BEV40_44' 
      | obj.indicatorDefinitieId === 'BEV45_49' 
      | obj.indicatorDefinitieId === 'BEV50_54' 
      | obj.indicatorDefinitieId === 'BEV55_59' 
      | obj.indicatorDefinitieId === 'BEV60_64' 
      | obj.indicatorDefinitieId === 'BEV65_69' 
      | obj.indicatorDefinitieId === 'BEV70_74' 
      | obj.indicatorDefinitieId === 'BEV75_79' 
      | obj.indicatorDefinitieId === 'BEV80_84' 
      | obj.indicatorDefinitieId === 'BEV85_89' 
      | obj.indicatorDefinitieId === 'BEV90_94' 
      | obj.indicatorDefinitieId === 'BEV95_99' 
      | obj.indicatorDefinitieId === 'BEV100PLUS'
    )
    const getExtra = items.filter(obj =>
      obj.indicatorDefinitieId === 'BEVHUISHOUDENHH'
      | obj.indicatorDefinitieId === 'WVOORRBAG'
      | obj.indicatorDefinitieId === 'WDICHT'
      | obj.indicatorDefinitieId === 'WBEZET' 
    )

    const housing = getHousing.map((obj) => Object.assign({'indicator':obj.indicatorDefinitieId, 'waarde':obj.waarde}))
    const oppervlakte = getOppervlakte.map((obj) => Object.assign({'indicator':obj.indicatorDefinitieId, 'waarde':obj.waarde}))
    const age = getAge.map((obj) => Object.assign({'indicator':obj.indicatorDefinitieId, 'waarde':obj.waarde}))
    const extra = getExtra.reduce((obj, item) => Object.assign(obj, { [item.indicatorDefinitieId]: item.waarde}), {});
  
    const objectArea = Object.assign(extra, {housing:housing}, {oppervlakte:oppervlakte}, {age:age})
    console.log(objectArea)
    setData(objectArea)
  }

  return (
    <div className="Streetscapes">
      < Header />
      < Tool gebieden={gebieden} setId={setId} setCode={setCode} data={data} svgRef={svgRef}/>
    </div>
  );
}

export default App;
