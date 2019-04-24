import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Map from "./Map";
import PropertyService from "../service/properties.service.client";
import MyContext from "./MyContext";
import mapStyle from '../styling/mapStyle'




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



class UserOverViewTabContent extends Component {
    constructor(props){

        super(props);
        this.propertyService = new PropertyService();
        this.state = {

            places: [
                {
                    "id": 1,
                    "name": "Park Slope",
                    "latitude": "40.6710729",
                    "longitude": "-73.9988001"
                }

            ]
        }
    }



    render(){
        return(
            <MyContext.Consumer>
                {(context) => (
                    <React.Fragment>
            <div className="container">
                {console.log("Context", context.state)}
                <h2 className="web-dev-text-center mb-2"> Hi {context.state.user} Here is your financial overview  </h2>


               <MapComponentMultiCluster/>

                <h2 className="web-dev-text-center mt-2">Properties you own</h2>




                <div className="card text-center">
                    <div className="card-header">
                        Featured
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional
                            content.</p>

                    </div>

                </div>

                <div className="line mt-2 mb-2"/>

                <div className="card text-center">
                    <div className="card-header">
                        Featured
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional
                            content.</p>

                    </div>

                </div>

                <div className="line mt-2 mb-2"/>

                <div className="card text-center">
                    <div className="card-header">
                        Featured
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional
                            content.</p>

                    </div>

                </div>

                <div className="line mt-2 mb-2"/>

                <div className="card text-center">
                    <div className="card-header">
                        Featured
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional
                            content.</p>

                    </div>

                </div>



                <div className="line"/>


            </div>


                    </React.Fragment>
                )}
            </MyContext.Consumer>
        )
    }

}
MapComponentMultiCluster.contextType = MyContext;
UserOverViewTabContent.contextType = MyContext;
    export default UserOverViewTabContent