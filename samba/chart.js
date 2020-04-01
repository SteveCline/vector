//GLOBAL VARS
var graph = document.querySelector("#graph");
var graphWidth = graph.clientWidth;
var graphHeight = graph.clientHeight;
var ns = "http://www.w3.org/2000/svg";
var svg = document.createElementNS(ns, "svg");
var graphDetails = document.querySelector("#graph-details");
svg.setAttributeNS(null, "width", "100%");
svg.setAttributeNS(null, "height", "100%");
var graphLine = document.createElementNS(ns, "polyline");
graphLine.classList.add("graph-line");
svg.appendChild(graphLine);
graph.appendChild(svg);
//GLOBALS FOR SELECTED FEATURE
var trailLength;
var selectedTrailFeatureNumb;

window.addEventListener("resize", function(){
    graphWidth = graph.clientWidth;
    graphHeight = graph.clientHeight;
    createSvgLine(trailsData.features[selectedTrailFeatureNumb].geometry.coordinates);
});

function createSvgLine(coordArray){
    var xDistance = [0]; //X Values Distances between lat lng
    var yElevation = []; //Y Values Elevations
    var coordArrayLen = coordArray.length;
    var coordArrayLenMinusOne = coordArrayLen - 1;
    for (var i = 0; i < coordArrayLen; i++) {
        if (i != coordArrayLenMinusOne){
            var d = findDistanceFeet(coordArray[i],coordArray[i + 1]);
            xDistance.push(d);
        }
        yElevation.push(coordArray[i][2]);
    }
    var points = "-1000," + graphHeight + " ";
    //var points = "";
    var elevationLen = yElevation.length;
    var elevationMax = Math.max(...yElevation);
    var elevationMin = Math.min(...yElevation);
    var elevationDiff = elevationMax - elevationMin;
    var m = (graphHeight - 20) / elevationDiff;
    var xDistanceTotalSum = xDistance.reduce((a, b) => a + b, 0);
    trailLength = xDistanceTotalSum;
    var distanceCounter = 0;
    for (var i = 0; i < elevationLen; i++) {
        distanceCounter += xDistance[i];
        var x =  Math.round(graphWidth * (distanceCounter/xDistanceTotalSum));
        var y = ((graphHeight - 10) - m * (yElevation[i] - elevationMin));
        points = points + " " + x + "," + y;
    }
    points = points + " " + (graphWidth + 1000) + "," + graphHeight;
    graphLine.setAttributeNS(null, "points", points);
    createLabels(6,xDistanceTotalSum);
}
//createSvgLine(trailsData.features[28].geometry.coordinates);
//console.log(trailsData.features[28].properties);

function createLabels(numb,trailLengthFeet){
    var oldLabels = svg.querySelectorAll(".graph-label");
    oldLabels.forEach(e => e.remove());
    var lenMiles = trailLengthFeet / 5280;
    console.log("Trail Len Ft " + trailLengthFeet);
    console.log("Trail Len Shape " + trailsData.features[selectedTrailFeatureNumb].properties.Shape_Leng);
    console.log("Trail Len Mi " + lenMiles);
    var counter = 0;
    var distance = 0;
    for (var i = 0; i < numb - 1; i++){
        var label = document.createElementNS(ns,"g");
        label.classList.add("graph-label");
        counter += graphWidth / numb;
        distance += lenMiles / numb;
        var text = distance.toFixed(2);
        var x = counter;
        var y = graphHeight - 2;
        label.innerHTML = "<text x='" + x + "' y='" + y + "'>" + text + "mi</text>";
        svg.appendChild(label);
    }
}

//-----VERT LINE-----
var vertLine = document.createElementNS(ns,"polyline");
vertLine.setAttributeNS(null,"stroke","#f47b20");
vertLine.setAttributeNS(null,"stroke-width", "2");
svg.appendChild(vertLine);
function addVertLine(e){
    var x;
    if (e.type == "mousemove"){
        x = e.clientX - 10;
    }
    else {
        x = e.touches[0].clientX - 10;
    }
    vertLine.setAttributeNS(null,"points", x + ",0 " + x + "," + graphHeight);
    var distInMiles = (trailLength / 5280) * (x / graphWidth);
    var along = turf.along(trailsData.features[selectedTrailFeatureNumb],distInMiles,{units:"miles"});
    var explode = turf.explode(trailsData.features[selectedTrailFeatureNumb]);
    var near = turf.nearestPoint(along,explode);
    map.getSource("locator-source").setData(along);
    graphDetails.innerHTML = distInMiles.toFixed(2) + " mi<br>" + Math.round(near.geometry.coordinates[2]).toLocaleString("en") + " ft";
}
function removeVertLine(e){
    vertLine.setAttributeNS(null,"points", "");
    map.getSource("locator-source").setData({"type": "Feature","geometry": {"type": "Point","coordinates": [0,-90]}});
    graphDetails.innerText = "";
}
svg.addEventListener("mousemove", addVertLine);
svg.addEventListener("mouseout", removeVertLine);
svg.addEventListener("touchstart", addVertLine);
svg.addEventListener("touchmove", addVertLine);
svg.addEventListener("touchend", removeVertLine);
//-----VERT LINE-----       
function findDistanceFeet(c1,c2) {
    function degToRad(deg) {return deg * Math.PI/180;}
    // convert coordinates to radians
    var lng1 = degToRad(c1[0]);
    var lat1 = degToRad(c1[1]);
    var lng2 = degToRad(c2[0]);
    var lat2 = degToRad(c2[1]);
    var deltaLat = lat2 - lat1;
    var deltaLng = lng2 - lng1;
    var R = 20914080; //Miles is 3961
    // Haversine Formula
    var a = Math.pow(Math.sin(deltaLat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLng/2),2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}