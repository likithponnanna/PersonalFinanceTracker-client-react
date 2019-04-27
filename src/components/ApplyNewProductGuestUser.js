import React, {Component} from "react";
import MyContext from "./MyContext";
import GuestProductService from "../service/GuestProductService";
import ProfileLookup from "./ProfileLookup";
import {Link} from "react-router-dom";
import ParticlesComponent from "./ParticlesComponent";


class ApplyNewProductGuestUser extends Component{

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
        return(



            <div className="container-fluid p-0 m-0 web-dev-overflow-scroll-none-noscroll">
                            <nav  className="navbar navbar-expand-lg navbar-light bg-dark pb-0 mb-0 mt-0 pt-0  web-dev-fix-pos ">
                                {this.state.collapseHideBrand===false &&  <a className="web-dev-vertical-center" href="#">Sprint</a>}
                                <button onClick={()=>this.toggleCollapseHide() } className="navbar-toggler float-right" type="button" data-toggle="collapse"
                                        data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <ProfileLookup/>


                                <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
                                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                        <li className="nav-item active">
                                            <a className="nav-link" href="#"> <span
                                                className="sr-only">(current)</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"></a>
                                        </li>
                                    </ul>
                                    <div className="form-inline">
                                        <Link to="/login">    <button type="button" className="btn  btn-outline-secondary web-dev-logo mb-2 mt-2 mr-2" data-toggle="modal"
                                                                      data-target="#exampleModalCenter" onClick={()=>{this.handleShow();this.toggle();}}>
                                            Login / SignUp
                                        </button> </Link>
                                    </div>
                                </div>
                            </nav>




                            <ParticlesComponent/>

                            <div className="container mt-5 web-dev-particle-text-center ">
                                <div className="web-dev-particle-text-center-child mt-5">
                                    <div className="d-inline-block"/>
                                    <div className="d-inline-block"/>
                                    <div className=""/>
                                    <div className=""/>
                                    <h1>Hello Financial Freedom</h1></div>
                            </div>

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





            </div>
        )
    }


}

export default (props) => (
    <MyContext.Consumer>
        {(context) => <ApplyNewProductGuestUser {...props} context={context}/>}
    </MyContext.Consumer>
)