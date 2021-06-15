alert("Hello world");
var titleGroup = app.activeDocument.layerSets.getByName('Group 1');
var titleLayer = titleGroup.layers[0];

titleLayer.name = "Modified Text";
titleLayer.textItem.contents = "Herramientas para motores";
titleLayer.textItem.size = 12;
titleLayer.textItem.font = "Cambria";

alert(titleLayer.name);
alert(titleGroup.name);


//window
var dlg = new Window("dialog", "Alert Box Builder");
var btnPnl = dlg.add("Panel", undefined, "Build it");
var cancelBtn = btnPnl.add("button", undefined, "Cancel", { name: "cancel" });

dlg.show();