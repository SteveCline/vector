const listAnalysis = [
    {
        title: "Buffer",
        description:"Creates a polygon buffer at a given distance around the input features. Input can be any geometry type.",
        build: () => aBuffer()
    },
    {
        title: "Clip",
        description:"Creates a polygon layer from the areas where the input layer is inside of the clip layer. The input layer is cut to the clip layer. The input and clip layers must be polygons.",
        build: () => aClip()
    },
    {
        title: "Erase",
        description:"Creates a polygon layer from areas where the input layer is outside of the erase layer. The input and erase layers must be polygons.",
        build: () => aErase()
    },
    {
        title: "Dissolve",
        description:"Creates a polygon layer from the input polygon layer that combines features that have the same property value. Input layer must be polygons.",
        build: () => aDissolve()
    },
    {
        title: "Intersect",
        description:"Creates a polygon layer from the where the two polygon input layers overlap. Properties of both layers will be in the output. The output could have self overlaps if either of the input layers has self overlaps. Use Find Self Overlaps to identify them.",
        build: () => aIntersect()
    },
    {
        title: "Union",
        description:"Creates a polygon layer from the geometric untion of the two polygon input layers. Properties of both layers will be in the output.",
        build: () => aUnion()
    }
];
const listManipulate = [
    {
        title: "Add or Remove Properties",
        description:"Adds or removes properties from every feature in the input layer. Modifies the input layer.",
        build: () => aAddRemoveProps()
    },
    {
        title: "Simplify Geometry",
        description:"Simplifies the geometry of the input layer into a new output layer. A larger tolerance means a more simplified output. The input layers must be polygons or lines. Use Truncate Coordinates for points.",
        build: () => aSimplify()
    },
    {
        title: "Append",
        description:"Adds append layer data to the target layer. Geometry types of both layers must be the same. Modifies the target layer.",
        build: () => aAppend()
    },
    {
        title: "Merge",
        description:"Combines the two input layers into the output layer. Geometry types of both layers must be the same. Properties of both layers will be transfered to the output layer.",
        build: () => aMerge()
    },
    {
        title: "Truncate Coordinates",
        description:"Creates a new layer with truncated precision of the coordinates of the input layer. Helps reduce the size large GeoJSON files. Precision of 6 is recommended for most uses.",
        build: () => aTruncate()
    },
    {
        title: "Explode",
        description:"Explodes or flattens all multi-part features within the input layer into the output layer. Single part features remain the same.",
        build: () => aExplode()
    }
];
const listConvert = [
    {
        title: "Create Grid",
        description:"Creates a grid layer using the current map extent or an optional polygon mask layer.",
        build: () => aGrid()
    },
    {
        title: "Create Random",
        description:"Creates your choice of random points, lines or polygons within the current map extent.",
        build: () => aRandom()
    },
    {
        title: "Voronoi",
        description:"Creates a voronoi polygon layer from an input point layer. If you use the bounding box of the current map extent, make sure all input points are within the extent.",
        build: () => aVoronoi()
    },
    {
        title: "TIN",
        description:"Creates a Triangulated Irregular Network polygon layer from an input point layer. If an optional Z value property is provided then it is added as properties called a, b, and c representing its value at each of the points that represent the corners of the triangle.",
        build: () => aTIN()
    },
    {
        title: "Aggregate Points",
        description:"Aggregates the count of the points within each feature in the polygon layer. Modifies the polygon layer with a new property called points_count.",
        build: () => aAggregate()
    },
    {
        title: "Points in Polygons",
        description:"Creates a point layer where the points are within a polygon selection layer. Option to spatially join a property of the polygon selection layer to the output point layer.",
        build: () => aFindPointsWithin()
    },
    {
        title: "Find Self Overlaps",
        description:"Creates an output layer where self overlaps occur (features within same layer overlap). Those overlaps can have overlaps themselves. If the input layer is lines, the lines are considered overlapping within a 5 meter tolerance. In the input layer is points, the points are considered overlapping at a coordinate precision is 6 decimal places.",
        build: () => aFindSelfOverlaps()
    },
    {
        title: "Fix Self Overlaps",
        description:"Creates an output polygon layer from the input polygon layer where overlaps are absorbed into the larger feature. If a feature is completely within one or more features it will be deleted. Input layer must be polygons.",
        build: () => aFixSelfOverlaps()
    },
    {
        title: "Smooth Polygon",
        description:"Creates a polygon layer that is smoothed based on the input polygon layer. A larger smooth factor means smoother polygons.",
        build: () => aSmooth()
    },
    {
        title: "Vertices to Points",
        description:"Creates a point layer of all the vertices of the input layer. Input layer can be polygons or lines.",
        build: () => aVerticesPoints()
    }
];
const listLines = [
    {
        title: "Split Line",
        description:"Creates an output line layer where input feature crosses the splitting layer. Splitting layer can be lines or points. If points, the point does not need to be perfectly on the line. If the split point is not on the line, it will modify the geometry of the output line to snap to the splitting point. Flattens all multi-part input features.",
        build: () => aSplitLine()
    },
    {
        title: "Split Line by Distance",
        description:"Creates a line layer that divides the input layer into individual features (segments) of a specified length. If the line is shorter than the segment length then the original line is returned. Input layer properties are not transferred to output.",
        build: () => aSplitLineDistance()
    },
    {
        title: "Create Points Along Lines",
        description:"Creates a point layer with points placed along each input layer line at a set distance interval. Adds two properties: point_distance_{units} and point_count, representing the distance and count from the start of each line.",
        build: () => aPointsAlongLines()
    },
    {
        title: "Create Endpoints",
        description:"Creates a point layer with points placed at endpoints of each input layer line. Option to do both, start point only, or end point only. Adds a property called endpoint_type with values of 'Start' or 'End'.",
        build: () => aEndpoints()
    },
    {
        title: "Find Line Intersections",
        description:"Creates a point layer where lines from the input layer self intersect or optionally intersect with another layer. Input and intersect layers can be lines or polygons.",
        build: () => aLineIntersections()
    },
    {
        title: "Curve Line",
        description:"Creates a line layer that is bezier curved based on the input line layer. Sharpness is measure of how curvy the path should be between splines.",
        build: () => aCurveLine()
    }
];
const listCentering = [
    {
        title: "Centroid",
        description:"Creates a point layer by computing the centroid as the mean of all vertices within each input feature. Inputs can be polygons or lines.",
        build: () => aCentroid()
    },
    {
        title: "Center Mean",
        description:"Creates a point layer by taking the averages of all the coordinates of each input feature and produces a value that respects that. Inputs can be polygons or lines.",
        build: () => aCenterMean()
    },
    {
        title: "Center",
        description:"Creates a point layer by computing the absolute center point of each feature. It divides in half the farthest east-west point and the farthest north-south point. Inputs can be polygons or lines.",
        build: () => aCenter()
    },
    {
        title: "Center of Mass",
        description:"Creates a point layer by computing the center of mass, a balance point for each input feature. Inputs can be polygons or lines.",
        build: () => aCenterOfMass()
    }
];

function buildCloseButtonAnalysis(title){
    const container = document.createElement("div");
    container.classList.add("container-header");
    const h2 = document.createElement("h2");
    h2.innerText = title;
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button","red-btn");
    closeButton.title = "Close " + title;
    closeButton.innerText = "✖";
    closeButton.addEventListener("click", () => {
        clearTimeout(runMessageTimer);
        analysisBox.innerHTML = "";
        createToolList();
    });
    container.append(h2,closeButton);
    return container;
}
function createToolCategory(categoryArray,title){
    const fieldSet = createFieldSet(title);
    const grid = document.createElement("div");
    grid.classList.add("bi-button-box");
    fieldSet.append(grid);
    categoryArray.forEach(item => {
        const button = document.createElement("button");
        button.innerText = item.title;
        button.classList.add("blue-btn");
        button.addEventListener("click",() => {
            analysisBox.innerHTML = "";
            const description = createFieldSet("Description");
            const div = document.createElement("div");
            div.innerText = item.description;
            description.append(div);
            const parameters = createFieldSet("Parameters");
            parameters.append(item.build());
            analysisBox.append(buildCloseButtonAnalysis(item.title),description,parameters);
        });
        grid.append(button);
    });
    return fieldSet;
}
function createToolList(){
    analysisBox.innerHTML = "";
    const p = document.createElement("p");
    p.innerText = "Editing should be locked while running tools.";
    const a = createToolCategory(listAnalysis,"Analysis");
    const b = createToolCategory(listManipulate,"Manipulation");
    const c = createToolCategory(listConvert,"Specialty");
    const d = createToolCategory(listLines,"Lines");
    const e = createToolCategory(listCentering,"Centering");
    analysisBox.append(p,a,b,c,d,e);
}
createToolList();
//HELPERS
function label(labelName){
    const label = document.createElement("label");
    label.innerText = labelName;
    return label;
}
function unitsSelect(){
    const select = document.createElement("select");
    select.classList.add("input","full-input","input-space");
    const ops = ["meters","kilometres","miles","yards","feet"];
    ops.forEach((op) => {
        const option = document.createElement("option");
        option.value = op;
        option.innerText = op;
        select.append(option);
    });
    return select;
}
function layersSelect(){
    const select = document.createElement("select");
    select.classList.add("input","full-input","input-space");
    for (let i = globalGeoJsonArray.length - 1; i >= 0; i--) {
        const option = document.createElement("option");
        option.value = globalGeoJsonArray[i].vectorID;
        option.innerText = globalGeoJsonArray[i].vectorName;
        select.append(option);
    }
    return select;
}
function layersSelectByDrawMode(drawMode, optionalSecondDrawMode){
    const select = document.createElement("select");
    select.classList.add("input","full-input","input-space");
    if (optionalSecondDrawMode){
        for (let i = globalGeoJsonArray.length - 1; i >= 0; i--) {
            if (globalGeoJsonArray[i].config.drawMode === drawMode || globalGeoJsonArray[i].config.drawMode === optionalSecondDrawMode){
                const option = document.createElement("option");
                option.value = globalGeoJsonArray[i].vectorID;
                option.innerText = globalGeoJsonArray[i].vectorName;
                select.append(option);
            }
        }
    }
    else {
        for (let i = globalGeoJsonArray.length - 1; i >= 0; i--) {
            if (globalGeoJsonArray[i].config.drawMode === drawMode){
                const option = document.createElement("option");
                option.value = globalGeoJsonArray[i].vectorID;
                option.innerText = globalGeoJsonArray[i].vectorName;
                select.append(option);
            }
        }
    }
    return select;
}
function updateLayersSelectOptions(selectElement,drawMode,notVectorID){
    selectElement.innerHTML = "";
    for (let i = globalGeoJsonArray.length - 1; i >= 0; i--) {
        if (globalGeoJsonArray[i].config.drawMode === drawMode && globalGeoJsonArray[i].vectorID != notVectorID){
            const option = document.createElement("option");
            option.value = globalGeoJsonArray[i].vectorID;
            option.innerText = globalGeoJsonArray[i].vectorName;
            selectElement.append(option);
        }
    }
}
function updateSelectOptions(selectElement,propsArray,optionalFirstProp){
    selectElement.innerHTML = "";
    let a = propsArray;
    if (optionalFirstProp){
        a = [optionalFirstProp, ...propsArray];
    }
    for (let i = 0; i < a.length; i++) {
        const option = document.createElement("option");
        option.value = a[i];
        option.innerText = a[i];
        selectElement.append(option);
    }
}
function outputName(){
    const output = document.createElement("input");
    output.type = "text";
    output.placeholder = "Enter a layer name";
    output.classList.add("input","full-input","input-space");
    return output;
}
function inputNumber(placeholderText){
    const input = document.createElement("input");
    input.classList.add("input","full-input","input-space");
    input.placeholder = placeholderText;
    input.type = "number";
    return input;
}
function runButton(titleText){
    const div = document.createElement("div");
    div.classList.add("one-two-box");
    const message = document.createElement("div");
    message.classList.add("run-message");
    message.id = "run-message";
    const button = document.createElement("button");
    button.innerText = "Run";
    button.title = titleText;
    button.classList.add("green-btn");
    div.append(button,message);
    return div;
}
//END HELPERS
//PROPERTY
function createPropList(propsArray,element){
        element.innerHTML = "";
        propsArray.forEach(item => {
            const input = document.createElement("input");
            input.type = "text";
            input.classList.add("input","full-input","input-prop");
            input.disabled = true;
            input.value = item;
            const button = document.createElement("button");
            button.title = "Delete Property";
            button.innerText = "✖";
            button.classList.add("red-btn","delete-prop");
            button.addEventListener("click",() => {
                button.previousSibling.remove();
                button.remove();
            });
            element.append(input,button);
        });
        if (propsArray.length === 0){
            element.innerHTML = "<p>No Properties Exist</p>";
        }
    }
function updateProperties(fc, newpropertiesArray){
    const removed = propsToRemove(newpropertiesArray,fc.config.props);
    const added = propsToAdd(newpropertiesArray,fc.config.props);
    if (removed.length != 0 || added.length != 0){
        for (let i = 0; i < fc.features.length; i++) {
            removed.forEach(function(item){
                delete fc.features[i].properties[item]; 
            });
            added.forEach(function(item){
                fc.features[i].properties[item] = null; 
            }); 
        }
        fc.config.props = newpropertiesArray;
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
function mergeNonNull(obj1, obj2) {
    const result = {...obj1};
    for (const key in obj2) {
        if (obj2[key] !== null){result[key] = obj2[key];}
    }
    return result;
}
function deleteDupGeometry(featuresArray){
    const len = featuresArray.length;
    let same = [];
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            const equalGeo = turf.booleanEqual(featuresArray[i].geometry,featuresArray[j].geometry);
            if (equalGeo){same.push(j)}
        }
    }
    same.forEach(f => featuresArray.splice(f,1));
}
function flattenforUnion(diff,element,array){
    if (diff != null){
        const flat = turf.flatten(diff);
        turf.featureEach(flat, (feature,index) => {
            if (index === 0){
                array[element] = feature;
            }
            else {
                array.push(feature);
            }
        });
    }
}
function cleanforUnion(features){
    const len = features.length;
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            const intersect = turf.intersect(turf.featureCollection([features[i],features[j]]));
            if (intersect) {
                const merged = mergeNonNull(features[i].properties, features[j].properties);
                intersect.properties = merged;
                let d1 = turf.difference(turf.featureCollection([features[i],features[j]]));
                let d2 = turf.difference(turf.featureCollection([features[j],features[i]]));
                flattenforUnion(d1,i,features);
                flattenforUnion(d2,j,features);
                if (d1 != null && d2 != null){
                    features.push(intersect);
                }
            }    
        }
    }
    const removeNulls = features.filter(i => i !== null);
    const removeSmall = removeNulls.filter(i => turf.area(i) > 0.01);
    const end = removeSmall.length;
    if (len === end){
        deleteDupGeometry(removeSmall);
        return removeSmall;
    }
    return cleanforUnion(removeSmall);
}
let runMessageTimer = undefined;
function runMessageSuccess(){
    $("#run-message").style.color = "#2ecc71";
    $("#run-message").innerText = "Success!";
    clearTimeout(runMessageTimer);
    runMessageTimer = setTimeout(() => $("#run-message").innerText = "", 5000);
}
function runMessageError(message){
    $("#run-message").style.color = "#e74c3c";
    $("#run-message").innerText = message;
    clearTimeout(runMessageTimer);
    runMessageTimer = setTimeout(() => $("#run-message").innerText = "", 5000);  
}
//END PROPERTY
function aBuffer(){
    const container = document.createElement("div");
    const layers = layersSelect();
    const output = outputName();
    const units = unitsSelect();
    const distance = inputNumber("Enter a postive number");
    const dissolve = document.createElement("select");
    dissolve.classList.add("input","full-input","input-space");
    const ops = ["No Dissolve (properties persist)","Dissolve overlapping features","Dissolve into single feature"];
    ops.forEach((op,index) => {
        const option = document.createElement("option");
        option.value = index;
        option.innerText = op;
        dissolve.append(option);
    });
    const buttonRun = runButton("Run Buffer");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            if (distance.value > 0){
                const layer = globalGeoJsonArray.find(fc => fc.vectorID === layers.value);
                if (layer.features.length > 0){
                    const buffer = turf.buffer(layer, distance.value, {units:units.value});
                    if (dissolve.value === "0"){
                    buildLayer(output.value,"Polygon",layer.config.props,buffer.features); 
                    }
                    else if (dissolve.value === "1"){
                        const union = turf.union(buffer);
                        const flat = turf.flatten(union);
                        buildLayer(output.value,"Polygon",[],flat.features);
                    }
                    else if (dissolve.value === "2"){
                        const union = turf.union(buffer);
                        buildLayer(output.value,"Polygon",[],[union]);
                    }
                    map.fitBounds(turf.bbox(buffer),{padding:20});
                    runMessageSuccess();
                }
                else {
                    runMessageError("Input Layer Empty");
                }      
            }
            else {
                distance.focus();
                distance.value = null;
                runMessageError("Enter Buffer Distance");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),layers,label("Buffer Distance"),distance,label("Units"),units,label("Dissolve Type"),dissolve,label("Output Layer Name"),output,buttonRun);
    return container;
}

function aErase(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_polygon");
    const eraseLayer = layersSelectByDrawMode("draw_polygon");
    const output = outputName();
    const buttonRun = runButton("Run Erase");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            if (inputlayer.value != eraseLayer.value){
                const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
                const erase = globalGeoJsonArray.find(fc => fc.vectorID === eraseLayer.value).features;
                if (inputFC.features.length === 0){
                    runMessageError("Input Layer Empty");
                    
                }
                else if (erase.length === 0){
                    runMessageError("Erase Layer Empty");
                }
                else {
                    let features = [];
                    inputFC.features.forEach(feature => {
                        const difference = turf.difference(turf.featureCollection([feature, ...erase]));
                        if (difference){
                            features.push(difference);
                        }
                    });
                    buildLayer(output.value,"Polygon",inputFC.config.props,features);
                    map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                    runMessageSuccess();
                }
            }
            else {
                eraseLayer.focus();
                runMessageError("Input same as Erase");
            }  
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,label("Erase Layer"),eraseLayer,label("Output Layer Name"),output,buttonRun);
    return container;
}

function aClip(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_polygon");
    const clipLayer = layersSelectByDrawMode("draw_polygon");
    const output = outputName();
    const buttonRun = runButton("Run Clip");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            if (inputlayer.value != clipLayer.value){
                const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
                const clipFC = globalGeoJsonArray.find(fc => fc.vectorID === clipLayer.value);
                let features = [];
                for (let i = 0; i < inputFC.features.length; i++) {
                    for (let h = 0; h < clipFC.features.length; h++){
                        const intersect = turf.intersect(turf.featureCollection([inputFC.features[i],clipFC.features[h]]),{properties:inputFC.features[i].properties});
                        if (intersect){
                            intersect.c = i;
                            features.push(intersect);
                        }
                    }
                }
                if (features.length === 0) {
                    runMessageError("Output Empty");
                }
                else {
                    for (let i = features.length - 1; i >= 0; i--) {
                        const current = features[i];
                        let next = features[i - 1];
                        if (next != undefined && current.c > 0 && current.c === next.c) {
                            const union = turf.union(turf.featureCollection([current,next]),{properties:current.properties});
                            features[i - 1] = union;
                            features[i - 1].c = current.c;
                            features.splice(i,1);
                        }
                        delete current.c;
                    }
                    buildLayer(output.value,"Polygon",inputFC.config.props,features);
                    map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                    runMessageSuccess();
                }
            }
            else {
                clipLayer.focus();
                runMessageError("Input same as Clip");
            }  
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,label("Clip Layer"),clipLayer,label("Output Layer Name"),output,buttonRun);
    return container;
}

function aUnion(){
    const container = document.createElement("div");
    const inputlayer1 = layersSelectByDrawMode("draw_polygon");
    const inputlayer2 = layersSelectByDrawMode("draw_polygon");
    const output = outputName();
    const buttonRun = runButton("Run Union");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            if (inputlayer1.value != inputlayer2.value){
                const inputFC1 = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer1.value);
                const inputFC2 = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer2.value);
                if (inputFC1.features.length > 0 || inputFC2.features.length > 0){
                    let cloneFC1 = turf.clone(inputFC1);
                    let cloneFC2 = turf.clone(inputFC2);
                    let features = [...cloneFC1.features,...cloneFC2.features];
                    const propsArray = [...cloneFC1.config.props,...cloneFC2.config.props];
                    features.forEach(feature => {
                        propsArray.forEach(prop => {
                            if (!feature.properties.hasOwnProperty(prop)) {
                                feature.properties[prop] = null;
                            }
                        });
                        const ordered = propsArray.reduce((acc, key) => {
                            if (feature.properties.hasOwnProperty(key)) {
                                acc[key] = feature.properties[key];
                            }
                            return acc;
                        }, {});
                        feature.properties = ordered;
                    });
                    const f = cleanforUnion(features);
                    buildLayer(output.value,"Polygon",propsArray,f);
                    map.fitBounds(turf.bbox(turf.featureCollection(f)),{padding:20});
                    runMessageSuccess();
                }
                else {
                    runMessageError("Inputs Empty");
                }
            }
            else {
                inputlayer2.focus();
                runMessageError("Input 2 same as Input 1");
            }  
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer 1"),inputlayer1,label("Input Layer 2"),inputlayer2,label("Output Layer Name"),output,buttonRun);
    return container;
}

function aIntersect(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_polygon");
    const intersectLayer = layersSelectByDrawMode("draw_polygon");
    const output = outputName();
    const buttonRun = runButton("Run Intersect");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            if (inputlayer.value != intersectLayer.value){
                const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
                const intersectFC = globalGeoJsonArray.find(fc => fc.vectorID === intersectLayer.value);
                let features = [];
                for (let i = 0; i < inputFC.features.length; i++) {
                    for (let h = 0; h < intersectFC.features.length; h++){
                        const props = {...inputFC.features[i].properties,...intersectFC.features[h].properties};
                        const intersect = turf.intersect(turf.featureCollection([inputFC.features[i],intersectFC.features[h]]),{properties:props});
                        if (intersect){
                            features.push(intersect);
                        }
                    }
                }
                if (features.length === 0) {
                    runMessageError("Output Empty");
                }
                else {
                    props = Object.keys(features[0].properties);
                    buildLayer(output.value,"Polygon",props,features);
                    map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                    runMessageSuccess();
                }
            }
            else {
                intersectLayer.focus();
                runMessageError("Input 2 same as Input 1");
            }  
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer 1"),inputlayer,label("Input Layer 2"),intersectLayer,label("Output Layer Name"),output,buttonRun);
    return container;
}

function aDissolve(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_polygon");
    const fc = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
    const select = document.createElement("select");
    select.classList.add("input","full-input","input-space");
    if (fc){updateSelectOptions(select,fc.config.props);}
    inputlayer.addEventListener("change",(e) => {
        const fc = globalGeoJsonArray.find(fc => fc.vectorID === e.target.value);
        updateSelectOptions(select,fc.config.props);
    });
    const output = outputName();
    const checkbox = document.createElement("input");
    checkbox.classList.add("input-space");
    checkbox.type = "checkbox";
    checkbox.checked = true;
    const buttonRun = runButton("Run Dissolve Polygon");
    buttonRun.addEventListener("click",function(){
        const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
        if (output.value.length > 0){
            if (inputFC.features.length > 0){
                const flatten = turf.flatten(inputFC);
                let dissolved = turf.dissolve(flatten, {propertyName:select.value});
                if (checkbox.checked){
                    for (let i = dissolved.features.length - 1; i >= 0; i--) {
                        const current = dissolved.features[i];
                        let next = dissolved.features[i - 1];
                        if (i > 0 && current.properties[select.value] === next.properties[select.value]) {
                            const union = turf.union(turf.featureCollection([current,next]),{properties:current.properties});
                            dissolved.features[i - 1] = union;
                            dissolved.features.splice(i,1);
                        }
                    }
                }
                buildLayer(output.value,"Polygon",inputFC.config.props,dissolved.features);
                map.fitBounds(turf.bbox(dissolved),{padding:20});
                runMessageSuccess();
            }
            else {
                runMessageError("Input Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,label("Dissolve Property"),select,label("Output Layer Name"),output,checkbox,label(" Allow multipart features"),buttonRun);
    return container;
}

function aMerge(){
    const container = document.createElement("div");
    const inputlayer = layersSelect();
    const fc = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
    const inputlayer2 = document.createElement("select");
    inputlayer2.classList.add("input","full-input","input-space");
    updateLayersSelectOptions(inputlayer2,fc.config.drawMode,fc.vectorID);
    inputlayer.addEventListener("change",(e) => {
        const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === e.target.value);
        updateLayersSelectOptions(inputlayer2,inputFC.config.drawMode,inputFC.vectorID);
    });
    const output = outputName();
    const buttonRun = runButton("Run Merge");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const inputFC1 = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
            const inputFC2 = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer2.value);
            if (inputFC1.features.length === 0){
                runMessageError("Input Layer 1 Empty");
            }
            else if (inputFC2.features.length === 0){
                runMessageError("Input Layer 2 Empty");
            }
            else {
                let cloneFC1 = turf.clone(inputFC1);
                let cloneFC2 = turf.clone(inputFC2);
                const features = [...cloneFC1.features,...cloneFC2.features];
                const propsArray = [...cloneFC1.config.props,...cloneFC2.config.props];
                features.forEach(feature => {
                    propsArray.forEach(prop => {
                        if (!feature.properties.hasOwnProperty(prop)) {
                            feature.properties[prop] = null;
                        }
                    });
                    const ordered = propsArray.reduce((acc, key) => {
                        if (feature.properties.hasOwnProperty(key)) {
                            acc[key] = feature.properties[key];
                        }
                        return acc;
                    }, {});
                    feature.properties = ordered;
                });
                if (inputFC1.config.drawMode === "draw_point"){
                    buildLayer(output.value,"Point",propsArray,features);
                }
                else if (inputFC1.config.drawMode === "draw_line_string"){
                    buildLayer(output.value,"LineString",propsArray,features);
                }
                else if (inputFC1.config.drawMode === "draw_polygon"){
                    buildLayer(output.value,"Polygon",propsArray,features);
                }
                map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                runMessageSuccess();
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer 1"),inputlayer,label("Input Layer 2"),inputlayer2,label("Output Layer Name"),output,buttonRun);
    return container;
}

function aAppend(){
    const container = document.createElement("div");
    const inputlayer = layersSelect();
    const fc = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
    const appendLayer = document.createElement("select");
    appendLayer.classList.add("input","full-input","input-space");
    updateLayersSelectOptions(appendLayer,fc.config.drawMode,fc.vectorID);
    inputlayer.addEventListener("change",(e) => {
        const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === e.target.value);
        updateLayersSelectOptions(appendLayer,inputFC.config.drawMode,inputFC.vectorID);
    });
    const buttonRun = runButton("Run Append");
    buttonRun.addEventListener("click",function(){
        const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
        const appendFC = globalGeoJsonArray.find(fc => fc.vectorID === appendLayer.value);
        if (appendFC.features.length === 0){
            runMessageError("Append Layer Empty");
        }
        else {
            let cloneAppend = turf.clone(appendFC);
            const propsObject = inputFC.config.props.reduce((obj, item) => {
                obj[item] = null; 
                return obj;
            }, {});
            turf.featureEach(cloneAppend, feature => {
                let newProp = {...propsObject};
                Object.keys(newProp).forEach(key => {
                    if (feature.properties.hasOwnProperty(key)) {
                        newProp[key] = feature.properties[key];
                    }
                });
                feature.properties = newProp;
            });
            inputFC.features = [...inputFC.features,...cloneAppend.features];
            map.getSource(inputFC.vectorID + "-source").setData(inputFC);
            map.fitBounds(turf.bbox(inputFC),{padding:20});
            runMessageSuccess();
        }
    });
    container.append(label("Target Layer"),inputlayer,label("Append Layer"),appendLayer,buttonRun);
    return container;
}

function aAddRemoveProps(){
    const container = document.createElement("div");
    const inputlayer = layersSelect();
    const propContainer = document.createElement("div");
    inputlayer.addEventListener("change",(e) => {
        const fc = globalGeoJsonArray.find(fc => fc.vectorID === e.target.value);
        createPropList(fc.config.props,propContainer);
    });
    const fc = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
    if (fc){createPropList(fc.config.props,propContainer);}
    const divButtons = document.createElement("div");
    divButtons.classList.add("tri-button-box");
    const buttonAddProp = document.createElement("button");
    buttonAddProp.innerText = "Add Property";
    buttonAddProp.title = "Add Property";
    buttonAddProp.classList.add("blue-btn");
    buttonAddProp.addEventListener("click", () => createPropertyListItem(propContainer));
    const buttonRun = document.createElement("button");
    buttonRun.innerText = "Run";
    buttonRun.title = "Run Add or Remove Properties";
    buttonRun.classList.add("green-btn");
    buttonRun.addEventListener("click",function(){
        const fc = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
        let newpropertiesArray = [];
        propContainer.childNodes.forEach(function(item){
            if (item.type === "text"){
                const prop = item.value.replace(/\s/g,"");
                if (prop.length > 0){
                    newpropertiesArray.push(prop);
                }
            }
        });
        newpropertiesArray = [...new Set(newpropertiesArray)];
        updateProperties(fc, newpropertiesArray);
        createPropList(fc.config.props,propContainer);
        runMessageSuccess();
    });
    const message = document.createElement("div");
    message.classList.add("run-message");
    message.id = "run-message";
    divButtons.append(buttonAddProp,buttonRun,message);
    propContainer.append();
    container.append(label("Input Layer"),inputlayer,label("Properties"),propContainer,divButtons);
    return container;
}

function aFindPointsWithin(){
    const container = document.createElement("div");
    const layersPoints = layersSelectByDrawMode("draw_point");
    const layersPolygons = layersSelectByDrawMode("draw_polygon");
    const output = outputName();
    const checkbox = document.createElement("input");
    checkbox.classList.add("input-space");
    checkbox.type = "checkbox";
    const fc = globalGeoJsonArray.find(fc => fc.vectorID === layersPolygons.value);
    const selectLabel = label("Polygon Property");
    const select = document.createElement("select");
    select.classList.add("input","full-input","input-space");
    selectLabel.style.display = "none";
    select.style.display = "none";
    if (fc){updateSelectOptions(select,fc.config.props);}
    layersPolygons.addEventListener("change",(e) => {
        const fc = globalGeoJsonArray.find(fc => fc.vectorID === e.target.value);
        updateSelectOptions(select,fc.config.props);
    });
    checkbox.addEventListener("change", (e) => {
        if (e.target.checked){
            selectLabel.style.display = "block";
            select.style.display = "block";
        }
        else {
            selectLabel.style.display = "none";
            select.style.display = "none";
        }  
    });
    const buttonRun = runButton("Run Points in Polygons");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const pntFC = globalGeoJsonArray.find(fc => fc.vectorID === layersPoints.value);
            const polyFC = globalGeoJsonArray.find(fc => fc.vectorID === layersPolygons.value);
            let ptsWithin = turf.pointsWithinPolygon(pntFC, polyFC);
            if  (ptsWithin.features.length === 0){
                runMessageError("Output Empty");
            }
            else {
                if (checkbox.checked){
                    const flatten = turf.flatten(ptsWithin);
                    if (pntFC.config.props.includes(select.value)){
                        ptsWithin = turf.tag(flatten, polyFC, select.value, select.value + "_1");
                    }
                    else {
                        ptsWithin = turf.tag(flatten, polyFC, select.value, select.value);
                    }
                }
                const props = Object.keys(ptsWithin.features[0].properties);
                buildLayer(output.value,"Point",props,ptsWithin.features);
                map.fitBounds(turf.bbox(ptsWithin),{padding:20});
                runMessageSuccess();
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Point Layer"),layersPoints,label("Polygon Selection Layer"),layersPolygons,label("Output Layer Name"),output,checkbox,label("Spatial join a polygon property to points"),selectLabel,select,buttonRun);
    return container;   
}

function aAggregate(){
    const container = document.createElement("div");
    const layersPoints = layersSelectByDrawMode("draw_point");
    const layersPolygons = layersSelectByDrawMode("draw_polygon");
    const buttonRun = runButton("Run Bin Points");
    buttonRun.addEventListener("click",function(){
        const pntFC = globalGeoJsonArray.find(fc => fc.vectorID === layersPoints.value);
        const polyFC = globalGeoJsonArray.find(fc => fc.vectorID === layersPolygons.value);
        if (polyFC.features.length === 0){
            runMessageError("Polygon Layer Empty");
        }
        else if (pntFC.features.length === 0){
            runMessageError("Point Layer Empty");
        }
        else {
            for (var i = 0; i < polyFC.features.length; i++){
                var pnts = turf.pointsWithinPolygon(pntFC, polyFC.features[i]);
                polyFC.features[i].properties.points_count = pnts.features.length;		
            }
            map.fitBounds(turf.bbox(polyFC),{padding:20});
            runMessageSuccess();
        }
    });
    container.append(label("Polygon Layer"),layersPolygons,label("Point Layer"),layersPoints,buttonRun);
    return container;   
}

function aVoronoi(){
    const container = document.createElement("div");
    const layersPoints = layersSelectByDrawMode("draw_point");
    const select = document.createElement("select");
    select.classList.add("input","full-input","input-space");
    const ops = ["Use bounding box of input point layer","Use bounding box of current map extent"];
    ops.forEach((op,index) => {
        const option = document.createElement("option");
        option.value = index;
        option.innerText = op;
        select.append(option);
    });
    const output = outputName();
    const buttonRun = runButton("Run Voronoi");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const pntFC = globalGeoJsonArray.find(fc => fc.vectorID === layersPoints.value);
            if (pntFC.features.length > 0){
                const bounds = turf.bbox(pntFC);
                if (select.value === "1"){
                    const mapBounds = map.getBounds().toArray().flat();
                    const mapBoundsPoly = turf.bboxPolygon(mapBounds);
                    const pntFCBoundsPoly = turf.bboxPolygon(bounds);
                    const isContained = turf.booleanContains(mapBoundsPoly, pntFCBoundsPoly);
                    if (isContained){
                        const flatten = turf.flatten(pntFC);
                        const voronoiPolygons = turf.voronoi(flatten, {bbox:mapBounds});
                        buildLayer(output.value,"Polygon",pntFC.config.props,voronoiPolygons.features);
                        map.fitBounds(turf.bbox(voronoiPolygons),{padding:20});
                        runMessageSuccess();
                    }
                    else {
                        runMessageError("Input Point Layer is not within Map Extent");
                    }
                }
                else {
                    const flatten = turf.flatten(pntFC);
                    const voronoiPolygons = turf.voronoi(flatten, {bbox:bounds});
                    buildLayer(output.value,"Polygon",pntFC.config.props,voronoiPolygons.features);
                    map.fitBounds(turf.bbox(voronoiPolygons),{padding:20});
                    runMessageSuccess();
                }
            }
            else {
                runMessageError("Input Point Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Point Layer"),layersPoints,label("Bounding Box"),select,label("Output Layer Name"),output,buttonRun);
    return container;  
}

function aTIN(){
    const container = document.createElement("div");
    const layersPoints = layersSelectByDrawMode("draw_point");
    const select = document.createElement("select");
    select.classList.add("input","full-input","input-space");
    const pntFC = globalGeoJsonArray.find(fc => fc.vectorID === layersPoints.value);
    if (pntFC){updateSelectOptions(select,pntFC.config.props,"None Selected");}
    layersPoints.addEventListener("change",(e) => {
        const pntFC = globalGeoJsonArray.find(fc => fc.vectorID === e.target.value);
        updateSelectOptions(select,pntFC.config.props,"None Selected");
    });
    const output = outputName();
    const buttonRun = runButton("Run TIN");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const pntFC = globalGeoJsonArray.find(fc => fc.vectorID === layersPoints.value);
            if (pntFC.features.length > 0){
                const flatten = turf.flatten(pntFC);
                let tin = undefined;
                let props = [];
                if (select.value === "None Selected"){
                    tin = turf.tin(flatten);
                    turf.featureEach(tin, feature => {
                        feature.properties = {};
                    });
                }
                else {
                    tin = turf.tin(flatten,select.value);
                    props = Object.keys(tin.features[0].properties);
                }
                buildLayer(output.value,"Polygon",props,tin.features);
                map.fitBounds(turf.bbox(tin),{padding:20});
                runMessageSuccess();
            }
            else {
                runMessageError("Input Point Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Point Layer"),layersPoints,label("Optional Z Value Property"),select,label("Output Layer Name"),output,buttonRun);
    return container;    
}

function aSmooth(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_polygon");
    const iterationsLabel = document.createElement("label");
    iterationsLabel.innerHTML = "Smooth Factor: <span id='smooth-factor' style='font-weight:bold;'>3</span>";
    const iterations = document.createElement("input");
    iterations.classList.add("input-space");
    iterations.setAttribute("type","range");
    iterations.setAttribute("min","1");
    iterations.setAttribute("max","5");
    iterations.setAttribute("step","0.5");
    iterations.setAttribute("value","3");
    iterations.addEventListener("input",function(e){
        $("#smooth-factor").innerText = iterations.value;
    });
    const output = outputName();
    const buttonRun = runButton("Run Smooth Polygon");
    buttonRun.addEventListener("click",function(){
        const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
        if (output.value.length > 0){
            if (inputFC.features.length > 0){
                const smoothed = turf.polygonSmooth(inputFC, {iterations:Number(iterations.value)});
                buildLayer(output.value,"Polygon",inputFC.config.props,smoothed.features);
                map.fitBounds(turf.bbox(smoothed),{padding:20});
                runMessageSuccess();
            }
            else {
                runMessageError("Input Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,iterationsLabel,iterations,label("Output Layer Name"),output,buttonRun);
    return container;
}

function aCurveLine(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_line_string");
    const sharpnessLabel = document.createElement("label");
    sharpnessLabel.innerHTML = "Sharpness Factor: <span id='sharpness-factor' style='font-weight:bold;'>0.8</span>";
    const sharpness = document.createElement("input");
    sharpness.classList.add("input-space");
    sharpness.setAttribute("type","range");
    sharpness.setAttribute("min","0.1");
    sharpness.setAttribute("max","1.6");
    sharpness.setAttribute("step","0.1");
    sharpness.setAttribute("value","0.8");
    sharpness.addEventListener("input",function(e){
        $("#sharpness-factor").innerText = sharpness.value;
    });
    const output = outputName();
    const buttonRun = runButton("Run Smooth Line");
    buttonRun.addEventListener("click",function(){
        
        if (output.value.length > 0){
            const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
            if (inputFC.features.length > 0){
                let features = [];
                for (let i = 0; i < inputFC.features.length; i++) {
                    const curved = turf.bezierSpline(inputFC.features[i], {sharpness:Number(sharpness.value),properties:inputFC.features[i].properties});
                    features.push(curved);
                }
                buildLayer(output.value,"LineString",inputFC.config.props,features);
                map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                runMessageSuccess();
            }
            else {
                runMessageError("Input Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,sharpnessLabel,sharpness,label("Output Layer Name"),output,buttonRun);
    return container;
}

function aSimplify(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_polygon","draw_line_string");
    const toleranceLabel = document.createElement("label");
    toleranceLabel.innerHTML = "Tolerance: <span id='simplify-tolerance' style='font-weight:bold;'>10</span>";
    const tolerance = document.createElement("input");
    tolerance.classList.add("input-space");
    tolerance.setAttribute("type","range");
    tolerance.setAttribute("min","0.0001");
    tolerance.setAttribute("max","0.01");
    tolerance.setAttribute("step","0.0001");
    tolerance.setAttribute("value","0.001");
    tolerance.addEventListener("input",function(e){
        $("#simplify-tolerance").innerText = turf.round(tolerance.value * 10000);
    });
    const output = outputName();
    const buttonRun = runButton("Run Simplify");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
            if (inputFC.features.length > 0){
                let features = [];
                turf.featureEach(inputFC, feature => {
                    const simplify = turf.simplify(feature, {tolerance:Number(tolerance.value)});
                    features.push(simplify);
                });
                buildLayer(output.value,features[0].geometry.type,inputFC.config.props,features);
                map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                runMessageSuccess();
            }
            else {
                runMessageError("Input Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,toleranceLabel,tolerance,label("Output Layer Name"),output,buttonRun);
    return container;
}

function aTruncate(){
    const container = document.createElement("div");
    const inputlayer = layersSelect();
    const truncateLabel = document.createElement("label");
    truncateLabel.innerHTML = "Coordinate Precision: <span id='coord-precision' style='font-weight:bold;'>6</span>";
    const trunc = document.createElement("input");
    trunc.classList.add("input-space");
    trunc.setAttribute("type","range");
    trunc.setAttribute("min","3");
    trunc.setAttribute("max","12");
    trunc.setAttribute("step","1");
    trunc.setAttribute("value","6");
    trunc.addEventListener("input",function(e){
        $("#coord-precision").innerText = trunc.value;
    });
    const output = outputName();
    const buttonRun = runButton("Run Truncate Coordinates");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
            if (inputFC.features.length > 0){
                const truncate = turf.truncate(inputFC,{precision:Number(trunc.value)});
                buildLayer(output.value,truncate.features[0].geometry.type,inputFC.config.props,truncate.features);
                map.fitBounds(turf.bbox(truncate),{padding:20});
                runMessageSuccess();
            }
            else {
                runMessageError("Input Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,truncateLabel,trunc,label("Output Layer Name"),output,buttonRun);
    return container;
}

function aGrid(){
    const container = document.createElement("div");
    const output = outputName();
    const units = unitsSelect();
    const cellSize = inputNumber("Enter a postive number");
    const select = document.createElement("select");
    select.classList.add("input","full-input","input-space");
    const ops = ["Hexagon","Triangle","Point"];
    ops.forEach((op) => {
        const option = document.createElement("option");
        option.value = op;
        option.innerText = op;
        select.append(option);
    });
    const maskLabel = label("Polygon Mask Layer");
    const mask = layersSelectByDrawMode("draw_polygon");
    maskLabel.style.display = "none";
    mask.style.display = "none";
    const checkbox = document.createElement("input");
    checkbox.classList.add("input-space");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", (e) => {
        if (e.target.checked){
            maskLabel.style.display = "block";
            mask.style.display = "block";
        }
        else {
            maskLabel.style.display = "none";
            mask.style.display = "none";
        }  
    });
    const buttonRun = runButton("Run Create Grid");
    buttonRun.addEventListener("click",function(){
        const bounds = map.getBounds().toArray().flat();
        if (output.value.length > 0){
            let grid = undefined;
            if (cellSize.value > 0){
                if (checkbox.checked){ //USES MASK
                    let maskFC = globalGeoJsonArray.find(fc => fc.vectorID === mask.value);
                    if (maskFC.features.length === 0){
                        runMessageError("Polygon Mask Layer is Empty");
                    }
                    else {
                        if (maskFC.features.length > 1){
                            maskFC = turf.union(maskFC);
                        }
                        else {
                            maskFC = maskFC.features[0];
                        }
                        const box = turf.bbox(maskFC);
                        if (select.value === "Hexagon"){
                            grid = turf.hexGrid(box,cellSize.value,{units:units.value,mask:maskFC});
                            buildLayer(output.value,"Polygon",[],grid.features);
                        }
                        else if (select.value === "Triangle"){
                            grid = turf.triangleGrid(box,cellSize.value,{units:units.value,mask:maskFC});
                            buildLayer(output.value,"Polygon",[],grid.features);
                        }
                        else if (select.value === "Point"){
                            grid = turf.pointGrid(box,cellSize.value,{units:units.value,mask:maskFC});
                            buildLayer(output.value,"Point",[],grid.features);
                        }
                        map.fitBounds(turf.bbox(grid),{padding:20});
                        runMessageSuccess();
                    }
                }
                else { //USES CURRENT MAP EXTENT
                    if (select.value === "Hexagon"){
                        grid = turf.hexGrid(bounds,cellSize.value,{units:units.value});
                        buildLayer(output.value,"Polygon",[],grid.features);
                    }
                    else if (select.value === "Triangle"){
                        grid = turf.triangleGrid(bounds,cellSize.value,{units:units.value});
                        buildLayer(output.value,"Polygon",[],grid.features);
                    }
                    else if (select.value === "Point"){
                        grid = turf.pointGrid(bounds,cellSize.value,{units:units.value});
                        buildLayer(output.value,"Point",[],grid.features);
                    }
                    map.fitBounds(turf.bbox(grid),{padding:20});
                    runMessageSuccess();
                }
            }
            else {
                cellSize.focus();
                cellSize.value = null;
                runMessageError("Enter Cell Side Length");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Grid Type"),select,label("Cell Side Length"),cellSize,label("Units"),units,label("Output Layer Name"),output,checkbox,label("Use a mask layer for grid coverage"),maskLabel,mask,buttonRun);
    return container;   
}

function aRandom(){
    const container = document.createElement("div");
    const output = outputName();
    const countLabel = document.createElement("label");
    countLabel.innerHTML = "Number of features: <span id='random-count' style='font-weight:bold;'>50</span>";
    const count = document.createElement("input");
    count.classList.add("input-space");
    count.setAttribute("type","range");
    count.setAttribute("min","10");
    count.setAttribute("max","200");
    count.setAttribute("step","10");
    count.setAttribute("value","50");
    count.addEventListener("input",function(e){
        $("#random-count").innerText = count.value;
    });
    const select = document.createElement("select");
    select.classList.add("input","full-input","input-space");
    const ops = ["Points","Lines","Polygons"];
    ops.forEach((op) => {
        const option = document.createElement("option");
        option.value = op;
        option.innerText = op;
        select.append(option);
    });
    const buttonRun = runButton("Run Create Random");
    buttonRun.addEventListener("click",function(){
        const bounds = map.getBounds().toArray().flat();
        const diff = Math.abs(bounds[2] - bounds[0]);
        let max = diff / 20;
        if (output.value.length > 0){
            let random = undefined;
            if (select.value === "Points"){
                random = turf.randomPoint(count.value, {bbox:bounds});
                buildLayer(output.value,"Point",[],random.features);
            }
            else if (select.value === "Lines"){
                random = turf.randomLineString(count.value, {bbox:bounds,max_length:max});
                buildLayer(output.value,"LineString",[],random.features);
            }
            else if (select.value === "Polygons"){
                random = turf.randomPolygon(count.value, {bbox:bounds,max_radial_length:max});
                buildLayer(output.value,"Polygon",[],random.features);
            }
            map.fitBounds(turf.bbox(random),{padding:20});
            runMessageSuccess();
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Geometry Type"),select,countLabel,count,label("Output Layer Name"),output,buttonRun);
    return container;   
}

function aVerticesPoints(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_polygon","draw_line_string");
    const output = outputName();
    const buttonRun = runButton("Run Vertices to Points");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
            if (inputFC.features.length > 0){
                let explode = turf.explode(inputFC);
                let uniquePoints = [];
                let seenCoordinates = new Set();
                explode.features.forEach((point) => {
                    const coords = point.geometry.coordinates.join(",");
                    if (!seenCoordinates.has(coords)) {
                        uniquePoints.push(point);
                        seenCoordinates.add(coords);
                    }
                });
                const unique = turf.featureCollection(uniquePoints);
                buildLayer(output.value,"Point",inputFC.config.props,unique.features);
                map.fitBounds(turf.bbox(unique),{padding:20});
                runMessageSuccess();
            }
            else {
                runMessageError("Input Layer is Empty");
            } 
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,label("Output Layer Name"),output,buttonRun);//,checkbox,label("Removes overlapping points")
    return container;      
}

function aExplode(){
    const container = document.createElement("div");
    const inputlayer = layersSelect();
    const output = outputName();
    const buttonRun = runButton("Run Explode");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
            if (inputFC.features.length > 0){
                const flatten = turf.flatten(inputFC);
                buildLayer(output.value,"Polygon",inputFC.config.props,flatten.features);
                map.fitBounds(turf.bbox(flatten),{padding:20});
                runMessageSuccess();
            }
            else {
                runMessageError("Input Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,label("Output Layer Name"),output,buttonRun);
    return container;   
}

function aCentroid(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_polygon","draw_line_string");
    const output = outputName();
    const buttonRun = runButton("Run Centroid");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
            if (inputFC.features.length > 0){
                let features = [];
                for (let i = 0; i < inputFC.features.length; i++) {
                    const centroid = turf.centroid(inputFC.features[i],{properties:inputFC.features[i].properties});
                    features.push(centroid);
                }
                buildLayer(output.value,"Point",inputFC.config.props,features);
                map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                runMessageSuccess();
            }
            else {
                runMessageError("Input Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,label("Output Layer Name"),output,buttonRun);
    return container;   
}

function aCenter(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_polygon","draw_line_string");
    const output = outputName();
    const buttonRun = runButton("Run Center");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
            if (inputFC.features.length > 0){
                let features = [];
                for (let i = 0; i < inputFC.features.length; i++) {
                    const center = turf.center(inputFC.features[i],{properties:inputFC.features[i].properties});
                    features.push(center);
                }
                buildLayer(output.value,"Point",inputFC.config.props,features);
                map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                runMessageSuccess();
            }
            else {
                runMessageError("Input Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,label("Output Layer Name"),output,buttonRun);
    return container;   
}

function aCenterOfMass(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_polygon","draw_line_string");
    const output = outputName();
    const buttonRun = runButton("Run Center of Mass");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
            if (inputFC.features.length > 0){
                let features = [];
                for (let i = 0; i < inputFC.features.length; i++) {
                    const center = turf.centerOfMass(inputFC.features[i],{properties:inputFC.features[i].properties});
                    features.push(center);
                }
                buildLayer(output.value,"Point",inputFC.config.props,features);
                map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                runMessageSuccess();
            }
            else {
                runMessageError("Input Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,label("Output Layer Name"),output,buttonRun);
    return container;   
}

function aCenterMean(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_polygon","draw_line_string");
    const output = outputName();
    const buttonRun = runButton("Run Center of Median");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
            if (inputFC.features.length > 0){
                let features = [];
                for (let i = 0; i < inputFC.features.length; i++) {
                    const centerMean = turf.centerMean(inputFC.features[i],{properties:inputFC.features[i].properties});
                    features.push(centerMean);
                }
                buildLayer(output.value,"Point",inputFC.config.props,features);
                map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                runMessageSuccess();
            }
            else {
                runMessageError("Input Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,label("Output Layer Name"),output,buttonRun);
    return container;   
}

function aSplitLine(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_line_string");
    const splitLayer = layersSelectByDrawMode("draw_line_string","draw_point");
    const output = outputName();
    const buttonRun = runButton("Run Split Line");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            if (inputlayer.value != splitLayer.value){
                const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
                const splitFC = globalGeoJsonArray.find(fc => fc.vectorID === splitLayer.value);

                if (inputFC.features.length === 0){
                    runMessageError("Input Line Layer is Empty");
                }
                else if (splitFC.features.length === 0){
                    runMessageError("Splitting Layer is Empty");
                }
                else {
                    const flatInputFC = turf.flatten(inputFC);
                    const combined = turf.combine(splitFC);
                    let features = [];
                    for (let i = 0; i < flatInputFC.features.length; i++){
                        const split = turf.lineSplit(flatInputFC.features[i],combined.features[0]);
                        if (split.features.length > 1){
                            turf.featureEach(split, feature => {
                                feature.properties = flatInputFC.features[i].properties;
                                delete feature.id;
                                delete feature.bbox;
                                features.push(feature);
                            });
                        }
                        else {
                            delete flatInputFC.features[i].id;
                            delete flatInputFC.features[i].bbox;
                            features.push(flatInputFC.features[i]);
                        }
                    }
                    buildLayer(output.value,"LineString",inputFC.config.props,features);
                    map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                    runMessageSuccess();
                }
            }
            else {
                splitLayer.focus();
                runMessageError("Input Line Layer same as Splitting Layer");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Line Layer"),inputlayer,label("Splitting Layer"),splitLayer,label("Output Layer Name"),output,buttonRun);
    return container;  
}

function aSplitLineDistance(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_line_string");
    const output = outputName();
    const units = unitsSelect();
    const distance = inputNumber("Enter a postive number");
    const buttonRun = runButton("Run Split Line by Distance");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            if (distance.value > 0){
                const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
                if (inputFC.features.length > 0){
                    const chunk = turf.lineChunk(inputFC, distance.value, {units:units.value});
                    buildLayer(output.value,"LineString",[],chunk.features);
                    map.fitBounds(turf.bbox(chunk),{padding:20});
                    runMessageSuccess();
                }
                else {
                    runMessageError("Input Line Layer is Empty");
                }
            }
            else {
                distance.focus();
                distance.value = null;
                runMessageError("Enter Segment Length");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Line Layer"),inputlayer,label("Segment Length"),distance,label("Units"),units,label("Output Layer Name"),output,buttonRun);
    return container;  
}

function aPointsAlongLines(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_line_string");
    const output = outputName();
    const units = unitsSelect();
    const distance = inputNumber("Enter a postive number");
    const checkbox = document.createElement("input");
    checkbox.classList.add("input-space");
    checkbox.type = "checkbox";
    checkbox.checked = false;
    const buttonRun = runButton("Run Create Points Along Lines");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            if (distance.value > 0){
                const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
                if (inputFC.features.length > 0){
                    const flatInputFC = turf.flatten(inputFC);
                    const propName = "point_distance_" + units.value;
                    let features = [];
                    turf.featureEach(flatInputFC, feature => {
                        const length = turf.length(feature,{units:units.value});
                        if (checkbox.checked){
                            const first = turf.along(feature,0,{units:units.value});
                            first.properties = {...feature.properties,...{[propName]:0},...{point_count:0}};
                            features.push(first);
                        }
                        let i = Number(distance.value);
                        let count = 1;
                        do {
                            const along = turf.along(feature,i,{units:units.value});
                            along.properties = {...feature.properties,...{[propName]:i},...{point_count:count}};
                            features.push(along);
                            i = i + Number(distance.value);
                            count = count + 1;
                        } while (i < length);
                    });
                    props = Object.keys(features[0].properties);
                    buildLayer(output.value,"Point",props,features);
                    map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                    runMessageSuccess();
                }
                else {
                    runMessageError("Input Line Layer is Empty");
                }
            }
            else {
                distance.focus();
                distance.value = null;
                runMessageError("Enter Distance Between Points");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Line Layer"),inputlayer,label("Distance Between Points"),distance,label("Units"),units,label("Output Layer Name"),output,checkbox,label("Add point at start of line"),buttonRun);
    return container;
}

function aEndpoints(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_line_string");
    const output = outputName();
    const select = document.createElement("select");
    select.classList.add("input","full-input","input-space");
    const ops = ["Both","Start Only","End Only"];
    ops.forEach((op,index) => {
        const option = document.createElement("option");
        option.value = index;
        option.innerText = op;
        select.append(option);
    });
    const buttonRun = runButton("Run Create Points at Line Endpoints");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
            if (inputFC.features.length > 0){
                const flatInputFC = turf.flatten(inputFC);
                let features = [];
                turf.featureEach(flatInputFC, feature => {
                    const startPnt = feature.geometry.coordinates[0];
                    const endPnt = feature.geometry.coordinates.at(-1);
                    startProp = {...feature.properties,...{endpoint_type:"Start"}};
                    endProp = {...feature.properties,...{endpoint_type:"End"}};
                    const start = {"type": "Feature","properties": startProp,"geometry": {"type": "Point","coordinates": startPnt}};
                    const end = {"type": "Feature","properties": endProp,"geometry": {"type": "Point","coordinates": endPnt}};
                    if (select.value === "0"){
                        features.push(start,end);
                    }
                    else if (select.value === "1"){
                        features.push(start);
                    }
                    else if (select.value === "2"){
                        features.push(end);
                    }
                });
                buildLayer(output.value,"Point",inputFC.config.props,features);
                map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                runMessageSuccess();
            }
            else {
                runMessageError("Input Line Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Line Layer"),inputlayer,label("Point Placement"),select,label("Output Layer Name"),output,buttonRun);
    return container;
}

function aFindSelfOverlaps(){
    const container = document.createElement("div");
    const inputlayer = layersSelect();
    const output = outputName();
    const buttonRun = runButton("Run Find Self Overlaps");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
            const a = inputFC.features;
            if (a.length > 0){
                let features = [];
                if (inputFC.config.drawMode === "draw_polygon"){
                    for (let i = 0; i < a.length; i++) {
                        for (let j = i + 1; j < a.length; j++) {
                            const intersect = turf.intersect(turf.featureCollection([a[i],a[j]]));
                            if (intersect) {
                                features.push(intersect);
                            }
                        }
                    }
                    features = features.filter(item => turf.area(item) > 0.01);
                    if (features.length > 0){
                        buildLayer(output.value,"Polygon",[],features);
                    }
                } 
                else if (inputFC.config.drawMode === "draw_line_string") {
                    for (let i = 0; i < a.length; i++) {
                        for (let j = i + 1; j < a.length; j++) {
                            const overlap = turf.lineOverlap(a[i], a[j],{tolerance:0.005});
                            if (overlap) {
                                turf.featureEach(overlap, feature => {
                                    feature.properties = {};
                                    features.push(feature);
                                });
                            }
                        }
                    }
                    if (features.length > 0){
                        buildLayer(output.value,"LineString",[],features);
                    }
                }
                else if (inputFC.config.drawMode === "draw_point"){
                    for (let i = 0; i < a.length; i++) {
                        for (let j = i + 1; j < a.length; j++) {
                            const equal = turf.booleanEqual(a[i].geometry,a[j].geometry);
                            if (equal) {
                                a[i].properties = {};
                                features.push(a[i]);
                            }
                        }
                    }
                    if (features.length > 0){
                        buildLayer(output.value,"Point",[],features);
                    }
                }
                if (features.length > 0){
                    map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                    runMessageSuccess();
                }
                else {
                    runMessageError("Output is Empty");
                }
            }
             else {
                runMessageError("Input Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,label("Output Layer Name"),output,buttonRun);
    return container;      
}

function aFixSelfOverlaps(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_polygon");
    const output = outputName();
    const buttonRun = runButton("Run Fix Self Overlaps");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
            if (inputFC.features.length > 0){
                const cloneFC1 = turf.clone(inputFC);
                let a = cloneFC1.features;
                for (let i = 0; i < a.length; i++) {
                    for (let j = i + 1; j < a.length; j++) {
                        if (a[i] != null && a[j] != null){
                            const intersect = turf.intersect(turf.featureCollection([a[i],a[j]]));
                            if (intersect) {
                                const ci = turf.booleanContains(a[i],a[j]); //i contains j
                                const cj = turf.booleanContains(a[j],a[i]); //j contains i
                                if (ci){
                                    a[i] = turf.union(turf.featureCollection([a[i],a[j]]),{properties:a[i].properties});
                                    a[j] = null;
                                }
                                else if (cj){
                                    a[j] = turf.union(turf.featureCollection([a[j],a[i]]),{properties:a[j].properties});
                                    a[i] = null;
                                }
                                else {
                                    const areaI = turf.area(a[i]);
                                    const areaJ = turf.area(a[j]);
                                    if (areaI > areaJ){
                                        a[i] = turf.union(turf.featureCollection([a[i],intersect]),{properties:a[i].properties});
                                        a[j] = turf.difference(turf.featureCollection([a[j],a[i]]));
                                    }
                                    else {
                                        a[j] = turf.union(turf.featureCollection([a[j],intersect]),{properties:a[j].properties});
                                        a[i] = turf.difference(turf.featureCollection([a[i],a[j]]));
                                    }
                                    
                                }
                            }
                        }
                    }
                }
                const removeNulls = a.filter(item => item !== null);
                const removeSmall = removeNulls.filter(item => turf.area(item) > 0.01);
                buildLayer(output.value,"Polygon",inputFC.config.props,removeSmall);
                map.fitBounds(turf.bbox(turf.featureCollection(removeSmall)),{padding:20});
                runMessageSuccess();
            }
            else {
                runMessageError("Input Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,label("Output Layer Name"),output,buttonRun);
    return container;      
}

function aLineIntersections(){
    const container = document.createElement("div");
    const inputlayer = layersSelectByDrawMode("draw_polygon","draw_line_string");
    const select = document.createElement("select");
    select.classList.add("input","full-input","input-space");
    const ops = ["Find Self Intersections","Find Intersections with another layer"];
    ops.forEach((op,index) => {
        const option = document.createElement("option");
        option.value = index;
        option.innerText = op;
        select.append(option);
    });
    const intersectLabel = label("Intersection Layer");
    const intersectLayer = layersSelectByDrawMode("draw_polygon","draw_line_string");
    intersectLabel.style.display = "none";
    intersectLayer.style.display = "none";
    select.addEventListener("change", (e) => {
        if (e.target.value === "1"){
            intersectLabel.style.display = "block";
            intersectLayer.style.display = "block";
        }
        else {
            intersectLabel.style.display = "none";
            intersectLayer.style.display = "none";
        }  
    });
    const output = outputName();
    const buttonRun = runButton("Run Find Line Intersections");
    buttonRun.addEventListener("click",function(){
        if (output.value.length > 0){
            const inputFC = globalGeoJsonArray.find(fc => fc.vectorID === inputlayer.value);
            const a = inputFC.features;
            if (a.length > 0){
                let features = [];
                if (select.value === "0"){
                    for (let i = 0; i < a.length; i++) {
                        const kinks = turf.kinks(a[i]);
                        if (kinks) {
                            turf.featureEach(kinks, feature => {
                                features.push(feature);
                            });
                        }
                        for (let j = i + 1; j < a.length; j++) {
                            const intersects = turf.lineIntersect(a[i], a[j]);
                            if (intersects) {
                                turf.featureEach(intersects, feature => {
                                    features.push(feature);
                                });
                            }
                        }
                    }
                    if (features.length > 0){
                        buildLayer(output.value,"Point",[],features);
                        map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                        runMessageSuccess();
                    }
                    else {
                        runMessageError("Output Empty");
                    }
                }
                else {
                    if (inputlayer.value != intersectLayer.value){
                        const intersectFC = globalGeoJsonArray.find(fc => fc.vectorID === intersectLayer.value);
                        for (let i = 0; i < inputFC.features.length; i++) {
                            for (let h = 0; h < intersectFC.features.length; h++){
                                const intersect = turf.lineIntersect(inputFC.features[i],intersectFC.features[h]);
                                if (intersect){
                                    turf.featureEach(intersect, feature => {
                                        features.push(feature);
                                    });
                                }
                            }
                        }
                        if (features.length > 0){
                            buildLayer(output.value,"Point",[],features);
                            map.fitBounds(turf.bbox(turf.featureCollection(features)),{padding:20});
                            runMessageSuccess();
                        }
                        else {
                            runMessageError("Output Empty");
                        }
                    }
                    else {
                        intersectLayer.focus();
                        runMessageError("Input Layer same as Intersection Layer");
                    }
                }
            }
            else {
                runMessageError("Input Layer is Empty");
            }
        }
        else {
            output.focus();
            runMessageError("Enter Output Layer Name");
        }
    });
    container.append(label("Input Layer"),inputlayer,label("Intersection Type"),select,intersectLabel,intersectLayer,label("Output Layer Name"),output,buttonRun);
    return container;      
}