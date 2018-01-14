
/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function () {
  // constants to define the size
  // and margins of the vis area.
  var width = 550;
  var height = 520;
  var margin = { top: 0, left: 20, bottom: 40, right: 10 };

  var lastIndex = -1;
  var activeIndex = 0;


  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

  var activateFunctions = [];
  // var updateFunctions = [];

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

      setupVis(timelineData)
      setupSections();

    });
  };

  /**
   * setupVis - creates initial elements for all
   * sections of the visualization.
   */

  var setupVis = function (timelineData) {

    var img_slides = [1,2,3,5,7,9,11],
      img_names = ['shuvinai', 'gisp2_crop', 'northpole', 'church', 'woodmap',
      'bruegel', 'hyperborea'],
      img_x = [270, 400, 340, 228, 370, 240, 240],
      img_y = [120, 100, 120, 126, 50, 120, 120];

    g.append('g').selectAll('img')
      .data(img_slides)
      .enter()
      .append('svg:image')
      .attr('class', function(d, i) {return 'slide'+img_slides[i]+' img'})
      .attr('xlink:href', function(d,i) {return img_names[i]+'.jpg'})
      .attr('x', function(d,i) {return img_x[i]})
      .attr('y', function(d,i) {return img_y[i]})
      .attr('width', function(d,i) {return (width-img_x[i])})
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .style('opacity', 0);

    g.append('g').selectAll('title')
      .data(timelineData)
      .enter()
      .append('text')
      .attr('class', function(d, i) {return 'slide'+i+' title'})
      .attr('y',  (height / 5))
      .attr('x', width / 3)
      .text(function(d) {return d.id})
      .call(wrap, 450)
      .style('opacity', 0);

    g.append('g').selectAll('desc')
      .data(timelineData)
      .enter()
      .append('text')
      .attr('class', function(d, i) {return 'slide'+i+' desc'})
      .attr('y',  (height / 3) + (height / 5))
      .attr('x', width / 5)
      .text(function(d) {return d.desc})
      .call(wrap, 500)
      .style('opacity', 0);
    };

  var setupSections = function() {

    for (var i = 0; i < 15; ++i){

      activateFunctions[i] = getFun(i);};

    function getFun(val) {
        var xb = val-1,
          xf = val+1;

        return function() {
        g.selectAll('.slide'+xb)
          .transition()
          .duration(0)
          .style('opacity', 0);

        g.selectAll('.slide'+xf)
          .transition()
          .duration(0)
          .style('opacity', 0);

        g.selectAll(':not(.slide'+val+')')
          .attr('pointer-events', 'none');

        g.selectAll('.slide'+val)
          .transition()
          .duration(600)
          .style('opacity', 1.0);

        g.selectAll('.slide'+val).filter('.img')
          .attr('pointer-events', 'all')
          .transition()
          .duration(600)
          .style('opacity', 0.4);};
      };
  };


  var wrap = function(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        // dy = parseFloat(text.attr("dy")),
        dy = 0,
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

  /**
   * DATA FUNCTIONS
   *
   * Used to coerce the data into the
   * formats we need to visualize
   *
   */

  chart.activate = function (index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      activateFunctions[i](); console.log(i);
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  // chart.update = function (index, progress) {
  //   updateFunctions[index](progress);
  // };

  // return chart function
  return chart;
};


/**
 * display - called once data
 * has been loaded.
 * sets up the scroller and
 * displays the visualization.
 *
 * @param data - loaded tsv data
 */
function display(data) {
  // create a new plot and
  // display it
  var plot = scrollVis();
  d3.select('#vis')
    .datum(data)
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function (index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

    // activate current section
    plot.activate(index);
  });

  // scroll.on('progress', function (index, progress) {
  //   plot.update(index, progress);
  // });
}

// load data and display
d3.tsv('web_timeline4.2.tsv', display);
// d3.tsv('https://rawgit.com/andreschang/arctic_timeline.4.2/master/web_timeline4.2.tsv', display);


