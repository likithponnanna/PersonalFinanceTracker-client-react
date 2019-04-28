import React, {Component} from 'react'
import MyContext from './MyContext'

import '../styling/CustomerOnboard.style.client.css'
import UserOnboardModal from "./UserOnboardModal";
import ParticlesComponent from "./ParticlesComponent";
import {Redirect, withRouter} from 'react-router'
import {ModalRoute}  from 'react-router-modal';
import StockSearchMainComponent from "./StockSearchMainComponent";
import CenterLoginModal from "./CenterLoginModal";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import CreditCardHomePage from "./CreditCardHomePage";
import ProfileLookup from "./ProfileLookup";
import AdminUserService from "../service/admin.service.client";
import Popup from 'react-popup';
import { positions, Provider } from "react-alert";
import { useAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import HomeAlert from "./HomeAlert";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class CustomerOnBoardPage extends Component{


    constructor(props){
        super(props);
        this.adminService =new AdminUserService();
            this.state = {
                show: false,
                modalShow: true,
                collapseHideBrand:  false,
                modal: false,
                userSearch: false,
                statusLookup: false,
                username: '',
                id: undefined,
                appStatusToggle: false,
                phoneNumber: '',
                currentStatus: undefined,
                open: false,
                appStatus: 'NO-APPLICATION-FOUND'

            }
        this.toggle = this.toggle.bind(this);
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };



    componentDidMount() {
        this.adminService.findCurrentLoggedInUser()
            .then(reason => console.log("Logged PRofile User", reason))
    }



    toggleCollapseHide =()=>
        this.setState({
            collapseHideBrand: !this.state.collapseHideBrand
        })

    toggleAppStatus =()=>
        this.setState({
            appStatusToggle: !this.state.appStatusToggle
        })
    usernameChanged = (event) =>
        this.setState({
            username: event.target.value
        });

    phoneNumberChanged = (event) =>
        this.setState({
            phoneNumber: event.target.value
        });




    searchUser = () => {
        if(this.state.username!=="") {
            this.adminService.getAllUsers()
                .then(users =>{

                    console.log("Users", users);
                    for (let i = 0; i <users.length ; i++) {
                        if(users[i].username === this.state.username){
                            this.setState({
                                id: users[i]._id
                            })
                            this.props.history.push(`/profile/${users[i]._id}`);

                        }

                    }
                    if(this.state.id===undefined){
                        alert("No Matching User Found!!")
                    }

                })
        }else {
            alert("Enter Valid Username");
        }


    }

    toggleUserSearch = ()=>
        this.setState({
            userSearch: !this.state.userSearch
        })
    toggleStatusLookup = ()=>
        this.setState({
            statusLookup: !this.state.statusLookup
        })


    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    searchUserProductStatus = ()=>
    {
        if(this.state.phoneNumber!==''){
            this.adminService.findAllGuest()
                .then(guests => {console.log("Guests", guests);
                let currentStatus = 0;
                    for (let i = 0; i <guests.length ; i++) {
                        console.log("Guest", guests[i].firstName, "Status",this.state.phoneNumber );

                        if(guests[i].firstName.toLowerCase()===this.state.phoneNumber.toLowerCase()){
                            currentStatus =1;
                            this.setState({
                                appStatusToggle: false,
                                open: true,
                                appStatus: guests[i].status

                            });

                            break;


                        }


                    }
                    if(currentStatus===0){
                        this.setState({
                            appStatusToggle: false,
                            open: true,
                            appStatus: 'NO-APPLICATION-FOUND'


                        })

                    }
                })


        }else {
            this.setState({
                appStatusToggle: false

            })
            alert("Enter Valid PhoneNumber!!");

        }


    }



    render() {
        let modalClose = () => this.setState({ modalShow: false });


        return(

            <div className="container-fluid p-0 m-0 web-dev-overflow-scroll-none-noscroll">

               <div className="web-dev-app-check-z">
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <div className="container">
                                {this.state.appStatus==='PENDING' && <div className="text-center"><i className="row fa fa-4x fa-hourglass-half web-dev-fa-blue web-dev-center-image"/><div className="row mt-2"> We are still processing your application</div></div>}
                                    {this.state.appStatus==='APPROVED' && <div className="text-center"><i className="row fa fa-4x fa-check web-dev-fa-green web-dev-center-image"/><div className="row mt-2"> Approved !! Welcome Aboard</div></div>}
                                {this.state.appStatus==='REJECTED' && <div className="text-center"><i className="row fa fa-4x fa-times-circle web-dev-fa-red web-dev-center-image"/><div className="row mt-2"> Rejected!! Please Visit the Bank for more details</div></div>}
                                {this.state.appStatus==='NO-APPLICATION-FOUND' &&<div className="text-center"><i className="row fa fa-4x fa-ban web-dev-center-image"/><div className="row mt-2">  No application Found with  matching name</div></div>}

                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                     {/*   <Button onClick={this.handleClose} color="#ffff" >
                            Close
                        </Button>*/}
                        <button onClick={this.handleClose} className="btn-dark btn-block">Close</button>
                    </DialogActions>
                </Dialog>
               </div>
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
                                        {this.state.userSearch===false ? <button onClick={()=>this.toggleUserSearch()} type="button" className="btn  btn-outline-secondary web-dev-logo mb-2 mt-2 mr-2" data-toggle="modal"
                                                data-target="#profileLookupModalCenter" >
                                            Profile LookUp
                                        </button> : <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Enter Username" onChange={(event)=> this.usernameChanged(event)}/>
                                                <div className="input-group-append">
                                                    <button onClick={()=>this.searchUser()} className="btn btn-secondary" type="button">
                                                        <i className="fa fa-search"/>
                                                    </button>
                                                </div>
                                        </div>}


                                   {this.state.appStatusToggle===false  ?   <button onClick={()=>this.toggleAppStatus()} type="button" className="btn  btn-outline-secondary web-dev-logo mb-2 mt-2 mr-2" data-toggle="modal"
                                                data-target="#exampleModalCenter" >
                                           Application Status
                                     </button> :  <div className="input-group">
                                       <input type="text" className="form-control" placeholder="Enter name" onChange={(event)=> this.phoneNumberChanged(event)}/>
                                       <div className="input-group-append">
                                           <button onClick={()=>{this.searchUserProductStatus(); }} className="btn btn-secondary" type="button">
                                               <i className="fa fa-search"/>
                                           </button>
                                       </div>
                                   </div>}
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

                            <div className="container mt-5 bg-dark mb-4  pb-2 pt-1">
                                <div className="web-dev-particle-text-center-child web-dev-overflow-scroll">
                                    <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">

                                        <Link to="/">     <li className="nav-item ">
                                               <div className="nav-link active web-dev-font-home-tabs" id="home-tab"
                                               role="tab" aria-controls="home" aria-selected="true">Credit Cards</div>
                                        </li></Link>
                                        <Link to="/home/saving">    <li className="nav-item">
                                             <div className="nav-link web-dev-font-home-tabs" id="profile-tab"
                                               role="tab" aria-controls="profile" aria-selected="false">Savings Account</div>
                                        </li></Link>
                                        <Link to="/home/checking">     <li className="nav-item">
                                             <div className="nav-link web-dev-font-home-tabs" id="contact-tab"
                                               role="tab" aria-controls="contact" aria-selected="false">Checking Account</div>
                                            </li></Link>
                                    </ul>
                                    <CreditCardHomePage/>
                                </div>
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
        {(context) => <CustomerOnBoardPage {...props} context={context}/>}
    </MyContext.Consumer>
)
