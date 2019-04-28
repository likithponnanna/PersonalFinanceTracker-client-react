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

import GuestProductService from "../service/GuestProductService";
import AdminUserService from "../service/admin.service.client";

class ProfileLookup extends Component{


    constructor(props){
        super(props);

        this.guestProductService = new GuestProductService();
        this.adminService = new AdminUserService();
        this.state = {
            show: false,
            modalShow: true,
            collapseHideBrand:  false,
            userId:undefined,
            userFound: false,
            user: undefined,
            modal: false,
            userSearch: false,
            statusLookup: false,
            username: '',
            id: undefined

        }

    }

    componentDidMount() {

        console.log("Params", this.props.match.params.id);
       this.adminService.getAllUsers()
           .then(users => {
               for (let i = 0; i <users.length ; i++) {
                   if(users[i]._id === this.props.match.params.id){
                       this.setState({
                           user: users[i]
                       })

                   }
               }
           })

        console.log(this.state.user);
    }

    toggleCollapseHide =()=>
        this.setState({
            collapseHideBrand: !this.state.collapseHideBrand
        })

    usernameChanged = (event) =>
        this.setState({
            username: event.target.value
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



    render() {



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
                                    <h1>Profile Lookup</h1></div>
                            </div>

                            {this.state.user!==undefined ?
                            <div className="container card mt-5 bg-light mb-4">
                                <div className="web-dev-particle-text-center-child m-4">

                                    <div className="container m-4">

                                        <div className="form-group row " >
                                            <label htmlFor="firstName" className="col-sm-2 mt-4">
                                                First Name
                                            </label>
                                            <div className="col-sm-10 mt-4">
                                                <input
                                                    className="form-control bg-gray"
                                                    placeholder="firstName"
                                                    id="firstName"
                                                    value={this.state.user.firstName}
                                                    disabled="disabled"
                                                />
                                            </div>
                                        </div>


                                        <div className="form-group row">
                                            <label htmlFor="lastName" className="col-sm-2">
                                                Last Name
                                            </label>
                                            <div className="col-sm-10">
                                                <input
                                                    className="form-control bg-gray"
                                                    placeholder="lastName"
                                                    id="lastName"
                                                    disabled="disabled"
                                                    value={this.state.user.lastName}
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
                                                    className="form-control bg-gray"
                                                    placeholder="dob"
                                                    id="dob"
                                                    disabled="disabled"
                                                    value={this.state.user.DOB}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="address" className="col-sm-2">
                                                Address
                                            </label>
                                            <div className="col-sm-10">
                                                <input
                                                    className="form-control bg-gray"
                                                    placeholder="address"
                                                    id="address"
                                                    disabled="disabled"
                                                    value={this.state.user.address}
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
                                                    className="form-control bg-gray"
                                                    placeholder="phoneNumber"
                                                    id="phoneNumber"
                                                    disabled="disabled"
                                                    value={this.state.user.phoneNumber}
                                                />
                                            </div>
                                        </div>


                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-sm-2">
                                                Email
                                            </label>
                                            <div className="col-sm-10">
                                                <input
                                                    className="form-control bg-gray"
                                                    placeholder="email"
                                                    id="email"
                                                    disabled="disabled"
                                                    value={this.state.user.email}
                                                />
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>:<div></div>}


                        </React.Fragment>
                    )}
                </MyContext.Consumer>



            </div>
        )
    }


}
ProfileLookup.contextType = MyContext;
export default ProfileLookup