var wms_layers = [];


        var lyr_GoogleSatellite_0 = new ol.layer.Tile({
            'title': 'Google Satellite',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            })
        });

        var lyr_OpenStreetMap_1 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_ROUTES_2 = new ol.format.GeoJSON();
var features_ROUTES_2 = format_ROUTES_2.readFeatures(json_ROUTES_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ROUTES_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ROUTES_2.addFeatures(features_ROUTES_2);
var lyr_ROUTES_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ROUTES_2, 
                style: style_ROUTES_2,
                interactive: true,
                title: '<img src="WebMap/styles/legend/ROUTES_2.png" /> ROUTES'
            });
var format_PISTES_3 = new ol.format.GeoJSON();
var features_PISTES_3 = format_PISTES_3.readFeatures(json_PISTES_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_PISTES_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_PISTES_3.addFeatures(features_PISTES_3);
var lyr_PISTES_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_PISTES_3, 
                style: style_PISTES_3,
                interactive: true,
                title: '<img src="WebMap/styles/legend/PISTES_3.png" /> PISTES'
            });


var format_PYLONLUM_5 = new ol.format.GeoJSON();
var features_PYLONLUM_5 = format_PYLONLUM_5.readFeatures(json_PYLONLUM_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_PYLONLUM_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_PYLONLUM_5.addFeatures(features_PYLONLUM_5);
var lyr_PYLONLUM_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_PYLONLUM_5, 
                style: style_PYLONLUM_5,
                interactive: true,
                title: '<img src="WebMap/styles/legend/PYLONLUM_5.png" /> Pylône lumineu'
            });

            var format_Position = new ol.format.GeoJSON();
            var features_Position = format_Position.readFeatures(json_Postion, 
                        {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
            var jsonSource_Position = new ol.source.Vector({
                attributions: ' ',
            });
            jsonSource_Position.addFeatures(features_Position);
            var lyr_Position = new ol.layer.Vector({
                            declutter: false,
                            source:jsonSource_Position, 
                            style: style_Position,
                            interactive: false,
                            title: ''
                        });
var format_BATIMENTS_7 = new ol.format.GeoJSON();
var features_BATIMENTS_7 = format_BATIMENTS_7.readFeatures(json_BATIMENTS_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_BATIMENTS_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_BATIMENTS_7.addFeatures(features_BATIMENTS_7);
var lyr_BATIMENTS_7 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_BATIMENTS_7, 
                style: style_BATIMENTS_7,
                interactive: true,
                title: '<img src="WebMap/styles/legend/BATIMENTS_7.png" /> BATIMENTS'
            });

lyr_GoogleSatellite_0.setVisible(true);lyr_OpenStreetMap_1.setVisible(true);lyr_ROUTES_2.setVisible(true);lyr_PISTES_3.setVisible(true);lyr_PYLONLUM_5.setVisible(true);lyr_Position.setVisible(true);lyr_BATIMENTS_7.setVisible(true);
var layersList = [lyr_GoogleSatellite_0,lyr_OpenStreetMap_1,lyr_ROUTES_2,lyr_PISTES_3,lyr_PYLONLUM_5,lyr_BATIMENTS_7,lyr_Position];
lyr_ROUTES_2.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'nom': 'nom', 'direction': 'direction', 'type': 'type', 'SHAPE_Leng': 'SHAPE_Leng', });
lyr_PISTES_3.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'nom': 'nom', 'type': 'type', 'direction': 'direction', 'SHAPE_Leng': 'SHAPE_Leng', });
lyr_PYLONLUM_5.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'nom': 'nom', 'nomero': 'nomero', 'etat': 'etat', });
lyr_Position.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'nom': 'nom', 'numero': 'numero', 'etat': 'etat', });
lyr_BATIMENTS_7.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'FID_': 'FID_', 'Entity': 'Entity', 'Layer': 'Layer', 'Color': 'Color', 'Linetype': 'Linetype', 'Elevation': 'Elevation', 'LineWt': 'LineWt', 'RefName': 'RefName', 'Shape_Leng': 'Shape_Leng', 'Shape_Area': 'Shape_Area', });
lyr_ROUTES_2.set('fieldImages', {'OBJECTID': 'TextEdit', 'nom': 'TextEdit', 'direction': 'TextEdit', 'type': 'TextEdit', 'SHAPE_Leng': 'TextEdit', });
lyr_PISTES_3.set('fieldImages', {'OBJECTID': 'TextEdit', 'nom': 'TextEdit', 'type': 'TextEdit', 'direction': 'TextEdit', 'SHAPE_Leng': 'TextEdit', });
lyr_PYLONLUM_5.set('fieldImages', {'OBJECTID': 'TextEdit', 'nom': 'TextEdit', 'nomero': 'Range', 'etat': 'TextEdit', });
lyr_Position.set('fieldImages', {'OBJECTID': 'TextEdit', 'nom': 'TextEdit', 'numero': 'Range', 'etat': 'TextEdit', });
lyr_BATIMENTS_7.set('fieldImages', {'OBJECTID': '', 'FID_': '', 'Entity': '', 'Layer': '', 'Color': '', 'Linetype': '', 'Elevation': '', 'LineWt': '', 'RefName': '', 'Shape_Leng': '', 'Shape_Area': '', });
lyr_ROUTES_2.set('fieldLabels', {'OBJECTID': 'header label', 'nom': 'no label', 'direction': 'no label', 'type': 'no label', 'SHAPE_Leng': 'no label', });
lyr_PISTES_3.set('fieldLabels', {'OBJECTID': 'header label', 'nom': 'no label', 'type': 'no label', 'direction': 'no label', 'SHAPE_Leng': 'no label', });
lyr_PYLONLUM_5.set('fieldLabels', {'OBJECTID': 'header label', 'nom': 'no label', 'nomero': 'no label', 'etat': 'no label', });
lyr_Position.set('fieldLabels', {'OBJECTID': 'header label', 'nom': 'no label', 'numero': 'no label', 'etat': 'no label', });
lyr_BATIMENTS_7.set('fieldLabels', {'OBJECTID': 'no label', 'FID_': 'no label', 'Entity': 'no label', 'Layer': 'no label', 'Color': 'no label', 'Linetype': 'no label', 'Elevation': 'no label', 'LineWt': 'no label', 'RefName': 'no label', 'Shape_Leng': 'no label', 'Shape_Area': 'no label', });
lyr_BATIMENTS_7.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});