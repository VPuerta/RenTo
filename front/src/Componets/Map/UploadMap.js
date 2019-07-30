import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import '../Map/UploadMap.css'

export default class UploadMap extends Component {

    clic(e){
        console.log(e.lat,e.lng)
        this.props.coordinates(e.lat,e.lng)
    }

    // setMapProperties(map, maps) {
    //     new maps.Marker({
    //         position: { 
    //             lat: this.e.lat, 
    //             lng: this.e.lng 
    //         },
    //         map,
    //         title: 'Valencia'
    //     });
    // }

        

    render() {
        var defaultProps = {
            center: {
                lat: 40.416755454374595,
                lng: -3.703208023041725
            },
            zoom: 10
        };

        return (
            // Important! Always set the container height explicitly
            <div  style={{ height: '60vh', width: '100%' }} id ="map" >
                <GoogleMapReact
                    onClick = {(e)=>this.clic(e)}
                    bootstrapURLKeys = {{ key: this.props.API_KEY }}
                    defaultCenter = {defaultProps.center}
                    defaultZoom = {defaultProps.zoom}
                    // onGoogleApiLoaded ={({ map, maps }) => this.setMapProperties(map, maps)}
                >
                </GoogleMapReact>
            </div>
        );
    }
}
