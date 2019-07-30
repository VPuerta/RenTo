import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from 'google-map-react';
import '../Map/UploadMap.css'

export default class UploadMap extends Component {
    constructor() {
        super()
        this.currentMarker = null;
        this.maps = null;
        this.map = null;

        this.state = {
            position: {
                lat: 40.416755454374595,
                lng: -3.703208023041725
            }
        }
    }

    clic(e) {
        this.props.coordinates(e.lat, e.lng)

        let lat = e.lat
        let lng = e.lng
        let position = { 
            lat: lat, 
            lng: lng 
        }

        // Limpiamos el marcador actual para que solo exista uno
        if (this.currentMarker != null) {
            this.currentMarker.setMap(null);
        }
        
        // Añadimos un marker al mapa
        this.currentMarker = new this.maps.Marker({
            position: position,
            map: this.map
        });
    }

    // Guardarmos el mapa cuando google se ha cargado
    setMapProperties(map, maps) {
        this.map = map;
        this.maps = maps;
    }

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
            <div style={{ height: '60vh', width: '100%' }} id="map" >
                <GoogleMapReact
                    onClick={(e) => this.clic(e)}
                    bootstrapURLKeys={{ key: this.props.API_KEY }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    onGoogleApiLoaded ={({ map, maps }) => this.setMapProperties(map, maps)}
                >  
            
                </GoogleMapReact>
            </div>
        );
    }
}
