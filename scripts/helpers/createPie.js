function createPieChart(el, data) {
  const waardes = data.map((d) => d.waarde )

  const margin = 40
  const width = 300 - margin
  const height = 300 - margin
  const radius = Math.min(width, height) / 2

  const svg = d3.select(el)
    .attr('width', width)
    .attr('height', height)
  
  const g = svg.append('g')
    .attr('transform', `translate(${width/2}, ${height/2})`)

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(100);
    
  const pie = d3.pie();
    
  const pied_data = pie(waardes);

  const arcs = g.selectAll('.arc').data(pied_data).join(
    (enter) => enter.append('path')
    .attr('class', 'arc')
    .style('stroke', 'white')
  );
  
  arcs.attr('d', arc)
    .style('fill', (d, i) => color(i));
}

export default createPieChart