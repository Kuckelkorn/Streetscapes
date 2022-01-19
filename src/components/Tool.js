import React from 'react'
import Map from './Map.js'
import Filter from './Filter.js'
import Data from './Data.js'

const Tool = ({ gebieden, setId, setCode, data, svgRef}) => {
  return (
    <section className='tool'>
      <Filter/>
      <Data data={data} svgRef={svgRef}/>
      <Map gebieden={gebieden} setId={setId} setCode={setCode}/>
    </section>
  )
}

export default Tool
