
if (documents.length == 0) {
    alert("Select a texture");
    var file = File.openDialog("select a texture");
    open(file);
}

var doc = activeDocument;

// WINDOW
// ======
var window = new Window("dialog");
window.text = "Photoshop Tool";
window.orientation = "row";
window.alignChildren = ["center", "top"];
window.spacing = 10;
window.margins = 16;

// TPANEL1
// =======
var tpanel1 = window.add("tabbedpanel", undefined, undefined, { name: "tpanel1" });
tpanel1.alignChildren = "fill";
tpanel1.preferredSize.width = 129.531;
tpanel1.margins = 0;

// TAB1
// ====
var tab1 = tpanel1.add("tab", undefined, undefined, { name: "tab1" });
tab1.text = "Load";
tab1.orientation = "column";
tab1.alignChildren = ["left", "top"];
tab1.spacing = 10;
tab1.margins = 10;

// TAB2
// ====
var tab2 = tpanel1.add("tab", undefined, undefined, { name: "tab2" });
tab2.text = "Save";
tab2.orientation = "column";
tab2.alignChildren = ["left", "top"];
tab2.spacing = 10;
tab2.margins = 10;

// TAB3
// ====
var tab3 = tpanel1.add("tab", undefined, undefined, { name: "tab3" });
tab3.text = "Compress & Combine";
tab3.orientation = "column";
tab3.alignChildren = ["left", "top"];
tab3.spacing = 10;
tab3.margins = 10;

// TPANEL1
// =======
tpanel1.selection = tab1; 

// PANEL1
// ======
var panel1 = tab1.add("panel", undefined, undefined, { name: "panel1" });
panel1.text = "Load";
panel1.orientation = "column";
panel1.alignChildren = ["left", "top"];
panel1.spacing = 10;
panel1.margins = 10;

var btnSelectLoadPath = panel1.add("button", undefined, undefined, { name: "btnSelectLoadPath" });
btnSelectLoadPath.text = "...";

var inputLoadPath = panel1.add('edittext {properties: {name: "inputLoadPath"}}');
if (activeDocument.saved) {
    inputLoadPath.text = activeDocument.path;
}
else {
    inputLoadPath.text = "                                                                                  ";
}

var statictext1 = panel1.add("statictext", undefined, undefined, { name: "statictext1" });
statictext1.text = "Extension to load: ";

//var inputLoadExtension = panel1.add('edittext {properties: {name: "inputLoadExtension"}}');
//inputLoadExtension.text = "dds";

var loadDropdown1_array = ["jpg", "png", "dds", "tga"];
var loadDropdown1 = panel1.add("dropdownlist", undefined, undefined, { name: "extension", items: loadDropdown1_array });
loadDropdown1.selection = 0; 

var btnLoadAll = panel1.add("button", undefined, undefined, { name: "btnLoadAll" });
btnLoadAll.text = "Open all files in folder";
btnLoadAll.helpTip = "load all images from a folder and groups the files into layersets";

// PANEL2
// ======
var panel2 = tab2.add("panel", undefined, undefined, { name: "panel2" });
panel2.text = "Save";
panel2.orientation = "column";
panel2.alignChildren = ["left", "top"];
panel2.spacing = 10;
panel2.margins = 10;

var btnSelectSavePath = panel2.add("button", undefined, undefined, { name: "btnSelectSavePath" });
btnSelectSavePath.text = "...";

var inputSavePath = panel2.add('edittext {properties: {name: "inputSavePath"}}');
if (activeDocument.saved) {
    inputSavePath.text = activeDocument.path;
}
else {
    inputSavePath.text = "                                                                                  ";
}

var statictext2 = panel2.add("statictext", undefined, undefined, { name: "statictext2" });
statictext2.text = "Extension to save: ";

var saveDropdown1_array = ["png", "dds"];
var saveDropdown1 = panel2.add("dropdownlist", undefined, undefined, { name: "extension", items: saveDropdown1_array });
saveDropdown1.selection = 0; 

var inputName = panel2.add('edittext {properties: {name: "inputName"}}');
inputName.text = doc.name;
inputName.helpTip = "write the name you want the saved image to have. (only for the single file [Save button])";


var btn3 = panel2.add("button", undefined, undefined, { name: "btn3" });
btn3.text = "Save";
btn3.helpTip = "save document as image";

var btnSaveAll = panel2.add("button", undefined, undefined, { name: "btnSaveAll" });
btnSaveAll.text = "Save each layer as image";
btnSaveAll.helpTip = "Save each layer as independent image using the layer's name. Only works for group ordered layers. (use [open all files in folder] button to load and group images into layers)";

// GROUP1
// ======
var group1 = tab3.add("group", undefined, { name: "Tools" });
group1.orientation = "row";
group1.alignChildren = ["left", "center"];
group1.spacing = 10;
group1.margins = 0; 
group1.alignChildren = "fill";


// PANEL3
// ======
var panel3 = group1.add("panel", undefined, undefined, { name: "panel3" });
panel3.text = "Compression";
panel3.orientation = "column";
panel3.alignChildren = ["left", "top"];
panel3.spacing = 10;
panel3.margins = 10;

var statictext3 = panel3.add("statictext", undefined, undefined, { name: "statictext3" });
statictext3.text = "Mip level";

var currValText = panel3.add("statictext", undefined, undefined, { name: "currValText" });
currValText.alignment = ["center", "top"];

var slider = panel3.add("slider", undefined, 0, 0, nearestPow2(doc.width));
slider.preferredSize.width = 100;
slider.value = nearestPow2(doc.width);

currValText.text = slider.value.toString();

var statictext4 = panel3.add("statictext", undefined, undefined, { name: "statictext4" });
statictext4.text = "Final Resolution:";

var currSizeText = panel3.add("statictext", undefined, undefined, { name: "currSizeText" });
currSizeText.text = Math.pow(2, slider.value).toString();
currSizeText.alignment = ["center", "top"];

// PANEL4 COMBINE
// ======
var panel4 = group1.add("panel", undefined, undefined, { name: "panel4" });
panel4.text = "Combine";
panel4.orientation = "column";
panel4.alignChildren = ["left", "top"];
panel4.spacing = 10;
panel4.margins = 10;



// COMBINE TPANEL1
// =======
var combineTPanel1 = panel4.add("tabbedpanel", undefined, undefined, { name: "tpanel1" });
combineTPanel1.alignChildren = "Order Settings";
combineTPanel1.preferredSize.width = 200;
combineTPanel1.margins = 0;

// COMBINE TAB1
// ====
var combTab1 = combineTPanel1.add("tab", undefined, undefined, { name: "tab1" });
combTab1.text = "single image";
combTab1.orientation = "column";
combTab1.alignChildren = ["left", "top"];
combTab1.spacing = 10;
combTab1.margins = 10;

// COMBINE TAB2
// ====
var combTab2 = combineTPanel1.add("tab", undefined, undefined, { name: "tab2" });
combTab2.text = "ordered group";
combTab2.orientation = "column";
combTab2.alignChildren = ["left", "top"];
combTab2.spacing = 10;
combTab2.margins = 10;

// single combination
var checkbox1 = combTab1.add("checkbox", undefined, undefined, { name: "checkbox1" });
checkbox1.text = "Specify layer names";

var layersDropdown1_array = ["none"];

for (var i = 0; i < doc.artLayers.length; i++) {
    layersDropdown1_array.push(doc.artLayers[i].name);
}

var roughDropdown1 = combTab1.add("dropdownlist", undefined, undefined, { name: "extension", items: layersDropdown1_array });
roughDropdown1.selection = 0;

var metalDropdown1 = combTab1.add("dropdownlist", undefined, undefined, { name: "extension", items: layersDropdown1_array });
metalDropdown1.selection = 0;

var aoDropdown1 = combTab1.add("dropdownlist", undefined, undefined, { name: "extension", items: layersDropdown1_array });
aoDropdown1.selection = 0; 

roughDropdown1.enabled = false;
metalDropdown1.enabled = false;
aoDropdown1.enabled = false;

var btn4 = combTab1.add("button", undefined, undefined, { name: "btn4" });
btn4.text = "combine";
btn4.helpTip = "makes the selected layers ocupy only one channel of the final image";


var combineSavebtn = combTab1.add("button", undefined, undefined, { name: "combineAllSavebtn" });
combineSavebtn.text = "save combination";
combineSavebtn.helpTip = "save combination as image";


//multi combination
var statictext5 = combTab2.add("statictext", undefined, undefined, { name: "statictext5" });
statictext5.text = "Combination order";

var orderDropdown1_array = ["AO", "metallic", "roughness"];

var redDropdown1 = combTab2.add("dropdownlist", undefined, undefined, { name: "extension", items: orderDropdown1_array });
redDropdown1.selection = 2;

var greenDropdown1 = combTab2.add("dropdownlist", undefined, undefined, { name: "extension", items: orderDropdown1_array });
greenDropdown1.selection = 1;

var blueDropdown1 = combTab2.add("dropdownlist", undefined, undefined, { name: "extension", items: orderDropdown1_array });
blueDropdown1.selection = 0; 

var combineAllbtn = combTab2.add("button", undefined, undefined, { name: "combineAllbtn" });
combineAllbtn.text = "combine for all groups";
combineAllbtn.helpTip = "if the layers are grouped, combines the AO, roughness and metalic layers";

var combineAllSavebtn = combTab2.add("button", undefined, undefined, { name: "combineAllSavebtn" });
combineAllSavebtn.text = "save all combinated sets";
combineAllSavebtn.helpTip = "if the layers are grouped, saves each combination grupo into images";


// PANEL5
// ======
//var panel5 = panel1.add("panel", undefined, undefined, { name: "panel5" });
//panel5.text = "load compress and save all";
//panel5.orientation = "column";
//panel5.alignChildren = ["left", "top"];
//panel5.spacing = 10;
//panel5.margins = 10;
//
//var btnMegaLoadCompressSaveAll = panel5.add("button", undefined, undefined, { name: "btnMegaLoadCompressSaveAll" });
//btnMegaLoadCompressSaveAll.text = "Load Compress and Save All";

var closeBtn = window.add("button", undefined, "Close", { name: "cancel" });

btnSelectLoadPath.onClick = function () {
    var folder = Folder.selectDialog("Select folder to load");
    inputLoadPath.text = folder.fullName;
};

btnSelectSavePath.onClick = function () {
    var folder = Folder.selectDialog("Select folder to save");
    inputSavePath.text = folder.fullName;
};

slider.onChanging = function () {
    slider.value = Math.round(slider.value);
    currValText.text = slider.value.toString();
    currSizeText.text = Math.pow(2, slider.value);
}

//simple save
btn3.onClick = function () {
    if (inputSavePath.text == "                                                                                  ") {
        alert("error! save path is empty");
        return;
    }

    var originalWidth = doc.width;
    var originalHeight = doc.height;
    var resizeWidth = Math.pow(2, slider.value);
    var resizeHeight = Math.pow(2, slider.value);

    var previousState = doc.activeHistoryState;
    doc.resizeImage(resizeWidth, resizeHeight);

    if (saveDropdown1.selection.text == "png") {
        var file = new File(inputSavePath.text + "/" + inputName.text + ".png");

        var opts = new PNGSaveOptions();

        doc.saveAs(file, opts, true);

    }
    else if (saveDropdown1.selection.text == "dds") {
        saveDDS(inputSavePath.text + "/" + inputName.text);
    }

    doc.resizeImage(originalWidth, originalHeight);
    doc.activeHistoryState = previousState;

};

checkbox1.onClick = function () {
    roughDropdown1.enabled = checkbox1.value;
    metalDropdown1.enabled = checkbox1.value;
    aoDropdown1.enabled = checkbox1.value;
}

//single combine
btn4.onClick = function () {

    if (doc.layers.length >= 3) {
        var roughLayer = doc.layers[0];
        var metalLayer = doc.layers[1];
        var AOLayer = doc.layers[2];
    }
    else {
        return;
    }
    

    if (checkbox1.value) {
        var roughLayer = doc.layers.getByName(roughDropdown1.selection.text)
        var metalLayer = doc.layers.getByName(metalDropdown1.selection.text)
        var AOLayer = doc.layers.getByName(aoDropdown1.selection.text)
    }

    roughLayer.name = roughLayer.name;
    metalLayer.name = metalLayer.name;
    AOLayer.name = AOLayer.name;

    doc.activeLayer = roughLayer;
    advancedBlend(true, false, false);

    doc.activeLayer = metalLayer;
    advancedBlend(false, true, false);

    doc.activeLayer = AOLayer;
    advancedBlend(false, false, true);
};

combineSavebtn.onClick = function () {
    btn3.onClick();
};

combineAllbtn.onClick = function () {
    var imgTypeKeys = ["albedo", "AO", "emissive", "metallic", "normal", "roughness", "opacity"];

    for (var i = 0; i < activeDocument.layerSets.length; i++) {

        //if layers have not been already sorted
        if (!layerWithNameExist(activeDocument.layerSets[i].layers, "rgb")) {
            activeDocument.layerSets[i].layerSets.add();
            activeDocument.layerSets[i].layerSets[0].name = "rgb";

            var AOFound = false;
            var MetallicFound = false;
            var RoughnessFound = false;

            for (var e = 0; e < activeDocument.layerSets[i].artLayers.length; e++) {

                if (hasKey(activeDocument.layerSets[i].artLayers[e].name, "AO")) {
                    AOFound = true;
                    activeDocument.layerSets[i].artLayers[e].move(activeDocument.layerSets[i].layerSets[0], ElementPlacement.INSIDE);
                }
                else if (hasKey(activeDocument.layerSets[i].artLayers[e].name, "metallic")) {
                    MetallicFound = true;
                    activeDocument.layerSets[i].artLayers[e].move(activeDocument.layerSets[i].layerSets[0], ElementPlacement.INSIDE);
                }
                else if (hasKey(activeDocument.layerSets[i].artLayers[e].name, "roughness")) {
                    RoughnessFound = true;
                    activeDocument.layerSets[i].artLayers[e].move(activeDocument.layerSets[i].layerSets[0], ElementPlacement.INSIDE);
                }
            }

            if (!AOFound) {
                //alert("AO texture is missing for the group " + activeDocument.layerSets[i].name + ". Please add it");
                activeDocument.layerSets[i].layerSets[0].artLayers.add();
                activeDocument.layerSets[i].layerSets[0].artLayers[0].name = "empty_AO";
            }

            if (!MetallicFound) {
                //alert("metallic texture is missing for the group " + activeDocument.layerSets[i].name + ". Please add it");
                activeDocument.layerSets[i].layerSets[0].artLayers.add();
                activeDocument.layerSets[i].layerSets[0].artLayers[0].name = "empty_metallic";
            }

            if (!RoughnessFound) {
                //alert("roughness texture is missing for the group " + activeDocument.layerSets[i].name + ". Please add it");
                activeDocument.layerSets[i].layerSets[0].artLayers.add();
                activeDocument.layerSets[i].layerSets[0].artLayers[0].name = "empty_roughness";
            }
        }


        if (activeDocument.layerSets[i].layerSets.length > 0) {
            if (activeDocument.layerSets[i].layerSets[0].artLayers.length == 3) {

                //red
                for (var x = 0; x < 3; x++) {
                    if (hasKey(activeDocument.layerSets[i].layerSets[0].artLayers[x].name, redDropdown1.selection.text)) {
                        doc.activeLayer = activeDocument.layerSets[i].layerSets[0].artLayers[x];
                        advancedBlend(true, false, false);
                        break;
                    }
                }

                //green
                for (var x = 0; x < 3; x++) {
                    if (hasKey(activeDocument.layerSets[i].layerSets[0].artLayers[x].name, greenDropdown1.selection.text)) {
                        doc.activeLayer = activeDocument.layerSets[i].layerSets[0].artLayers[x];
                        advancedBlend(false, true, false);
                        break;
                    }
                }

                //blue
                for (var x = 0; x < 3; x++) {
                    if (hasKey(activeDocument.layerSets[i].layerSets[0].artLayers[x].name, blueDropdown1.selection.text)) {
                        doc.activeLayer = activeDocument.layerSets[i].layerSets[0].artLayers[x];
                        advancedBlend(false, false, true);
                        break;
                    }
                }

                
            }
        }
        else {
            alert("no images for combination found");
        }
        
    }

};

combineAllSavebtn.onClick = function () {
    if (inputSavePath.text == "                                                                                  ") {
        alert("error! save path is empty");
        return;
    }

    //compress
    var originalWidth = activeDocument.width;
    var originalHeight = activeDocument.height;
    var resizeWidth = Math.pow(2, slider.value);
    var resizeHeight = Math.pow(2, slider.value);

    var previousState = doc.activeHistoryState;

    activeDocument.resizeImage(resizeWidth, resizeHeight);

    //save
    for (var i = 0; i < activeDocument.layerSets.length; i++) {
        if (saveDropdown1.selection.text == "png") {
            var file = new File(inputSavePath.text + "/" + activeDocument.layerSets[i].name + "_mix" + ".png");

            var opts = new PNGSaveOptions();

            activeDocument.saveAs(file, opts, true);

        }
        else if (saveDropdown1.selection.text == "dds") {
            saveDDS(inputSavePath.text + "/" + activeDocument.layerSets[i].name + "_mix");
        }
        activeDocument.layerSets[i].visible = false;
    }

    //reactivate layers
    for (var i = 0; i < activeDocument.layerSets.length; i++) {
        activeDocument.layerSets[i].visible = true;
    }

    activeDocument.resizeImage(originalWidth, originalHeight);
    doc.activeHistoryState = previousState;

};

btnSaveAll.onClick = function () {
    if (inputSavePath.text == "                                                                                  ") {
        alert("error! save path is empty");
        return;
    }

    //compress
    var originalWidth = activeDocument.width;
    var originalHeight = activeDocument.height;
    var resizeWidth = Math.pow(2, slider.value);
    var resizeHeight = Math.pow(2, slider.value);

    var previousState = doc.activeHistoryState;
    activeDocument.resizeImage(resizeWidth, resizeHeight);

    //disable combination layersets
    for (var i = 0; i < activeDocument.layerSets.length; i++) {
        if (layerWithNameExist(activeDocument.layerSets[i].layers, "rgb")) {
            activeDocument.layerSets[i].layerSets[0].visible = false;
        }
    }

    //save
    for (var i = 0; i < activeDocument.layerSets.length; i++) {

        for (var e = 0; e < activeDocument.layerSets[i].artLayers.length; e++) {
            if (saveDropdown1.selection.text == "png") {
                var file = new File(inputSavePath.text + "/" + activeDocument.layerSets[i].artLayers[e].name + ".png");

                var opts = new PNGSaveOptions();

                activeDocument.saveAs(file, opts, true);

            }
            else if (saveDropdown1.selection.text == "dds") {
                saveDDS(inputSavePath.text + "/" + activeDocument.layerSets[i].artLayers[e].name);
            }
            activeDocument.layerSets[i].artLayers[e].visible = false;
        }
        
    }

    //enable combination layersets
    for (var i = 0; i < activeDocument.layerSets.length; i++) {
        activeDocument.layerSets[i].layerSets[0].visible = true;
    }

    //enable all layers
    for (var i = 0; i < activeDocument.layerSets.length; i++) {
        for (var e = 0; e < activeDocument.layerSets[i].artLayers.length; e++) {
            activeDocument.layerSets[i].artLayers[e].visible = true;
        }
    }

    activeDocument.resizeImage(originalWidth, originalHeight);
    doc.activeHistoryState = previousState;
};

btnLoadAll.onClick = function () {

    if (inputLoadPath.text == "                                                                                  ") {
        alert("error! load path is empty");
        return;
    }

    var folder = new Folder(inputLoadPath.text);
    //var files = folder.getFiles(/\.(jpg?|png?|dds?)$/i);
    //var files = folder.getFiles("*." + inputLoadExtension.text);
    var imgTypeKeys = ["albedo", "AO", "emissive", "metallic", "normal", "roughness", "opacity"];
    var baseNames = [];

    var files = folder.getFiles("*." + loadDropdown1.selection.text);
    var initialDocName = activeDocument.name;
    for (var i = 0; i < files.length; ++i) {

        var baseName;
        var foundKey = false;
        for (var e = 0; e < imgTypeKeys.length; e++) {
            baseName = files[i].name.replace("." + loadDropdown1.selection.text, '');
            if (hasKey(baseName, imgTypeKeys[e])) {
                foundKey = true;
                baseName = baseName.replace(imgTypeKeys[e], '');

                if (!existInArr(baseNames, baseName)) {
                    baseNames.push(baseName);
                    activeDocument.layerSets.add();
                    activeDocument.layerSets[0].name = baseName;
                }
                break;
            }
        }
        if (!foundKey) {
            alert("files not named correclty");
            return;
        }


        if (files[i].name != initialDocName) {
            var oldDoc = activeDocument;
            var newDoc = open(files[i]);
            newDoc.changeMode(ChangeMode.RGB);
            if (newDoc.width != documents[0].width || newDoc.height != documents[0].height) {
                var w = newDoc.width;
                var h = newDoc.height;
                activeDocument = documents[0];
                activeDocument.resizeImage(w, h);
                activeDocument = documents[1];
            }
            documents[1].artLayers[0].duplicate(documents[0].layerSets.getByName(baseName));
            documents[1].close(SaveOptions.DONOTSAVECHANGES);
            documents[0].layerSets.getByName(baseName).artLayers[0].name = files[i].name;
        }
        else {
            documents[0].artLayers[0].name = files[i].name;
            documents[0].artLayers[0].move(documents[0].layerSets.getByName(baseName), ElementPlacement.INSIDE);
        }
    }
    activeDocument = documents[0];

};

//btnMegaLoadCompressSaveAll.onClick = function () {
//    if (inputSavePath.text == "") {
//        alert("error! save path is empty");
//        return;
//    }
//
//    var folder = new Folder(activeDocument.path);
//    //var files = folder.getFiles(/\.(jpg?|png?|dds?)$/i);
//    //var files = folder.getFiles("*." + inputLoadExtension.text);
//    var files = folder.getFiles("*." + loadDropdown1.selection.text);
//
//    for (var i = 0; i < files.length; ++i) {
//        //alert(files[i].fsName);
//        open(files[i]);
//
//        activeDocument = documents[0];
//        var originalWidth = activeDocument.width;
//        var originalHeight = activeDocument.height;
//        var resizeWidth = Math.pow(2, slider.value);
//        var resizeHeight = Math.pow(2, slider.value);
//
//        var previousState = doc.activeHistoryState;
//        activeDocument.resizeImage(resizeWidth, resizeHeight);
//
//        //var file = new File(doc.path + "/" + doc.name + ".png");
//
//        if (saveDropdown1.selection.text == "png") {
//            var file = new File(inputSavePath.text + "/" + activeDocument.name + ".png");
//
//            var opts = new PNGSaveOptions();
//
//            activeDocument.saveAs(file, opts, true);
//
//        }
//        else if (saveDropdown1.selection.text == "dds") {
//            saveDDS(inputSavePath.text + "/" + activeDocument.name);
//        }
//
//        activeDocument.resizeImage(originalWidth, originalHeight);
//        doc.activeHistoryState = previousState;
//
//        activeDocument.close(SaveOptions.DONOTSAVECHANGES);
//    }
//    activeDocument = documents[0];
//};

window.show();

function nearestPow2(aSize) {
    return Math.round(Math.log(aSize) / Math.log(2));
}

function hasKey(str, substr) {
    var e = 0;
    for (var i = 0; i < str.length; i++) {

        //alert(str[i] + "==" + substr[e]);
        if (str[i] == substr[e]) {
            e++;
        }
        else {
            e = 0;
        }

        if (substr.length == e) {
            break;
        }
    }

    return e == substr.length;
}

function existInArr(arr, element) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == element) {
            return true;
        }
    }

    return false;
}

function layerWithNameExist(arr, name) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name == name) {
            return true;
        }
    }

    return false;
}

function advancedBlend(r, g, b) {
    var actionDesc = new ActionDescriptor();
    var actionRef = new ActionReference();
    actionRef.putEnumerated(app.charIDToTypeID('Lyr '),
                            app.charIDToTypeID('Ordn'),
                            app.charIDToTypeID('Trgt'));
    actionDesc.putReference(app.charIDToTypeID('null'), actionRef);
    var actionDesc2 = new ActionDescriptor();
    var actionList = new ActionList();
    //only enable desired channels
    if (r) {
        actionList.putEnumerated(app.charIDToTypeID('Chnl'), app.charIDToTypeID('Rd  '));
    }
    if (g) {
        actionList.putEnumerated(app.charIDToTypeID('Chnl'), app.charIDToTypeID('Grn '));
    }
    if (b) {
        actionList.putEnumerated(app.charIDToTypeID('Chnl'), app.charIDToTypeID('Bl  '));
    }
    actionDesc2.putList(app.stringIDToTypeID('channelRestrictions'), actionList);
    actionDesc.putObject(app.charIDToTypeID('T   '), app.charIDToTypeID('Lyr '), actionDesc2);
    executeAction(app.charIDToTypeID('setd'), actionDesc, DialogModes.NO);
};

function saveDDS(savePath) {
    var idsave = charIDToTypeID("save");
    var desc24 = new ActionDescriptor();
    var idAs = charIDToTypeID("As  ");
    var desc25 = new ActionDescriptor();
    var idsFoI = charIDToTypeID("sFoI");
    desc25.putInteger(idsFoI, 0);
    var idsASC = charIDToTypeID("sASC");
    desc25.putInteger(idsASC, 0);
    var idsTxT = charIDToTypeID("sTxT");
    var idenTT = charIDToTypeID("enTT");
    var idtxtwoD = charIDToTypeID("tx2D");
    desc25.putEnumerated(idsTxT, idenTT, idtxtwoD);
    var idmipF = charIDToTypeID("mipF");
    desc25.putBoolean(idmipF, true);
    var idmpFT = charIDToTypeID("mpFT");
    desc25.putInteger(idmpFT, 0);
    var idmOFW = charIDToTypeID("mOFW");
    desc25.putBoolean(idmOFW, false);
    var idmFOV = charIDToTypeID("mFOV");
    desc25.putDouble(idmFOV, 2.000000);
    var idmpPA = charIDToTypeID("mpPA");
    desc25.putBoolean(idmpPA, true);
    var idiOOM = charIDToTypeID("iOOM");
    var ideIOM = charIDToTypeID("eIOM");
    var ideICo = charIDToTypeID("eICo");
    desc25.putEnumerated(idiOOM, ideIOM, ideICo);
    var idiOBS = charIDToTypeID("iOBS");
    desc25.putBoolean(idiOBS, false);
    var idiOBr = charIDToTypeID("iOBr");
    desc25.putDouble(idiOBr, 0.000000);
    var idiOBg = charIDToTypeID("iOBg");
    desc25.putDouble(idiOBg, 0.000000);
    var idiOBb = charIDToTypeID("iOBb");
    desc25.putDouble(idiOBb, 0.000000);
    var idiOBa = charIDToTypeID("iOBa");
    desc25.putDouble(idiOBa, 1.000000);
    var idiOCQ = charIDToTypeID("iOCQ");
    desc25.putInteger(idiOCQ, 0);
    var idiOSr = charIDToTypeID("iOSr");
    desc25.putDouble(idiOSr, 1.000000);
    var idiOSg = charIDToTypeID("iOSg");
    desc25.putDouble(idiOSg, 1.000000);
    var idiOSb = charIDToTypeID("iOSb");
    desc25.putDouble(idiOSb, 1.000000);
    var idiOSa = charIDToTypeID("iOSa");
    desc25.putDouble(idiOSa, 1.000000);
    var idiBir = charIDToTypeID("iBir");
    desc25.putDouble(idiBir, 0.000000);
    var idiBig = charIDToTypeID("iBig");
    desc25.putDouble(idiBig, 0.000000);
    var idiBib = charIDToTypeID("iBib");
    desc25.putDouble(idiBib, 0.000000);
    var idiBia = charIDToTypeID("iBia");
    desc25.putDouble(idiBia, 0.000000);
    var idiOWr = charIDToTypeID("iOWr");
    desc25.putBoolean(idiOWr, false);
    var idiOAZ = charIDToTypeID("iOAZ");
    desc25.putBoolean(idiOAZ, false);
    var idiOBA = charIDToTypeID("iOBA");
    desc25.putBoolean(idiOBA, false);
    var idiOSu = charIDToTypeID("iOSu");
    desc25.putBoolean(idiOSu, false);
    var idiOBT = charIDToTypeID("iOBT");
    desc25.putInteger(idiOBT, 127);
    var idiOBD = charIDToTypeID("iOBD");
    desc25.putBoolean(idiOBD, false);
    var idiOPA = charIDToTypeID("iOPA");
    desc25.putBoolean(idiOPA, false);
    var idiOonezero = charIDToTypeID("iO10");
    desc25.putBoolean(idiOonezero, false);
    var idiZsd = charIDToTypeID("iZsd");
    desc25.putBoolean(idiZsd, true);
    var idiZlv = charIDToTypeID("iZlv");
    desc25.putInteger(idiZlv, 5);
    var idnFTy = charIDToTypeID("nFTy");
    desc25.putInteger(idnFTy, 5);
    var idnWrp = charIDToTypeID("nWrp");
    desc25.putBoolean(idnWrp, true);
    var idnIvX = charIDToTypeID("nIvX");
    desc25.putBoolean(idnIvX, false);
    var idnIvY = charIDToTypeID("nIvY");
    desc25.putBoolean(idnIvY, false);
    var idnMnZ = charIDToTypeID("nMnZ");
    desc25.putDouble(idnMnZ, 0.000000);
    var idnNSc = charIDToTypeID("nNSc");
    desc25.putDouble(idnNSc, 1.000000);
    var idnCSr = charIDToTypeID("nCSr");
    desc25.putInteger(idnCSr, 1);
    var idnAFi = charIDToTypeID("nAFi");
    desc25.putInteger(idnAFi, 0);
    var idnNNl = charIDToTypeID("nNNl");
    desc25.putBoolean(idnNNl, true);
    var idnNCF = charIDToTypeID("nNCF");
    var idenCD = charIDToTypeID("enCD");
    var idecnZ = charIDToTypeID("ecnZ");
    desc25.putEnumerated(idnNCF, idenCD, idecnZ);
    var idnNCU = charIDToTypeID("nNCU");
    var idenCD = charIDToTypeID("enCD");
    var idecpY = charIDToTypeID("ecpY");
    desc25.putEnumerated(idnNCU, idenCD, idecpY);
    var idnNCR = charIDToTypeID("nNCR");
    var idenCD = charIDToTypeID("enCD");
    var idecpX = charIDToTypeID("ecpX");
    desc25.putEnumerated(idnNCR, idenCD, idecpX);
    var idiOFV = charIDToTypeID("iOFV");
    desc25.putBoolean(idiOFV, false);
    var idfxSt = charIDToTypeID("fxSt");
    desc25.putString(idfxSt, """0 """);
    var idsirV = charIDToTypeID("sirV");
    desc25.putInteger(idsirV, 1);
    var idNVIDIADDSNVIDIATextureToolsExporter = stringIDToTypeID("NVIDIA DDS - NVIDIA Texture Tools Exporter");
    desc24.putObject(idAs, idNVIDIADDSNVIDIATextureToolsExporter, desc25);
    var idIn = charIDToTypeID("In  ");
    desc24.putPath(idIn, new File(savePath + ".dds"));
    var idDocI = charIDToTypeID("DocI");
    desc24.putInteger(idDocI, 219);
    var idsaveStage = stringIDToTypeID("saveStage");
    var idsaveStageType = stringIDToTypeID("saveStageType");
    var idsaveSucceeded = stringIDToTypeID("saveSucceeded");
    desc24.putEnumerated(idsaveStage, idsaveStageType, idsaveSucceeded);
    executeAction(idsave, desc24, DialogModes.NO);
}
