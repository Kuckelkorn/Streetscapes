function getData (code) {
  const url = `https://api.data.amsterdam.nl/v1/bbga/kerncijfers/?jaar=2021&gebiedcode15=${code}&_count=true&_format=json`
  const data = fetch(url)
  data
    .then(response => response.json())
    .then(data => {
      let number = data.page.totalElements
      return number
    })
    .then(number => {
      const allData = fetch(url + `&_pageSize=${number}`)
      allData
        .then(response => response.json())
        .then(allData => {
          // console.log(allData)
          const items = allData._embedded.kerncijfers
          const housing = items.filter(obj => 
            obj.indicatorDefinitieId === 'WCORHUUR_P'  | 
            obj.indicatorDefinitieId === 'WKOOP_P' | 
            obj.indicatorDefinitieId === 'WPARTHUUR_P' )
          const age = items.filter(obj => 
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
          const extra = items.filter(obj =>
            obj.indicatorDefinitieId === 'BEVHUISHOUDENHH'
            | obj.indicatorDefinitieId === 'WVOORRBAG'
            | obj.indicatorDefinitieId === 'WDICHT'
            | obj.indicatorDefinitieId === 'ORGROEN_R' 
          )
          const objectHousing = housing.reduce((obj, item) => Object.assign(obj, { [item.indicatorDefinitieId]: item.waarde }), {});
          const objectAge = age.reduce((obj, item) => Object.assign(obj, { [item.indicatorDefinitieId]: item.waarde }), {});
          const objectExtra = extra.reduce((obj, item) => Object.assign(obj, { [item.indicatorDefinitieId]: item.waarde }), {});

          const objectArea = Object.assign({'housing': objectHousing}, {'age': objectAge}, objectExtra)
          return objectArea
        })
        .then( objectArea => console.log(objectArea))
    })
}

export default getData