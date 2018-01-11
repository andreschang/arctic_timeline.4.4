
/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function () {
  // constants to define the size
  // and margins of the vis area.
  var width = 500;
  var height = 520;
  var margin = { top: 0, left: 20, bottom: 40, right: 10 };

  var lastIndex = -1;
  var activeIndex = 0;


  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

  var activateFunctions = [];
  var updateFunctions = [];

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

      setupVis(timelineData);

      setupSections();
    });
  };

  /**
   * setupVis - creates initial elements for all
   * sections of the visualization.
   */

  var setupVis = function (timelineData) {

    // SLIDE 0
    g.append('text')
      .attr('class', 'title slide0')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[0].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide0')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[0].desc)
      .call(wrap, 500);

    g.selectAll('.slide0')
      .style('opacity', 0);

    // SLIDE 1

    g.append('svg:a')
      .attr('xlink:href', 'https://feheleyfinearts.com/artists/shuvinai-ashoona/')
      .attr('xlink:show', 'new')
      .append('svg:image')
      .attr('class', 'slide1 img')
      .attr('xlink:href', "shuvinai.jpg")
      .attr('x', 270)
      .attr('y', 90)
      .attr('width', '50%')
      .attr('height', '50%')
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    g.append('text')
      .attr('class', 'title slide1')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[1].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide1')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[1].desc)
      .call(wrap, 500);

    g.selectAll('.slide1')
      .style('opacity', 0);
    g.selectAll('.slide1-img')
      .style('opacity', 0);

    // SLIDE 2
    g.append('text')
      .attr('class', 'title slide2')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[2].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide2')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[2].desc)
      .call(wrap, 500);

    g.selectAll('.slide2')
      .style('opacity', 0);

    // SLIDE 3
    g.append('text')
      .attr('class', 'title slide3')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[3].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide3')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[3].desc)
      .call(wrap, 500);

    g.selectAll('.slide3')
      .style('opacity', 0);

    // SLIDE 4
    g.append('text')
      .attr('class', 'title slide4')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[4].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide4')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[4].desc)
      .call(wrap, 500);

    g.selectAll('.slide4')
      .style('opacity', 0);

    // SLIDE 5
    g.append('text')
      .attr('class', 'title slide5')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[5].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide5')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[5].desc)
      .call(wrap, 500);

    g.selectAll('.slide5')
      .style('opacity', 0);

    // SLIDE 6
    g.append('text')
      .attr('class', 'title slide6')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[6].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide6')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[6].desc)
      .call(wrap, 500);

    g.selectAll('.slide6')
      .style('opacity', 0);

    // SLIDE 7
    g.append('text')
      .attr('class', 'title slide7')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[7].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide7')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[7].desc)
      .call(wrap, 500);

    g.selectAll('.slide7')
      .style('opacity', 0);
  
    // SLIDE 8
    g.append('text')
      .attr('class', 'title slide8')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[8].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide8')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[8].desc)
      .call(wrap, 500);

    g.selectAll('.slide8')
      .style('opacity', 0);

    // SLIDE 9
    g.append('text')
      .attr('class', 'title slide9')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[9].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide9')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[9].desc)
      .call(wrap, 500);

    g.selectAll('.slide9')
      .style('opacity', 0);

    // SLIDE 10
    g.append('text')
      .attr('class', 'title slide10')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[10].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide10')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[10].desc)
      .call(wrap, 500);

    g.selectAll('.slide10')
      .style('opacity', 0);

    // SLIDE 11
    g.append('text')
      .attr('class', 'title slide11')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[11].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide11')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[11].desc)
      .call(wrap, 500);

    g.selectAll('.slide11')
      .style('opacity', 0);

    // SLIDE 12
    g.append('text')
      .attr('class', 'title slide12')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[12].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide12')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[12].desc)
      .call(wrap, 500);

    g.selectAll('.slide12')
      .style('opacity', 0);
  
    // SLIDE 13
    g.append('text')
      .attr('class', 'title slide13')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[13].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide13')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[13].desc)
      .call(wrap, 500);

    g.selectAll('.slide13')
      .style('opacity', 0);

    // SLIDE 14
    g.append('text')
      .attr('class', 'title slide14')
      .attr('y', (height / 5))
      .attr('x', width / 3)
      .text(timelineData[14].id)
      .call(wrap, 450);

    g.append('text')
      .attr('class', 'desc slide14')
      .attr('x', width / 5)
      .attr('y', (height / 3) + (height / 5))
      .text(timelineData[14].desc)
      .call(wrap, 500);

    g.selectAll('.slide14')
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
    for (var i = 0; i < 9; i++) {
      updateFunctions[i] = function () {};
    }
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

    g.selectAll('.slide1')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide1').filter('.img')
      .transition()
      .duration(600)
      .style('opacity', 0.4);

    // g.append('svg:a')
    //   .attr('xlink:href', 'https://feheleyfinearts.com/artists/shuvinai-ashoona/')
    //   .append('rect')
    //   .attr('x', 270)
    //   .attr('y', 90)
    //   .attr('width', 50)
    //   .attr('height', 50);

  }

  function show2() {
    g.selectAll('.slide1')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide2')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide3')
      .transition()
      .duration(0)
      .style('opacity', 0);
  }

  function show3() {
    g.selectAll('.slide2')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide3')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide4')
      .transition()
      .duration(0)
      .style('opacity', 0);
  }

  function show4() {
    g.selectAll('.slide3')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide4')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide5')
      .transition()
      .duration(0)
      .style('opacity', 0);
  }

  function show5() {
    g.selectAll('.slide4')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide5')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide6')
      .transition()
      .duration(0)
      .style('opacity', 0.0);

  }

  function show6() {
    g.selectAll('.slide5')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide6')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide7')
      .transition()
      .duration(0)
      .style('opacity', 0.0);

  }

  function show7() {
    g.selectAll('.slide6')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide7')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide8')
      .transition()
      .duration(0)
      .style('opacity', 0.0);

  }

  function show8() {
    g.selectAll('.slide7')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide8')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide9')
      .transition()
      .duration(0)
      .style('opacity', 0.0);

    // d3.select('#miniBox')
    //   .attr('height', 20);

  }

  function show9() {
    g.selectAll('.slide8')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide9')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide10')
      .transition()
      .duration(0)
      .style('opacity', 0.0);

  }

  function show10() {
    g.selectAll('.slide9')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide10')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide11')
      .transition()
      .duration(0)
      .style('opacity', 0.0);

  }

  function show11() {
    g.selectAll('.slide10')
      .transition()
      .duration(0)
      .style('opacity', 0);

    g.selectAll('.slide11')
      .transition()
      .duration(600)
      .style('opacity', 1.0);

    g.selectAll('.slide12')
      .transition()
      .duration(0)
      .style('opacity', 0.0);

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

// Add interactivity 
// function handleMouseOver(d, i) {
//   // var selectID = this.getAttribute('id');
//   // console.log('#'+selectID)
//   // d3.select("#"+selectID)
//   //   .transition()
//   //   .duration(200)
//   //   .style("opacity", 1.0);
//   d3.select(this)
//     .style("opacity", 1.0);
// };

// function handleMouseOut(d, i) {
//   var selectID = this.getAttribute('id');
//   d3.select("#"+selectID)
//     .transition()
//     .duration(200)
//     .style("opacity", 0.4);
// };


  /**
   * DATA FUNCTIONS
   *
   * Used to coerce the data into the
   * formats we need to visualize
   *
   */

  function getEvents(rawData) {
    return rawData.map(function (d,i) {
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
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function (index, progress) {
    updateFunctions[index](progress);
  };

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

  scroll.on('progress', function (index, progress) {
    plot.update(index, progress);
  });
}

// load data and display
d3.tsv('web_timeline4.2.tsv', display);
// d3.tsv('https://rawgit.com/andreschang/arctic_timeline.4.2/master/web_timeline4.2.tsv', display);


