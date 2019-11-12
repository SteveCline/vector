var map = L.map("map").setView([38.83,-98.58], 4);
var basemapOptions = {maxZoom:23,maxNativeZoom:19,attribution: "<a href='http://www.esri.com/'>esri</a>"};
var basemapStreets = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", basemapOptions).addTo(map);
var basemapTopographic = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", basemapOptions);
var basemapImagery = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", basemapOptions);
var basemapClarity = L.tileLayer("https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", basemapOptions);
L.control.layers({"Streets": basemapStreets,"Topographic": basemapTopographic,"Imagery": basemapImagery,"Clarity": basemapClarity}).addTo(map);
//DOM ELEMENTS
var layerContainer = document.querySelector("#layerBox");
var addNewFCButton = document.querySelector("#new-fc");
var importFCButton = document.querySelector("#import-fc");
var modalAddNewFC = document.querySelector("#new-fc-modal");
var modalImportFC = document.querySelector("#import-file-modal");
var modalSettings = document.querySelector("#settings-modal");
var modalStyle = document.querySelector("#style-modal");
var allModals = document.querySelectorAll(".modal");
var modalCloseButtons = document.querySelectorAll(".close-modal");
var createNewFCButton = document.querySelector("#create-new-fc");
var addPropertyButton = document.querySelector("#add-property");
var addPropertyButton2 = document.querySelector("#add-property-2");
var propertyList = document.querySelector("#prop-list");
var applySettings = document.querySelector("#apply-settings");
var applyStyle = document.querySelector("#apply-style");
var editPane = document.querySelector("#edit-pane");
var saveFeatureButton = document.querySelector("#save-feature");
var deleteFeatureButton = document.querySelector("#delete-feature");
var cancelFeatureButton = document.querySelector("#close-edit-pane");
var attributeList = document.querySelector("#attribute-pane");
var latLngPane = document.getElementById("lat-lng-pane");
var addGeoJsonButton = document.querySelector("#add-geojson-map");
var downloadGeoJsonButton = document.querySelector("#download-geojson");
var deleteFCButton = document.querySelector("#delete-fc");
//LAYER LIST HOLDS ALL DATA OBJECTS
var layerList = [];
//ACTIVE LAYER TRACKS ACTIVE LAYER FROM LAYERLIST & ACTIVE LEAFLET ID
var activeLayer = 0;
var activeFID = undefined;
//EDIT LAYER
var layerTemp = L.geoJson(null, {style: {color: "#00ffff", weight: 6}, pointToLayer:function(feature,latlng){
	return L.marker(latlng);
}}).addTo(map);
function onEachFeature(feature, layer) {
  layer.on("click", function(e){
    openEditPaneOnFeatureClick(e);
  });
}
//FEATURE COLLECTION CONSTRUCTOR
class FCLayer {
  constructor(layerName, layerData, geoType, layerOptions, layerProperties) {
    this.layerName = layerName;
    this.geoType = geoType;
    this.layerProperties = layerProperties;
    this.layer = L.geoJSON(layerData,layerOptions);
  }
}
//LAT LNG PANE
map.on("mousemove",function(e){
  var lat = e.latlng.lat.toFixed(6);
  var lng = e.latlng.lng.toFixed(6);
  latLngPane.innerText = "Lat: " + lat + ", Long: " + lng;
});
map.on("mouseout",function(e){
  latLngPane.style.display = "none";
});
map.on("mouseover",function(e){
  latLngPane.style.display = "block";
});

addNewFCButton.addEventListener("click",function(e){
	modalAddNewFC.style.display = "block";
});
addPropertyButton.addEventListener("click",function(e){
  createPropertyListItem(propertyList);
});
addPropertyButton2.addEventListener("click",function(e){
  addProperty(modalSettings.querySelector("#add-remove-prop-list"));
});
importFCButton.addEventListener("click",function(e){
  modalImportFC.style.display = "block";
});
applySettings.addEventListener("click",function(e){
  var inputRenameValue = modalSettings.querySelector("#rename-fc").value.trim();
  layerList[activeLayer].layerName = inputRenameValue;
  var geoJsonLayer = document.querySelectorAll(".geojson-layer");
  geoJsonLayer[activeLayer].childNodes[2].data = inputRenameValue;
  var propList = modalSettings.querySelector("#add-remove-prop-list");
  var newpropertiesArray = [];
  propList.childNodes.forEach(function(item){
    if (item.type === "text"){
      var prop = item.value.replace(/\s/g,"");
      if(prop.length > 0){
        newpropertiesArray.push(prop);
      }
    }
  });
  newpropertiesArray = [...new Set(newpropertiesArray)];
  updateProperties(activeLayer, newpropertiesArray);
  closeAllModals();
});

function updateProperties(activeLayer, newpropertiesArray){
  var removed = propsToRemove(newpropertiesArray,layerList[activeLayer].layerProperties);
  var added = propsToAdd(newpropertiesArray,layerList[activeLayer].layerProperties);
  if (removed.length != 0 || added.length != 0){
    var geoJson = layerList[activeLayer].layer.toGeoJSON(14);
    layerList[activeLayer].layer.clearLayers();
    for (var i = 0; i < geoJson.features.length; i++) {
      removed.forEach(function(item){
        delete geoJson.features[i].properties[item]; 
      });
      added.forEach(function(item){
        geoJson.features[i].properties[item] = null; 
      }); 
    }
    layerList[activeLayer].layer.addData(geoJson);
    layerList[activeLayer].layerProperties = newpropertiesArray;
  }
}

function propsToRemove(arrayNew,arrayOriginal){
  var removeArray = [];
  arrayOriginal.forEach(function(item){
    if(!arrayNew.includes(item)){
      removeArray.push(item);
    }
  });
  return removeArray;
}

function propsToAdd(arrayNew,arrayOriginal){
  var addArray = [];
  arrayNew.forEach(function(item){
    if(!arrayOriginal.includes(item)){
      addArray.push(item);
    }
  });
  return addArray;
}

addGeoJsonButton.addEventListener("click",function(e){
  var data = document.querySelector("input[type=file].geojson-file-input");
  for (var i = 0; i < data.files.length; i++) {
    getGeoJsonFiles(data.files[i]);
  } 
  closeAllModals();
});
function getGeoJsonFiles(item){
  var fcName = item.name.replace(/\.[^/.]+$/, "");
  var readFile = new FileReader();
  readFile.readAsText(item); 
  readFile.onload = function(e){
      var geoJson = JSON.parse(e.target.result);
      var firstGeoType = geoJson.features[0].geometry.type;
      var firstpropsArray = Object.keys(geoJson.features[0].properties);
      createLayer(fcName,geoJson,firstGeoType,firstpropsArray);
      var n = layerList.length - 1;
      map.fitBounds(layerList[n].layer.getBounds());
      createListItem(fcName,firstGeoType,n);
  };
}

function createLayer(layerName, layerData, geoType, layerProperties){
  var layerListNumber = layerList.length.toString();
  var style = {className: layerListNumber,color:"#3388ff",weight:3,fillColor:"#3388ff",fillOpacity:0.2};
  var options = {onEachFeature:onEachFeature, style: style};
  if (geoType === "Point" || geoType === "MultiPoint"){
		options.style.fillColor = "#ffffff";
    options.style.fillOpacity = 1;
    options.style.radius = 6;
    options.pointToLayer = function(feature, latlng){
			return L.circleMarker(latlng);
    };
    geoType = "Point";
  }
  if (geoType === "MultiPolygon"){
    geoType = "Polygon";
  }
  if (geoType === "MultiLineString"){
    geoType = "LineString";
  }
	var x = new FCLayer(layerName,layerData,geoType,options,layerProperties); 
	x.layer.addTo(map);
	layerList.push(x);
}

function createPropertyListItem(node){
  var inputBox = document.createElement("input");
  inputBox.setAttribute("type", "text");
  inputBox.setAttribute("placeholder", "Enter a property name");
  node.appendChild(inputBox);
}

//CLOSE ALL MODALS
for (var i = 0; i < modalCloseButtons.length; i++) {
    modalCloseButtons[i].addEventListener('click', function() {
    	closeAllModals(); 
    });
}

function closeAllModals(){
	var len = allModals.length;
	for (var i = 0; i < len; i++) {
        allModals[i].style.display = "none";
  }
  clearAllModals();
}

function clearAllModals(){
  document.querySelector("#new-fc-name").value = "";
  document.querySelector("#geo-type").value = "Polygon";
  document.querySelector("input[type=file].geojson-file-input").value = "";
  propertyList.innerHTML = "";
  modalSettings.querySelector("#add-remove-prop-list").innerHTML = "";
  createPropertyListItem(propertyList);
}

createNewFCButton.addEventListener("click",function(){
  var fcName = document.getElementById("new-fc-name").value;
  var fcNameTrim = fcName.trim();
	var geoType = document.getElementById("geo-type").value;
  var propertiesArray = [];
  var a = propertyList.querySelectorAll("input[type=text]");
  a.forEach(function(item){
    var prop = item.value.replace(/\s/g,"");
    if (prop.length > 0){
      propertiesArray.push(prop);
    }
  });
  propertiesArray = [...new Set(propertiesArray)];
  createLayer(fcNameTrim,null,geoType,propertiesArray);
  var n = layerList.length - 1;
  createListItem(fcNameTrim,geoType,n);
  closeAllModals();
});

function addCheckboxEventListener(n){ 
  var checkbox = document.querySelectorAll("input[type=checkbox].layer-checkbox");
  checkbox[n].addEventListener("change",function(){
		if (this.checked){
			map.addLayer(layerList[n].layer);
		}
		else {
			map.removeLayer(layerList[n].layer);
		}
	});
}

function createFeatureButtonEventListner(n, geoType){
  var button = document.querySelectorAll(".geojson-layer > .draw-btn");
  var type = "Polygon";
	if (geoType === "LineString" || geoType === "MultiLineString"){
		type = "Line";
	}
	else if (geoType === "Point" || geoType === "MultiPoint"){
		type = "Marker";
	}
  button[n].addEventListener("click",function(){
    layerTemp.clearLayers();
    editPane.style.display = "none";
    activeLayer = n;
    var strokeColor = layerList[activeLayer].layer.options.style.color;
    if (type === "Marker"){
			map.pm.enableDraw(type);
		}
		else{
			map.pm.enableDraw(type, {allowSelfIntersection: false, finishOn: "dblclick",templineStyle:{color:strokeColor},hintlineStyle:{color:strokeColor,dashArray:[5,5]}});
    }
	});
}

//STYLE
var strokeColor = modalStyle.querySelector("#style-stroke-color")
var strokeWeight = modalStyle.querySelector("#style-stroke-width");
var strokeWeightDisplay = modalStyle.querySelector("#style-stroke-width-value");
var fillColor = modalStyle.querySelector("#style-fill-color");
var fillOpacity = modalStyle.querySelector("#style-fill-opacity");
var fillOpacityDisplay = modalStyle.querySelector("#style-fill-opacity-value");
var radius = modalStyle.querySelector("#radius");
var radiusDisplay = modalStyle.querySelector("#radius-value");

strokeWeight.oninput = function(){
  strokeWeightDisplay.innerText = this.value + "px";
}
fillOpacity.oninput = function(){
  fillOpacityDisplay.innerText = getOpacityPercentToText(Number(this.value));
}
radius.oninput = function(){
  radiusDisplay.innerText = this.value + "px";
}
function getOpacityPercentToText(value){
  switch (value) {
    case 0: return "Invisible";
    break;
    case 0.1: return "10%";
    break;
    case 0.2: return "20%";
    break;
    case 0.3: return "30%";
    break;
    case 0.4: return "40%";
    break;
    case 0.5: return "50%";
    break;
    case 0.6: return "60%";
    break;
    case 0.7: return "70%";
    break;
    case 0.8: return "80%";
    break;
    case 0.9: return "90%";
    break;
    case 1: return "100%";
    break;
    default: "error";
  }
}

function styleModalEventListener(n,geoType){
  var button = document.querySelectorAll(".geojson-layer > .style-patch");
  button[n].addEventListener("click",function(){
    activeLayer = n;
    var header = modalStyle.querySelector(".modal-head");
    header.innerText = "Style - " + layerList[activeLayer].layerName;
    var layerStyle = layerList[activeLayer].layer.options.style;
    strokeColor.value = layerStyle.color;
    strokeWeight.value = layerStyle.weight;
    fillColor.value = layerStyle.fillColor;
    fillOpacity.value = layerStyle.fillOpacity;
    radius.value = layerStyle.radius;
    strokeWeightDisplay.innerText = layerStyle.weight + "px";
    fillOpacityDisplay.innerText = getOpacityPercentToText(Number(layerStyle.fillOpacity));
    radiusDisplay.innerText = layerStyle.radius + "px";
    var styleContainerChildren = document.querySelector(".grid-container").children;
    for (var i = 0; i < styleContainerChildren.length; i++) {
      styleContainerChildren[i].style.display = "block";
    } 
    if (layerList[activeLayer].geoType === "Polygon"){
      styleContainerChildren[4].style.display = "none";
      styleContainerChildren[5].style.display = "none";
    }
    else if (layerList[activeLayer].geoType === "LineString"){
      styleContainerChildren[2].style.display = "none";
      styleContainerChildren[3].style.display = "none";
      styleContainerChildren[4].style.display = "none";
      styleContainerChildren[5].style.display = "none";
    }
    modalStyle.style.display = "block";
	});
};

applyStyle.addEventListener("click",function(e){
  var style = {color: strokeColor.value,weight: strokeWeight.value,fillColor:fillColor.value,fillOpacity:fillOpacity.value,radius:radius.value};
  var layer = layerList[activeLayer].layer;
  layer.setStyle(style);
  layer.options.style.color = strokeColor.value;
  layer.options.style.weight = strokeWeight.value;
  layer.options.style.fillColor = fillColor.value;
  layer.options.style.fillOpacity = fillOpacity.value;
  layer.options.style.radius = radius.value;
  var patch = layerContainer.childNodes[activeLayer].querySelector("span");
  patch.innerHTML = "";
  if (layerList[activeLayer].geoType === "Polygon"){
    patch.innerHTML = '<svg><rect x="2" y="2" width="18" height="12" stroke="' + strokeColor.value + '" stroke-opacity="1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="' + fillColor.value + '" fill-opacity="' + fillOpacity.value + '" /></svg>';
  }
  else if (layerList[activeLayer].geoType === "LineString"){
    patch.innerHTML = '<svg><line x1="2" y1="14" x2="20" y2="2" width="18" height="12" stroke="' + strokeColor.value + '" stroke-opacity="1" stroke-width="3" stroke-linecap="round" />';
  }
  else {
    patch.innerHTML = '<svg><circle cx="11" cy="8" r="6" stroke="' + strokeColor.value + '" stroke-width="3" fill="' + fillColor.value + '" fill-opacity="' + fillOpacity.value + '" /></svg>';
  }
  modalStyle.style.display = "none";
});
//STYLE END

function openLayerSettingsEventListner(n){
  var button = document.querySelectorAll(".geojson-layer > .settings-btn");
  button[n].addEventListener("click",function(){
    layerTemp.clearLayers();
    map.pm.disableDraw();
    editPane.style.display = "none";
    activeLayer = n;
    var layer = layerList[activeLayer];
    var header = modalSettings.querySelector(".modal-head");
    header.innerText = "Settings - " + layer.layerName;
    var inputRename = modalSettings.querySelector("#rename-fc");
    inputRename.value = layer.layerName;
    var propList = modalSettings.querySelector("#add-remove-prop-list");    
    layer.layerProperties.forEach(function(item){
      addProperty(propList,item);
    });
    modalSettings.style.display = "block";
    //ALLOW FOR EXISTING PROPS TO BE RENAMED? NOT RIGHT NOW
    var propInput = propList.querySelectorAll("input[type=text]");
    propInput.forEach(function(item){
      item.disabled =  true;  
    }); 
  });
}

function addProperty(node,value){
  var inputBox = document.createElement("input");
  inputBox.setAttribute("type", "text");
  inputBox.setAttribute("placeholder", "Enter a property name");
  if (value){
    inputBox.value = value;
  }
  var deletePropButton = document.createElement("button");
  deletePropButton.classList.add("btn","red-btn");
  deletePropButton.innerText = "Delete";
  deletePropButton.title = "Delete Property";
  deletePropButton.addEventListener("click",function(e){
    deletePropButton.previousSibling.remove();
    deletePropButton.remove();
  });
  node.appendChild(inputBox);
  node.appendChild(deletePropButton);
}

map.on('pm:create', function(e){
  map.pm.disableDraw();
  var geoJson = e.layer.toGeoJSON(14);
  activeFID = undefined;
  e.layer.remove();
  var propsArray = layerList[activeLayer].layerProperties;
  propsArray.forEach(function(item){
    geoJson.properties[item] = null;
  });
  openEditPaneOnNewFeature(geoJson);
});

function populateAttributeList(propertiesObject){
  attributeList.innerHTML = "";
  var propArray = Object.entries(propertiesObject);
  if (propArray.length === 0){
    var item = document.createElement("li");
    item.innerText = "No Properties";
    attributeList.appendChild(item);
  }
  for (const [prop, value] of propArray){
    var li = document.createElement("li");
    var label = document.createElement("label");
    label.innerText = prop;
    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.value = value;
    li.appendChild(label);
    li.appendChild(input);
    attributeList.appendChild(li);
  }
}

function openEditPaneOnNewFeature(geoJson){
  layerTemp.addData(geoJson).bringToFront();
  layerTemp.pm.enable();
  var title = document.querySelector("#edit-pane-title");
  title.innerText = layerList[activeLayer].layerName;
  populateAttributeList(geoJson.properties);
  editPane.style.display = "block";
}

function openEditPaneOnFeatureClick(e){
  map.pm.disableDraw();
  var fid = L.stamp(e.target);
  activeFID = fid;
  if (e.target.options.hasOwnProperty("className")){
    activeLayer = Number(e.target.options.className);
  }
  else if (e.hasOwnProperty("layer")){
    activeLayer = Number(e.layer.options.className);
  }
  var title = document.querySelector("#edit-pane-title");
  title.innerText = layerList[activeLayer].layerName;
  populateAttributeList(layerList[activeLayer].layer.getLayer(activeFID).feature.properties);
	layerTemp.clearLayers();
  layerTemp.addData(e.target.feature).bringToFront();
  layerTemp.pm.enable();
  editPane.style.display = "block";
}

function resetEditPane(){
	editPane.style.display = "none";
  layerTemp.clearLayers();
  layerTemp.pm.disable();
}

function updatePropsOnSave(){
  var geoJson = layerTemp.toGeoJSON(14);
  var li = attributeList.querySelectorAll("li");
  var len = li.length;
  if (li[0].innerText != "No Properties"){
    for (var i = 0; i < len; i++) {
      var label = li[i].childNodes[0].innerText;
      var val = li[i].childNodes[1].value;
      if (!isNaN(val)){
        val = val.trim();
        if (val.length > 0){
            val = Number(val);
        }
      }
      if (val === ""){
        val = null;
      }
      geoJson.features[0].properties[label] = val;
    }
  }
}

//EDIT PANE EVENT LISTENER BUTTONS
saveFeatureButton.addEventListener("click",function(e){
  updatePropsOnSave();
  var parentLayer = layerList[activeLayer].layer;
  var hasLayer = parentLayer.hasLayer(parentLayer.getLayer(activeFID));
  //ERROR CHECKING IF ACTIVE FID IS NOT IN THE ACTIVE LAYER
  if (hasLayer){
    parentLayer.removeLayer(activeFID);
    parentLayer.addData(layerTemp.toGeoJSON(14));
  }
  else {
    parentLayer.addData(layerTemp.toGeoJSON(14));
  }
  resetEditPane();
});
deleteFeatureButton.addEventListener("click",function(e){
  var parentLayer = layerList[activeLayer].layer;
  var hasLayer = parentLayer.hasLayer(parentLayer.getLayer(activeFID));
  //ERROR CHECKING IF ACTIVE FID IS NOT IN THE ACTIVE LAYER
  if (hasLayer){
    parentLayer.removeLayer(activeFID);
  }
  resetEditPane();
});
cancelFeatureButton.addEventListener("click", function(e){
  resetEditPane();
});

function createListItem(fcName,geoType,activeLayer){
  var fcItem = document.createElement("div");
  fcItem.classList.add("geojson-layer");
  var checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "layer-checkbox";
  checkbox.checked = true;
  var patch = document.createElement("span");
  patch.classList.add("style-patch");
  patch.title = "Style";
  var t = document.createTextNode(fcName);
  var drawButton = document.createElement("button");
  drawButton.classList.add("draw-btn","layer-btn");
  if (geoType === "Polygon" || geoType === "MultiPolygon"){
    patch.innerHTML = '<svg><rect x="2" y="2" width="18" height="12" stroke="#38f" stroke-opacity="1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#38f" fill-opacity="0.2" /></svg>';
    drawButton.innerHTML = '<svg x="0px" y="0px" width="16px" height="16px"><path fill="#38f" d="M13.758,9.935l-1.572-4.372c0.385-0.322,0.635-0.799,0.635-1.34c0-0.969-0.785-1.754-1.754-1.754c-0.58,0-1.091,0.285-1.41,0.72L4.309,1.635C4.246,0.723,3.495,0,2.566,0C1.598,0,0.813,0.785,0.813,1.754c0,0.831,0.58,1.523,1.356,1.705l1.117,9.231c-0.568,0.29-0.961,0.875-0.961,1.557C2.325,15.215,3.109,16,4.078,16c0.914,0,1.655-0.701,1.738-1.593l6.497-1.719c0.317,0.454,0.842,0.753,1.438,0.753c0.969,0,1.754-0.786,1.754-1.754C15.504,10.722,14.723,9.938,13.758,9.935z M12.013,11.526l-6.497,1.719c-0.244-0.35-0.611-0.604-1.04-0.703L3.359,3.31c0.245-0.125,0.456-0.302,0.617-0.522l5.348,1.553c0.063,0.909,0.811,1.631,1.735,1.634l1.571,4.372C12.285,10.637,12.057,11.052,12.013,11.526z"/></svg>';
  }
  else if (geoType === "LineString" || geoType === "MultiLineString"){
    patch.innerHTML = '<svg><line x1="2" y1="14" x2="20" y2="2" width="18" height="12" stroke="#38f" stroke-opacity="1" stroke-width="3" stroke-linecap="round" />';
    drawButton.innerHTML = '<svg x="0px" y="0px" width="16px" height="16px"><path fill="#38f" d="M12.246,0c-0.969,0-1.754,0.785-1.754,1.754c0,0.382,0.126,0.733,0.334,1.022l-6.646,9.775c-0.138-0.034-0.279-0.059-0.428-0.059C2.785,12.492,2,13.277,2,14.246S2.785,16,3.753,16c0.969,0,1.754-0.785,1.754-1.754c0-0.383-0.125-0.733-0.333-1.021l6.646-9.775c0.137,0.035,0.278,0.059,0.427,0.059C13.215,3.508,14,2.722,14,1.754C14,0.785,13.215,0,12.246,0z"/></svg>';
  }
  else if (geoType === "Point" || geoType === "MultiPoint"){
    patch.innerHTML = '<svg><circle cx="11" cy="8" r="6" stroke="#38f" stroke-width="3" fill="#fff"/></svg>';
    drawButton.innerHTML = '<svg x="0px" y="0px" width="16px" height="16px"><path fill="#38f" d="M8,0C4.402,0,3.213,2.988,3.213,5.301C3.213,7.775,8,16,8,16s4.787-8.225,4.787-10.699C12.787,2.988,11.599,0,8,0z M8,6.65c-0.94,0-1.703-0.762-1.703-1.703S7.06,3.245,8,3.245c0.941,0,1.703,0.762,1.703,1.703S8.941,6.65,8,6.65z"/></svg>';
  }
  drawButton.title = "Create New Feature";
  var settingsButton = document.createElement("button");
  settingsButton.classList.add("settings-btn","layer-btn");
  settingsButton.innerHTML = '<svg x="0px" y="0px" width="16px" height="16px"><circle fill="#38f" cx="8" cy="3.0" r="1.8"/><circle fill="#38f" cx="8" cy="8.0" r="1.8"/><circle fill="#38f" cx="8" cy="13.0" r="1.8"/></svg>';
  settingsButton.title = "Settings";
  fcItem.appendChild(checkbox);
  fcItem.appendChild(patch);
  fcItem.appendChild(t);
  fcItem.appendChild(drawButton);
  fcItem.appendChild(settingsButton);
  layerContainer.appendChild(fcItem);
  addCheckboxEventListener(activeLayer);
  styleModalEventListener(activeLayer,geoType);
  createFeatureButtonEventListner(activeLayer,geoType);
  openLayerSettingsEventListner(activeLayer);
};

downloadGeoJsonButton.addEventListener("click",function(e){
  var geoJson = layerList[activeLayer].layer.toGeoJSON(14);
  var geoJsonStr = JSON.stringify(geoJson);
  var dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(geoJsonStr);
  var fileName = layerList[activeLayer].layerName + ".geojson";
  downloadGeoJsonButton.setAttribute("href",dataUri);
  downloadGeoJsonButton.setAttribute("download",fileName);
});

deleteFCButton.addEventListener("click",function(e){
  var c = confirm("Are you sure you want to delete " + layerList[activeLayer].layerName + "?");
  if (c){
    map.removeLayer(layerList[activeLayer].layer);
    layerList.splice(activeLayer,1,"no layer");
    //layerContainer.childNodes[activeLayer].remove();
    //MAYBE LOOK INTO A WAY TO REASSING LEAF CLASSES CURRENTLY JUST HIDES GEO LAYER ELEMENT
    layerContainer.childNodes[activeLayer].style.display = "none";
    closeAllModals();
  }
});


