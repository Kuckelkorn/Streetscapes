import createBar from './createBar.js'
import createPie from './createPie.js'

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
    obj.indicatorDefinitieId === 'WCORHUUR'  | 
    obj.indicatorDefinitieId === 'WKOOP' | 
    obj.indicatorDefinitieId === 'WPARTHUUR'
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
    | obj.indicatorDefinitieId === 'WDICHT'
    | obj.indicatorDefinitieId === 'WBEZET' 
  )

  const housing = getHousing.map((obj) => Object.assign({'indicator':obj.indicatorDefinitieId, 'waarde':obj.waarde}))
  const oppervlakte = getOppervlakte.map((obj) => Object.assign({'indicator':obj.indicatorDefinitieId, 'waarde':obj.waarde}))
  const age = getAge.map((obj) => Object.assign({'indicator':obj.indicatorDefinitieId, 'waarde':obj.waarde}))
  const extra = getExtra.reduce((obj, item) => Object.assign(obj, { [item.indicatorDefinitieId]: item.waarde}), {});

  const objectArea = Object.assign(extra, {housing:housing}, {oppervlakte:oppervlakte}, {age:age})
  console.log(objectArea.oppervlakte)

  createBar('#woonoppervlakte', objectArea.oppervlakte)
  createBar('#leeftijd_bevolking', objectArea.age)
  createPie('#eigendomsverhouding', objectArea.housing)
}

export default getData