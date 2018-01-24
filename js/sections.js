
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
  var g = null;

  var activateFunctions = [];
  var updateFunctions = [];

  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in.
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

    var img_slides = [2,3,4,6,8,10,12,13,15],
      img_names = ['shuvinai', 'gisp2_crop', 'northpole2', 'church', 'woodmap',
      'bruegel', 'hyperborea', 'mask2', 'lgm'],
      img_x = [270, 400, 340, 228, 370, 240, 240, 380, 300],
      img_y = [120, 100, 120, 126, 50, 30, 60, 43, 60],
      arrow_x = [100, 68, 290, 194, 348, 184, 2, 2, 2, 2, 252, 2, 
      338, 142, 150, 2, 110, 2, 172],
      arrow_y = [400, 303, 393, 303, 333, 333, 333, 363, 333, 363, 333, 333, 
      363, 363, 363, 363, 363, 303, 423];

    g.append('g').selectAll('img')
      .data(img_slides)
      .enter()
      .append('svg:a')
        .attr('xlink:href', function(d,i) {return 'images/'+img_names[i]+'.jpg'})
        .attr('data-lightbox', function(d,i) {return 'image #'+i})
      .append('svg:image')
      .attr('class', function(d, i) {return 'slide'+img_slides[i]+' img'})
      .attr('xlink:href', function(d,i) {return 'images/'+img_names[i]+'.jpg'})
      .attr('x', function(d,i) {return img_x[i]})
      .attr('y', function(d,i) {return img_y[i]})
      .attr('width', function(d,i) {return (width-img_x[i])})
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .style('opacity', 0);

    g.append('g').selectAll('eventDepth')
      .data(timelineData)
      .enter()
      .append('text')
      .attr('class', function(d, i) {return 'slide'+i+' eventDepth'})
      .attr('y', (height / 31))
      // .attr('y', (height / 10.8))
      .attr('x', 6)
      .text(function(d) {
        var depth = d.depthm <= 0.0 ? d.depthm+' meters / '+d.depthmi+' miles' : '';
        return depth})
      .style('opacity', 0);

    g.append('g').selectAll('eventYear')
      .data(timelineData)
      .enter()
      .append('text')
      .attr('class', function(d, i) {return 'slide'+i+' eventYear'})
      .attr('y', (height / 10.8))
      // .attr('y', (height / 24))
      .attr('x', 6)
      .text(function(d) { var showYear = d.start >= 0 ? d.start : -d.start+' BC';
        return( showYear );})
      .style('opacity', 0);

    g.append('g').selectAll('title')
      .data(timelineData)
      .enter()
      .append('text')
      .attr('class', function(d, i) {return 'slide'+i+' title'})
      .attr('y',  (height / 5))
      .attr('x', width / 3)
      .text(function(d) {return d.id})
      .call(wrap, 400)
      .style('opacity', 0);

    g.append('g').selectAll('desc')
      .data(timelineData)
      .enter()
      .append('text')
      .attr('class', function(d, i) {return 'slide'+i+' desc'})
      .attr('y',  (height / 2))
      .attr('x', width / 5)
      .text(function(d) {return d.desc})
      .call(wrap, 500)
      .style('opacity', 0);

    g.append('g').selectAll('quote')
      .data(timelineData)
      .enter()
      .append('text')
      .attr('class', function(d, i) {return 'slide'+i+' quote'})
      .attr('y',  (height / 2))
      .attr('x', width / 5)
      .text(function(d) {return d.quote})
      .call(wrap, 500)
      .style('opacity', 0);

    g.append('g').selectAll('arrows')
      .data(timelineData)
      .enter()
      .append('svg:image')
      .attr('class', function(d, i) {return 'slide'+i+' arrow'})
      .attr('xlink:href', '../images/Read-More5.svg')
      .attr('x', function(d, i) {return arrow_x[i]-11})
      .attr('y', function(d, i) {return arrow_y[i]+1})
      .on("click", function(d, i){
        var sClass = '.slide'+i;
        g.selectAll(sClass).filter('.quote,.arrow')
          .transition()
          .duration(0)
          .style('opacity', 0);
        g.selectAll(sClass).filter('.desc')
          .transition()
          .duration(200)
          .style('opacity', 1);})
      // .attr('width', 12)
      .attr('width', 140)
      .style('opacity', 0);


    // Custom slide edits
    g.selectAll('.slide0').filter('.eventYear').remove();
    g.selectAll('.slide0').filter('.desc').attr('transform', 'translate(0,-80)');
    g.selectAll('.slide2').filter('.eventYear').text('2000s');
    g.selectAll('.slide6').filter('.eventYear').text('Late 1800s');
    g.selectAll('.slide8').filter('.eventYear').text('Early 1800s');
    g.selectAll('.slide9').filter('.eventYear').text('1500-1800');
    g.selectAll('.slide10').filter('.eventYear').text('1300-1850');
    g.selectAll('.slide0').filter('.arrow').remove();

    };

  var setupSections = function() {

    for (var i = 0; i < 20; ++i){

      activateFunctions[i] = getFun(i);
      updateFunctions[i] = getUp(i)};

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

        g.selectAll('.slide'+val).filter(':not(.desc)')
          .transition()
          .duration(600)
          .style('opacity', 1.0);

        g.selectAll('.slide'+val).filter('.img')
          .attr('pointer-events', 'all')
          .transition()
          .duration(600)
          .style('opacity', 0.4);

        g.selectAll('.slide'+val).filter('.arrow')
          .attr('pointer-events', 'all')
          .transition()
          .duration(600)
          .style('opacity', 1.0);}

      };

    function getUp(val) {
      return function(progress) {
          var xb = val-1,
          xf = val+1,
          img_y = [120, 100, 120, 126, 50, 120, 120];

        g.selectAll('.slide'+xb).filter('.img')
        // trinomial scroll for image to reach its center and then fly off screen
          .attr('transform', function(d,i) {
            var img_h = d3.select(this).node().getBBox().height,
            offset = (height-img_y[i]-img_h/2)/(height);
            console.log((-4*Math.pow((progress-offset),3)));
            return 'translate(0,'+(-4*Math.pow((progress-offset),3))*(height+img_h)+')'}
          )}
    }};


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
    // console.log(progress)
  };

  // return chart function
  return chart;
};


/**
 * sets up the scroller and
 * displays the visualization.
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
d3.tsv('web_timeline.4.4.tsv', display);

