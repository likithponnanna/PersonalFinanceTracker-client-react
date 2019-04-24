import React from 'react'
import GuestProductService from "../service/GuestProductService";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import './MainPageStyle.css'

class ApplyForProduct extends React.Component {
    constructor(props) {
        super(props);
        this.guestproductService = GuestProductService.getInstance();
        this.state = {
            firstName:" ",
            lastName:" ",
            dob:" ",
            address:" ",
            phoneNumber:" ",
            email:" ",
            product:props.match.params.id,
            prodName:props.match.params.name,
            registeredFlag: false,
            registeredFlagTrue: true,
        }
    }

    setRegisteredFlagTrue = () => {
        this.setState({
                          registeredFlag:this.state.registeredFlagTrue
                      })
    }



    firstNameChanged = event => {
        this.setState({
                          firstName: event.target.value
                      })
    };

    lastNameChanged = event => {
        this.setState({
                          lastName: event.target.value
                      });
    };

    dobChanged = event => {
        this.setState({
                          dob: event.target.value
                      });
    };

    addressChanged = event => {
        this.setState({
                          address: event.target.value
                      });
    };

    phoneNumberChanged = event => {
        this.setState({
                          phoneNumber: event.target.value
                      });
    };

    emailChanged = event => {
        this.setState({
                          email: event.target.value
                      });
    };

    createGuest = () => {
        //console.log(this.state.product)
        this.guestproductService.createGuestProduct(this.state)

    }


    render () {

        return (

            <div>

                <div className="form-group row">
                    <label htmlFor="firstName" className="col-sm-2">
                        First Name
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            placeholder="firstName"
                            id="firstName"
                            onChange={this.firstNameChanged}
                        />
                    </div>
                </div>


                <div className="form-group row">
                    <label htmlFor="lastName" className="col-sm-2">
                        Last Name
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            placeholder="lastName"
                            id="lastName"
                            onChange={this.lastNameChanged}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="dob" className="col-sm-2">
                        Date of Birth
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            placeholder="dob"
                            id="dob"
                            onChange={this.dobChanged}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="address" className="col-sm-2">
                        Address
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            placeholder="address"
                            id="address"
                            onChange={this.addressChanged}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="phoneNumber" className="col-sm-2">
                        Phone Number
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            placeholder="phoneNumber"
                            id="phoneNumber"
                            onChange={this.phoneNumberChanged}
                        />
                    </div>
                </div>


                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            placeholder="email"
                            id="email"
                            onChange={this.emailChanged}
                        />
                    </div>
                </div>

                <button
                    className="btn-primary"
                    onClick={() => {
                         this.createGuest();
                         this.setRegisteredFlagTrue();

                    }
                    }
                >
                    REGISTER
                </button>


                {this.state.registeredFlag === true &&

                 <div className="alert alert-success" role="alert" id="alert">
                     You have successfully applied to {this.state.prodName}
                 </div>

                }







            </div>

        )
    }


}
export default ApplyForProduct


