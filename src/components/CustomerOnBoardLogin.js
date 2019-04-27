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

       /* if(this.props.context.state.user !==undefined && this.props.context.state.user.isAdmin ===true) {
            return (<Redirect to="/admin"/>)
        }else if(this.props.context.state.user !==undefined && this.props.context.state.user.isAdmin ===false) {
            return (<Redirect to="/user"/>)
        }else if(this.props.context.state.user === undefined){
            return (<Redirect to="/"/>)
        }*/
        return(

            <div className="container p-0 m-0">
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>



                            <CenterLoginModal
                                show={this.state.modalShow}
                                onHide={modalClose}/>

                            <ParticlesComponent/>




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
