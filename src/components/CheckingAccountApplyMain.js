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
import CheckingHomePage from "./CheckingHomePage";

class CheckingAccountApplyMain extends Component{


    constructor(props){
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            modalShow: true,
            collapseHideBrand:  false,
        }

    }

    toggleCollapseHide =()=>
        this.setState({
            collapseHideBrand: !this.state.collapseHideBrand
        })

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
                            <nav  className="navbar navbar-expand-lg navbar-light bg-dark pb-0 mb-0 mt-0 pt-0  web-dev-fix-pos ">
                                {this.state.collapseHideBrand===false &&  <a className="web-dev-vertical-center" href="#">Sprint</a>}
                                <button onClick={()=>this.toggleCollapseHide() } className="navbar-toggler float-right" type="button" data-toggle="collapse"
                                        data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>





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

                            <div className="container mt-5 bg-dark mb-4 pb-2 pt-1">
                                <div className="web-dev-particle-text-center-child">
                                    <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                                        <Link to="/">     <li className="nav-item ">
                                            <div className="web-dev-font-home-tabs nav-link  " id="home-tab"
                                                 role="tab" aria-controls="home" aria-selected="true">Credit Cards</div>
                                        </li></Link>
                                        <Link to="/home/saving">    <li className="nav-item">
                                            <div className="nav-link web-dev-font-home-tabs" id="profile-tab"
                                                 role="tab" aria-controls="profile" aria-selected="false">Savings Account</div>
                                        </li></Link>
                                        <Link to="/home/checking">     <li className="nav-item">
                                            <div className="nav-link active web-dev-font-home-tabs" id="contact-tab"
                                                 role="tab" aria-controls="contact" aria-selected="false">Checking Account</div>
                                        </li></Link>
                                    </ul>
                                   <CheckingHomePage/>

                                </div>
                            </div>

                        </React.Fragment>
                    )}
                </MyContext.Consumer>



            </div>
        )
    }


}
CheckingAccountApplyMain.contextType = MyContext;
export default CheckingAccountApplyMain