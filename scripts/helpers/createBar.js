const createBarChart = async (el, data) => {
  const margin = {top: 40, bottom: 10, left: 80, right: 10}
  const width = 500 - margin.left - margin.right
  const height = 300 - margin.top - margin.bottom

  const svg = d3.select(el)
  .attr('width', width+margin.left+margin.right)
  .attr('height', height+margin.top+margin.bottom)

  // Create groups in the svg and make sure that the margins are the same this is necessary otherwise the legend is not there
  let g = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`)

  // Define the x and y axes and their size
  const xScale = d3.scaleLinear().range([0, width])
  const yScale = d3.scaleBand().range([0, height]).padding(0.1)

  const yAxis = d3.axisLeft().scale(yScale)
  const g_yAxis = g.append('g').attr('class','y axis')

  const xAxis = d3.axisTop().scale(xScale)
  const g_xAxis = g.append('g').attr('class','x axis')

  const chart = document.querySelector(el)

  // let data

  // d3.json(data).then((json) => {
  //   data = json
  //   update(data)
  // })

  if (chart.childElementCount > 1){
    chart.removeChild(chart.getElementsByTagName('g')[0])
    update( await data)
  } else {
    update (await data)
  }
  

  function update(new_data){

    // Defining how to display the data in the dom
    xScale.domain([0, d3.max(new_data, (d) => d.waarde)])
    yScale.domain(new_data.map((d) => d.indicator))

    g_yAxis.transition().call(yAxis)
    g_xAxis.transition().call(xAxis)

    // making the individual bars
    const rect = g.selectAll('rect').data(new_data, (d) => d.indicator).join(
      (enter) => { 
        const rect_enter = enter.append('rect').attr('x', 0)
        rect_enter.append('title')
        return rect_enter
      },
      (update) => update,
      (exit) => exit.remove()
    )
    
    // Defining the individual bars what data to display
    rect
      .transition()
      .attr('height', yScale.bandwidth())
      .attr('width', (new_data) => xScale(new_data.waarde))
      .attr('y', (new_data) => yScale(new_data.indicator))
      .attr('fill', "#FEC813" )
      .select('title').text((new_data) => `${new_data.indicator}: ${new_data.waarde}`)
  }
}

export default createBarChart