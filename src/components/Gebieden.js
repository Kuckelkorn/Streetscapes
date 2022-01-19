const Gebied = ({ gebied, setId, setCode}) => {

  // function splitString(str) {
  //   const id = str.split('.')
  //   return id[0]
  // }

  // async function fetchWijken (str){
  //   const stadsdeel = splitString(str)
  //   const url= `https://api.data.amsterdam.nl/v1/gebieden/wijken/?_format=geojson&ligtInStadsdeel.identificatie=${stadsdeel}`
  //   const wijken = await fetch(url)
  //   const gebieden = await wijken.json()
  //   setSoort('wijk')
  //   setGebieden(gebieden.features)
  // }

  // async function fetchBuurten (str){
  //   const wijk = splitString(str)
  //   const buurten = await fetch(`https://api.data.amsterdam.nl/v1/gebieden/buurten/?_format=geojson&ligtInWijk.identificatie=${wijk}`)
  //   const gebieden = await buurten.json()
  //   setSoort('buurt')
  //   setGebieden(gebieden.features)
  // }

  // const setFunction = (id) =>{
  //   if(soort === 'stadsdeel'){
  //     return fetchWijken(id)
  //   } else if (soort ==="wijk"){
  //     return fetchBuurten(id)
  //   }
  // }

  return (
    <>
      <button onClick={()=>{
        setId(gebied.properties.id);
        setCode(gebied.properties.code)
        }}>
          {gebied.properties.naam}
      </button>
    </>
  )
}

export default Gebied

