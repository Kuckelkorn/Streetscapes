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
          const filteredObjects = items.filter(obj => obj.indicatorDefinitieId === 'WCORHUUR'  | obj.indicatorDefinitieId === 'WKOOP' | obj.indicatorDefinitieId === 'WPARTHUUR' )
          console.log(filteredObjects)
        })
    })
}

export default getData