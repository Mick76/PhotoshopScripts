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
var btnSaveAll = panel.add("button", undefined, "Compress and Save all files");
var inputLoadExtension = window.add("edittext", undefined, "load extension");
inputLoadExtension.text = "jpg";
var btnLoadAll = panel.add("button", undefined, "Load all files");


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

btnSaveAll.onClick = function () {
    for (var i = 0; i < documents.length; ++i) {
        activeDocument = documents[i];
        var originalWidth = documents[i].width;
        var originalHeight = documents[i].height;
        var resizeWidth = Math.pow(2, slider.value);
        var resizeHeight = Math.pow(2, slider.value);
    
        documents[i].resizeImage(resizeWidth, resizeHeight);
    
        //var file = new File(doc.path + "/" + doc.name + ".png");

        if (inputLoadExtension.text == "png") {
            var file = new File(documents[i].path + "/" + documents[i].name + ".png");

            var opts = new PNGSaveOptions();

            documents[i].saveAs(file, opts, true);

            documents[i].resizeImage(originalWidth, originalHeight);
        }
        else if (inputLoadExtension.text == "dds") {
            saveDDS(documents[i].path + "/" + documents[i].name);
        }

        
    }
    activeDocument = documents[0];
};

btnLoadAll.onClick = function () {

    var folder = new Folder(activeDocument.path);
    //var files = folder.getFiles(/\.(jpg?|png?|dds?)$/i);
    var files = folder.getFiles("*." + inputLoadExtension.text);
    for (var i = 0; i < files.length; ++i) {
        alert(files[i].fsName);
        open(files[i]);
    }
    activeDocument = documents[0];

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