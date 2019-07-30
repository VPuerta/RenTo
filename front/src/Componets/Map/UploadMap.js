import React, { Component } from 'react';
import GoogleMapReact, {Marker} from 'google-map-react';
import '../Map/UploadMap.css'

export default class UploadMap extends Component {
    constructor(){
        super()
        this.state ={
            position:{
                lat:40.416755454374595,
                lng: -3.703208023041725
            }
        }
    }

    clic(e) {
        console.log(e.lat, e.lng)
        this.props.coordinates(e.lat, e.lng)
        // let lat = e.lat
        // let lng = e.lng
        // this.setState({
        //     ...this.state,
        //     lat:lat,
        //     lng:lng
        // })
        // return <Marker

        // lat={lat} lng={lng}
       
        //     />        

    }

    // setMapProperties(map, maps) {
    //     new maps.Marker({
    //         position: { 
    //             lat: this.lat, 
    //             lng: this.lng 
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
        <div style={{ height: '60vh', width: '100%' }} id="map" >
            <GoogleMapReact
                onClick={(e) => this.clic(e)}
                bootstrapURLKeys={{ key: this.props.API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                // onGoogleApiLoaded ={({ map, maps }) => this.setMapProperties(map, maps)}
            >
            </GoogleMapReact>
        </div>
    );
}
}
