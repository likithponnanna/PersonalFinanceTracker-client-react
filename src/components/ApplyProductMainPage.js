import React, {Component} from 'react'
import MyContext from './MyContext'

import '../styling/CustomerOnboard.style.client.css'
import UserOnboardModal from "./UserOnboardModal";
import ParticlesComponent from "./ParticlesComponent";
import { withRouter } from 'react-router'
import {ModalRoute}  from 'react-router-modal';
import StockSearchMainComponent from "./StockSearchMainComponent";
import CenterLoginModal from "./CenterLoginModal";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import CreditCardHomePage from "./CreditCardHomePage";
import SavingHomePage from "./SavingHomePage";
import ApplyForProduct from "./ApplyForProduct";
import ProfileLookup from "./ProfileLookup";
import GuestProductService from "../service/GuestProductService";

class ApplyProductMainPage extends Component{


    constructor(props){
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.guestProductService = new GuestProductService();
        this.state = {
            show: false,
            modalShow: true,
            collapseHideBrand:  false,
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

    toggleCollapseHide =()=>
        this.setState({
            collapseHideBrand: !this.state.collapseHideBrand
        })


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
        this.guestProductService.createGuestProduct(this.state)
            .then(reposne => console.log("Gues Prod", reposne));

    }


    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }




    render() {
        let modalClose = () => this.setState({ modalShow: false });


        return(

            <div className="container-fluid p-0 m-0 web-dev-overflow-scroll-none-noscroll">
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>



                            <ParticlesComponent/>



                            <div className="container card mt-5 bg-light mb-4">
                                <div className="web-dev-particle-text-center-child m-4">

                                    <div className="container m-4">

                                        <div className="form-group row " >
                                            <label htmlFor="firstName" className="col-sm-2 mt-4">
                                                First Name
                                            </label>
                                            <div className="col-sm-10 mt-4">
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
                                                    type="date"
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
                                                    type="number"
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
                                            className="btn btn-block btn-info mb-4"
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
                                </div>
                            </div>

                        </React.Fragment>
                    )}
                </MyContext.Consumer>



            </div>
        )
    }


}
ApplyProductMainPage.contextType = MyContext;
export default ApplyProductMainPage