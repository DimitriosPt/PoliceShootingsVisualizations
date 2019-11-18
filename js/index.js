// Add test data here (or make api call for data)
var data = {
            "name":"States",
			"color":"#FFF123",
            "children":[
				{"name": "California",
				"color":"#006BB6",
		 		 "children": [
					 {"name": "Black", "value": 10,"color":"#3D0C02",
                        "children":[
                            {"name": "Unarmed", "value": 8, "color": "#ff0000"},
                            {"name": "Armed", "value": 1,  "color": "#00FF00"},
                            {"name": "Mental", "value": 0,  "color": "#9B870C"}
                        ]
                     },
					 {"name": "White", "value": 1,"color":"#FFE0BD"},
					 {"name": "Hispanic", "value": 1,"color":"#E0AC69"},
					 {"name": "Asian", "value": 1,"color":"#FFDBAC"}
				   ]
				},
				{"name": "Nevada",
				"color":"#00843D",
		 		 "children": [
                     {"name": "Black", "value": 100,"color":"#3D0C02",
                         "children":[
                             {"name": "Unarmed", "value": 8, "color": "#ff0000"},
                             {"name": "Armed", "value": 1,  "color": "#00FF00"},
                             {"name": "Mental", "value": 1,  "color": "#9B870C"}
                         ]
                     },
                     {"name": "White", "value": 1,"color":"#FFE0BD"},
                     {"name": "Hispanic", "value": 1,"color":"#E0AC69"},
                     {"name": "Asian", "value": 1,"color":"#FFDBAC"}
				   ]
				},
				{"name": "Flordia",
				"color":"#c0ffb7",
		 		 "children": [
                     {"name": "Black", "value": 1,"color":"#3D0C02"},
                     {"name": "White", "value": 1,"color":"#FFE0BD"},
                     {"name": "Hispanic", "value": 1,"color":"#E0AC69"},
                     {"name": "Asian", "value": 1,"color":"#FFDBAC"}

				   ]
				},
				{"name": "Texas",
				"color":"#BF5700",
		 		 "children": [
                     {"name": "Black", "value": 19,"color":"#3D0C02"},
                     {"name": "White", "value": 4,"color":"#FFE0BD"},
                     {"name": "Hispanic", "value": 8,"color":"#E0AC69"},
                     {"name": "Asian", "value": 6,"color":"#FFDBAC"}
				   ]
				},
               {"name": "Delaware",
               "color":"#808080",
                "children": [
                      {"name": "Black", "value": 10,"color":"#3D0C02"},
                      {"name": "White", "value": 10,"color":"#FFE0BD"},
                      {"name": "Hispanic", "value": 15,"color":"#E0AC69"},
                      {"name": "Asian", "value": 13,"color":"#FFDBAC"}
                  ]
              },
              {"name": "New Mexico",
                  "color":"#228B22",
                  "children": [
                      {"name": "Black", "value": 8,"color":"#3D0C02"},
                      {"name": "White", "value": 9,"color":"#FFE0BD"},
                      {"name": "Hispanic", "value": 12,"color":"#E0AC69"},
                      {"name": "Asian", "value": 3,"color":"#FFDBAC"}
                  ] //value changes the physical size of the segment, should aggrigate with the number of shootings
              },
				{"name": "Mississippi",
				"color":"#BF0A30",
		 		 "children": [
                     {"name": "Black", "value": 10,"color":"#3D0C02"},
                     {"name": "White", "value": 11,"color":"#FFE0BD"},
                     {"name": "Hispanic", "value": 9,"color":"#E0AC69"},
                     {"name": "Asian", "value": 5,"color":"#FFDBAC"}
					]
				}
	        ]
};

data = {
    "name":"States",
    "color":"#FFF123",
    "children":[
        {"name": "California",
            "color":"#006BB6",
            "children": [{"name": "Black", "value": 10,"color":"#3D0C02"}]
        },
        {"name": "Nevada",
            "color":"#00843D",
            "children": [{"name": "Black", "value": 10,"color":"#3D0C02"}]
        }]
}
console.log("Hard coded data",data);
let shootings = new Request("./data/policeShootingsJSON.json");
var newData = {
    "name":"States",
    "color":"#FFF123",
    "children":[
        {"name": "California",
            "color":"#006BB6",
            "children": [
                {"name": "Black", "value": 10,"color":"#3D0C02",
                    "children":[
                        {"name": "Unarmed", "value": 8, "color": "#ff0000"},
                        {"name": "Armed", "value": 1,  "color": "#00FF00"},
                        {"name": "Mental", "value": 1,  "color": "#9B870C"}
                    ]
                },
                {"name": "White", "value": 1,"color":"#FFE0BD"},
                {"name": "Hispanic", "value": 1,"color":"#E0AC69"},
                {"name": "Asian", "value": 1,"color":"#FFDBAC"}
            ]
        }
    ]
};

/*
* Color codes for the races
* Black Person
* Hex: #3D0C02
*
* White Person
* Hex: #FFE0BD
*
* Hispanic Person
* Hex: #E0AC69
*
* Asian Person
* Hex: #FFDBAC
*
* */
//Color generator
Colors = {};
Colors.random = function() {
    var result;
    var count = 0;
    for (var prop in this.names)
        if (Math.random() < 1/++count)
            result = prop;
    return result;
};


//Reading in the CSV file
/*
d3.csv("./data/fatal-police-shootings-data.csv", function (data) {
    console.log("d3 CSV", data);
});*/
var shoot;

var my_json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "./data/policeShootingsJSON.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();/*
console.log("My Json Test")
console.log(my_json);*/
console.log("All my_json ",my_json);

function randomColor(){
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

function raceConverter(race){
    if(race === 'A'){
        return "Asian"
    }
    if(race === 'B'){
        return "Black"
    }
    if(race === 'H'){
        return "Hispanic"
    }
    if(race === 'W'){
        return "White"
    }
    if(race === 'O'){
        return "Other"
    }
    if(race === 'N'){
        return "None"
    }
    return race;

}

function colorConverter(race){
    if(race === 'A'){
        return "#FFDBAC"
    }
    if(race === 'B'){
        return "#3D0C02"
    }
    if(race === 'H'){
        return "#E0AC69"
    }
    if(race === 'W'){
        return "#FFE0BD"
    }
    if(race === 'O'){
        return "#FFFFFF"
    }
    if(race === 'N'){
        return "#FFFFFF"
    }
    return randomColor();
}

function armedConverter(armed){
    if(armed === "gun"){
        return "#FF0000";
    }
    if(armed === "unarmed"){
        return "#00FF00"
    }
    if(armed === undefined){
        return "#00FF00"
    }
    if(armed === "toy weapon"){
        return "#00FF22"
    }
    return randomColor();
}

function builder(){
   // let output = {name: "States", color: "#FFF123", children:[], depth:0, dx:1, dy:0.25, value:4668,x:0, y:0};
    let output = {name: "States", color: "#FFF123", children:[]};

    for(const i in my_json){
        let State = output.children.find(e=>e.name === my_json[i].state);


        if(State === undefined){
            //console.log("State is ",my_json[i].state, i);
            State = {name: my_json[i].state, color: randomColor(), children:[]};
            output.children.push(State);
        }

        let Race = State.children.find(e=>e.name === raceConverter(my_json[i].race));

        if(Race === undefined){
            Race = {name: raceConverter(my_json[i].race), value: 1, color: colorConverter(my_json[i].race), children:[]};
            State.children.push(Race);
        }
        else {
            Race.value++;
        }
        //if(my_json[i].armed != undefined) {
            let armed = Race.children.find(e => e.name === my_json[i].armed);
            if (armed === undefined) {
                armed = {name: my_json[i].armed, value: 1, color: armedConverter(my_json[i].armed)};
                Race.children.push(armed);
            }
            else{
                // Race.children.value++;
                armed.value++;
            }
        //}
    }
    return output;
}

console.log("Builder JSON",builder());
data = builder();
console.log("Data ", data);
//data = builder();

/*var testing = function(){
      var builder = ["name: States", "color : #FFF123", children[

          ]];
};

var viewData = {
    my_json : []
};

function onGeneratedRow(columnsResult)
{
    var jsonData = {};
    columnsResult.forEach(function(column)
    {
        var columnName = column.metadata.colName;
        jsonData[columnName] = column.value;
    });
    viewData.employees.push(jsonData);
}*/
var revised_shootings = {
    "name":"States",
    "color":"#FFF123",
    "children":[
    {"name": "California",
        "color":"#006BB6",
        "children": [
            {"name": "Black", "value": 10,"color":"#3D0C02"},
            {"name": "White", "value": 1,"color":"#FFE0BD"},
            {"name": "Hispanic", "value": 1,"color":"#E0AC69"},
            {"name": "Asian", "value": 1,"color":"#FFDBAC"}
        ]
    },
    ]
};
console.log("Revised Shootings Test", revised_shootings);
/*var formatter;
my_json.forEach(function (person) {
    formatter =
    revised_shootings.push(formatter);
})*/



//Using a fetch to read in the json file
// May need to use this method when the data file is online

// This can control the size of the starburst
// Size/state related variables
var width = 900,
    height = 900,
    outer_radius = width/2.5,
    arc_transition; // save current arc transition

// Create scales
var x = d3.scale.linear()
      .range([0, 2 * Math.PI]),
    
    y = d3.scale.linear()
      .range([0, width/2]);


// Partition layout
var partition = d3.layout.partition(),
    nodes = partition.nodes(data);
	//nodes = partition.nodes(shootings);

// Arc generator
var arc_generator = d3.svg.arc()
      .startAngle(function(d) { 
        return Math.max(0, Math.min(2 * Math.PI, x(d.x))); 
      })
      .endAngle(function(d) { 
        return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); 
      })
      .innerRadius(function(d) { 
        return Math.max(0, y(d.y)); 
      })
      .outerRadius(function(d) { 
        return Math.max(0, y(d.y + d.dy)); 
      });

/*d3.svg.append("image")
  .attr("xlink:href", "../images/2.jpg")
  .attr("x", -650)
  .attr("y", -650);
*/

// Append a centered group for the burst to be added to
var burst_group = d3.select('.chart')
                   .append('svg')
                   .attr({
                     width: width,
                     height: height
                   })
                   .append('g')
                   .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')')
					.text("place");

burst_group.select("svg").append("text")
   .attr("class", "total")
   .attr("text-anchor", "middle")
	 .attr('font-size', '4em')
	 .attr('y', 20)
    .style("font-size", "40px");

svg.append("text")
    .attr("class", "total")
    .attr("text-anchor", "middle")
    .attr('font-size', '4em')
    .attr('y', 20)
    .text(total);

d3.select(".total").text("Shootings Per State1").style("font-size", "40px");



/*d3.svg.select("g").append("svg:text")
    .on("click",click)
    .style("font-size","4em")
    .style("font-weight","bold")
    .text(function(d) { return d.name; });
*/
// Append Arcs
var arcs = burst_group.selectAll("path.ark")
    .data( nodes )
    .enter().append("path")
    .attr({
      d: arc_generator,
      class: function(d) { return 'ark -depth-' + d.depth; }
    })
    .style("fill", function(d,i) { 
      if (d.depth > 0){return d.color;} 
		//else{return "#fff123";}
    })
	.style("font-size",function(d){if(d.depth==0){return "4em";}})

	.attr('stroke', '#fff') // <-- THIS (for arc padding)
    .attr('stroke-width', '1.2') // <-- THIS (for arc padding) Stroke controls the width of the line between the attributes
	.text(function(d) { if (d.depth>0){return d.name;}else{return "Shootings Per State2";} })
    .on("click", click)
    .on('mouseover', function(d) {
      if (d.depth > 0) {
        var names = getNameArray(d);
        fade(arcs, 0.3, names, 'name'); 

        update_crumbs(d);

		//console.log(names[0]);

		d3.select("#name")
      .text(names[0]);

		d3.select("#explanation")
      .style("visibility", "");
		
      }
	else{
		var names = ['Shootings By State'];
        fade(arcs, 0.3, names, 'name');

		d3.select("#name")
		.style("font-weight","bold","font-size","50px")
      .text(names[0]);

		d3.select("#explanation")
      .style("visibility", "");
	}
    })
    .on('mouseout', function(d) {
      fade(arcs, 1);
      remove_crumbs();

	d3.select("#explanation")
      .style("visibility", "hidden");
    });


// Updates breadcrumbs
function update_crumbs(d) {
  var crumb_container = d3.select('.crumbs'),
      sections = getNameArray(d);
  
  // Remove existing crumbs
  remove_crumbs();
  
  // Append new crumbs
  sections.reverse().forEach(function(name) {
    crumb_container.append('span')
      .classed('crumb', true)
      .text(name);
  });
};

// Removes all crumb spans
function remove_crumbs() {
  d3.select('.crumbs').selectAll('.crumb').remove();
};

// Handle Clicks
function click(d) {
  arc_transition = arcs.transition('arc_tween')
    .duration(750)
    .attrTween("d", arcTween(d));
};

// Retrieve arc name and parent names
function getNameArray(d, array) {
  array = array || [];

  // Push the current objects name to the array
  array.push(d.name);

  // Recurse to retrieve parent names
  if (d.parent) getNameArray(d.parent, array);

  return array;
};

// Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate( x.domain(), [d.x, d.x + d.dx] ),
      yd = d3.interpolate( y.domain(), [d.y, 1] ),
      yr = d3.interpolate( y.range(), [d.y ? 20 : 0, outer_radius] );

  return function(d, i) {
    return i
        ? function(t) { return arc_generator(d); }
        : function(t) { 
            x.domain( xd(t) ); 
            y.domain( yd(t) ).range( yr(t) ); 
      
            return arc_generator(d); 
        };
  };
};

// Fade a selection filtering out the comparator(s)
function fade(selection, opacity, comparators, comparatee) {
  var type = typeof comparators,
      key = comparatee ? comparatee : 'value';

  selection.filter(function(d, i) {
                // Remove elements based on a string or number
                if (type === "string" || type === "number") {
                  return d[key] !== comparators;

                // Remove elements based on an array
                } else if (type === 'object' && typeof comparators.slice === 'function') {
                  return comparators.indexOf(d[key]) === -1;

                // If there is no comparator keep everything 
                } else return true;
            })
            .transition('fade')
            .duration(250)
            .style('opacity', opacity);
};
