/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function () {
  // constants to define the size
  // and margins of the vis area.
  var width = 560;
  var height = 520;
  var margin = { top: 0, left: 10, bottom: 40, right: 10 };

  var lastIndex = -1;
  var activeIndex = 0;


  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

  var activateFunctions = [];
  var updateFunctions = [];

  var parseTime = d3.timeParse("%Y-%m-%d");
  var widthG = 500,
    heightG = 400;
  var xG = d3.scaleTime().domain([new Date(2002, 4, 1), new Date(2017, 2, 1)])
    .rangeRound([0, widthG]);
  var yG = d3.scaleLinear().domain([0,-3778])
    .rangeRound([heightG, 0]);

  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function (selection) {
    selection.each(function (timelineData) {
      // create svg and give it a width and height
      svg = d3.select(this).selectAll('svg').data([timelineData]);
      var svgE = svg.enter().append('svg');
      // @v4 use merge to combine enter and existing selection
      svg = svg.merge(svgE);

      svg.attr('width', width + margin.left + margin.right);
      svg.attr('height', height + margin.top + margin.bottom);

      svg.append('g');

      // this group element will be used to contain all
      // other elements.
      g = svg.select('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      setupVis(timelineData);
      // setupSections();

    })
  };

  /**
   * setupVis - creates initial elements for all
   * sections of the visualization.
   */

  var setupVis = function(gData) {

     // Greenland plot
    var line = d3.line()
      .x(function(d) { return xG(d.date); })
      .y(function(d) { return yG(d.mass); });

    gGata.date = parseTime(gData.date);
    gData.mass = +gData.mass;

    // console.log(xG(data[158].date))
    // console.log(yG(data[158].mass))

    greenlandPlot = g.append("g")
      .attr("transform", "translate("+(width-widthG)+","+(height-heightG-80)+")")
      // .attr("class", "slide1 line");

    // greenlandPlot.call(d3.axisBottom(xG))
    //   .selectAll(".domain, text")
    //   .remove();

    // greenlandPlot.append("g")
    //   .call(d3.axisLeft(yG))
    //   .selectAll(".domain, text")
    //   .remove()
      // .append('text')
      // .text('Ice mass anomaly (Gigatonnes)');

    var iceLine = greenlandPlot.append("path")
      .datum(gData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 2)
      .attr("d", line);

    var totalLength = iceLine.node().getTotalLength();
      iceLine
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(8000)
        // .ease("linear")
        .attr("stroke-dashoffset", 0);

    // greenlandPlot.style('opacity',0);

      };
};

function gDisplay(data) {
  // create a new plot and
  // display it
  var plot = scrollVis();
  d3.select('#vis')
    .datum(data)
    .call(plot);}

d3.csv('greenland_mass_date.csv', gDisplay)