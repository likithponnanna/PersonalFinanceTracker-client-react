import React, {Component} from 'react'
import MyContext from './MyContext'

import '../styling/CustomerOnboard.style.client.css'
import UserOnboardModal from "./UserOnboardModal";
import ParticlesComponent from "./ParticlesComponent";
import {Redirect, withRouter} from 'react-router'
import {ModalRoute}  from 'react-router-modal';
import StockSearchMainComponent from "./StockSearchMainComponent";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CenterLoginModal from "./CenterLoginModal";
import ProfileLookup from "./ProfileLookup";

class CustomerOnBoardLogin extends Component{


    constructor(props){
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: true,
            modal: true,
            modalShow: true
        }
        this.toggle = this.toggle.bind(this);

    }

    componentDidMount() {

    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    pushLogin =() =>
        // this.props.history.push("/login");
        this.context.router.push('/bar');

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    render() {
        let modalClose = () => this.setState({ modalShow: false });

        if(this.props.context.state.user !==undefined && this.props.context.state.user.isAdmin ===true) {
            // this.props.history.push('/user')
            return (<Redirect to="/admin"/>)
        }else if(this.props.context.state.user !==undefined && this.props.context.state.user.isAdmin ===false) {
            return (<Redirect to="/user"/>)
        }
        return(

            <div className="container-fluid p-0 m-0">
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>

                            <nav className="navbar navbar-expand-lg navbar-light bg-dark pb-4 mb-0 mt-0 pt-0">
                                <a className="web-dev-logo " href="#">Sprint<i className="fa fa-piggy-bank btn-outline-success p-1 web-dev-logo"/></a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse " id="navbarTogglerDemo02">

                                    <div className="form-inline">
                                       {/* <button type="button" className="btn float-right  btn-outline-secondary web-dev-logo" data-toggle="modal"
                                                data-target="#exampleModalCenter" onClick={()=>this.handleShow()}>
                                            Login / SignUp
                                        </button>*/}

                                    </div>
                                </div>
                            </nav>

                            <CenterLoginModal
                                show={this.state.modalShow}
                                onHide={modalClose}/>

                            <ParticlesComponent/>
                            <div className="container mt-5 web-dev-particle-text-center">
                                <div className="web-dev-particle-text-center-child"><h1>Hello Financial Freedom</h1></div>
                            </div>



                        </React.Fragment>
                    )}
                </MyContext.Consumer>


            </div>
        )
    }


}
export default (props) => (
    <MyContext.Consumer>
        {(context) => <CustomerOnBoardLogin {...props} context={context}/>}
    </MyContext.Consumer>
)
