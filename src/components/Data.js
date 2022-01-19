import React from 'react'
// import Barchart from './Barchart'

const Data = ({ data, svgRef }) => {
  return (
    <>
      <p> Woningsdichtheid: {data.WDICHT}</p>
      <p> Aantal huishoudens: {data.BEVHUISHOUDENHH}</p>
      <p> Woningvoorraad: {data.WVOORRBAG}</p>
      <p> Personen per woning: {data.WBEZET}</p>
      {/* <Barchart data={data} svgRef={svgRef}/> */}
      {/* <p> Soort woningen: {data.housing}</p>
      <p> Leeftijd: {data.age}</p> */}
    </>
  )
}

export default Data
