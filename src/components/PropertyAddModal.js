import React, {Component} from 'react'
import MyContext from './MyContext'
import '../styling/modals.style.client.css'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

class PropertyAddModal extends Component{
    constructor(props){
        super(props);
        this.state ={
            address: "",
            area: "",
            value: "",
            latitude: "",
            longitude: ""

        }
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => this.setState({
                address: results[0].formatted_address
            }));

        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng =>{ console.log('Success', latLng);
            this.setState({
                latitude: latLng.lat,
                longitude: latLng.lng
            });
            console.log("Lat", this.state.latitude, "Lng", this.state.longitude, "Address", this.state.address)})
            .catch(error => console.error('Error', error));
    };


    addressChanged = (event) =>
        this.setState({
            address: event.target.value
        });

    areaChanged = (event) =>
        this.setState({
            area: event.target.value
        });
    valueChanged = (event) =>
        this.setState({
            value: event.target.value
        });


    addProperty = () => {
        this.props.addProperty(this.state);
        this.setState({
            address: []
        })

    };
    clearForm = () => {
        document.getElementById("properties-form").reset();
    };





    render() {
        return(
            <div className="container web-dev-z-index" >
                <div className="modal fade" id="propertyModalCenter" tabIndex="1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-secondary web-dev-login-margin-adjust ">
                                <h5 className="modal-title " id="exampleModalLongTitle">Property Form</h5>
                                <button type="button" className="close web-dev-close-color" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="properties-form">

                                    <div className="form-group">
                                        <label htmlFor="addressFld">Property Address</label>
                                        <PlacesAutocomplete
                                            value={this.state.address}
                                            onChange={this.handleChange}
                                            onSelect={this.handleSelect}
                                        >
                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                <div>
                                                    <input
                                                        {...getInputProps({
                                                            id: 'addressFld',
                                                            placeholder: 'Search Location ...',
                                                            className: 'location-search-input form-control',
                                                        })}
                                                    />
                                                    <div className="autocomplete-dropdown-container " >
                                                        {loading && <div>Loading...</div>}
                                                        {suggestions.map(suggestion => {
                                                            const className = suggestion.active
                                                                ? 'suggestion-item--active'
                                                                : 'suggestion-item';
                                                            // inline style for demonstration purpose
                                                            const style = suggestion.active
                                                                ? { backgroundColor: '#6aabd4', cursor: 'pointer' }
                                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                            return (
                                                                <div
                                                                    {...getSuggestionItemProps(suggestion, {
                                                                        className,
                                                                        style,
                                                                    })}
                                                                >
                                                                    <span>{suggestion.description}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </PlacesAutocomplete>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="bankNameFld">Area</label>
                                        <input type="number" className="form-control" id="bankNameFld"
                                               placeholder="1200 (In Sq.Ft)" onChange={(event)=> this.areaChanged(event)}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="accNameFld">Property Value</label>
                                        <input type="number" className="form-control" id="accNameFld"
                                               placeholder="100000 (In USD)"  onChange={(event)=> this.valueChanged(event)}/>
                                    </div>


                                </form>
                            </div>




                            <div className="modal-footer row btn-group m-2">
                                <button type="reset" className="btn btn-block btn-outline-info border-0 "  onClick={() =>{ this.addProperty(); this.clearForm()} }>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}
PropertyAddModal.contextType = MyContext;
export default PropertyAddModal