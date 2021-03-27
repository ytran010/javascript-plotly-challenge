// d3.selectAll("select").on("change", function() {
//     // What will be logged out? What is `this` in this case?
//     d3.json("../data/samples.json").then((importedData) => {
//             // console.log(importedData);
//             var data = importedData;
//             data.map(row => row.names)
//             console.log(row.names)
//             // Sort the data array using the greekSearchResults value
//             // data.sort(function(a, b) {
//             //   return parseFloat(b.sample_values) - parseFloat(a.sample_values);
//             // });
          
//             // // Slice the first 10 objects for plotting
//             // data = data.slice(0, 10);
          
//             // // Reverse the array due to Plotly's defaults
//             // data = data.reverse();
          
//             // // Trace1 for the Greek Data
//             // var trace1 = {
//             //   x: data.map(row => row.sample_values),
//             //   y: data.map(row => row.otu_ids),
//             //   text: data.map(row => row.otu_labels),
//             // //   name: "Greek",
//             //   type: "bar",
//             //   orientation: "h"
//             // };
//     // Answer: It will console log the `button` element.
//   });})
d3.json("../data/samples.json").then(function(importedData) {
    
    console.log(importedData.names)
})
  

// d3.json("data/data.json").then((importedData) => {
//     // console.log(importedData);
//     var data = importedData;
  
//     // Sort the data array using the greekSearchResults value
//     data.sort(function(a, b) {
//       return parseFloat(b.sample_values) - parseFloat(a.sample_values);
//     });
  
//     // Slice the first 10 objects for plotting
//     data = data.slice(0, 10);
  
//     // Reverse the array due to Plotly's defaults
//     data = data.reverse();
  
//     // Trace1 for the Greek Data
//     var trace1 = {
//       x: data.map(row => row.sample_values),
//       y: data.map(row => row.otu_ids),
//       text: data.map(row => row.otu_labels),
//     //   name: "Greek",
//       type: "bar",
//       orientation: "h"
//     };
  
//     // data
//     var chartData = [trace1];
  
//     // Apply the group bar mode to the layout
//     var layout = {
//       title: "Greek gods search results",
//       margin: {
//         l: 100,
//         r: 100,
//         t: 100,
//         b: 100
//       }
//     };
  
//     // Render the plot to the div tag with id "plot"
//     Plotly.newPlot("plot", chartData, layout);
//   });
  