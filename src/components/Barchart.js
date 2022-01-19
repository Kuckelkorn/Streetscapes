import * as d3 from 'd3'


const Barchart = ({  data, svgRef }) => {

  const createChart = (data) => {
    const margin = {top: 40, bottom: 10, left: 120, right: 20}
    const width = 800 - margin.left - margin.right
    const height = 600 - margin.top - margin.bottom


  }
  return <div>
    <svg ref={svgRef}></svg>
  </div>;
};

export default Barchart;
