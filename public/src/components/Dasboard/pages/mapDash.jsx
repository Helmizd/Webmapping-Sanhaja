
import React from "react";

class Mapdash extends React.Component{
    constructor(props){
        super(props)
        this.updatePosition = this.updatePosition.bind(this)
    }
    updatePosition = async ()=>{
        console.log('yo')
        var filename = 'position'
       var tags = document.getElementsByTagName('script');
       for (var i = tags.length; i >= 0; i--){ //search backwards within nodelist for matching elements to remove
        if (tags[i] && tags[i].getAttribute('src') != null && tags[i].getAttribute('src').indexOf(filename) != -1)
         tags[i].parentNode.removeChild(tags[i]); //remove element by calling parentNode.removeChild()
       }
       await this.addScript("./webMap/layers/position.js")
       console.log()
       setTimeout(() => {
           lyr_Position.getSource().refresh()
           var features_Position = format_Position.readFeatures(json_Postion, 
               {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
           jsonSource_Position.addFeatures(features_Position);
           jsonSource_Position.addFeatures(features_Position);
       }, 100);

      }
    componentDidMount(){
        this.updatePosition()
        this.addScript("webMap/resources/ol-geocoder.js")
        this.addScript("./webMap/resources/qgis2web.js")
    }
    addScript = (src) => {
        const script = document.createElement("script");

        script.src = src;
    
        document.body.appendChild(script);
      
       
      };
    render(){
        return(
            <main className="page-content" style={{paddingLeft: this.props.toggled ? "40px":"260px"}}>
                <div id="map" className=" col">
                                <div id="popup" className="ol-popup">
                                    <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                                    <div id="popup-content"></div>
                                </div>
                            </div>
           </main>
        )
    }
}

export default Mapdash;
