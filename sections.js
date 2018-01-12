
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
    selection.each(function (rawData) {
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

      // perform some preprocessing on raw data
      var timelineData = getEvents(rawData);
      d3.tsv("web_timeline4.2.tsv", setupVis);

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

  var setupSections = function () {
    // activateFunctions are called each
    // time the active section changes
    activateFunctions[0] = show0;
    activateFunctions[1] = show1;
    activateFunctions[2] = show2;
    activateFunctions[3] = show3;
    activateFunctions[4] = show4;
    activateFunctions[5] = show5;
    activateFunctions[6] = show6;
    activateFunctions[7] = show7;
    activateFunctions[8] = show8;
    activateFunctions[9] = show9;
    activateFunctions[10] = show10;
    activateFunctions[11] = show11;
    activateFunctions[12] = show12;
    activateFunctions[13] = show13;
    activateFunctions[14] = show14;

    // updateFunctions are called while
    // in a particular section to update
    // the scroll progress in that section.
    // Most sections do not need to be updated
    // for all scrolling and so are set to
    // no-op functions.
    // for (var i = 0; i < 9; i++) {
    //   updateFunctions[i] = function () {};
    // }
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
   * ACTIVATE FUNCTIONS
   *
   * These will be called their
   * section is scrolled to.
   *
   * General pattern is to ensure
   * all content for the current section
   * is transitioned in, while hiding
   * the content for the previous section
   * as well as the next section (as the
   * user may be scrolling up or down).
   *
   */

  function show0() {
    g.selectAll('.slide1')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide0')
      .transition()
      .duration(600)
      .style('opacity', 1.0);
  }

  function show1() {
    g.selectAll('.slide0')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide2')
      .transition()
      .duration(0)
      .style('opacity', 0);
  
    g.selectAll(':not(.slide1)')
       .attr('pointer-events', 'none');

      // add pointer-events none for other slides

    g.selectAll('.slide1')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide1').filter('.img')
      .attr('pointer-events', 'all')
      .transition()
      .duration(600)
      .style('opacity', 0.4);

  }

  function show2() {
    g.selectAll('.slide1')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide3')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll(':not(.slide2)')
      .attr('pointer-events', 'none');

    g.selectAll('.slide2')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide2').filter('.img')
      .attr('pointer-events', 'all')
      .transition()
      .duration(600)
      .style('opacity', 0.4);

  }

  function show3() {
    g.selectAll('.slide2')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide4')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll(':not(.slide3)')
      .attr('pointer-events', 'none');

    g.selectAll('.slide3')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide3').filter('.img')
      .attr('pointer-events', 'all')
      .transition()
      .duration(600)
      .style('opacity', 0.4);
  }

  function show4() {
    g.selectAll('.slide3')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide5')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll(':not(.slide4)')
      .attr('pointer-events', 'none');

    g.selectAll('.slide4')
      .transition()
      .duration(600)
      .style('opacity', 1.0);
  }

  function show5() {
    g.selectAll('.slide4')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide6')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll(':not(.slide5)')
      .attr('pointer-events', 'none');

    g.selectAll('.slide5')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide5').filter('.img')
      .attr('pointer-events', 'all')
      .transition()
      .duration(600)
      .style('opacity', 0.4);
  }

  function show6() {
    g.selectAll('.slide5')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide7')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll(':not(.slide5)')
      .attr('pointer-events', 'none');

    g.selectAll('.slide6')
      .transition()
      .duration(600)
      .style('opacity', 1.0);
  }

  function show7() {
    g.selectAll('.slide6')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide8')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll(':not(.slide7)')
      .attr('pointer-events', 'none');  

    g.selectAll('.slide7')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide7').filter('.img')
      .attr('pointer-events', 'all')
      .transition()
      .duration(600)
      .style('opacity', 0.4);
  }

  function show8() {
    g.selectAll('.slide7')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide9')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll(':not(.slide8)')
      .attr('pointer-events', 'none');  

    g.selectAll('.slide8')
      .transition()
      .duration(600)
      .style('opacity', 1.0);
  }

  function show9() {
    g.selectAll('.slide8')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide10')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll(':not(.slide9)')
      .attr('pointer-events', 'none');  

    g.selectAll('.slide9')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide9').filter('.img')
      .attr('pointer-events', 'all')
      .transition()
      .duration(600)
      .style('opacity', 0.4);
  }

  function show10() {
    g.selectAll('.slide9')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide11')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll(':not(.slide10)')
      .attr('pointer-events', 'none');  

    g.selectAll('.slide10')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

  }

  function show11() {
    g.selectAll('.slide10')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide12')
      .transition()
      .duration(0)
      .style('opacity', 0);

    // g.selectAll(':not(.slide11)')
    //   .attr('pointer-events', 'none');  

    g.selectAll('.slide11')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide11').filter('.img')
      .attr('pointer-events', 'all')
      .transition()
      .duration(600)
      .style('opacity', 0.4);
  }

  function show12() {
    g.selectAll('.slide11')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide12')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide13')
      .transition()
      .duration(0)
      .style('opacity', 0.0);

  }

  function show13() {
    g.selectAll('.slide12')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide13')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide14')
      .transition()
      .duration(0)
      .style('opacity', 0);

  }

function show14() {
    g.selectAll('.slide13')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide14')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

  }

  /**
   * DATA FUNCTIONS
   *
   * Used to coerce the data into the
   * formats we need to visualize
   *
   */

  function getEvents(rawData) {
    return rawData.map(function (d,i) {
      d.id = d.id;
      d.lane = d.lane;
      d.start = d.start;
      d.end = (d.end === '') ? 10 : d.end;
      d.desc = d.desc;
      return d;
    });
  }


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


