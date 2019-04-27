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

class SavingsAccountApplyMain extends Component{


    constructor(props){
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            modalShow: true
        }

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

            <div className="container-fluid p-0 m-0">
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <nav className="navbar navbar-expand-lg navbar-light bg-dark pb-0 mb-0 mt-0 pt-0">
                                <a className="web-dev-logo" href="#">Sprint<i className="fa fa-piggy-bank btn-outline-success p-1 web-dev-logo"/></a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
                                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                                    </ul>
                                    <div className="form-inline">
                                        <Link to="/login">    <button type="button" className="btn  btn-outline-secondary web-dev-logo" data-toggle="modal"
                                                                      data-target="#exampleModalCenter" onClick={()=>{this.handleShow();}}>
                                            Login / SignUp
                                        </button> </Link>

                                    </div>
                                </div>
                            </nav>




                            <ParticlesComponent/>
                            <div className="container mt-5 web-dev-particle-text-center">
                                <div className="web-dev-particle-text-center-child"><h1>Hello Financial Freedom</h1></div>
                            </div>

                            <div className="container mt-5 bg-dark mb-4 pb-2 pt-1">
                                <div className="web-dev-particle-text-center-child">
                                    <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                                        <Link to="/">     <li className="nav-item ">
                                            <div className="nav-link  web-dev-font-home-tabs" id="home-tab"
                                                 role="tab" aria-controls="home" aria-selected="true">Credit Cards</div>
                                        </li></Link>
                                        <Link to="/home/saving">    <li className="nav-item">
                                            <div className="nav-link active web-dev-font-home-tabs" id="profile-tab"
                                                 role="tab" aria-controls="profile" aria-selected="false">Savings Account</div>
                                        </li></Link>
                                        <Link to="/home/checking">     <li className="nav-item">
                                            <div className="nav-link web-dev-font-home-tabs" id="contact-tab"
                                                 role="tab" aria-controls="contact" aria-selected="false">Checking Account</div>
                                        </li></Link>
                                    </ul>
                                    <SavingHomePage/>

                                </div>
                            </div>

                        </React.Fragment>
                    )}
                </MyContext.Consumer>



            </div>
        )
    }


}
SavingsAccountApplyMain.contextType = MyContext;
export default SavingsAccountApplyMain