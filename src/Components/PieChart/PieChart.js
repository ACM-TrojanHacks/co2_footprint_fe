import React, { useEffect } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

function PieChart(props) {
  const {
    data,
    outerRadius,
    innerRadius,
  } = props;
  const margin = {
    top: 50, right: 50, bottom: 50, left: 50,
  };
  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const sumDataValue = () => {
    let sum = 0;
    data.forEach((dataPoint) => {
      sum += dataPoint.value;
    });
    return sum;
  };

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateCool)
    .domain([0, data.length]);

  const drawChart = () => {
    d3.select('#pie-container')
      .select('svg')
      .remove();

    // Create new svg
    const svg = d3
      .select('#pie-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = svg
      .selectAll()
      .data(pieGenerator(data))
      .enter();

    // Append arcs
    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (_, i) => colorScale(i))
      .style('stroke', '#ffffff')
      .style('stroke-width', 0);

    const sum = sumDataValue();

    // Append text labels
    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => `${d.data.label}(${((d.data.value * 100) / sum).toFixed(2)}%)`)
      .style('fill', (_, i) => colorScale(data.length - i))
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  };

  useEffect(() => {
    drawChart();
  }, [data]);

  return <div id="pie-container" />;
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  outerRadius: PropTypes.number,
  innerRadius: PropTypes.number,
};

PieChart.defaultProps = {
  outerRadius: 150,
  innerRadius: 0,
};

export default PieChart;
