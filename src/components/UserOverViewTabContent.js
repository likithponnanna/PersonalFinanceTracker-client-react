import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Map from "./Map";
import PropertyService from "../service/properties.service.client";
import MyContext from "./MyContext";
import mapStyle from '../styling/mapStyle'
import UniversalService from "../service/universal.service.client";




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
        >{
            props.markers!==undefined ?

            <div>{
                props.markers.map(marker => (
                    <Marker
                        key={marker._id}
                        position={{lat: marker.latitude, lng: marker.longitude}}
                    />
                ))
            }</div>:<div></div>


        }
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
        this.universalService = new UniversalService();
        this.state = {
            CreditScore: 0,
            TotalAsset: 0,
            TotalDebt: 0,
            NetAsset: 0
        }
    }

    componentDidMount() {
       this.universalService.findAssetTotal()
           .then(total =>{ console.log("Total", total);
           this.setState({
               CreditScore: total!==undefined ?  total.CreditScore : 0,
               TotalAsset:total!==undefined ? total.TotalAsset: 0,
               TotalDebt:total!==undefined ? total.TotalDebt: 0,
               NetAsset:total!==undefined ? total.TotalAsset - total.TotalDebt: 0
           })
    })
    }


    render(){
        return(
            <MyContext.Consumer>
                {(context) => (
                    <React.Fragment>
            <div className="container bg-light">

                <h2 className="web-dev-text-center mb-2"> Welcome, Here is your financial overview  </h2>

                <div className="card text-center ">
                    <div className="card-header web-dev-card-header">
                      <h4 className="web-dev-text-center mt-4 mb-2">Properties you own</h4>
                        <small>Adding multiple properties in the same area clusters them</small>
                    </div>
                    <div className="card-body web-dev-container-border">
                       <MapComponentMultiCluster/>
                    </div>
                </div>




                <div className=" mt-2 mb-2 "/>

                <div className="card text-center ">
                    <div className="card-header web-dev-card-header">
                        <h5 className="card-title">Credit Score</h5>
                    </div>
                    <div className="card-body web-dev-container-border">

                        <p className="card-text web-dev-container-border"><b> {this.state.CreditScore} </b>   </p>

                    </div>

                </div>


                <div className=" mt-2 mb-2"/>

                <div className="card text-center">
                    <div className="card-header web-dev-card-header">
                        <h5 className="card-title">Total Asset Value</h5>
                    </div>
                    <div className="card-body web-dev-container-border">

                        <p className="card-text web-dev-container-border"><b>${this.state.TotalAsset}</b></p>

                    </div>

                </div>

                <div className=" mt-2 mb-2"/>

                <div className="card text-center">
                    <div className="card-header web-dev-card-header">
                        <h5 className="card-title">Total Debt</h5>
                    </div>
                    <div className="card-body web-dev-container-border">

                        <p className="card-text web-dev-container-border">${this.state.TotalDebt}</p>

                    </div>

                </div>

                <div className=" mt-2 mb-2"/>

                <div className="card text-center">
                    <div className="card-header web-dev-card-header">
                        <h5 className="card-title">Net Assets</h5>
                    </div>
                    <div className="card-body web-dev-container-border">

                        <p className="card-text web-dev-container-border"><b>${this.state.NetAsset} </b></p>

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