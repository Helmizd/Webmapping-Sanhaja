var size = 0;
var placement = 'point';

var style_Position = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = ""
    var labelText = "";
    size = 0;
    var labelFont = "10px, sans-serif";
    var labelFill = "#000000";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "left";
    var offsetX = 8;
    var offsetY = 3;
    var placement = 'point';
    if ("" !== null) {
        labelText = String("");
    }
    var coordinate = feature.getGeometry().getCoordinates();
    if(feature.values_.etat == 0){
        var style = [ new ol.style.Style({
            geometry: new ol.geom.Point([coordinate[0] + 4*resolution, coordinate[1] + 10*resolution]),
            image: new ol.style.Icon({
                      imgSize: [395.71, 395.71],
                      scale: 0.105596269995703926,
    
                      rotation: 0.0,
                      src: "webmap/styles/location1.svg"
                }),
            text: createTextStyle(feature, resolution, labelText, labelFont,
                                  labelFill, placement, bufferColor,
                                  bufferWidth)
        })];
    }else if (feature.values_.etat == 1){
        var style = [ new ol.style.Style({
            geometry: new ol.geom.Point([coordinate[0] + 4*resolution, coordinate[1] + 10*resolution]),
            image: new ol.style.Icon({
                      imgSize: [395.71, 395.71],
                      scale: 0.105596269995703926,
                      
                      rotation: 0.0,
                      src: "webmap/styles/location2.svg"
                }),
            text: createTextStyle(feature, resolution, labelText, labelFont,
                                  labelFill, placement, bufferColor,
                                  bufferWidth)
        })];
    }else {
        var style = [ new ol.style.Style({
            geometry: new ol.geom.Point([coordinate[0] + 4*resolution, coordinate[1] + 10*resolution]),
            image: new ol.style.Icon({
                      imgSize: [395.71, 395.71],
                      scale: 0.105596269995703926,
    
                      rotation: 0.0,
                      src: "webmap/styles/location3.svg"
                }),
            text: createTextStyle(feature, resolution, labelText, labelFont,
                                  labelFill, placement, bufferColor,
                                  bufferWidth)
        })];
    }
    

    return style;
};