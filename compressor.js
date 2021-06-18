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

window.show();

//TAREA HACER COMPRESIONES De POTENCIAS DE DOS
function nearestPow2(aSize) {
    return Math.round(Math.log(aSize) / Math.log(2));
}