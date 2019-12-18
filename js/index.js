
let shootings = new Request("./data/policeShootingsJSON.json");

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

var my_json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "./data/shootings1.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

    function getRandomColor(color) {
        var p = 1,
            temp,
            random = Math.random(),
            result = '#';
    
        while (p < color.length) {
            temp = parseInt(color.slice(p, p += 2), 16)
            temp += Math.floor((255 - temp) * random);
            result += temp.toString(16).padStart(2, '0');
        }
        return result;
    }

    var color = '#044681';


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
        return "Native American"
    }
    if(race === 'U'){
        return "Unknown"
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
    if(race === null) {
        return "#000000"
    }
    
}

function armedConverter(armed){
    if(armed === "gun"){
        return "#AF002A";
    }
    if(armed === "unarmed"){
        return "#379E4C"
    }
    if(armed === undefined){
        return "#72859E"
    }
    if(armed === "toy weapon"){
        return "#33819E"
    }
    return "#000000";
}

function builder(){
   // let output = {name: "States", color: "#FFF123", children:[], depth:0, dx:1, dy:0.25, value:4668,x:0, y:0};
    let output = {name: "States", color: "#FFF123", children:[]};

    for(const i in my_json){
        let State = output.children.find(e=>e.name === my_json[i].state);


        if(State === undefined){
            //console.log("State is ",my_json[i].state, i);
            State = {name: my_json[i].state, color: getRandomColor(color), children:[]};
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

data = builder();

//Using a fetch to read in the json file
// May need to use this method when the data file is online

// This can control the size of the starburst
// Size/state related variables
var width = 600,
    height = 600,
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

d3.select(".total").text("Shootings Per State1").style("font-size", "40px");



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

	.attr('stroke', 'lightgray') // <-- THIS (for arc padding)
    .attr('stroke-width', '1') // <-- THIS (for arc padding) Stroke controls the width of the line between the attributes
	.text(function(d) { if (d.depth>0){return d.name;}else{return "Shootings Per State2";} })
    .on("click", click)
    .on('mouseover', function(d) {
      if (d.depth > 0) {
        var names = getNameArray(d);
        fade(arcs, 0.3, names, 'name'); 

        update_crumbs(d);
      }
	else{
		var names = ['Shootings By State'];
        fade(arcs, 0.3, names, 'name');

		d3.select("#name")
		.style("font-weight","bold","font-size","50px")
      .text(names[0]);

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
