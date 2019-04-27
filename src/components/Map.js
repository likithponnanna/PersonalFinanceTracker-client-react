import mapStyle from "../styling/mapStyle";
import React from "react";
import PropertyService from "../service/properties.service.client";

const { compose, withProps, withHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCh74PetKr_ZSxXTPiH5bkE1w19b3KQsgg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()
            console.log(`Current clicked markers length: ${clickedMarkers.length}`)
            console.log(clickedMarkers)
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 42.3473046, lng: -71.0819042 }}
        defaultOptions={{ styles: mapStyle }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map(marker => (
                <Marker
                    key={marker._id}
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                />
            ))}
        </MarkerClusterer>
    </GoogleMap>
);

class MapComponentMultiCluster extends React.PureComponent {

    constructor(props){
        super(props)
        this.propertyService = new PropertyService();

    }


    componentWillMount() {
        this.setState({ markers: [] })
    }

    componentDidMount() {

        this.propertyService.findAllProperties()
            .then(properties =>{
                this.setState({ markers: properties })
            })

        console.log("Context Prop", this.context.state)

    }

    render() {
        return (
            <MapWithAMarkerClusterer markers={this.state.markers} />
        )
    }
}

export default MapComponentMultiCluster;