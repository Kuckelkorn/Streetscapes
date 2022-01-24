// import * as d3 from 'd3'

const createBarChart = (el, data) => {
  const margin = {top: 40, bottom: 10, left: 120, right: 20}
  const width = 300 - margin.left - margin.right
  const height = 300 - margin.top - margin.bottom

  const svg = d3.select(el)
  .attr('width', width+margin.left+margin.right)
  .attr('height', height+margin.top+margin.bottom)

  // Create groups in the svg and make sure that the margins are the same this is necessary otherwise the legend is not there
  const g = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`)

  // Define the x and y axes and their size
  const xScale = d3.scaleLinear().range([0, width])
  const yScale = d3.scaleBand().range([0, height]).padding(0.5)

  const yAxis = d3.axisLeft().scale(yScale)
  const g_yAxis = g.append('g').attr('class','y axis')

  function update(data){
    // Defining how to display the data in the dom
    xScale.domain([0, d3.max(data, (d) => d.waarde)])
    yScale.domain(data.map((d) => d.indicator))

    g_yAxis.transition().call(yAxis)

    // making the individual bars
    const rect = g.selectAll('rect').data(data).join(
      (enter) => { enter = enter.append('rect').attr('x', 0)
      enter.append('title')
      return enter
      },
      (update) => update,
      (exit) => exit.remove()
    )
    
    // Defining the individual bars what data to display
    rect
      .transition()
      .attr('height', yScale.bandwidth())
      .attr('width', (data) => xScale(data.waarde))
      .attr('y', (data) => yScale(data.indicator))
      .select('title').text((data) => `${data.waarde}`)
  }
  update(data)
}

export default createBarChart