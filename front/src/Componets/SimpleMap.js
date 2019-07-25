import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


export default class SimpleMap extends Component {
    

    setMapProperties(map, maps) {
        new maps.Marker({
            position: { lat: 41.3977381, lng: 2.190471916 },
            map,
            title: 'Madrid'
        });
    }
    render() {
        var defaultProps = {
            center: {
                lat: 41.3977381,
                lng: 2.190471916
            },
            zoom: 5
        };
        return (
        // Important! Always set the container height explicitly
        <div style={{ height: '60vh', width: '95%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: this.props.API_KEY }}  
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            onGoogleApiLoaded={({ map, maps }) => this.setMapProperties(map, maps)}>
            </GoogleMapReact>
        </div>
        )
    }
}
