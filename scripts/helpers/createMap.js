import * as d3 from "https://cdn.skypack.dev/d3@7"

const createMap = (geodata) => {
  console.log(geodata)
  const margin = 20
  const width = 600
  const height = 400

  const svg = d3.select('body').append('svg')
    .attr('width', width+margin+margin)
    .attr('height', height+margin+margin)


  let projection = d3.geoMercator().fitExtent([[20, 20], [width, height]], geodata)
  let path = d3.geoPath().projection(projection)

  svg.append('g').selectAll('path')
  	.data(geodata.features)
  	.enter().append('path')
  	.attr('d', path)
    // Styling
  	.style('fill', 'white')
  	.style('stroke', '#ccc')
}

export default createMap