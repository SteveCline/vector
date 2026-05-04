let savedBounds = [[-66.2695, 49.5537], [-126.7382, 24.7667]];
if (localStorage.getItem("vector-bounds") !== null) {
    savedBounds = JSON.parse(localStorage.getItem("vector-bounds"));
}
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/standard",
    config: {basemap: {showPointOfInterestLabels:false,show3dObjects:false}},
    bounds: savedBounds,
    minZoom: 3,
    accessToken: "pk.eyJ1IjoibWNjb3JtaWNrdGF5bG9yIiwiYSI6IkV1VTYyVXMifQ.zCU42TqxaSpRJvmH4Q094A",
    attributionControl: false
});
map.addControl(new mapboxgl.NavigationControl({visualizePitch:true}),"top-right");

function $(id){
    return document.querySelector(id);
}

function createUUID(){
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        const r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=="x" ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function buildBasemapControlContent(containerElement){
    const radioContainer = document.createElement("div");
    containerElement.append(radioContainer);
    const inputStandard = document.createElement("input");
    const inputMonochrome = document.createElement("input");
    const inputSatellite = document.createElement("input");
    inputStandard.type = "radio";
    inputMonochrome.type = "radio";
    inputSatellite.type = "radio";
    inputStandard.name = "basemap-radio";
    inputMonochrome.name = "basemap-radio";
    inputSatellite.name = "basemap-radio";
    inputStandard.id = "basemap-radio-standard";
    inputMonochrome.id = "basemap-radio-monochrome";
    inputSatellite.id = "basemap-radio-satellite";
    inputStandard.value = "standard";
    inputMonochrome.value = "monochrome";
    inputSatellite.value = "standard-satellite";
    inputStandard.checked = "true";
    const labelStandard = document.createElement("label");
    const labelMonochrome = document.createElement("label");
    const labelSatellite = document.createElement("label");
    labelStandard.innerText = " Standard";
    labelMonochrome.innerText = " Light";
    labelSatellite.innerText = " Imagery";
    labelStandard.setAttribute("for","basemap-radio-standard");
    labelMonochrome.setAttribute("for","basemap-radio-monochrome");
    labelSatellite.setAttribute("for","basemap-radio-satellite");
    const br1 = document.createElement("br");
    const br2 = document.createElement("br");
    const br3 = document.createElement("br");
    const br4 = document.createElement("br");
    const br5 = document.createElement("br");
    const br6 = document.createElement("br");
    const hr = document.createElement("hr");
    hr.style.border = "1px solid #38f";
    //-----
    const checkboxPlace = document.createElement("input");
    checkboxPlace.type = "checkbox";
    checkboxPlace.id = "basemap-checkbox-place";
    checkboxPlace.checked = true;
    const labelPalace = document.createElement("label");
    labelPalace.setAttribute("for","basemap-checkbox-place");
    labelPalace.innerText = " Place Labels";
    const checkboxRoads = document.createElement("input");
    checkboxRoads.type = "checkbox";
    checkboxRoads.id = "basemap-checkbox-road";
    checkboxRoads.checked = true;
    const labelRoads = document.createElement("label");
    labelRoads.setAttribute("for","basemap-checkbox-road");
    labelRoads.innerText = " Road Labels";
    const checkboxPOI = document.createElement("input");
    checkboxPOI.type = "checkbox";
    checkboxPOI.id = "basemap-checkbox-poi";
    const labelPoi = document.createElement("label");
    labelPoi.setAttribute("for","basemap-checkbox-poi");
    labelPoi.innerText = " POI Labels";
    const checkbox3D = document.createElement("input");
    checkbox3D.type = "checkbox";
    checkbox3D.id = "basemap-checkbox-3D";
    const label3D = document.createElement("label");
    label3D.setAttribute("for","basemap-checkbox-3D");
    label3D.innerText = " 3D Buildings";
    const checkboxImageRoads = document.createElement("input");
    checkboxImageRoads.type = "checkbox";
    checkboxImageRoads.id = "basemap-checkbox-img-road";
    checkboxImageRoads.checked = true;
    const labelImageRoads = document.createElement("label");
    labelImageRoads.setAttribute("for","basemap-checkbox-img-road");
    labelImageRoads.innerText = " Roads";
    checkboxImageRoads.style.display = "none";
    labelImageRoads.style.display = "none";
    //---
    radioContainer.addEventListener("change", (e) => {
        setStylesToStorage();
        basemapToggle = true;
        const standardConfig = {
            showPointOfInterestLabels: checkboxPOI.checked,
            showPlaceLabels: checkboxPlace.checked,
            showRoadLabels: checkboxRoads.checked,
            showTransitLabels: checkboxRoads.checked,
            show3dObjects: checkbox3D.checked
        };
        const monochromeConfig = {
            theme: "monochrome",
            showPointOfInterestLabels: checkboxPOI.checked,
            showPlaceLabels: checkboxPlace.checked,
            showRoadLabels: checkboxRoads.checked,
            showTransitLabels: checkboxRoads.checked,
            show3dObjects: checkbox3D.checked,
        };
        const satelliteConfig = {
            showPointOfInterestLabels: checkboxPOI.checked,
            showPlaceLabels: checkboxPlace.checked,
            showRoadLabels: checkboxRoads.checked,
            showTransitLabels: checkboxRoads.checked,
            showRoadsAndTransit: checkboxImageRoads.checked,
            showPedestrianRoads: checkboxImageRoads.checked
        };
        if (e.target.value === "standard"){
            map.setStyle("mapbox://styles/mapbox/standard", {config:{basemap:standardConfig}});
            checkboxImageRoads.style.display = "none";
            labelImageRoads.style.display = "none";
            checkbox3D.style.display = "inline";
            label3D.style.display = "inline";
            br5.style.display = "inline";
        }
        if (e.target.value === "monochrome"){
            map.setStyle("mapbox://styles/mapbox/standard", {config:{basemap:monochromeConfig}});
            checkboxImageRoads.style.display = "none";
            labelImageRoads.style.display = "none";
            checkbox3D.style.display = "inline";
            label3D.style.display = "inline";
            br5.style.display = "inline";
        }
        if (e.target.value === "standard-satellite"){
            map.setStyle("mapbox://styles/mapbox/standard-satellite", {config:{basemap:satelliteConfig}});
            checkboxImageRoads.style.display = "inline";
            labelImageRoads.style.display = "inline";
            checkbox3D.style.display = "none";
            label3D.style.display = "none";
            br5.style.display = "none";
        }
    });
    checkboxPOI.addEventListener("change", (e) => {
        map.setConfigProperty("basemap", "showPointOfInterestLabels", e.target.checked);
    });
    checkboxPlace.addEventListener("change", (e) => {
        map.setConfigProperty("basemap", "showPlaceLabels", e.target.checked);
    });
    checkboxRoads.addEventListener("change", (e) => {
        map.setConfigProperty("basemap", "showRoadLabels", e.target.checked);
        map.setConfigProperty("basemap", "showTransitLabels", e.target.checked);
    });
    checkbox3D.addEventListener("change", (e) => {
        map.setConfigProperty("basemap", "show3dObjects", e.target.checked);
    });
    checkboxImageRoads.addEventListener("change", (e) => {
        map.setConfigProperty("basemap", "showRoadsAndTransit", e.target.checked);
        map.setConfigProperty("basemap", "showPedestrianRoads", e.target.checked);
    });
    //--
    radioContainer.append(inputStandard,labelStandard,br1,inputMonochrome,labelMonochrome,br2,inputSatellite,labelSatellite);
    containerElement.append(radioContainer,hr,checkboxPlace,labelPalace,br3,checkboxRoads,labelRoads,br4,checkboxPOI,labelPoi,br5,checkbox3D,label3D,br6,checkboxImageRoads,labelImageRoads);
}

class BasemapControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement("div");
        this._container.className = "mapboxgl-ctrl mapboxgl-ctrl-group basemap-control"; 
        const button = document.createElement("button");
        button.innerHTML = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="35" height="35" rx="5" ry="5" fill="#333"/><rect x="55" y="10" width="35" height="35" rx="5" ry="5" fill="#333"/><rect x="10" y="55" width="35" height="35" rx="5" ry="5" fill="#333"/><rect x="55" y="55" width="35" height="35" rx="5" ry="5" fill="#333"/></svg>';
        const container = document.createElement("div");
        container.className = "basemap-control-content";
        buildBasemapControlContent(container);
        this._container.append(button,container);
        return this._container;
    }
    onRemove() {
        if (this._container.parentNode) {
           this._container.parentNode.removeChild(this._container);
        }
        this._map = undefined;
    }
}
const basemapControl = new BasemapControl();
map.addControl(basemapControl, "top-right");

const selectEdit = $("#select-edit");
const editControlsBox = $("#edit-controls");
const layerSettingsBox = $("#layer-settings-box");
const layerList = $("#layer-list");
const editSelectionBox = $("#edit-selection-box");
const analysisBox = $("#analysis-box");

let globalGeoJsonArray = [];
let globalActiveEditId = "NONE";
let globalIndex = undefined;
let basemapToggle = false;
let globalContinueLineProps = {};
const lockScreen = "<h2>Editing is Locked</h2>";
editSelectionBox.innerHTML = lockScreen;

map.on("load",function(){
    map.addControl(draw);
    addLocalStorageLayersToMap();
    buildLayerList();
    populateSelectEdit();
});
map.on("style.load",function(){
    if (basemapToggle){
        globalGeoJsonArray.forEach(fc => addLocalStorageLayer(fc));
        if (map.getLayer(globalActiveEditId + "-point")){
            setPointDrawStyle();
        }   
    }
    basemapToggle = false;
});

$("#tab-layers").addEventListener("change", () => closeLayerSettingsOrAddData());

function loadGeoJsonFiles(item){
    const fcName = item.name.replace(/\.[^/.]+$/, "");
    const readFile = new FileReader();
    readFile.readAsText(item); 
    readFile.onload = function(e){
        const geoJson = JSON.parse(e.target.result);
        const geoType = geoJson.features[0].geometry.type;
        const propsArray = Object.keys(geoJson.features[0].properties);
        buildLayer(fcName,geoType,propsArray,geoJson.features);
        map.fitBounds(turf.bbox(geoJson),{padding:20});
    };
    analysisBox.innerHTML = "";
    createToolList();
}

function addLocalStorageLayer(fc){
    const source = fc.vectorID + "-source";
    map.addSource(source, {
        "type": "geojson",
        "data": fc,
        //"tolerance": 0
    });
    const styles = fc.config.styles;
    for (let i = 0; i < styles.length; i++) {
        map.addLayer(styles[i],"gl-draw-polygon-fill.cold");
    }
}

function addLocalStorageLayersToMap(){
    if (localStorage.getItem("vector-data")){
        globalGeoJsonArray = JSON.parse(localStorage.getItem("vector-data"));
        globalGeoJsonArray.forEach(fc => addLocalStorageLayer(fc));
    }
}

function buildLayerList(){
    layerList.innerHTML = "";
    const addLayerButton = document.createElement("button");
    addLayerButton.classList.add("add-data-button","green-btn");
    addLayerButton.innerText = "+";
    addLayerButton.title = "Add Data";
    addLayerButton.addEventListener("click", () => buildAddData());
    layerList.append(addLayerButton);
    for (let i = globalGeoJsonArray.length - 1; i >= 0; i--) {
        const item = globalGeoJsonArray[i];
        const div = document.createElement("div");
        div.draggable = true;
        div.classList.add("geojson-layer");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const suffix = ["-line-polygon","-line","-point"];
        suffix.forEach((layer) => {
            const id = item.vectorID + layer;
            if (map.getLayer(id) && map.getLayoutProperty(id, "visibility") === "visible") {
                checkbox.checked = true;
            }
        });
        checkbox.id = item.vectorID;
        if (checkbox.id === globalActiveEditId){
            checkbox.disabled = true;
        }
        checkbox.classList.add("layer-checkbox");
        checkbox.addEventListener("click", (e) => {
            toggleLayer(e.target.id);
            e.stopPropagation();
        });
        const span = document.createElement("span");
        span.classList.add("style-patch");
        createPatch(span,item);
        const label = document.createElement("label");
        label.innerText = item.vectorName;
        const settings = document.createElement("div");
        settings.classList.add("settings-button");
        settings.title = "Layer Settings";
        settings.innerHTML = "<svg x='0px' y='0px' width='16px' height='16px'><circle fill='#38f' cx='8' cy='3.0' r='1.8'/><circle fill='#38f' cx='8' cy='8.0' r='1.8'/><circle fill='#38f' cx='8' cy='13.0' r='1.8'/></svg>";
        settings.addEventListener("click", () => buildLayerSettings(item.vectorID));
        div.append(checkbox,span,label,settings);
        layerList.append(div);
    }
    //LAYER REORDERING
    let dragItem = null;
    layerList.querySelectorAll(".geojson-layer").forEach(item => {
        item.addEventListener("dragstart", () => {
            dragItem = item;
            item.classList.add("dragging");
        });
        item.addEventListener("dragend", () => {
            const nodeID = dragItem.childNodes[0].id;
            const indexDragged  = globalGeoJsonArray.findIndex(e => e.vectorID === nodeID);
            const layers = [...layerList.querySelectorAll(".geojson-layer")];
            const layersIndex  = layers.findIndex(e => e.childNodes[0].id === nodeID);
            const indexTo = (layers.length - layersIndex) - 1;
            const [element] = globalGeoJsonArray.splice(indexDragged, 1); 
            globalGeoJsonArray.splice(indexTo, 0, element);
            if (globalIndex){
                const editIndex  = layers.findIndex(e => e.childNodes[0].id === globalActiveEditId);
                const globalArrayIndex = (layers.length - editIndex) - 1;
                globalIndex = globalArrayIndex;
            }
            const stylesArray = map.getStyle().layers.slice(0,-12);
            const moveStyles = stylesArray.filter(style => style.id.slice(0,43) === nodeID);
            const moveIndex = layers.findIndex(e => e.childNodes[0].id === nodeID);
            if (moveIndex === 0){
                moveStyles.forEach(style => map.moveLayer(style.id, "gl-draw-polygon-fill.cold"));
            }
            else {
                const beforeID = layers[moveIndex - 1].childNodes[0].id;
                const beforeStyle = stylesArray.find(style => style.id.slice(0,43) === beforeID);
                moveStyles.forEach(style => map.moveLayer(style.id, beforeStyle.id));
            }
            populateSelectEdit(); 
            dragItem = null;
            item.classList.remove("dragging");
        });
    });
    layerList.addEventListener("dragover", e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(layerList, e.clientY);
        if (dragItem != null){
            if (afterElement === null) {
                layerList.append(dragItem);
            } else {
                layerList.insertBefore(dragItem, afterElement);
            }
        }
    });
}

function getDragAfterElement(container, y) {
    const el = [...container.querySelectorAll(".geojson-layer:not(.dragging)")];
    return el.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function createPatch(element,item){
    if (item.config.drawMode === "draw_polygon"){
        element.innerHTML = '<svg style="width:20px;height:20px;"><rect x="2" y="2" width="16" height="16" stroke="' + map.getPaintProperty(item.vectorID + "-line-polygon","line-color") + '" stroke-opacity="1" stroke-width="2" fill="' + map.getPaintProperty(item.vectorID + "-fill-polygon","fill-color") + '" fill-opacity="' + map.getPaintProperty(item.vectorID + "-fill-polygon","fill-opacity") + '"></rect></svg>';
    }
    else if (item.config.drawMode === "draw_line_string"){
        element.innerHTML = '<svg style="width:20px;height:20px;"><line x1="2" y1="18" x2="18" y2="2" width="16" height="16" stroke="' + map.getPaintProperty(item.vectorID + "-line","line-color") + '" stroke-opacity="1" stroke-width="2"></line></svg>';
    }
    else if (item.config.drawMode === "draw_point"){
        element.innerHTML = '<svg style="width:20px;height:20px;"><circle cx="10" cy="10" r="6" stroke="' + map.getPaintProperty(item.vectorID + "-point","circle-stroke-color") + '" stroke-width="2" fill="' + map.getPaintProperty(item.vectorID + "-point","circle-color") + '"/></svg>';
    }
}

function createFieldSet(fieldsetName){
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.innerText = fieldsetName;
    fieldset.append(legend);
    return fieldset;
}

function buildAddData(){
    layerList.style.display = "none";
    const fieldsetImport = createFieldSet("Import");
    const label = document.createElement("label");
    label.innerText = "Add GeoJSON from file";
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,.geojson";
    input.classList.add("input","full-input");
    input.setAttribute("multiple","accept");
    input.addEventListener("change",function(){
        for (let i = 0; i < input.files.length; i++) {
            loadGeoJsonFiles(input.files[i]);
        }
    });
    fieldsetImport.append(label,input);
    const fieldsetNewFC = createFieldSet("Create New Layer");
    buildCreateNewFC(fieldsetNewFC);
    const fieldsetURL = createFieldSet("Service URL");
    buildServiceURL(fieldsetURL);
    layerSettingsBox.append(buildCloseButtonAndTitle("Add Data"),fieldsetNewFC,fieldsetImport,fieldsetURL);
}

function buildCreateNewFC(element){
    const labelName = document.createElement("label");
    labelName.innerText = "Name";
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.placeholder = "Enter a layer name";
    inputName.classList.add("input","full-input","input-space");
    const labelGeo = document.createElement("label");
    labelGeo.innerText = "Geometry type";
    const selectGeo = document.createElement("select");
    selectGeo.classList.add("input","full-input","input-space");
    const opPolygon = document.createElement("option");
    const opLine = document.createElement("option");
    const opPoint = document.createElement("option");
    opPolygon.value = "Polygon";
    opPolygon.innerText = "Polygon";
    opLine.value = "LineString";
    opLine.innerText = "Line";
    opPoint.value = "Point";
    opPoint.innerText = "Point";
    selectGeo.append(opPolygon,opLine,opPoint);
    const labelProp = document.createElement("label");
    labelProp.innerText = "Properties (Optional)";
    const divPropList = document.createElement("div");
    divPropList.id = "prop-list";
    divPropList.innerHTML = "<input type='text' class='input full-input input-prop' placeholder='Enter a property name'><input type='text' class='input full-input input-prop' placeholder='Enter a property name'>";
    const divButtons = document.createElement("div");
    divButtons.classList.add("tri-button-box");
    const buttonAddProp = document.createElement("button");
    buttonAddProp.innerText = "Add Property";
    buttonAddProp.classList.add("blue-btn");
    buttonAddProp.id = "add-property";
    buttonAddProp.addEventListener("click", () => createPropertyListItem($("#prop-list")));
    const buttonCreateFC = document.createElement("button");
    buttonCreateFC.innerText = "Create Layer";
    buttonCreateFC.classList.add("green-btn");
    buttonCreateFC.addEventListener("click",function(){
        if (inputName.value.length > 0){
            let propArray = [];
            propList = $("#prop-list");
            const a = propList.querySelectorAll("input[type=text]");
            a.forEach(function(item){
                const prop = item.value.replace(/\s/g,"");
                if (prop.length > 0){
                    propArray.push(prop);
                }
            });
            buildLayer(inputName.value.trim(),selectGeo.value,propArray,[]);
            analysisBox.innerHTML = "";
            createToolList();
        }
        else {
            inputName.focus();
        }
    });
    divButtons.append(buttonAddProp,buttonCreateFC);
    element.append(labelName,inputName,labelGeo,selectGeo,labelProp,divPropList,divButtons);
}

function esriGeoToGeoJson(geometryType){
    if (geometryType === "esriGeometryPoint" || geometryType === "esriGeometryMultipoint"){
        return "Point";
    }
    else if (geometryType === "esriGeometryPolyline"){
        return "LineString";
    }
    else if (geometryType === "esriGeometryPolygon"){
        return "Polygon";
    }
    else {
        return "Error";
    }
}

function errorButtonStyle(button,container,message){
    button.innerText = "Error";
    button.classList.remove("green-btn");
    button.classList.add("red-btn");
    setTimeout(() => {
        button.innerText = "Load Data";
        button.classList.remove("red-btn");
        button.classList.add("green-btn");
    },3000);
    container.innerText = message;
}

async function fetchServiceData(url,button,isCheckboxChecked,errorContainer) {
    button.innerText = "Loading...";
    errorContainer.innerText = "";
    let query = "/query?where=1=1&outFields=*&outSR=4326&geometryPrecision=6&f=geojson";
    if (isCheckboxChecked){
        const bounds = map.getBounds().toArray().flat();
        const bbox = bounds.map((x) => turf.round(x,6)).toString();
        query = "/query?where=1=1&outFields=*&geometry=" + bbox + "&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&geometryPrecision=6&f=geojson";   
    }            
    try {
        const [r1, r2] = await Promise.all([fetch(url + query),fetch(url + "/?f=json")]);
        const [fc, serviceJSON] = await Promise.all([r1.json(),r2.json()]);
        if (serviceJSON.type != "Feature Layer"){
            errorButtonStyle(button,errorContainer,"Must be a Feature Layer.");
        }
        else if (fc.exceededTransferLimit || (fc.properties && fc.properties.exceededTransferLimit)){
            errorButtonStyle(button,errorContainer,"Feature limit exceeded. Use Query by map extent to reduce request.");
        }
        else if (fc.features.length === 0){
            if (isCheckboxChecked){
                errorButtonStyle(button,errorContainer,"No features within map extent.");
            }
            else {
                errorButtonStyle(button,errorContainer,"Service valid but empty.");
            }
        }
        else {
            props = Object.keys(fc.features[0].properties);
            buildLayer(serviceJSON.name,esriGeoToGeoJson(serviceJSON.geometryType),props,fc.features);
            map.fitBounds(turf.bbox(fc),{padding:20});
            analysisBox.innerHTML = "";
            createToolList();
        }        
    } catch (error) {
        errorButtonStyle(button,errorContainer,"Service Not Found.");
    }
}

function buildServiceURL(element){
    const labelName = document.createElement("label");
    labelName.innerText = "URL";
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.placeholder = "Enter a Service URL";
    inputName.classList.add("input","full-input","input-space");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("input-space");
    const labelCheckbox = document.createElement("label");
    labelCheckbox.innerText = "Query by map extent";
    const divButtons = document.createElement("div");
    divButtons.classList.add("one-two-box");
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error-message");
    const button = document.createElement("button");
    button.innerText = "Load Data";
    button.classList.add("green-btn");
    button.addEventListener("click",function(){
        if (inputName.value.length > 0){
            fetchServiceData(inputName.value,button,checkbox.checked,errorContainer);
        }
        else {
            inputName.focus();
        }
    });
    divButtons.append(button,errorContainer);
    element.append(labelName,inputName,checkbox,labelCheckbox,divButtons);
}

function buildLayer(fcName,geoType,propArray,featuresArray){
    const geoJson = {
        "type":"FeatureCollection",
        "features": featuresArray,
        "vectorID": "VECTOR-" + createUUID(),
        "vectorName": fcName.trim(),
        "config": {
            "labelVis": undefined,
            "drawMode": getDrawMode(geoType),
            "props": propArray,
            "styles": []
        } 
    };
    addDefaultLayerToMap(geoJson.vectorName,geoType,geoJson,geoJson.vectorID);
    globalGeoJsonArray.push(geoJson);
    setStylesToStorage();
    buildLayerList();
    populateSelectEdit();
    closeLayerSettingsOrAddData();
}

function createPropertyListItem(element){
    const input = document.createElement("input");
    input.setAttribute("type","text");
    input.classList.add("input","full-input","input-prop");
    input.setAttribute("placeholder", "Enter a property name");
    element.append(input);
}

function buildCloseButtonAndTitle(title){
    const container = document.createElement("div");
    container.classList.add("container-header");
    const h2 = document.createElement("h2");
    h2.innerText = title;
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button","red-btn");
    closeButton.title = "Close " + title;
    closeButton.innerText = "✖";
    closeButton.addEventListener("click", () => closeLayerSettingsOrAddData());
    container.append(h2,closeButton);
    return container;
}

function closeLayerSettingsOrAddData(){
    for (let i = globalGeoJsonArray.length - 1; i >= 0; i--) {
        const item = globalGeoJsonArray[i];
        const svg = $("#" + item.vectorID).nextElementSibling;
        createPatch(svg,item);
    }
    layerSettingsBox.innerHTML = "";
    layerList.style.display = "block";
}

function buildLayerSettings(layerID){
    const geoJson = globalGeoJsonArray.find(fc => fc.vectorID === layerID);
    layerList.style.display = "none";
    layerSettingsBox.append(buildCloseButtonAndTitle("Layer Settings"));
    createLayerDetailsControls(layerSettingsBox,geoJson);
    if (geoJson.config.drawMode === "draw_polygon"){
        createPolygonLayerStyleControls(layerSettingsBox,geoJson.vectorID);
    }
    if (geoJson.config.drawMode === "draw_line_string"){
        createLineLayerStyleControls(layerSettingsBox,geoJson.vectorID);
    }
    if (geoJson.config.drawMode === "draw_point"){
        createPointLayerStyleControls(layerSettingsBox,geoJson.vectorID);
    }
    createLabelControls(layerSettingsBox,geoJson.vectorID);
}

function toggleLayer(layerId) {
    populateSelectEdit();
    const layer = globalGeoJsonArray.find(fc => fc.vectorID === layerId);
    const layers = ["-fill-polygon","-line-polygon","-line","-point"];
    const labels = ["-polygon-label","-polygon-label","-line-label","-point-label"];
    layers.forEach(function(item,index){
        if (map.getLayer(layerId + item)){
            let visibility = map.getLayoutProperty(layerId + item, "visibility");
            if (visibility === "visible"){
                map.setLayoutProperty(layerId + item, "visibility", "none");
                if (layer.config.labelVis){
                    map.setLayoutProperty(layerId + labels[index], "visibility", "none");
                }
            } else {
                map.setLayoutProperty(layerId + item, "visibility", "visible");
                if (layer.config.labelVis){
                    map.setLayoutProperty(layerId + labels[index], "visibility", "visible");
                }
            }
        }
    });
    setStylesToStorage();
}

function setStylesToStorage(){
    const layers = map.getStyle().layers.slice(0,-12);
    globalGeoJsonArray.forEach(fc => {
        fc.config.styles = [];
        layers.forEach(layerStyle => {
            const styleID = layerStyle.id.slice(0,43);
            if (fc.vectorID === styleID){
                fc.config.styles.push(layerStyle);
            }
        });
    });
}

selectEdit.addEventListener("change", function(e){
    globalActiveEditId = e.target.value;
    //RESET ALL LAYER CHECKBOXES TO NOT DISABLED
    layerList.querySelectorAll(".geojson-layer").forEach(item => item.childNodes[0].disabled = false);
    editControlsBox.innerHTML = "";
    editSelectionBox.innerHTML = "";
    draw.changeMode("simple_select");
    if (globalActiveEditId === "NONE"){
        draw.deleteAll();
        globalIndex = undefined;
        globalContinueLineProps = {};
        editSelectionBox.innerHTML = lockScreen;
    }
    else {
        const geoJson = globalGeoJsonArray.find(e => e.vectorID === globalActiveEditId);
        globalIndex = globalGeoJsonArray.findIndex(e => e.vectorID === globalActiveEditId);
        $("#" + geoJson.vectorID).disabled = true;
        if (geoJson.config.drawMode === "draw_point"){
            setPointDrawStyle();
        }
        draw.set(geoJson);
        setEditButtons(geoJson);
        editSelectionBox.innerHTML = "<h2>Editing: " + geoJson.vectorName + "</h2>";
    }
});

function setEditButtons(geoJson){
    const drawMode = geoJson.config.drawMode;
    //DRAW
    const drawButton = document.createElement("button");
    drawButton.innerText = "Draw New";
    drawButton.title = "Draw a new feature";
    drawButton.classList.add("green-btn");
    drawButton.id = globalActiveEditId + "-draw";
    drawButton.addEventListener("click", () => {
        $("#tab-edit").checked = true;
        draw.changeMode(drawMode);
    });
    editControlsBox.append(drawButton);
    //DELETE
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.title = "Delete all selected features or all selected vertices";
    deleteButton.classList.add("red-btn");
    deleteButton.id = globalActiveEditId + "-delete";
    deleteButton.disabled = true;
    deleteButton.addEventListener("click", () => {
        draw.trash();
        map.fire("draw.selectionchange");
    });
    //MERGE
    const mergeButton = document.createElement("button");
    mergeButton.innerText = "Merge";
    mergeButton.title = "Merge combines selected features into one feature. New feature takes the properties of the first selected feature.";
    mergeButton.classList.add("blue-btn");
    mergeButton.id = globalActiveEditId + "-merge";
    mergeButton.disabled = true;
    if (drawMode === "draw_polygon"){
        mergeButton.addEventListener("click", () => {
            const f = draw.getSelected();
            const union = turf.union(f);
            union.id = f.features[0].id;
            const propsFirstFeature = f.features[0].properties;
            draw.add(union);
            for (const key in propsFirstFeature) {
                draw.setFeatureProperty(union.id, key,propsFirstFeature[key]);
            }
            draw.delete(draw.getSelectedIds().slice(1));
            map.fire("draw.update");
            map.fire("draw.selectionchange");
        });
    } else {
        mergeButton.addEventListener("click", () => {
            draw.combineFeatures();
            map.fire("draw.update");
            map.fire("draw.selectionchange");
        });
    }
    //EXPLODE
    const explodeButton = document.createElement("button");
    explodeButton.innerText = "Explode";
    explodeButton.title = "Uncombine multipart features into individual features";
    explodeButton.classList.add("blue-btn");
    explodeButton.id = globalActiveEditId + "-explode";
    explodeButton.disabled = true;
    explodeButton.addEventListener("click", () => {
        draw.uncombineFeatures();
        draw.set(draw.getAll());
    });
    //LINE MODES
    if (drawMode === "draw_line_string"){
        //CONTINUE START
        const continueLineStartButton = document.createElement("button");
        continueLineStartButton.innerText = "Continue Start";
        continueLineStartButton.title = "Continue drawing feature from start of line";
        continueLineStartButton.classList.add("blue-btn");
        continueLineStartButton.id = globalActiveEditId + "-continue-start";
        continueLineStartButton.disabled = true;
        continueLineStartButton.addEventListener("click", () => {
            globalContinueLineProps = draw.getSelected().features[0].properties;
            draw.changeMode("draw_line_string",{featureId: draw.getSelectedIds(), from: draw.getSelected().features[0].geometry.coordinates[0]});
        });
        //CONTINUE END
        const continueLineEndButton = document.createElement("button");
        continueLineEndButton.innerText = "Continue End";
        continueLineEndButton.title = "Continue drawing feature from end of line";
        continueLineEndButton.classList.add("blue-btn");
        continueLineEndButton.id = globalActiveEditId + "-continue-end";
        continueLineEndButton.disabled = true;
        continueLineEndButton.addEventListener("click", () => {
            globalContinueLineProps = draw.getSelected().features[0].properties;
            draw.changeMode("draw_line_string",{featureId: draw.getSelectedIds(), from: draw.getSelected().features[0].geometry.coordinates.at(-1)});
        });
        editControlsBox.append(continueLineStartButton,continueLineEndButton);
    }
    editControlsBox.append(mergeButton,explodeButton,deleteButton);
}

function setPointDrawStyle(){
    const radius = map.getPaintProperty(globalActiveEditId + "-point", "circle-radius");
    const fillColor = map.getPaintProperty(globalActiveEditId + "-point", "circle-color");
    const strokeColor = map.getPaintProperty(globalActiveEditId + "-point", "circle-stroke-color");
    const strokeWidth = map.getPaintProperty(globalActiveEditId + "-point", "circle-stroke-width");
    map.setPaintProperty("gl-draw-point-outer.cold", "circle-radius", ["case", ["==", ["get", "active"], "true"], radius + 2, radius]);
    map.setPaintProperty("gl-draw-point-outer.cold", "circle-color", fillColor);
    map.setPaintProperty("gl-draw-point-outer.cold", "circle-stroke-color", ["case", ["==", ["get", "active"], "true"], "#00ffff", strokeColor]);
    map.setPaintProperty("gl-draw-point-outer.cold", "circle-stroke-width", ["case", ["==", ["get", "active"], "true"], strokeWidth + 1, strokeWidth]);
    map.setPaintProperty("gl-draw-point-outer.hot", "circle-radius", ["case", ["==", ["get", "active"], "true"], radius + 2, radius]);
    map.setPaintProperty("gl-draw-point-outer.hot", "circle-color", fillColor);
    map.setPaintProperty("gl-draw-point-outer.hot", "circle-stroke-color", ["case", ["==", ["get", "active"], "true"], "#00ffff", strokeColor]);
    map.setPaintProperty("gl-draw-point-outer.hot", "circle-stroke-width", ["case", ["==", ["get", "active"], "true"], strokeWidth + 1, strokeWidth]);
}

function getDrawMode(geoType){
    if (geoType === "Polygon" || geoType === "MultiPolygon"){
        return "draw_polygon";
    }
    else if (geoType === "LineString" || geoType === "MultiLineString"){
        return "draw_line_string";
    }
    else if (geoType === "Point" || geoType === "MultiPoint"){
        return "draw_point";
    }
}

function populateSelectEdit(){
    selectEdit.innerHTML = "";
    const lockedOption = document.createElement("option");
    lockedOption.value = "NONE";
    lockedOption.innerText = "--Editing Locked--";
    selectEdit.append(lockedOption);
    for (let i = globalGeoJsonArray.length - 1; i >= 0; i--) {
        if ($("#" + globalGeoJsonArray[i].vectorID).checked){
            const option = document.createElement("option");
            option.value = globalGeoJsonArray[i].vectorID;
            option.innerText = globalGeoJsonArray[i].vectorName;
            selectEdit.append(option);
        }
    }
    //RESET TO SELECTED OPTION
    if (globalActiveEditId != "NONE"){
        selectEdit.value = globalActiveEditId;
    }
    else {
        selectEdit.value = "NONE";
    }
}

function populateEditSelectionBox(geoJson){
    $("#tab-edit").checked = true;
    editSelectionBox.innerHTML = "";
    if (globalIndex != undefined){
        editSelectionBox.innerHTML = "<h2>Editing: " + globalGeoJsonArray[globalIndex].vectorName + "</h2>";
    }
    else {
        editSelectionBox.innerHTML = lockScreen;
    }
    geoJson.features.forEach((feature) => {
        const fieldset = createFieldSet(feature.geometry.type);
        editSelectionBox.append(fieldset);
        const buttonBox = document.createElement("div");
        buttonBox.classList.add("tri-button-box");
        const zoomButton = document.createElement("button");
        zoomButton.innerText = "Zoom";
        zoomButton.title = "Zoom to this " + feature.geometry.type;
        zoomButton.classList.add("green-btn");
        zoomButton.addEventListener("click", () => map.fitBounds(turf.bbox(feature),{padding:20}));
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.title = "Delete this " + feature.geometry.type;
        deleteButton.classList.add("red-btn");
        deleteButton.addEventListener("click", () => {
            draw.delete(feature.id);
            map.fire("draw.delete");
            map.fire("draw.selectionchange");
        });
        const unselectButton = document.createElement("button");
        unselectButton.innerText = "Unselect";
        unselectButton.title = "Unselect this " + feature.geometry.type;
        unselectButton.classList.add("blue-btn");
        unselectButton.addEventListener("click", () => {
            const f = draw.getSelectedIds().filter(item => item !== feature.id);
            draw.changeMode("simple_select",{featureIds:f});
            populateEditSelectionBox(draw.getSelected());
        });
        buttonBox.append(zoomButton,unselectButton,deleteButton);
        const ul = document.createElement("ul");
        ul.classList.add("property-list");
        createMeasure(ul,feature);
        if (Object.keys(feature.properties).length === 0) {
            const p = document.createElement("p");
            p.innerText = "Feature has no properties";
            fieldset.append(p,ul,buttonBox);
        } else {
            fieldset.append(ul,buttonBox);
            for (const key in feature.properties) {
                const li = document.createElement("li");
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.classList.add("input");
                input.type = "text";
                label.innerText = key;
                input.value = feature.properties[key];
                input.addEventListener("input", (e) => {
                    if (Number(e.target.value)){
                        draw.setFeatureProperty(feature.id,key,Number(e.target.value));
                    }
                    else {
                        draw.setFeatureProperty(feature.id,key,e.target.value);
                    }
                    map.fire("draw.update");
                });
                li.append(label,input);
                ul.append(li);
            }
        }
    }); 
}

function createMeasure(element,feature){
    const li = document.createElement("li");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.id = "VECTOR-" + feature.id;
    input.classList.add("input");
    input.type = "text";
    input.disabled = true;
    const geoType = feature.geometry.type;
    if (geoType === "Polygon" || geoType === "MultiPolygon"){
        label.innerText = "Area";
    }
    if (geoType === "LineString" || geoType === "MultiLineString"){
        label.innerText = "Length";
    }
    if (geoType === "Point" || geoType === "MultiPoint"){
        label.innerText = "Coordinates";
    }
    input.value = getMeasure(feature);
    li.append(label,input);
    element.append(li);
}

function getMeasure(feature){
    const geoType = feature.geometry.type;
    if (geoType === "Polygon" || geoType === "MultiPolygon"){
        const areaSqMeter = turf.area(feature);
        if (areaSqMeter > 2589988){
            const areaSqMi = turf.area(feature) / 2589988;
            return turf.round(areaSqMi,2) + " Sq Miles";
        }
        else if (areaSqMeter > 4047){
            const areaAcre = turf.area(feature) / 4046.856;
            return turf.round(areaAcre,2) + " Acres";
        }
        else {
            return turf.round(areaSqMeter,1) + " Sq Meters";
        }
    }
    if (geoType === "LineString" || geoType === "MultiLineString"){
        const lengthFt = turf.length(feature, {units:"feet"});
        if (lengthFt < 5280){
            return Math.round(lengthFt) + " Feet";
        }
        else {
            const lengthMi = turf.length(feature, {units:"miles"});
            return turf.round(lengthMi,2) + " Miles";
        }
    }
    if (geoType === "Point"){
        const lat = feature.geometry.coordinates[1];
        const lng = feature.geometry.coordinates[0];
        return turf.round(lng,6) + ", " + turf.round(lat,6);
    }
    if (geoType === "MultiPoint"){
        //MAKE BETTER
        return JSON.stringify(feature.geometry.coordinates);
    }
}

function toggleLineContinueButtons(geoJson){
    if  ($("#" + globalActiveEditId + "-continue-start") && $("#" + globalActiveEditId + "-continue-end")){
        if (geoJson.features.length === 1 && geoJson.features[0].geometry.type === "LineString"){
            $("#" + globalActiveEditId + "-continue-start").disabled = false;
            $("#" + globalActiveEditId + "-continue-end").disabled = false;
        } else if (geoJson.features.length === 0 || geoJson.features.length){
            $("#" + globalActiveEditId + "-continue-start").disabled = true;
            $("#" + globalActiveEditId + "-continue-end").disabled = true;
        }
    }
}

map.on("draw.update", updateGeoJSON);
map.on("draw.create", updateGeoJSON);
map.on("draw.delete", updateGeoJSON);

function updateGeoJSON(e){
    let geoJson = draw.getAll();
    geoJson.vectorID = globalActiveEditId;
    const layer = globalGeoJsonArray[globalIndex];
    geoJson.vectorName = layer.vectorName;
    geoJson.config = layer.config;
    if (e.type === "draw.create"){
        const fid = e.features[0].id;
        //FOR CONTINUE LINE FEATURES
        if (Object.keys(globalContinueLineProps).length > 0){
            Object.keys(globalContinueLineProps).forEach(key => {
                const val = globalContinueLineProps[key];
                draw.setFeatureProperty(fid, key, val);
            });
            globalContinueLineProps = {};
        }
        //ELSE IS FOR ALL OTHER CREATE NEW
        else {
            for (const prop of geoJson.config.props) {
                draw.setFeatureProperty(fid, prop, null);
            }
            geoJson.features.splice(-1, 1, draw.get(fid));
        }
    }
    if (e.type === "draw.update" && e.features){
        e.features.forEach(item => {
            const e = $("#VECTOR-" + item.id);
            if (e){e.value = getMeasure(item);}
        });
    }
    globalGeoJsonArray[globalIndex] = geoJson;
    map.getSource(globalActiveEditId + "-source").setData(geoJson);
}

map.on("draw.actionable", function(e){
    const buttonDelete = $("#" + globalActiveEditId + "-delete");
    const buttonMerge = $("#" + globalActiveEditId + "-merge");
    const buttonExplode = $("#" + globalActiveEditId + "-explode");
    if (e.actions.trash && buttonDelete){
        buttonDelete.disabled = false;
    }
    else if (!e.actions.trash && buttonDelete){
        buttonDelete.disabled = true;
    }
    if (e.actions.combineFeatures && buttonMerge){
        buttonMerge.disabled = false;
    }
    else if (!e.actions.combineFeatures && buttonMerge){
        buttonMerge.disabled = true;
    }
    if (e.actions.uncombineFeatures && buttonExplode){
        buttonExplode.disabled = false;
    }
    else if (!e.actions.uncombineFeatures && buttonExplode){
        buttonExplode.disabled = true;
    }
});
map.on("draw.selectionchange", function(e){
    populateEditSelectionBox(draw.getSelected());
    toggleLineContinueButtons(draw.getSelected());
    if ($("#" + globalActiveEditId + "-delete")){
        if (draw.getMode() === "direct_select"){
            $("#" + globalActiveEditId + "-delete").innerText = "Delete Vertex";
        }
        else if (draw.getSelected().features.length > 1){
            $("#" + globalActiveEditId + "-delete").innerText = "Delete " + draw.getSelected().features.length + " Features";
        }
        else {
            $("#" + globalActiveEditId + "-delete").innerText = "Delete";
        }
    }
});


let drawStyle = [{
    id: "gl-draw-polygon-fill",
    type: "fill",
    filter: ["all", ["==", "$type", "Polygon"]],
    paint: {
        "fill-opacity": 0
    }
}, {
    id: "gl-draw-lines",
    type: "line",
    filter: ["any", ["==", "$type", "LineString"],["==", "$type", "Polygon"]],
    layout: {
        "line-cap": "round",
        "line-join": "round"
    },
    paint: {
        "line-color": "#00ffff",
        "line-opacity": ["case", ["==", ["get", "active"], "true"], 1, 0],
        "line-width": 2,
    }
}, {
    id: "gl-draw-point-outer",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"],
        ["==", "meta", "feature"]
    ],
    paint: {
        "circle-radius": ["case", ["==", ["get", "active"], "true"], 7, 5],
        "circle-color": "#fff",
        "circle-stroke-color": ["case", ["==", ["get", "active"], "true"], "#00ffff", "#3388ff"],
        "circle-stroke-width": ["case", ["==", ["get", "active"], "true"], 4, 3]
    }
}, {
    id: "gl-draw-vertex-outer",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"],
        ["==", "meta", "vertex"],
        ["!=", "mode", "simple_select"]
    ],
    paint: {
        "circle-radius": ["case", ["==", ["get", "active"], "true"], 7, 5],
        "circle-color": "#fff"
    }
}, {
    id: "gl-draw-vertex-inner",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"],
        ["==", "meta", "vertex"],
        ["!=", "mode", "simple_select"]
    ],
    paint: {
        "circle-radius": ["case", ["==", ["get", "active"], "true"], 5, 3],
        "circle-color": "#00ffff"
    }
}, {
    id: "gl-draw-midpoint",
    type: "circle",
    filter: ["all", ["==", "meta", "midpoint"]],
    paint: {
        "circle-radius": 4,
        "circle-color": "#00ffff"
    }
}];

const draw = new MapboxDraw({displayControlsDefault: false, styles: drawStyle});

function addDefaultLayerToMap(fcName,geoType,geoJson,layerID){
    const source = layerID + "-source";
    map.addSource(source, {
        "type": "geojson",
        "data": geoJson,
        //"tolerance": 0
    });
    geoJson.vectorID = layerID;
    geoJson.vectorName = fcName;
    if (geoType === "Polygon" || geoType === "MultiPolygon"){
        map.addLayer({
            "id": layerID + "-fill-polygon",
            "type": "fill",
            "source": source,
            "paint": {
                "fill-color": "#3388ff",
                "fill-opacity": 0.3,
            },
            "layout": {
                "visibility": "visible",
            }
        },"gl-draw-polygon-fill.cold");
        map.addLayer({
            "id": layerID + "-line-polygon",
            "type": "line",
            "source": source,
            "paint": {
                "line-color": "#3388ff",
                "line-width": 3,
            },
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible",
            }
        },"gl-draw-polygon-fill.cold");
        //POLYGON LABEL
        map.addLayer({
            "id": layerID + "-polygon-label",
            "type": "symbol",
            "source": source,
            "layout": {
                "text-field": ["get", ""],
                "text-size": 16,
                "text-allow-overlap": true,
                "text-anchor": "center",
                "text-rotate": 0,
                "visibility": "none",
            },
            "paint": {
                "text-color": "#3388ff",
                "text-halo-color": "#ffffff",
                "text-halo-width": 2
            }
        },"gl-draw-polygon-fill.cold");
    }
    if (geoType === "LineString" || geoType === "MultiLineString"){
        map.addLayer({
            "id": layerID + "-line",
            "type": "line",
            "source": source,
            "paint": {
                "line-color": "#3388ff",
                "line-width": 3,
            },
            "layout": {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible",
            }
        },"gl-draw-polygon-fill.cold");
        //LINE LABEL
        map.addLayer({
            "id": layerID + "-line-label",
            "type": "symbol",
            "source": source,
            "layout": {
                "symbol-placement": "line",
                "symbol-spacing": 150,
                "text-field": ["get", ""],
                "text-size": 16,
                "visibility": "none",
            },
            "paint": {
                "text-color": "#3388ff",
                "text-halo-color": "#ffffff",
                "text-halo-width": 2
            }
        },"gl-draw-polygon-fill.cold");
    }
    if (geoType === "Point" || geoType === "MultiPoint"){
        map.addLayer({
            "id": layerID + "-point",
            "type": "circle",
            "source": source,
            "paint": {
                "circle-radius": 5,
                "circle-color": "#ffffff",
                "circle-stroke-color": "#3388ff",
                "circle-stroke-width": 3
            },
            "layout": {
                "visibility": "visible",
            }
        },"gl-draw-polygon-fill.cold");
        //POINT LABEL
        map.addLayer({
            "id": layerID + "-point-label",
            "type": "symbol",
            "source": source,
            "layout": {
                "text-field": ["get", ""],
                "text-size": 16,
                "text-radial-offset": 0.5,
                "text-justify": "auto",
                "text-variable-anchor": ["bottom","left","right","top","top-right","top-left","bottom-right","bottom-left"],
                "visibility": "none",
            },
            "paint": {
                "text-color": "#3388ff",
                "text-halo-color": "#ffffff",
                "text-halo-width": 2
            }
        },"gl-draw-polygon-fill.cold");
    }
}

function deleteLayerClickEvent(geoJson){
    const index = globalGeoJsonArray.findIndex(fc => fc.vectorID === geoJson.vectorID);
    globalGeoJsonArray.splice(index,1);
    buildLayerList();
    closeLayerSettingsOrAddData();
    analysisBox.innerHTML = "";
    createToolList();
    if (globalActiveEditId === geoJson.vectorID){
        editControlsBox.innerHTML = "";
        globalActiveEditId = "NONE";
        populateSelectEdit();
        draw.deleteAll();
        globalIndex = undefined;
        editSelectionBox.innerHTML = lockScreen;
    }
    else {
        const removeLayerSelectEdit = selectEdit.querySelector("option[value='" + geoJson.vectorID + "']");
        if (removeLayerSelectEdit){
            removeLayerSelectEdit.remove();
        }
    }
    //REMOVE MAP LAYERS AND SOURCE
    const suffix = ["-fill-polygon","-line-polygon","-line","-point","-polygon-label","-polygon-label","-line-label","-point-label"];
    suffix.forEach((item) => {
        const id = geoJson.vectorID + item;
        if (map.getLayer(id)) {
            map.removeLayer(id);
        }
    });
    if (map.getSource(geoJson.vectorID + "-source")){
        map.removeSource(geoJson.vectorID + "-source");
    }
}

function createLayerDetailsControls(element,geoJson){
    const fieldset = createFieldSet("Details");
    const layerNameLabel = document.createElement("label");
    layerNameLabel.innerText = "Layer Name";
    const layerNameInput = document.createElement("input");
    layerNameInput.type = "text";
    layerNameInput.classList.add("input","full-input");
    layerNameInput.placeholder = "Enter a layer Name";
    layerNameInput.value = geoJson.vectorName;
    layerNameInput.addEventListener("blur",(e) => {
        const index = globalGeoJsonArray.findIndex(fc => fc.vectorID === geoJson.vectorID);
        globalGeoJsonArray[index].vectorName = e.target.value.trim();
        $("#" + geoJson.vectorID).nextElementSibling.nextElementSibling.innerText = e.target.value;
        populateSelectEdit();   
    });
    const pGeoType = document.createElement("p");
    if (geoJson.config.drawMode === "draw_polygon"){
        pGeoType.innerText = "Geometry Type: Polygons";
    }
    if (geoJson.config.drawMode === "draw_line_string"){
        pGeoType.innerText = "Geometry Type: Lines";
    }
    if (geoJson.config.drawMode === "draw_point"){
        pGeoType.innerText = "Geometry Type: Points";
    }
    const pCount = document.createElement("p");
    pCount.innerText = "Feature Count: " + geoJson.features.length;
    const buttonBox = document.createElement("div");
    buttonBox.classList.add("tri-button-box");
    const zoomButton = document.createElement("button");
    zoomButton.innerText = "Zoom";
    zoomButton.title = "Zoom to this Layer";
    zoomButton.classList.add("green-btn");
    zoomButton.addEventListener("click", () => {
        if (geoJson.features.length > 0){
            map.fitBounds(turf.bbox(geoJson),{padding:20});
        }
    });
    const downloadButton = document.createElement("button");
    downloadButton.innerText = "Download";
    downloadButton.title = "Download data as GeoJSON";
    downloadButton.classList.add("blue-btn");
    downloadButton.addEventListener("click", () => {
        if (geoJson.features.length > 0){
            const {vectorID,vectorName,config,...download} = geoJson;
            download.features.forEach(feature => delete feature.id);
            const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(download));
            const link = document.createElement("a");
            link.setAttribute("href",dataUri);
            link.setAttribute("download", geoJson.vectorName.trim() + ".geojson");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(dataUri);
        }
    });
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.title = "Delete this Layer";
    deleteButton.classList.add("red-btn");
    deleteButton.addEventListener("click", () => deleteLayerClickEvent(geoJson));
    buttonBox.append(zoomButton,downloadButton,deleteButton);
    fieldset.append(layerNameLabel,layerNameInput,pGeoType,pCount,buttonBox);
    element.append(fieldset);
}

function createPolygonLayerStyleControls(element,layerID){
    const fieldset = createFieldSet("Style");
    const container = document.createElement("div");
    container.classList.add("grid-container");
    fieldset.append(container);
    element.append(fieldset);
    //-------
    const div1 = document.createElement("div");
    const lineColorLabel = document.createElement("label");
    lineColorLabel.innerText = "Outline Color";
    const lineColorInput = document.createElement("input");
    lineColorInput.setAttribute("type","color");
    lineColorInput.setAttribute("value",map.getPaintProperty(layerID + "-line-polygon","line-color"));
    lineColorInput.addEventListener("input",() => {
        map.setPaintProperty(layerID + "-line-polygon","line-color",lineColorInput.value);
        map.setPaintProperty(layerID + "-polygon-label","text-color",lineColorInput.value);
    });
    div1.append(lineColorLabel,lineColorInput);
    //-------
    const div2 = document.createElement("div");
    const lineWidthLabel = document.createElement("label");
    lineWidthLabel.innerHTML = "Outline Width: <span id='" + layerID + "-line-width' style='font-weight:bold;'>" + map.getPaintProperty(layerID + "-line-polygon","line-width") + "px</span>";
    const lineWidthInput = document.createElement("input");
    lineWidthInput.setAttribute("type","range");
    lineWidthInput.setAttribute("min","1");
    lineWidthInput.setAttribute("max","10");
    lineWidthInput.setAttribute("step","1");
    lineWidthInput.setAttribute("value",map.getPaintProperty(layerID + "-line-polygon","line-width"));
    lineWidthInput.addEventListener("input",() => {
        map.setPaintProperty(layerID + "-line-polygon","line-width",Number(lineWidthInput.value));
        $("#" + layerID + "-line-width").innerText = lineWidthInput.value + "px";
    });
    div2.append(lineWidthLabel,lineWidthInput);
    //-------
    const div3 = document.createElement("div");
    const fillColorLabel = document.createElement("label");
    fillColorLabel.innerText = "Fill Color";
    const fillColorInput = document.createElement("input");
    fillColorInput.setAttribute("type","color");
    fillColorInput.setAttribute("value",map.getPaintProperty(layerID + "-fill-polygon","fill-color"));
    fillColorInput.addEventListener("input",() => map.setPaintProperty(layerID + "-fill-polygon","fill-color",fillColorInput.value));
    div3.append(fillColorLabel,fillColorInput);
    //-------
    const div4 = document.createElement("div");
    const fillOpacityInput = document.createElement("input");
    fillOpacityInput.setAttribute("type","range");
    fillOpacityInput.setAttribute("min","0");
    fillOpacityInput.setAttribute("max","1");
    fillOpacityInput.setAttribute("step","0.05");
    fillOpacityInput.setAttribute("value",map.getPaintProperty(layerID + "-fill-polygon","fill-opacity"));
    fillOpacityInput.addEventListener("input",function(e){
        map.setPaintProperty(layerID + "-fill-polygon","fill-opacity",Number(fillOpacityInput.value));
        const fillValue = Math.round((fillOpacityInput.value * 100));
        $("#" + layerID + "-fill-opacity").innerText = fillValue + "%";
    });
    const fillOpacityLabel = document.createElement("label");
    fillOpacityLabel.innerHTML = "Fill Opacity: <span id='" + layerID + "-fill-opacity' style='font-weight:bold;'>" + Math.round((fillOpacityInput.value * 100)) + "%</span>";
    div4.append(fillOpacityLabel,fillOpacityInput);
    container.append(div1,div2,div3,div4);
}

function createLineLayerStyleControls(element,layerID){
    const fieldsetStyle = createFieldSet("Style");
    const container = document.createElement("div");
    container.classList.add("grid-container");
    fieldsetStyle.append(container);
    element.append(fieldsetStyle);
    //-------
    const divColor = document.createElement("div");
    const lineColorLabel = document.createElement("label");
    lineColorLabel.innerText = "Line Color";
    const lineColorInput = document.createElement("input");
    lineColorInput.setAttribute("type","color");
    lineColorInput.setAttribute("value",map.getPaintProperty(layerID + "-line","line-color"));
    lineColorInput.addEventListener("input",function(e){
        map.setPaintProperty(layerID + "-line","line-color",lineColorInput.value);
        map.setPaintProperty(layerID + "-line-label","text-color",lineColorInput.value);
    });
    divColor.append(lineColorLabel,lineColorInput);
    //-------
    const divWidth = document.createElement("div");
    const lineWidthLabel = document.createElement("label");
    lineWidthLabel.innerHTML = "Line Width: <span id='" + layerID + "-line-width' style='font-weight:bold;'>" + map.getPaintProperty(layerID + "-line","line-width") + "px</span>";
    const lineWidthInput = document.createElement("input");
    lineWidthInput.setAttribute("type","range");
    lineWidthInput.setAttribute("min","1");
    lineWidthInput.setAttribute("max","10");
    lineWidthInput.setAttribute("step","1");
    lineWidthInput.setAttribute("value",map.getPaintProperty(layerID + "-line","line-width"));
    lineWidthInput.addEventListener("input",function(e){
        map.setPaintProperty(layerID + "-line","line-width",Number(lineWidthInput.value));
        $("#" + layerID + "-line-width").innerText = lineWidthInput.value + "px";
    });
    divWidth.append(lineWidthLabel,lineWidthInput);
    container.append(divColor,divWidth);
}

function createPointLayerStyleControls(element,layerID){
    const fieldset = createFieldSet("Style");
    const container = document.createElement("div");
    container.classList.add("grid-container");
    fieldset.append(container);
    element.append(fieldset);
    //-------
    const div1 = document.createElement("div");
    const circleStrokeColorLabel = document.createElement("label");
    circleStrokeColorLabel.innerText = "Outline Color";
    const circleStrokeColorInput = document.createElement("input");
    circleStrokeColorInput.setAttribute("type","color");
    circleStrokeColorInput.setAttribute("value",map.getPaintProperty(layerID + "-point","circle-stroke-color"));
    circleStrokeColorInput.addEventListener("input",function(e){
        map.setPaintProperty(layerID + "-point","circle-stroke-color",circleStrokeColorInput.value);
        map.setPaintProperty(layerID + "-point-label","text-color",circleStrokeColorInput.value);
        if (globalActiveEditId === layerID){setPointDrawStyle();}
    });
    div1.append(circleStrokeColorLabel,circleStrokeColorInput);
    //-------
    const div2 = document.createElement("div");
    const circleStrokeWidthLabel = document.createElement("label");
    circleStrokeWidthLabel.innerHTML = "Outline Width: <span id='" + layerID + "-circle-stroke-width' style='font-weight:bold;'>" + map.getPaintProperty(layerID + "-point","circle-stroke-width") + "px</span>";
    const circleStrokeWidthInput = document.createElement("input");
    circleStrokeWidthInput.setAttribute("type","range");
    circleStrokeWidthInput.setAttribute("min","1");
    circleStrokeWidthInput.setAttribute("max","10");
    circleStrokeWidthInput.setAttribute("step","1");
    circleStrokeWidthInput.setAttribute("value",map.getPaintProperty(layerID + "-point","circle-stroke-width"));
    circleStrokeWidthInput.addEventListener("input",function(e){
        map.setPaintProperty(layerID + "-point","circle-stroke-width",Number(circleStrokeWidthInput.value));
        $("#" + layerID + "-circle-stroke-width").innerText = circleStrokeWidthInput.value + "px";
        if (globalActiveEditId === layerID){setPointDrawStyle();}
    });
    div2.append(circleStrokeWidthLabel,circleStrokeWidthInput);
    //-------
    const div3 = document.createElement("div");
    const circleColorLabel = document.createElement("label");
    circleColorLabel.innerText = "Fill Color";
    const circleColorInput = document.createElement("input");
    circleColorInput.setAttribute("type","color");
    circleColorInput.setAttribute("value",map.getPaintProperty(layerID + "-point","circle-color"));
    circleColorInput.addEventListener("input",function(e){
        map.setPaintProperty(layerID + "-point","circle-color",circleColorInput.value);
        if (globalActiveEditId === layerID){setPointDrawStyle();}
    });
    div3.append(circleColorLabel,circleColorInput);
    //-------
    const div4 = document.createElement("div");
    const circleRadiusLabel = document.createElement("label");
    circleRadiusLabel.innerHTML = "Circle Radius: <span id='" + layerID + "-circle-radius' style='font-weight:bold;'>" + map.getPaintProperty(layerID + "-point","circle-radius") + "px</span>";
    const circleRadiusInput = document.createElement("input");
    circleRadiusInput.setAttribute("type","range");
    circleRadiusInput.setAttribute("min","2");
    circleRadiusInput.setAttribute("max","14");
    circleRadiusInput.setAttribute("step","1");
    circleRadiusInput.setAttribute("value",map.getPaintProperty(layerID + "-point","circle-radius"));
    circleRadiusInput.addEventListener("input",function(e){
        map.setPaintProperty(layerID + "-point","circle-radius",Number(circleRadiusInput.value));
        map.setLayoutProperty(layerID + "-point-label","text-radial-offset",Number(circleRadiusInput.value) * 0.1);
        $("#" + layerID + "-circle-radius").innerText = circleRadiusInput.value + "px";
        if (globalActiveEditId === layerID){setPointDrawStyle();}
    });
    div4.append(circleRadiusLabel,circleRadiusInput);
    container.append(div1,div2,div3,div4);
}

function createLabelControls(element,layerID){
    const layer = globalGeoJsonArray.find(fc => fc.vectorID === layerID);
    if (layer.config.props.length > 0 && layer.features.length > 0) {
        const fieldset = createFieldSet("Labels");
        const container = document.createElement("div");
        container.classList.add("grid-container");
        fieldset.append(container);
        element.append(fieldset);
        //-------------------------
        let geoTypeLabel = "-polygon-label";
        let geoType = "-line-polygon";
        if (layer.config.drawMode === "draw_line_string"){
            geoTypeLabel = "-line-label";
            geoType = "-line";
        }
        if (layer.config.drawMode === "draw_point"){
            geoTypeLabel = "-point-label";
            geoType = "-point";
        }
        const divLabel = document.createElement("div");
        const labelField = document.createElement("label");
        labelField.innerText = "Label";
        const select = document.createElement("select");
        select.classList.add("input","full-input");
        const optionOff = document.createElement("option");
        const off = "--OFF--";
        optionOff.value = off;
        optionOff.innerText = off;
        select.append(optionOff);
        const props = layer.features[0].properties;
        for (let prop in props){
            const option = document.createElement("option");
            option.value = prop;
            option.innerText = prop;
            select.append(option);
        }
        const firstProp = map.getLayoutProperty(layerID + geoTypeLabel, "text-field")[1];
        if (firstProp === ""){
            select.value = off;
        }
        else {
            select.value = firstProp;
        }
        select.addEventListener("change",function(e){
            if (e.target.value != off){
                layer.config.labelVis = true;
                map.setLayoutProperty(layerID + geoTypeLabel,"text-field",["get",e.target.value]);
                const vis = map.getLayoutProperty(layerID + geoType, "visibility");
                if (vis === "visible"){
                    map.setLayoutProperty(layerID + geoTypeLabel,"visibility","visible");
                } else {
                    map.setLayoutProperty(layerID + geoTypeLabel,"visibility","none");
                }
            } else {
                layer.config.labelVis = false;
                map.setLayoutProperty(layerID + geoTypeLabel,"visibility","none");
                map.setLayoutProperty(layerID + geoTypeLabel,"text-field",["get",""]);
            }
        });
        divLabel.append(labelField,select);
        //-------------------------------    
        const divFontSize = document.createElement("div");
        const fontSizeLabel = document.createElement("label");
        fontSizeLabel.innerHTML = "Font Size: <span id='" + layerID + "-label-font-size' style='font-weight:bold;'>" + map.getLayoutProperty(layerID + geoTypeLabel,"text-size") + "px</span>";
        const fontSizeInput = document.createElement("input");
        fontSizeInput.setAttribute("type","range");
        fontSizeInput.setAttribute("min","10");
        fontSizeInput.setAttribute("max","30");
        fontSizeInput.setAttribute("step","1");
        fontSizeInput.setAttribute("value",map.getLayoutProperty(layerID + geoTypeLabel,"text-size"));
        fontSizeInput.addEventListener("input",function(e){
            map.setLayoutProperty(layerID + geoTypeLabel,"text-size",Number(fontSizeInput.value));
            $("#" + layerID + "-label-font-size").innerText = fontSizeInput.value + "px";
        });
        divFontSize.append(fontSizeLabel,fontSizeInput);
        //--------------------------
        container.append(divLabel,divFontSize);
    }
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden"){
        const bounds = map.getBounds().toArray();
        localStorage.setItem("vector-bounds", JSON.stringify(bounds));
        setStylesToStorage();
        localStorage.setItem("vector-data", JSON.stringify(globalGeoJsonArray));
    }
});




