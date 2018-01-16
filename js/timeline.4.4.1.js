// Version 4.2.1
// 2018-01-08
// Plays nicely with scroll
// Builds mini-timeline on left
// And attaches 'step' attributes 
// 2018-01-09
// Adds locator box to miniTL
// 2018-01-10
// Polished locator box
// Added v2 panel text
// Added image in Slide1
// Need to get mouseover to work

// Parameters
var lanes = ["Timeline"],
  laneLength = lanes.length,
  timeBegin = -1000000,
  timeEnd = 2020;

var tf = [2020, 1800, 0, -22000, -100000],
  t0 = [1801, 1, -21999, -99999, -999999],
  units = [10, 100, 1000, 10000, 100000],
  nUnits = tf.map(function(n, i) { return (tf[i]+1-t0[i]) / units[i]; });

tf.splice(5,0,-1000000)

// Placement
var mTop = 50,
  m = 15,
  mainHeight = 6000 - mTop-m,
  miniHeight = 500 - mTop-m,
  miniWidth = 100 - 2*m,
  mainWidth = 300 - miniWidth;

// Calculate ranges for shifting scale timeline
nUnits.splice(0,0,0);
var nDom = nUnits.map( function(n, i) { return nUnits.slice(0,i+1).reduce(getSum) ;}),
  totalDom = nUnits.reduce(getSum),
  scaleDom = nDom.map( function(n) { return n*mainHeight/totalDom});

var scale0 = d3.scaleLinear().domain([tf[0], tf[1]]).range([scaleDom[0],scaleDom[1]]),
  scale1 = d3.scaleLinear().domain([tf[1], tf[2]]).range([scaleDom[1],scaleDom[2]]),
  scale2 = d3.scaleLinear().domain([tf[2], tf[3]]).range([scaleDom[2],scaleDom[3]]),
  scale3 = d3.scaleLinear().domain([tf[3], tf[4]]).range([scaleDom[3],scaleDom[4]]),
  scale4 = d3.scaleLinear().domain([tf[4], tf[5]]).range([scaleDom[4],scaleDom[5]]);

var y2 = d3.scaleLinear()
  .domain([timeEnd, tf[5]])
  .range([0, miniHeight]);
var x1 = d3.scaleLinear()
  .domain([0, laneLength])
  .range([0, mainWidth]);
var x2 = d3.scaleLinear()
  .domain([0, laneLength])
  .range([0, miniWidth]);

function multiScale(inputNumber) {
      if (tf[1] <= inputNumber && inputNumber <= tf[0]) {
        return scale0(inputNumber);
      } else if (tf[2] <= inputNumber && inputNumber < tf[1]) {
        return scale1(inputNumber);
      } else if (tf[3] <= inputNumber && inputNumber < tf[2]) {
        return scale2(inputNumber);
      } else if (tf[4] <= inputNumber && inputNumber < tf[3]) {
        return scale3(inputNumber);
      } else if (tf[5] <= inputNumber && inputNumber < tf[4]) {
        return scale4(inputNumber);
      };
};

var bounds = tf.map(function(n) {return multiScale(n) ;} )

function boxMultiScale(inputNumber) {
      if (bounds[0] <= inputNumber && inputNumber <= bounds[1]) {
        return y2(scale0.invert(inputNumber));
      } else if (bounds[1] <= inputNumber && inputNumber < bounds[2]) {
        return y2(scale1.invert(inputNumber));
      } else if (bounds[2] <= inputNumber && inputNumber < bounds[3]) {
        return y2(scale2.invert(inputNumber));
      } else if (bounds[3] <= inputNumber && inputNumber < bounds[4]) {
        return y2(scale3.invert(inputNumber));
      } else if (inputNumber < bounds[5]) {
        return y2(scale4.invert(inputNumber));
      };
};

// }

function getSum(total, num) {
    return total + num;
};

// BUILD MAIN TL
// main timeline
var mainTL = d3.select("#sections")
  .append("svg")
  .attr("width", mainWidth+miniWidth)
  .attr("height", mainHeight+mTop+m)
  .append("g")
  .attr("transform", "translate(" + (miniWidth) + "," + mTop + ")") // position mainTL
  .attr("height", mainHeight)
  .attr("width", mainWidth);

mainTL.append("rect")
  .attr("x", .12*x1(1))
  .attr("width", function(d) {return .8*x1(1)})
  .attr("height", mainHeight)
  .attr("fill", "#edf1f2");

// BUILD EACH Y-SCALE
var axis0 = d3.axisLeft(scale0)
  .ticks(20, "f");
var axis1 = d3.axisLeft(scale1)
  .ticks(20, "f");
var axis2 = d3.axisLeft(scale2)
  .ticks(20, "f");
var axis3 = d3.axisLeft(scale3)
  // .ticks(20, ".2s");
  .ticks(10, "f");
var axis4 = d3.axisLeft(scale4)
  // .ticks(20, ".2s");
  .ticks(10, "f");

// minor ticks
// var axis2m = d3.axisLeft(scale2)
//   .ticks(2000, "f");
// var axis1m = d3.axisLeft(scale1)
//   .ticks(200, "f");

// var yAxis = d3.axisLeft(y1);

// BUILD MINI TL
// mini timeline
var miniTL = d3.select("#miniTL")
  .append("svg")
  .attr("width", miniWidth+2*m)
  .attr("height", miniHeight+mTop+m)
  .append("g")
  .attr("transform", "translate(" + m + "," + mTop + ")") // position miniTL
  .attr("height", miniHeight)
  .attr("width", miniWidth);

miniTL.append("rect")
  .attr("x", 0.05*x2(1))
  .attr("width", function(d) {return .8*x2(1)})
  // height edited to match limit of miniBox slider
  // .attr("height", (miniHeight-16))
  .attr("height", (miniHeight))
  .attr("fill", "#edf1f2");

// Load data and build timelines
// d3.tsv("web_timeline4.2.tsv", function(items) {
d3.tsv("web_timeline4.2.tsv", function(items) {

  // lines

  // main events
  mainTL.append("g").selectAll("mainEvent")
    .data(items)
    .enter().append("rect")
    .attr("class", function(d) {return "event" + d.lane + " mainEvent" + " event" + d.lane + d.start + " step"})
    .attr("id", function(d) {return "mainEvent"+ d.lane + d.start})
    .attr("y", function(d) {return multiScale(d.end, tf, t0, scaleDom);})
    .attr("x", .12*x1(1))
    .attr("width", function(d) {return .8*x1(1)})
    .attr("height", function(d) {return multiScale(d.start, tf, t0, scaleDom)-multiScale(d.end, tf, t0, scaleDom)});

  // append y-axes
  mainTL.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(20,0)")
    .call(axis0)
    .select(".domain").remove();

  mainTL.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(20,0)")
    .call(axis1)
    .select(".domain").remove();

  mainTL.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(20,0)")
    .call(axis2)
    .select(".domain").remove();

  mainTL.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(20,0)")
    .call(axis3)
    .select(".domain").remove();

  mainTL.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(20,0)")
    .call(axis4)
    .select(".domain").remove();


  // minor ticks
  // mainTL.append("g")
  //   .attr("class", "axis")
  //   .attr("transform", "translate(20,0)")
  //   .call(axis1m)
  //   .selectAll("text, .domain").remove();

  // mainTL.append("g")
  //   .attr("class", "axis")
  //   .attr("transform", "translate(20,0)")
  //   .call(axis2m)
  //   .selectAll("text, .domain").remove();

  // //mini events
  miniTL.append("g").selectAll("miniEvent")
    .data(items)
    .enter().append("rect")
    .attr("class", function(d) {return "event" + d.lane + " miniEvent" + " event" + d.lane + d.start})
    .attr("y", function(d) {return y2(d.end);})
    // .attr("x", function(d) {return x2(d.lane)+0.1*x2(1);})
    .attr("x", 0.05*x2(1))
    .attr("width", function(d) {return .8*x2(1)})
    .attr("height", function(d) {return y2(d.start)-y2(d.end)});

  miniTL.append("rect")
    .attr("id", "miniBox")
    .attr("width", function(d) {return .9*x2(1)})
    .attr("height", 8)
    .attr("fill", "purple")
    .attr("opacity", .3)
    .attr();

  // d3.selectAll(".event0-1000000").filter(".miniEvent")
  //   .attr("height", (86.8246-16));

 })

  // Add interactivity 
  function handleMouseOver(d, i) {
    if (d3.select(this).style("opacity") != 0) {
            d3.select(this)
              .transition()        
              .duration(200)      
              .style("opacity", 1);}
  };

  function handleMouseOut(d, i) {
    if (d3.select(this).style("opacity") > 0.4) {
            d3.select(this)
              .transition()        
              .duration(200)      
              .style("opacity", .4);}
  };
