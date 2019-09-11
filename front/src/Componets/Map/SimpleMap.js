import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


export default class SimpleMap extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    cli(e){
        console.log(e)
    }
    
    setMapProperties(map, maps) {
        return new maps.Marker({
            position: { 
                lat: this.props.prod.position.lat, 
                lng: this.props.prod.position.lng
            },
            map,
            title: this.props.prod.name
        });
    }
    render() {
        var defaultProps = {
            center: {
                lat: this.props.prod.position.lat,
                lng: this.props.prod.position.lng
            },
            zoom: 15
        };
        let myMap = ''
        if(this.props.prod.imageUrl === ""){
            myMap = null
        }else{
            myMap = <GoogleMapReact
            onClick= {(e)=> this.cli(e)}
            bootstrapURLKeys={{ key: "AIzaSyBVykZZi6vtrnkxMIlU5VT8IPKAMMNEGbs"}}  
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            onGoogleApiLoaded={({ map, maps }) => this.setMapProperties(map, maps)}
            >
            </GoogleMapReact>
        }
        //donde queremos que comience la vista de google
        return (
        // Important! Always set the container height explicitly
        <div style={{ height: '60vh', width: '95%' }}>
        {myMap}
        </div>
        )
    }
}
