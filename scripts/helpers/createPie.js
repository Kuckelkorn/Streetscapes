function createPieChart(el, data) {
  const waardes = data.map((d) => d.waarde )
  const indicatoren = data.map((d) => d.indicator)

  const margin = 40
  const width = 250 - margin
  const height = 250 - margin
  const radius = Math.min(width, height) / 2

  const svg = d3.select(el)
    .attr('width', width * 2)
    .attr('height', height)
  
  const g = svg.append('g')
    .attr('transform', `translate(${width/2}, ${height/2})`)

    const arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(75);
    
  const pie = d3.pie();
    
  const pied_data = pie(waardes);

  const color = d3.scaleOrdinal().domain(pied_data).range(d3.schemeSet2);



  const arcs = g.selectAll('.arc').data(pied_data).join(
    (enter) => enter.append('path')
    .attr('class', 'arc')
    .style('stroke', 'black')
  );
  
  arcs.attr('d', arc)
    .style('fill', (d, i) => color(i))
    .select('title').text((d) => `${d.indicator}: ${d.waarde}`);

  const size = 20

  svg.selectAll("mydots")
  .data(indicatoren)
  .enter()
  .append("circle")
    .attr("cx", 265)
    .attr("cy", function(d,i){ return 20 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .style("fill", function(d, i){ return color(i)})
    
    // Add one dot in the legend for each name.
    svg.selectAll("mylabels")
      .data(indicatoren)
      .enter()
      .append("text")
        .attr("x", 265 + size*1.2)
        .attr("y", function(d,i){ return 20 + i*(size+4) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d, i){ return color(i)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
}

export default createPieChart