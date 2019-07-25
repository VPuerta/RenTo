import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


export default class SimpleMap extends Component {
    constructor(){
        super()
        this.state ={
            
        }
    }


    cli(e){
        console.log(e)
    }
    

    setMapProperties(map, maps) {
        new maps.Marker({
            position: { lat: 40.4381311, lng: -3.819621},
            map,
            title: 'Madrid'
        });
    }
    render() {

        //donde queremos que comience la vista de google
        var defaultProps = {
            center: {
                lat: 40.4381311,
                lng: -3.819621,
            },
            zoom: 15
        };
        return (
        // Important! Always set the container height explicitly
        <div style={{ height: '60vh', width: '95%' }}>
        <GoogleMapReact
            onClick= {(e)=> this.cli(e)}
            bootstrapURLKeys={{ key: this.props.API_KEY }}  
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            onGoogleApiLoaded={({ map, maps }) => this.setMapProperties(map, maps)}>
            </GoogleMapReact>
        </div>
        )
    }
}
