const fs = require('fs')
const path = require('path')
var turf = require('@turf/turf');
const deepSearch= (data,id)=>{
    return data.features.filter(feature => feature?.properties?.OBJECTID == id)
}
const addReclamationJSON = (id,type,reclamationID)=>{
        let data = {}
        
        if(type == "0") data = require('../../public/www/webMap/layers/PYLONLUM_5.js') 
        else if(type == "1") data = require('../../public/www/webMap/layers/PISTES_3.js')
        else if(type == "2") data = require('../../public/www/webMap/layers/ROUTES_2.js')
        else data = require('../../public/www/webMap/layers/BATIMENTS_7.js')
        let feature = deepSearch(data,reclamationID)[0]
        let position = []
        if(Array.isArray(feature?.geometry?.coordinates)){
            let coordinates = feature?.geometry?.coordinates
            if(Array.isArray(coordinates[0])){
                if(type == '3') {

                    // var x = coordinates[Math.round(coordinates.length/2-1)]
                    // x = x[Math.round(x.length/2-1)]
                    // position = x[Math.round(x.length/2)]
                    //position = coordinates[0][0][Math.round(coordinates[0][0][0].length/2)]
                    var polygon = turf.polygon(coordinates[0]);

                    var center = turf.centerOfMass(polygon);
                    position = center?.geometry?.coordinates
                    
                }
                else position = coordinates[0][Math.round(coordinates[0].length/2)]
            }else{
                position = coordinates
            }
            let mark ={
                "type":"Feature",
                "properties":{
                    "OBJECTID":id,
                    "nom":null,
                    "numero":0.0,
                    "etat":0
                },
                "geometry":{
                    "type":"Point",
                    "coordinates":position
                }}
            let json = require('../../public/www/webMap/layers/position.js')
            json.features.push(mark)
            let text = "var json_Postion = "+JSON.stringify(json)+" \n module.exports = json_Postion;"
            fs.writeFileSync(path.join(__dirname,'../../public/www/webMap/layers/position.js'),text,{encoding:'utf8',flag:'w'})
        }
        
}

const convertToIntervention = (id)=>{
    let json = require('../../public/www/webMap/layers/position.js')
    let jsonx = json
    jsonx.features = json.features.map(feature => {
        if(feature?.properties?.OBJECTID == id){
            feature.properties.etat = 2
        }
        return feature
    });
    let text = "var json_Postion = "+JSON.stringify(jsonx)+" \n module.exports = json_Postion;"
    fs.writeFileSync(path.join(__dirname,'../../public/www/webMap/layers/position.js'),text,{encoding:'utf8',flag:'w'})
}
const convertToDone = (id)=>{
    let json = require('../../public/www/webMap/layers/position.js')
    let jsonx = json
    jsonx.features = json.features.map(feature => {
        if(feature?.properties?.OBJECTID == id){
            feature.properties.etat = 1
        }
        return feature
    });
    let text = "var json_Postion = "+JSON.stringify(jsonx)+" \n module.exports = json_Postion;"
    fs.writeFileSync(path.join(__dirname,'../../public/www/webMap/layers/position.js'),text,{encoding:'utf8',flag:'w'})
}
const deleteReclamation = (id)=>{
    let json = require('../../public/www/webMap/layers/position.js')
    let jsonx = json
    jsonx.features = json.features.filter(feature => feature?.properties?.OBJECTID != id);

    let text = "var json_Postion = "+JSON.stringify(jsonx)+" \n module.exports = json_Postion;"
    fs.writeFileSync(path.join(__dirname,'../../public/www/webMap/layers/position.js'),text,{encoding:'utf8',flag:'w'})
}

module.exports = {
    addReclamationJSON,
    convertToIntervention,
    convertToDone,
    deleteReclamation
}