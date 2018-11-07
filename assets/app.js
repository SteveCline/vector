//CREATE MAP AND BASEMAPS
var map = L.map("map").setView([38.83,-98.58], 5);
L.esri.options.attributionWidthOffset = 200;
var basemapStreets = L.esri.basemapLayer("Streets", {maxZoom:20,maxNativeZoom:19}).addTo(map);
var basemapTopographic = L.esri.basemapLayer("Topographic", {maxZoom:20,maxNativeZoom:19});
var basemapImagery = L.esri.basemapLayer("Imagery", {maxZoom:22,maxNativeZoom:19});
var basemapImageryClarity = L.esri.basemapLayer("ImageryClarity", {maxZoom:22,maxNativeZoom:19});
//DEFAULT LAYER CONTROL ADD TO MAP
L.control.layers({
	"Streets": basemapStreets,
	"Topographic": basemapTopographic,
	"Imagery": basemapImagery,
	"Clarity": basemapImageryClarity
}).addTo(map);
//GLOBAL VARs FOR DATA
var icon = L.divIcon({className: "map-marker", iconSize: [20,20]});
var layerTemp = L.geoJson(null, {style: {color: "#00ffff", weight: 6}, pointToLayer:function(feature,latlng){
	return L.marker(latlng, {icon:icon});
}}).addTo(map);
//STORED VALUE FOR ACTIVE LAYER FOR DRAWING AND EDITING
var activeLayer = undefined;
var tempObj = {};
function resetTempObj(){
	tempObj = {
		url: "",
		layerName: undefined,
		token: "",
		metadata: {},
		style: {}
	};
}
resetTempObj();
var layersList = [];
//THE EDITING GEOJSON OBJECT
var addedFeature = {};
//DEFAULT STYLES
var defaultPolygonStyle = {
	stroke: true,
	color: "#4f7ec0",
	opacity: 1,
	weight: 3,
	lineCap: "round",
	dashArray: null,
	fill: true,
	fillColor: "#4f7ec0",
	fillOpacity: 0.2
};
var defaultLineStyle = {
	stroke: true,
	color: "#4f7ec0",
	opacity: 1,
	weight: 4,
	lineCap: "round",
	dashArray: null,
	fill: false
};
var defaultPointStyle = {
	radius: 6,
	stroke: true,
	color: "#4f7ec0",
	opacity: 1,
	weight: 3,
	lineCap: "round",
	fill: true,
	fillColor: "#ffffff",
	fillOpacity: 1
};
//DOM ELEMENTS
var editPane = document.getElementById("edit-pane");
var editPaneTitle = document.getElementById("edit-pane-title");
var snackbar = document.getElementById("snackbar");
var editFeatureButton = document.getElementById("edit-feature");
var saveNewFeatureButton = document.getElementById("save-new-feature");
var saveFeatureButton = document.getElementById("save-feature");
var deleteFeatureButton = document.getElementById("delete-feature");
var allModals = document.getElementsByClassName("w3-modal");
var forms = document.getElementsByTagName("form");
var removeModal = document.getElementById("modal-remove-check");
var closeModalElements = document.getElementsByClassName("close-modal");
//CLOSE ALL MODALS
for (var i = 0; i < closeModalElements.length; i++) {
    closeModalElements[i].addEventListener('click', function() {
        closeAllModalsAndClearForms();
    });
}
function closeAllModalsAndClearForms(){
	var len = allModals.length;
	for (var i = 0; i < len; i++) {
        allModals[i].style.display = "none";
	}
	var formLen = forms.length
	for (var i = 0; i < formLen; i++) {
        forms[i].reset();
	}
	resetAddServiceModal();
}

function resetAddServiceModal(){
	document.getElementById("fs-credential-message").classList.add("w3-hide");
	document.getElementById("fs-credential").classList.add("w3-hide");
	document.getElementById("fs-message").classList.add("w3-hide");
	document.getElementById("fs-validate").disabled = false;
	document.getElementById("fs-url").disabled = false;
	document.getElementById("fs-tokenurl").disabled = false;
	document.getElementById("fs-username").disabled = false;
	document.getElementById("fs-password").disabled = false;
	document.getElementById("fs-validate-credential").disabled = true;
	document.getElementById("fs-addToMap").disabled = true;
}
document.getElementById("isHosted").addEventListener("click", function(e){
	var tokenInput = document.getElementById("fs-tokenurl");
	if (this.checked){
		tokenInput.value = "https://www.arcgis.com/sharing/rest/generateToken";
		tokenInput.disabled = true;
	}
	else {
		tokenInput.value = "";
		tokenInput.disabled = false;
	}
});

//LAT LNG PANE
var latLngPane = document.getElementById("lat-lng-pane");
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
//OPEN FS MODAL
document.getElementById("open-fs").addEventListener("click", function(){
	document.getElementById("modal-fs").style.display = "block";
});

function serverAuthentication(server, username, password, callback) {
    L.esri.post(server, {
        username: username,
        password: password,
        f: 'json',
        expiration: 43200, //12 hours
        client: 'referer',
        referer: window.location.origin
    }, callback);
}

var fsValidateURL = document.getElementById("fs-validate").addEventListener('click', function(e) {
    e.preventDefault();
    var url = document.getElementById("fs-url").value;
	var messageBox = document.getElementById("fs-message");
	messageBox.innerHTML = "";
	messageBox.classList.remove("w3-red", "w3-green");
	//CHECK TO SEE IF SERVICE IS ALREADY ON THE MAP
	var dupURL = "";
	for (var i = 0; i < layersList.length; i++){
		if (url === layersList[i].url){
			dupURL = url;
		}
	}
	//CHECK FOR NUMBER AT END OF URL AND HTTPS
	var lastCharacter = url.slice(-1);
	var isHTTPS = url.slice(0,5).toLowerCase();
	if (isNaN(lastCharacter)){
		messageBox.classList.remove("w3-hide");
		messageBox.classList.add("w3-red");
		messageBox.innerHTML = "<p>Service URL must end with a number</p>";
	}
	else if (isHTTPS != "https"){
		messageBox.classList.remove("w3-hide");
		messageBox.classList.add("w3-red");
		messageBox.innerHTML = "<p>Service must be secure over https.</p>";
	}
	else if (url === dupURL){
		messageBox.classList.remove("w3-hide");
		messageBox.classList.add("w3-red");
		messageBox.innerHTML = "<p>Service is already on the map. Can't add twice.</p>";
	}
	else {
		//RUN ESRI REQUEST
		L.esri.request(url, {}, function(error, response) {
			if (error) {
				credentialError(error, "fs-message");
			} else {
				credentialSuccess(response, "fs-message");
			}
		});
	}
});

function credentialError(error, elementID){
	var message = document.getElementById(elementID);
	var validateServiceButton = document.getElementById("fs-validate");
	var validateCeredentialButton = document.getElementById("fs-validate-credential");
	if (error.code == 499 || error.code == 403){
		//Token Required
		document.getElementById("fs-credential").classList.remove("w3-hide");
		document.getElementById("fs-url").disabled = true;
		validateServiceButton.disabled = true;
		validateCeredentialButton.disabled = false;
	}
	else {
		message.classList.remove("w3-hide");
		message.classList.add("w3-red");
		message.innerHTML = "<p>Code: " + error.code + "<br>" + error.message + "</p>";
	}
}

function credentialSuccess(response, elementID){
	var message = document.getElementById(elementID);
	if (response.type === "Feature Layer"){
		tempObj.metadata = response;
		var validateServiceButton = document.getElementById("fs-validate");
		var validateCredentialButton = document.getElementById("fs-validate-credential");
		var addToMapButton = document.getElementById("fs-addToMap");
		var urlInput = document.getElementById("fs-url");
		var tokenInput = document.getElementById("fs-tokenurl");
		var userNameInput = document.getElementById("fs-username");
		var passwordInput = document.getElementById("fs-password");
		message.classList.remove("w3-hide");
		message.classList.add("w3-green");
		getServiceCapabilitiesSentence(response.name,getGeoType(response.geometryType),response.capabilities, message);
		getFields(response.fields, message);
		addToMapButton.disabled = false;
		validateServiceButton.disabled = true;
		validateCredentialButton.disabled = true;
		urlInput.disabled = true;
		tokenInput.disabled = true;
		userNameInput.disabled = true;
		passwordInput.disabled = true;
	}
	else {
		message.classList.remove("w3-hide");
		message.classList.add("w3-red");
		message.innerHTML = "<p>Service must be of type Feature Layer.</p>";
	}	
}

function getServiceCapabilitiesSentence(name, geoType, capabilitiesString, element){
	var capabilitiesArray = capabilitiesString.split(",");
	var shortArray = [];
	for (var i = 0; i < capabilitiesArray.length; i++) {
		if (capabilitiesArray[i] === "Create"){
			shortArray.push(capabilitiesArray[i]);
		}
		if (capabilitiesArray[i] === "Delete"){
			shortArray.push(capabilitiesArray[i]);
		}
		if (capabilitiesArray[i] === "Update"){
			shortArray.push(capabilitiesArray[i]);
		}
	}
	var textCapabilities = "";
	if (shortArray.length === 0){
		textCapabilities = "This service is not editable and is view only.";
	}
	else {
		textCapabilities = "Service capabilities: " + shortArray.toString();
	}
	element.innerHTML = "<p>" + name + " is a valid " + geoType + " feature. " + textCapabilities + "</p>";
}

function getFields(array, element){
	var p = document.createElement("p");
	p.innerHTML = "Remove attributes you do not wish to view. Less attributes improves performance.<br>";
	for (var i = 0; i < array.length; i++) {
		if (array[i].type != "esriFieldTypeGlobalID" && array[i].type != "esriFieldTypeGeometry" && array[i].type != "esriFieldTypeOID"){
			var field = document.createElement("span");
			field.classList.add("w3-tag", "w3-round", "field-list-item");
			field.innerHTML = array[i].name + " <span class='remove-field' title='remove attribute'>&times;</span>";
			var space = document.createTextNode(" ");
			p.appendChild(field);
			p.appendChild(space);
		}
	}
	element.appendChild(p);
	//SETUP EVENT LISTENER
	var removeFields = document.getElementsByClassName("remove-field");
	for (var i = 0; i < removeFields.length; i++) {
		removeFields[i].addEventListener("click", function(e){
			this.parentElement.remove();
		});
	}
}

//GET THE GEOMETRY TYPE AS TEXT
function getGeoType(geometry){
	var g = "";
	if (geometry === "esriGeometryPoint" || geometry === "esriGeometryMultipoint"){
		g = "Point";
	}
	else if (geometry === "esriGeometryPolyline"){
		g = "Line";
	}
	else if (geometry === "esriGeometryPolygon"){
		g = "Polygon";
	}
	else {
		g = "None";
	}
	return g;
}

var fsValidateCredential = document.getElementById("fs-validate-credential").addEventListener("click", function(e){
	e.preventDefault();
	var url = document.getElementById("fs-url").value;
	var tokenurl = document.getElementById("fs-tokenurl").value;
    var username = document.getElementById("fs-username").value;
    var password = document.getElementById("fs-password").value;
	var credentialMessage = document.getElementById("fs-credential-message");
	var addToMapButton = document.getElementById("fs-addToMap");
	var validateCredentialButton = document.getElementById("fs-validate-credential");
	
	function validationError(error){
		credentialMessage.classList.add("w3-red");
		credentialMessage.innerHTML = "<p>Error: " + error.code + "<br>" + error.message + "</p>";
	}
	serverAuthentication(tokenurl, username, password, function(error, response) {
		credentialMessage.classList.remove("w3-hide","w3-red","w3-green");
		if (error){
			validationError(error);
		}
		else {
			tempObj.token = response.token;
			L.esri.service({url: url, token: response.token}).metadata(function(error, metadata){
				if(error){
					validationError(error);
				}
				else {
					credentialSuccess(metadata,"fs-credential-message");
				}
			});
		}
	});
});

function openEditPaneOnFeatureClick(e) {
	layerTemp.clearLayers();
    	layerTemp.addData(e.target.feature).bringToFront();
	if (e.target.options.hasOwnProperty("className")){
		activeLayer = Number(e.target.options.className);
	}
	else if (e.hasOwnProperty("layer")){
		activeLayer = Number(e.layer.options.className);
	}
	setEditPaneInfo(layersList[activeLayer].metadata, e.target);
	editPane.style.display = "block";
	//DISABLE BUTTONS IF CAPABILITES DO NOT EXIST
	if (layersList[activeLayer].metadata.capabilities.includes("Update")){
		editFeatureButton.disabled = false;
	}
	else {
		editFeatureButton.disabled = true;
	}
	if (layersList[activeLayer].metadata.capabilities.includes("Delete")){
		deleteFeatureButton.disabled = false;
	}
	else {
		deleteFeatureButton.disabled = true;
	}
	saveNewFeatureButton.classList.add("w3-hide");
	editFeatureButton.classList.remove("w3-hide");
	saveFeatureButton.classList.remove("w3-hide");
	saveFeatureButton.disabled = true;
}

function setEditPaneInfo(metadata, layer){
	editPaneTitle.innerText = metadata.name;
	var props = layer.feature.properties;
	var attributePane = document.getElementById("attribute-pane");
	var fieldsArray = metadata.fields;
	while (attributePane.hasChildNodes()) {
		attributePane.removeChild(attributePane.lastChild);
	}
	//LOOP TO FILL ATTRIBUTES
	for (var prop in props){
		var listItem = document.createElement("li");
		//LOOP TO MATCH FIELDS ARRAY
		for (var i = 0; i < fieldsArray.length; i++){
			if (fieldsArray[i].name === prop){
				//CHECK FOR A DOMAIN FIRST
				if (fieldsArray[i].domain != null){
					listItem.innerHTML = "<label>" + prop + "</label>";
					buildDomainOnClick(fieldsArray[i].domain, listItem, fieldsArray[i], props[prop]);
				}
				else {
					//ELSE CHECK FOR DATA TYPES FOR NON-DOMAIN FIELDS
					if (fieldsArray[i].type === "esriFieldTypeString"){
						if (props[prop] === "" || props[prop] === null || props[prop] === undefined || props[prop] === "null" || props[prop] === "Null" || props[prop] === "NULL"){
							listItem.innerHTML = "<label>" + prop + "</label><input class='w3-input w3-border attribute-input' type='text' maxlength='" + fieldsArray[i].length + "' placeholder='String' disabled>";
						}
						else {
							listItem.innerHTML = "<label>" + prop + "</label><input class='w3-input w3-border attribute-input' type='text'  value='" + props[prop] + "' maxlength='" + fieldsArray[i].length + "' placeholder='String' disabled>";
						}
					}
					else if (fieldsArray[i].type === "esriFieldTypeSmallInteger" || fieldsArray[i].type === "esriFieldTypeInteger"){
						if (props[prop] === "" || props[prop] === null || props[prop] === undefined || props[prop] === "null" || props[prop] === "Null" || props[prop] === "NULL"){
							listItem.innerHTML = "<label>" + prop + "</label><input class='w3-input w3-border attribute-input' type='number' placeholder='Integer' disabled>";
						}
						else {
							listItem.innerHTML = "<label>" + prop + "</label><input class='w3-input w3-border attribute-input' type='number' value=" + props[prop] + " placeholder='Integer' disabled>";
						}
					}
					else if (fieldsArray[i].type === "esriFieldTypeDouble"){
						if (props[prop] === "" || props[prop] === null || props[prop] === undefined || props[prop] === "null" || props[prop] === "Null" || props[prop] === "NULL"){
							listItem.innerHTML = "<label>" + prop + "</label><input class='w3-input w3-border attribute-input' type='number' step='0.1' placeholder='Double' disabled>";
						}
						else {
							listItem.innerHTML = "<label>" + prop + "</label><input class='w3-input w3-border attribute-input' type='number' value=" + Number(props[prop]) + " step='0.1' placeholder='Double' disabled>";
						}
					}
					else if (fieldsArray[i].type === "esriFieldTypeDate"){
						if (props[prop] === "" || props[prop] === null || props[prop] === undefined || props[prop] === "null" || props[prop] === "Null" || props[prop] === "NULL"){
							listItem.innerHTML = "<label>" + prop + "</label><input class='w3-input w3-border attribute-input' type='date' disabled>";
						}
						else {
							var date = new Date(props[prop]);
							var formatedDate = getDateString(date);
							listItem.innerHTML = "<label>" + prop + "</label><input class='w3-input w3-border attribute-input' type='date' value='" + formatedDate + "' disabled>";
						}
					}
					else {
						//FOR OTHER DATA TYPES SUPPLY TEXT FIELD
						if (props[prop] === "" || props[prop] === null || props[prop] === undefined || props[prop] === "null" || props[prop] === "Null" || props[prop] === "NULL"){
							listItem.innerHTML = "<label>" + prop + "</label><input class='w3-input w3-border attribute-input' type='text' disabled>";
						}
						else {
							listItem.innerHTML = "<label>" + prop + "</label><input class='w3-input w3-border attribute-input' type='text' value='" + props[prop] + "' disabled>";
						}
					}
				}
				//CHECK FOR REQUIRED FIELDS EXCEPT UNIQUE ID
				if (fieldsArray[i].hasOwnProperty("nullable") && !fieldsArray[i].nullable && fieldsArray[i].type != "esriFieldTypeOID"){
					var r = document.createElement("div");
					r.classList.add("w3-tiny");
					r.style.color = "#e74c3c";
					r.innerText = "*Required";
					listItem.appendChild(r);
				}
				attributePane.appendChild(listItem);
			}
		}
	}	
}

function buildDomainOnClick(domain, element, fields, property){
	if (domain.type === "codedValue"){
		var select = document.createElement("select");
		select.classList.add("w3-input", "w3-border", "attribute-input");
		var blankFirstOption = document.createElement("option");
		select.appendChild(blankFirstOption);
		var len = domain.codedValues.length;
		for (var i = 0; i < len; i++){
			var option = document.createElement("option");
			option.value = domain.codedValues[i].code;
			option.innerText = domain.codedValues[i].name;
			select.appendChild(option);
		}
		if (property != "" && property != null && property != undefined && property != "null" && property != "Null" && property != "NULL"){
			select.value = property;
		}
		select.disabled = true;
		element.appendChild(select);
	}
	if (domain.type === "range"){
		var range = document.createElement("input");
		range.classList.add("w3-input", "w3-border", "attribute-input");
		if (fields.type === "esriFieldTypeDate"){
			range.setAttribute("type", "date");
			var min = new Date(domain.range[0]);
			var max = new Date(domain.range[1]);
			range.setAttribute("min", getDateString(min));
			range.setAttribute("max", getDateString(max));
			if (property != "" && property != null && property != undefined && property != "null" && property != "Null" && property != "NULL"){
				var date = new Date(property);
				range.value = getDateString(date);
			}
			range.disabled = true;
		}
		else {
			range.setAttribute("type", "number");
			range.setAttribute("placeholder", "Range " + domain.range[0] + " to " + domain.range[1]);
			range.setAttribute("min", domain.range[0]);
			range.setAttribute("max", domain.range[1]);
			if (property != "" && property != null && property != undefined && property != "null" && property != "Null" && property != "NULL"){
				range.value = property;
			}
			range.disabled = true;
		}
		element.appendChild(range);
	}
}

function onEachFeature(feature, layer) {
    layer.on({
        click: openEditPaneOnFeatureClick
    });
}
//ADDS FS TO THE MAP
var addToMapButton = document.getElementById("fs-addToMap").addEventListener("click", function(e){
	e.preventDefault();
	var url = document.getElementById("fs-url").value;
	var options = {url: url, precision: 6, fields: getFieldsListArray(), onEachFeature:onEachFeature, cacheLayers: true};
	tempObj.url = url;
	layersList.push(tempObj);
	var numb = layersList.length - 1;
	//CHECK GEO TYPE AND ASSIGN STYLE
	var geoType = getGeoType(layersList[numb].metadata.geometryType);
	if (geoType === "Polygon"){
		defaultPolygonStyle.className = numb.toString();
		options.style = defaultPolygonStyle;
		layersList[numb].style = defaultPolygonStyle;
	}
	else if (geoType === "Line"){
		defaultLineStyle.className = numb.toString();
		options.style = defaultLineStyle;
		layersList[numb].style = defaultLineStyle;
	}
	else if (geoType === "Point"){
		defaultPointStyle.className = numb.toString();
		options.pointToLayer = function(feature, latlng){
			return L.circleMarker(latlng, defaultPointStyle);
		};
		layersList[numb].style = defaultPointStyle;
	}
	//CHECK FOR TOKEN
	if (layersList[numb].token.length != 0){
		options.token = layersList[numb].token;
		layersList[numb].layerName = L.esri.featureLayer(options);
	}
	else {
		layersList[numb].layerName = L.esri.featureLayer(options);
	}
	map.addLayer(layersList[numb].layerName);
	layersList[numb].layerName.query().bounds(function(error,bounds){
		if (bounds){
			map.fitBounds(bounds);
		}
	});
	closeAllModalsAndClearForms();
	createListItem(layersList[numb].metadata, url, numb);
	//SET LOCAL STORAGE
	var localStorageLayersList = getLocalStorageLayersList(layersList);
	localStorage.setItem("data", JSON.stringify(localStorageLayersList));
	resetTempObj();
});

function getLocalStorageLayersList(array){
	var storedArray = [];
	for (var i = 0; i < array.length; i++){
		var obj = {};
		if (array[i].url.length != 0 && array[i].token.length === 0){
			obj.url = array[i].url;
			obj.style = array[i].style;
			obj.vectorFields = array[i].metadata.vectorFields;
			storedArray.push(obj);
		}
	}
	return storedArray;
}

function getFieldsListArray(){
	var fieldItem = document.getElementsByClassName("field-list-item");
	var fieldsArray = [];
	var metadataFields = tempObj.metadata.fields;
	//INCLUDE UNIQUE ID FIELD FIRST
	for (var i = 0; i < metadataFields.length; i++) {
	    if (metadataFields[i].type === "esriFieldTypeOID"){
			fieldsArray.push(metadataFields[i].name);
		}
	}
	//INCLUDE USER SELECTED FIELDS
	for (var i = 0; i < fieldItem.length; i++) {
	    var field = fieldItem[i].innerText.slice(0,-2);
		fieldsArray.push(field);
	}
	tempObj.metadata.vectorFields = fieldsArray;
	return fieldsArray;
}

function createListItem(metadata, url, layerID){
	var container = document.getElementById("layer-container");
	var layerItem = document.createElement("div");
	var layerItemTitle = document.createElement("div");
	var layerItemDropdown = document.createElement("div");
	layerItem.classList.add("w3-bar","layer-item");
	layerItemTitle.classList.add("w3-bar-item", "layer-item-title");
	layerItemTitle.innerText = metadata.name;
	layerItemTitle.title = metadata.name;
	layerItemDropdown.classList.add("w3-dropdown-hover", "w3-right");
	layerItemDropdown.innerHTML = "<div class='layer-button'>&vellip;</div>";
	var dropdownContent = document.createElement("div");
	dropdownContent.classList.add("w3-dropdown-content", "w3-bar-block", "w3-border");
	var itemAdd = "";
	var styleID = "style-" + metadata.name.replace(/\s+/g, '');
	var addID = "create-" + metadata.name.replace(/\s+/g, '');
	var hideID = "hide-" + metadata.name.replace(/\s+/g, '');
	var removeID = "remove-" + metadata.name.replace(/\s+/g, '');
	var geoType = getGeoType(metadata.geometryType);
	//ONLY ADD DRAW BUTTON IF THEY ENABLE CREATE
	if (metadata.capabilities.includes("Create")){
		itemAdd = "<div class='w3-bar-item layer-button' id='" + addID + "' title='create new " + metadata.name + "'>" + geoType + " &#x270E;</div>";
	}
	var itemVisible = "<div class='w3-bar-item layer-button' id='" + hideID + "'>Hide</div>";
	var itemStyle = "<div class='w3-bar-item layer-button' id='" + styleID + "'>Style</div>";
	var itemRemove = "<div class='w3-bar-item layer-button' id='" + removeID + "'>Remove</div>";
	var itemDetail = "";
	if (layersList[layerID].token != ""){
		itemDetail = "<a href='" + url + "?token=" + layersList[layerID].token + "' target='_blank' class='w3-bar-item layer-button'>Detail</a>";
	}
	else {
		itemDetail = "<a href='" + url + "' target='_blank' class='w3-bar-item layer-button'>Detail</a>";
	}
	
	
	
	dropdownContent.innerHTML = itemAdd + itemVisible + itemStyle + itemRemove + itemDetail;
	container.appendChild(layerItem);
	layerItem.appendChild(layerItemTitle);
	layerItem.appendChild(layerItemDropdown);
	layerItemDropdown.appendChild(dropdownContent);
	if (metadata.capabilities.includes("Create")){
		createFeatureEventListner(geoType, addID, layerID);
	}
	hideFeatureEventListner(hideID, layerID, addID);
	removeLayerEventListener(removeID, layerID);
	openStyleModal(styleID, geoType, layerID);
}

function openStyleModal(elementID, geoType, layerID){
	document.getElementById(elementID).addEventListener("click", function(e){
		activeLayer = layerID;
		resetStyleModal();
		if (geoType === "Point"){
			var ptHide = document.getElementsByClassName("pt-hide");
			for (var i = 0; i < ptHide.length; i++){
				ptHide[i].style.display = "none";
			}
		}
		if (geoType != "Point"){
			var notPtHide = document.getElementsByClassName("notPt-hide");
			for (var i = 0; i < notPtHide.length; i++){
				notPtHide[i].style.display = "none";
			}
		}
		if (geoType === "Line"){
			var lineHide = document.getElementsByClassName("line-hide");
			for (var i = 0; i < lineHide.length; i++){
				lineHide[i].style.display = "none";
			}
		}
		document.getElementById("modal-style").style.display = "block";
		setStyleModalContent(elementID, geoType, layerID);
	});
}

function resetStyleModal(){
	var ptHide = document.getElementsByClassName("pt-hide");
	for (var i = 0; i < ptHide.length; i++){
		ptHide[i].style.display = "block";
	}
	var notPtHide = document.getElementsByClassName("notPt-hide");
	for (var i = 0; i < notPtHide.length; i++){
		notPtHide[i].style.display = "block";
	}
	var lineHide = document.getElementsByClassName("line-hide");
	for (var i = 0; i < lineHide.length; i++){
		lineHide[i].style.display = "block";
	}
}

function hideFeatureEventListner(elementID, layerID, elmentIDtoDisable){
	var hideButton = document.getElementById(elementID);
	var drawButton = document.getElementById(elmentIDtoDisable);
	var layerItem = hideButton.closest(".layer-item");
	hideButton.addEventListener("click", function(){
		layerTemp.clearLayers();
		resetEditPane();
		if (map.hasLayer(layersList[layerID].layerName)){
			map.removeLayer(layersList[layerID].layerName);
			hideButton.innerText = "Show";
			layerItem.childNodes[0].style.opacity = 0.3;
			if (drawButton){
				drawButton.classList.add("w3-disabled");
			}
		}
		else {
			map.addLayer(layersList[layerID].layerName);
			hideButton.innerText = "Hide";
			layerItem.childNodes[0].style.opacity = 1;
			if (drawButton){
				drawButton.classList.remove("w3-disabled");
			}
		}
	});
}

function removeLayerEventListener(elementID,layerID){
	var removeButton = document.getElementById(elementID);
	removeButton.addEventListener("click", function(){
		removeModal.style.display = "block";
		var removeName = document.getElementById("removeName");
		removeName.innerText = layersList[layerID].metadata.name;
		activeLayer = layerID;
	});
}

var removeService = document.getElementById("remove-service").addEventListener("click", function(){
	layerTemp.clearLayers();
	resetEditPane();
	map.removeLayer(layersList[activeLayer].layerName);
	var removeButton = document.getElementById("remove-" + layersList[activeLayer].metadata.name.replace(/\s+/g, ''));
	removeButton.closest(".layer-item").remove();
	//EMPTY OUT LAYERS LIST ITEM
	layersList[activeLayer] = {
		url: "",
		layerName: undefined,
		token: "",
		metadata: {},
		style: {}
	};
	removeModal.style.display = "none";
	//SET LOCAL STORAGE
	var localStorageLayersList = getLocalStorageLayersList(layersList);
	localStorage.setItem("data", JSON.stringify(localStorageLayersList));
});

function createFeatureEventListner(geoType, elementID, layerID){
	var type = "Marker";
	if (geoType === "Line"){
		type = "Line";
	}
	else if (geoType === "Polygon"){
		type = "Poly";
	}
	document.getElementById(elementID).addEventListener("click", function(){
		activeLayer = layerID;
		resetEditPane();
		if (type === "Marker"){
			map.pm.enableDraw(type, {markerStyle: {icon:icon}});
		}
		else{
			map.pm.enableDraw(type, {allowSelfIntersection: false, finishOn: "dblclick",templineStyle:{color:"#00ffff"},hintlineStyle:{color:"#00ffff", dashArray:[2,5]}});
		}
		editFeatureButton.classList.add("w3-hide");
		saveFeatureButton.classList.add("w3-hide");
		saveNewFeatureButton.classList.remove("w3-hide");
		deleteFeatureButton.disabled = true;
		setBlankEditPaneInfo(layersList[activeLayer].metadata);
	});
}
//FOR CREATING A NEW FEATURE EVENT
function setBlankEditPaneInfo(metadata){
	editPaneTitle.innerText = metadata.name;
	var fieldsArray = metadata.fields;
	var fieldsArrayLength = fieldsArray.length;
	var attributePane = document.getElementById("attribute-pane");
	while (attributePane.hasChildNodes()) {
		attributePane.removeChild(attributePane.lastChild);
	}
	for (var i = 0; i < metadata.vectorFields.length; i++) {
	    var listItem = document.createElement("li");
		for (var g = 0; g < fieldsArrayLength; g++){
			if (fieldsArray[g].name === metadata.vectorFields[i]){
				//CHECK IS EDITABLE FIRST
				if (fieldsArray[g].editable){
					//CHECK FOR A DOMAIN NEXT
					if (fieldsArray[g].domain != null){
						listItem.innerHTML = "<label>" + metadata.vectorFields[i] + "</label>";
						var domain = fieldsArray[g].domain;
						buildDomainNewFeature(domain, listItem, fieldsArray[g]);
					}
					else {
						//ELSE CHECK FOR DATA TYPES FOR NON-DOMAIN FIELDS
						if (fieldsArray[g].type === "esriFieldTypeString"){
							listItem.innerHTML = "<label>" + metadata.vectorFields[i] + "</label><input class='w3-input w3-border attribute-input' type='text' maxlength='" + fieldsArray[g].length + "' placeholder='String'>";
						}
						else if (fieldsArray[g].type === "esriFieldTypeSmallInteger" || fieldsArray[g].type === "esriFieldTypeInteger"){
							listItem.innerHTML = "<label>" + metadata.vectorFields[i] + "</label><input class='w3-input w3-border attribute-input' type='number' placeholder='Integer'>";
						}
						else if (fieldsArray[g].type === "esriFieldTypeDouble"){
							listItem.innerHTML = "<label>" + metadata.vectorFields[i] + "</label><input class='w3-input w3-border attribute-input' type='number' step='0.1' placeholder='Double'>";
						}
						else if (fieldsArray[g].type === "esriFieldTypeDate"){
							listItem.innerHTML = "<label>" + metadata.vectorFields[i] + "</label><input class='w3-input w3-border attribute-input' type='date'>";
						}
						else {
							//FOR OTHER RARE DATA TYPES
							listItem.innerHTML = "<label>" + metadata.vectorFields[i] + "</label><input class='w3-input w3-border attribute-input' type='text'>";
						}
					}
					
				}
				//NOT EDITABLE
				else {
					listItem.innerHTML = "<label>" + metadata.vectorFields[i] + "</label><input class='w3-input w3-border attribute-input' type='text' disabled>";
				}
				//CHECK FOR REQUIRED FIELDS EXCEPT UNIQUE ID
				if (fieldsArray[g].hasOwnProperty("nullable") && !fieldsArray[g].nullable && fieldsArray[g].type != "esriFieldTypeOID"){
					var r = document.createElement("div");
					r.classList.add("w3-tiny");
					r.style.color = "#e74c3c";
					r.innerText = "*Required";
					listItem.appendChild(r);
				}
			}
		}
		attributePane.appendChild(listItem);
	}
}

function buildDomainNewFeature(domain, element, fields){
	if (domain.type === "codedValue"){
		var select = document.createElement("select");
		select.classList.add("w3-input", "w3-border", "attribute-input");
		var blankFirstOption = document.createElement("option");
		select.appendChild(blankFirstOption);
		var len = domain.codedValues.length;
		for (var i = 0; i < len; i++){
			var option = document.createElement("option");
			option.value = domain.codedValues[i].code;
			option.innerText = domain.codedValues[i].name;
			select.appendChild(option);
		}
		element.appendChild(select);
	}
	if (domain.type === "range"){
		var range = document.createElement("input");
		range.classList.add("w3-input", "w3-border", "attribute-input");
		if (fields.type === "esriFieldTypeDate"){
			range.setAttribute("type", "date");
			var min = new Date(domain.range[0]);
			var max = new Date(domain.range[1]);
			range.setAttribute("min", getDateString(min));
			range.setAttribute("max", getDateString(max));
		}
		else {
			range.setAttribute("type", "number");
			range.setAttribute("placeholder", "Range " + domain.range[0] + " to " + domain.range[1]);
			range.setAttribute("min", domain.range[0]);
			range.setAttribute("max", domain.range[1]);
		}
		element.appendChild(range);
	}
}

function getDateString(number){
	var year = number.getFullYear().toString();
	var month = number.getMonth() + 1;
	var monthStr = month.toString();
	if (monthStr.length === 1){
		monthStr = "0" + monthStr;
	}
	var day = number.getDate().toString();
	if (day.length === 1){
		day = "0" + day;
	}
	var string = year + "-" + monthStr + "-" + day;
	return string;
}
map.on('pm:drawstart', function(e) {
	var p = document.querySelectorAll("path");
	var len = p.length;
	for (var i = 0; i < len; i++){
		p[i].classList.remove("leaflet-interactive");
	}	
});
//EDITING STUFF
map.on('pm:create', function(e) {
	addedFeature = e.layer.toGeoJSON();
	e.layer.remove();
	layerTemp.addData(addedFeature);
	editPane.style.display = "block";
	map.pm.disableDraw();
	var p = document.querySelectorAll("path");
	var len = p.length;
	for (var i = 0; i < len; i++){
		p[i].classList.add("leaflet-interactive");
	}
});
//CLOSE EDIT PANE
var closeEditPane = document.getElementById("close-edit-pane").addEventListener("click", function(e){
	resetEditPane();
});
//SAVE NEW BUTTON EVENT LISTNER
saveNewFeatureButton.addEventListener("click", function(){
	//UPATE PROPS
	var geoJson = updatePropsOnEditOrNew(addedFeature);
	//ADD NULLS FOR BLANKS
	for (prop in geoJson.properties){
		if (geoJson.properties[prop] === ""){
			geoJson.properties[prop] = null;
		}
	}
	layersList[activeLayer].layerName.addFeature(geoJson, function (error, response) {
		if (response){
			if (!response.success){
				runSnackbar("Error: " + response.error.description, "w3-red");
			}
			else {
				runSnackbar("Success, feature saved", "w3-green");
			}
		}
		else if (error){
			runSnackbar("Error: feature not saved", "w3-red");
		}
	});
	resetEditPane();
});

function updatePropsOnEditOrNew(geoJson){
	var attributeNodes = document.getElementById("attribute-pane").childNodes;
	for (var i = 0; i < attributeNodes.length; i++) {
	    var key = attributeNodes[i].getElementsByTagName("LABEL")[0].innerText;
		var prop = attributeNodes[i].getElementsByClassName("attribute-input")[0].value;
		geoJson.properties[key] = prop;
	}
	return geoJson;
}
//EDIT FEATURE BUTTON EVENT LISTENER
editFeatureButton.addEventListener("click", function(e){
	var geoType = getGeoType(layersList[activeLayer].metadata.geometryType);
	var fieldsArray = layersList[activeLayer].metadata.fields;
	var fieldsArrayLength = fieldsArray.length;
	var options = {};
	if (geoType != "Point"){
		options =  {draggable: false, allowSelfIntersection: false};
		map.fitBounds(layerTemp.getBounds(), {paddingTopLeft: [50,50], paddingBottomRight: [350,50]});
	}
	layerTemp.pm.enable(options);
	var attributeInput = document.getElementsByClassName("attribute-input");
	var attributeInputLength = attributeInput.length;
	//ONLY DISABLE EDITABLE FIELDS
	for (var i = 0; i < fieldsArrayLength; i++){
		for (var g = 0; g < attributeInputLength; g++){
			var label = attributeInput[g].previousSibling.innerHTML;
			if (fieldsArray[i].name === label && fieldsArray[i].editable){
				attributeInput[g].disabled = false;
			}
		}
	}
	editFeatureButton.disabled = true;
	saveFeatureButton.disabled = false;
	deleteFeatureButton.disabled = true;
});
//SAVE EXISTING FEATURE BUTTON EVENT LISTNER
saveFeatureButton.addEventListener("click", function(){
	//UPATE PROPS
	var geoJson = updatePropsOnEditOrNew(layerTemp.toGeoJSON().features[0]);
	//ADD NULLS FOR BLANKS
	for (prop in geoJson.properties){
		if (geoJson.properties[prop] === ""){
			geoJson.properties[prop] = null;
		}
	}
	layersList[activeLayer].layerName.updateFeature(geoJson, function (error, response) {
		if (response){
			if (!response.success){
				runSnackbar("Error: " + response.error.description, "w3-red");
			}
			else {
				runSnackbar("Success, edit saved", "w3-green");
			}
		}
		else if (error){
			runSnackbar("Error: edit not saved", "w3-red");
		}
	});
	resetEditPane();
});
//SNACKBAR
function runSnackbar(message, colorClass){
	snackbar.classList.remove("w3-red", "w3-green");
	snackbar.innerText = message;
	snackbar.classList.add(colorClass, "show");
	setTimeout(function(){
		snackbar.classList.remove("show");
	}, 3000);
}
//DELETE BUTTON EVENT LISTNER
deleteFeatureButton.addEventListener("click", function(){
	document.getElementById("modal-delete-check").style.display = "block";
});
var deleteFeatureForever = document.getElementById("delete-feature-forever").addEventListener("click", function(){
	var id = layerTemp.toGeoJSON().features[0].id;
	layersList[activeLayer].layerName.deleteFeature(id, function (error, response) {
		if (response){
			if (!response.success){
				runSnackbar("Error: " + response.error.description, "w3-red");
			}
			else {
				runSnackbar("Success, feature deleted", "w3-green");
			}
		}
		else if (error){
			runSnackbar("Error: feature not deleted", "w3-red");
		}
	});
	resetEditPane();
	document.getElementById("modal-delete-check").style.display = "none";
});
//RESET EDIT PANE DEFAULTS
function resetEditPane(){
	editPane.style.display = "none";
	map.pm.disableDraw();
	layerTemp.clearLayers();
	editFeatureButton.disabled = false;
	saveFeatureButton.disabled = true;
	deleteFeatureButton.disabled = false;
	editFeatureButton.classList.remove("w3-hide");
	saveFeatureButton.classList.remove("w3-hide");
	saveNewFeatureButton.classList.add("w3-hide");
}

//STYLE
var styleStrokeOpacity = document.getElementById("style-stroke-opacity");
var styleStrokeOpacityValue = document.getElementById("style-stroke-opacity-value");
var styleStrokeWidth = document.getElementById("style-stroke-width");
var styleStrokeWidthValue = document.getElementById("style-stroke-width-value");
var styleFillOpacity = document.getElementById("style-fill-opacity");
var styleFillOpacityValue = document.getElementById("style-fill-opacity-value");
var styleStrokeColor = document.getElementById("style-stroke-color");
var styleFillColor = document.getElementById("style-fill-color");
var styleRadius = document.getElementById("style-radius");
var styleRadiusValue = document.getElementById("style-radius-value");

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

styleStrokeOpacity.oninput = function(){
	styleStrokeOpacityValue.innerText = getOpacityPercentToText(Number(this.value));
}
styleStrokeWidth.oninput = function(){
	styleStrokeWidthValue.innerText = this.value;
}
styleFillOpacity.oninput = function(){
	styleFillOpacityValue.innerText = getOpacityPercentToText(Number(this.value));
}
styleRadius.oninput = function(){
	styleRadiusValue.innerText = this.value;
}
//SET STYLE MODAL VALUES FROM THE DATA
function setStyleModalContent(elementID, geoType, layerID){
	var style = layersList[layerID].style;
	if (geoType === "Point"){
		styleRadius.value = style.radius;
		styleRadiusValue.innerText = style.radius; 
	}
	//SET STROKE T OR F
	var strokeElements = document.getElementsByName("style-stroke");
	for (var i = 0; i < strokeElements.length; i++) {
		if (style.stroke){
			strokeElements[0].checked = true;
			strokeElements[1].checked = false;
		}
		else {
			strokeElements[0].checked = false;
			strokeElements[1].checked = true;
		}
	}
	//SET STROKE WIDTH
	styleStrokeWidth.value = style.weight;
	styleStrokeWidthValue.innerText = style.weight;
	//SET STROKE COLOR
	styleStrokeColor.value = style.color;
	//SET STROKE OPACITY
	styleStrokeOpacity.value = style.opacity;
	styleStrokeOpacityValue.innerText = getOpacityPercentToText(Number(style.opacity));
	//SET DASH
	var dashElements = document.getElementsByName("style-dash");
	for (var i = 0; i < dashElements.length; i++) {
		if (style.dashArray === null){
			dashElements[0].checked = true;
		}
		else if (dashElements[i].value === style.dashArray){
			dashElements[i].checked = true;
			break;
		}
	}
	//SET LINE CAP
	var lineCapElements = document.getElementsByName("style-line-cap");
	for (var i = 0; i < lineCapElements.length; i++) {
		if (lineCapElements[i].value === style.lineCap){
			lineCapElements[i].checked = true;
			break;
		}
	}
	//SET STROKE T OR F
	var fillElements = document.getElementsByName("style-fill");
	for (var i = 0; i < fillElements.length; i++) {
		if (style.fill){
			fillElements[0].checked = true;
			fillElements[1].checked = false;
		}
		else {
			fillElements[0].checked = false;
			fillElements[1].checked = true;
		}
	}
	//SET FILL COLOR
	styleFillColor.value = style.fillColor;
	//SET Fill OPACITY
	styleFillOpacity.value = style.fillOpacity;
	styleFillOpacityValue.innerText = getOpacityPercentToText(Number(style.fillOpacity));
	var styleName = document.getElementById("styleName");
	styleName.innerText = layersList[layerID].metadata.name;
}

//STYLE SUBMIT
var styleSubmitButton = document.getElementById("style-service-submit").addEventListener("click", function(e){
	e.preventDefault();
	var esriGeo = layersList[activeLayer].metadata.geometryType;
	var geoType = getGeoType(esriGeo);
	var strokeElements = document.getElementsByName("style-stroke");
	var stroke;
	for (var i = 0; i < strokeElements.length; i++) {
		if (strokeElements[i].checked) {
			stroke = strokeElements[i].value;
			break;
		}
	}
	var dashElements = document.getElementsByName("style-dash");
	var dash;
	for (var i = 0; i < dashElements.length; i++) {
		if (dashElements[i].checked) {
			dash = dashElements[i].value;
			break;
		}
	}
	var lineCapElements = document.getElementsByName("style-line-cap");
	var lineCap;
	for (var i = 0; i < lineCapElements.length; i++) {
		if (lineCapElements[i].checked) {
			lineCap = lineCapElements[i].value;
			break;
		}
	}
	var fillElements = document.getElementsByName("style-fill");
	var fill;
	for (var i = 0; i < fillElements.length; i++) {
		if (fillElements[i].checked) {
			fill = fillElements[i].value;
			break;
		}
	}
	function checkBool(value){
		if (value == "true"){
			return true;
		}
		else{
			return false;
		}
	}
	var style = {};
	if (geoType === "Point"){
		style = {
			radius: styleRadius.value,
			stroke: checkBool(stroke),
			color: styleStrokeColor.value,
			opacity: styleStrokeOpacity.value,
			weight: styleStrokeWidth.value,
			lineCap: "round",
			fill: checkBool(fill),
			fillColor: styleFillColor.value,
			fillOpacity: styleFillOpacity.value
		};
	}
	else if (geoType === "Line"){
		style = {
			stroke: checkBool(stroke),
			color: styleStrokeColor.value,
			opacity: styleStrokeOpacity.value,
			weight: styleStrokeWidth.value,
			lineCap: lineCap,
			dashArray: dash,
			fill: false
		};
	}
	else {
		style = {
			stroke: checkBool(stroke),
			color: styleStrokeColor.value,
			opacity: styleStrokeOpacity.value,
			weight: styleStrokeWidth.value,
			lineCap: lineCap,
			dashArray: dash,
			fill: checkBool(fill),
			fillColor: styleFillColor.value,
			fillOpacity: styleFillOpacity.value
		};
	}
	style.className = activeLayer.toString();
	layersList[activeLayer].style = style;
	layersList[activeLayer].layerName.setStyle(style);
	//SET LOCAL STORAGE
	var localStorageLayersList = getLocalStorageLayersList(layersList);
	localStorage.setItem("data", JSON.stringify(localStorageLayersList));
	closeAllModalsAndClearForms();
});

function getStoredLocation(){
    var storedLocation = localStorage.getItem("location");
    return JSON.parse(storedLocation);
}

function getStoredData(){
    var storedData = localStorage.getItem("data");
    return JSON.parse(storedData);
}
function getData(){
    if (localStorage.data != undefined){
        var data = getStoredData();
    }
    else {
        var data = [];
    }
    return data;
}

function restorePreviousSession(){
	var data = getData();
	for (var i = 0; i < data.length; i++) {
		//RESET CLASSNAME TRACKING
		data[i].style.className = i.toString();
		var options = {
			url: data[i].url,
			precision: 6,
			fields: data[i].vectorFields,
			onEachFeature:onEachFeature,
			cacheLayers: true,
			style: data[i].style,
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng);
			}
		};
		var obj = {
			url: data[i].url,
			layerName: L.esri.featureLayer(options),
			metadata: {},
			token: "",
			style: data[i].style
		};
		layersList.push(obj);
	}
	//RUN SAME LOOP WITH ASYNC CALL TO GET NEW METADATA
	for (var i = 0; i < data.length; i++) {
		L.esri.request(data[i].url,{},(function(i) {
			return function(error,response){
				if (error) {
					console.log(error);
				} else {
					map.addLayer(layersList[i].layerName);
					layersList[i].metadata = response;
					layersList[i].metadata.vectorFields = data[i].vectorFields;
					createListItem(response, data[i].url, i);
				}
			}
		})(i));
	}
	var loc = getStoredLocation();
	map.setView(loc.center,loc.zoom);
}
//RESTORE PREVIOUS SESSION
if (localStorage.data != undefined && localStorage.data.length > 2){
	var confirm = confirm("Restore services from the last time?");
	if (confirm){
		restorePreviousSession();
	}
	else{
		localStorage.clear();
	}
}
localStorage.setItem("location", JSON.stringify({zoom:5,center:[38.83,-98.58]}));
map.on("moveend",function(e){
	var zoom = map.getZoom();
	var center = map.getCenter();
	var obj = {zoom:zoom,center:center};
	localStorage.setItem("location", JSON.stringify(obj));
});

