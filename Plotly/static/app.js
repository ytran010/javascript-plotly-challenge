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
    Gauge1(0)
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
  otu_ids_bar = sample_index.otu_ids.map(d => "OTU " + d)
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
  y: otu_ids_bar,
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

function Gauge1(){
  var gauge_data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      gauge: {
      axis: { range: [0, 10] },
            bar: { color: "#fd9c51"},
            steps: [
              { range: [0, 1], color: "#f7fcf5" },
              { range: [1, 2], color: "#e6f5e1" },
              { range: [2, 3], color: "#cdebc7" },
              { range: [3, 4], color: "#addea7" },
              { range: [4, 5], color: "#88cd87" },
              { range: [5, 6], color: "#5db96b" },
              { range: [6, 7], color: "#38a055" },
              { range: [7, 8], color: "#1b843f" },
              { range: [8, 9], color: "#04672b" },
              { range: [9, 10], color: "#00441b" }]
            },
      value: metavalue.wfreq,
      title: { text: "Washing Frequency" },
      type: "indicator",
      mode: "gauge+number"
    }
  ];
  
  var layout = { width: 600, height: 500, margin: { t: 1, b: 0, l:0 } };
  Plotly.newPlot('gauge', gauge_data, layout);
}


function optionChanged(value){
  update(value)
  updateBar(value)
  sorryToBurstYour(value)
  Gauge1(value)
  }