var doc = activeDocument;

var window = new Window("dialog", "Compression Tool");

var closeBtn = window.add("button", undefined, "Close", { name: "cancel" });

var slider = window.add("slider", undefined, 0, 0, nearestPow2(doc.width));
//slider.min = 0;
//slider.max = nearestPow2(doc.width);
//slider.value = 0;
//slider.size = [20, 20];
var currValText = window.add("statictext", undefined, "currValue");
currValText.text = slider.value.toString();

var currSizeText = window.add("statictext", undefined, "currSize");
currSizeText.text = nearestPow2(doc.width).toString();

var inputName = window.add("edittext", undefined, "File Name");
inputName.text = doc.name;

var panel = window.add("panel", undefined, "My Panel");
var btn3 = panel.add("button", undefined, "Compress and Save");
var btn4 = panel.add("button", undefined, "Rechannel");
var roughName = window.add("statictext", undefined, "Rough layer name");
var metalName = window.add("statictext", undefined, "metal layer name");
var AOName = window.add("statictext", undefined, "AO layer name");


slider.onChanging = function () {
    slider.value = Math.round(slider.value);
    currValText.text = slider.value.toString();
    currSizeText.text = Math.pow(2, slider.value);
}

btn3.onClick = function () {

    var originalWidth = doc.width;
    var originalHeight = doc.height;
    var resizeWidth = Math.pow(2, slider.value);
    var resizeHeight = Math.pow(2, slider.value);

    doc.resizeImage(resizeWidth, resizeHeight);

    //var file = new File(doc.path + "/" + doc.name + ".png");
    var file = new File(doc.path + "/" + inputName.text + ".png");

    var opts = new PNGSaveOptions();

    doc.saveAs(file, opts, true);

    doc.resizeImage(originalWidth, originalHeight);
};

btn4.onClick = function () {
    var roughLayer = doc.layers[0];
    var metalLayer = doc.layers[1];
    var AOLayer = doc.layers[2];

    doc.activeLayer = roughLayer;
    advancedBlend(true, false, false);

    doc.activeLayer = metalLayer;
    advancedBlend(false, true, false);

    doc.activeLayer = AOLayer;
    advancedBlend(false, false, true);
};

window.show();

function nearestPow2(aSize) {
    return Math.round(Math.log(aSize) / Math.log(2));
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