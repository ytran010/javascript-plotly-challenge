var sample_data 
d3.json("../data/samples.json").then(function(importedData) {
    sample_data = importedData

    var select = d3.select("#selDataset")

    var samples = sample_data.samples

    var sample_id = samples.map(row => row.id)

    sample_id.forEach((value, index)=>{

        select.append("option").text(value).property("value", index)
    })
    update(0)
    updateBar(0)
    sorryToBurstYour(0)
})

var sample_index
var sample_values
var data
var metavalue
var otu_ids
var otu_labels

function update(value){
  sample_index = sample_data.samples[value]

  sample_values = sample_index.sample_values
  otu_ids = sample_index.otu_ids
  otu_labels = sample_index.otu_labels
  // otu_ids = otu_ids.toString();

  sample_values.sort(function(a, b){
    return parseFloat (b) - parseFloat(a)
});

data = sample_values.slice(0, 10);
// Reverse the array due to Plotly's defaults
data  = data.reverse();

metavalue = sample_data.metadata[value]

var meta = d3.selectAll("#sample-metadata");

meta.html("");

Object.entries(metavalue).forEach(([key, value])=>{
  
  var demInfo = meta.append("div");
  // meta.html(`<div class="panel-body">${key}: ${value}</div>`)
  demInfo.text(`${key}: ${value}`)
})
// updateBar(value)
}

function updateBar(sickBars){
var trace1 = {
  x: data,
  y: `OTU ${otu_ids}`,
  // y: "Content",
  text: otu_labels,
  name: "Bar Graph",
  type: "bar",
  orientation: "h"
};

// data
var barData = [trace1];

// Apply the group bar mode to the layout
var layout = {
  title: "Bar Chart"
}

Plotly.newPlot("bar", barData, layout);
}

function sorryToBurstYour(bubble){
  var trace1 = {
    x: otu_ids,
    y: sample_values,
    mode: 'markers',
    marker: {
      size: sample_values,
      color: otu_ids
    },
    text: otu_labels
  };
  
  var bubData = [trace1];
  
  var layout = {
    title: 'Bubble Chart',
    xaxis: {title: "OTU ID"}
    // showlegend: false,
    // height: 600,
    // width: 600
  };
  
  Plotly.newPlot('bubble', bubData, layout);
}

// function dirtyBellyGauge(gross){
  
//   // part of data to input
//   var traceGauge = {
//     type: 'pie',
//     showlegend: false,
//     hole: 0.4,
//     rotation: 90,
//     values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
//     text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
//     direction: 'clockwise',
//     textinfo: 'text',
//     textposition: 'inside',
//     marker: {
//       colors: ['','','','','','','','','','white'],
//       labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
//       hoverinfo: 'label'
//     }
//   }

//   // needle
//   var degrees = 50, radius = .9
//   var radians = degrees * Math.PI / 180
//   var x = -1 * radius * Math.cos(radians) * wfreqNum
//   var y = radius * Math.sin(radians)

//   var gaugeLayout = {
//     shapes: [{
//       type: 'line',
//       x0: 0.5,
//       y0: 0.5,
//       x1: 0.6,
//       y1: 0.6,
//       line: {
//         color: 'black',
//         width: 3
//       }
//     }],
//     title: 'Chart',
//     xaxis: {visible: false, range: [-1, 1]},
//     yaxis: {visible: false, range: [-1, 1]}
//   }

//   var dataGauge = [traceGauge]

//   Plotly.plot('gauge', dataGauge, gaugeLayout)
// }



function optionChanged(value){
  update(value)
  updateBar(value)
  sorryToBurstYour(value)
  }