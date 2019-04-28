import React from "react";
import MainPageService from "../service/MainPageService";
import AdminUserService from "../service/admin.service.client";
import MyContext from "./MyContext";
import UserService from "../service/user.service.client";
import {withRouter} from "react-router";


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.mainPageService = MainPageService.getInstance();
        this.adminUserService = AdminUserService.getInstance();
        this.userService = new UserService();
        this.state = {
            updateUserFormNeeded: false,
            updateUserForm: true,
            editForm:true,
                firstName:" ",
                lastName:" ",
                DOB:" ",
                address:" ",
                phoneNumber:" ",
                email:" ",
                username:" ",
                password:" ",
                _id:" ",
            userEdited: false


        }
    }

    setUpdateuserForm = () => {
        this.setState({
            updateUserFormNeeded:this.state.updateUserForm
        })
    };


    passwordChanged = event => {
        this.setState({

                password: event.target.value,


        })
    };

    firstNameChanged = event => {
        this.setState({

                firstName: event.target.value,


        })
    };

    lastNameChanged = event => {
        this.setState({

                lastName: event.target.value,


        });
    };

    DOBChanged = event => {
        this.setState({
                DOB: event.target.value,


        });
    };

    addressChanged = event => {
        this.setState({

                address: event.target.value,


        });
    };

    phoneNumberChanged = event => {
        this.setState({

                phoneNumber:event.target.value,

        });
    };

    emailChanged = event => {
        this.setState({
                email:event.target.value

        });
    };

    getProfile = () =>
    {
        this.mainPageService.getProfile().then (
            (sess) => {
                this.setState({
                    profile:sess
                });

            }
        )
    }

    getAndLogout = () =>
    {
    /*    this.mainPageService.getProfile().then (
            (sess) => {
                this.setState({
                    profile:sess
                });

            }
        )*/

    this.userService.getProfile()
        .then(user => {

            console.log("User on mount", user);
            this.setState({
                firstName:user.firstName,
                lastName:user.lastName,
                DOB:user.DOB,
                address:user.address,
                phoneNumber:user.phoneNumber,
                email:user.email,
                _id:user._id,
                isAdmin: user.isAdmin,
                username : user.username,
                password: user.password
            })

          /*  this.adminUserService.loginUser()
        console.log("User From Session", user);*/
    })



/*
        this.userService.logoutUser()
            .then(resposne =>{
                alert("Login Again!!");
                this.props.history.push('/')})
    }*/
    }

    editUser = () =>{
        this.userService.updateProfileNew(this.state._id,this.state)
            .then(user =>{ console.log("User", user);
            this.userService.getProfile()
                .then(user =>{ this.props.context.setUser(user);
                console.log("Profile", user);

                //alert(this.state.username.concat("    Updated"))

                this.setState({
                    firstName:user.firstName,
                    lastName:user.lastName,
                    DOB:user.DOB,
                    address:user.address,
                    phoneNumber:user.phoneNumber,
                    email:user.email,
                    _id:user._id,
                    isAdmin: user.isAdmin,
                    userEdited: true
                }) }

                )
            }


            );


      /*  this.mainPageService.updateUserWithSession(user)
            .then(() => this.getAndLogout())*/

    };

    resetUserEdited = () =>
        this.setState({
            userEdited: false
        })



    componentDidMount() {
        this.getAndLogout();
        console.log("State", this.state);
    }

    render () {

        return (

            <div className="card">
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>


                <h1 className="text-center"> PROFILE</h1>

                <div className="container">
                    {this.state.userEdited===true  &&
                    <div className="alert alert-success alert-dismissible fade show " role="alert">
                        <strong>{this.state.username}</strong> Updated
                        <button onClick={()=> this.resetUserEdited()} type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}

                    <div className="form-group row mt-2">

                        <label htmlFor="username" className="col-sm-2">
                            UserName
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control bg-gray"
                                placeholder={this.state.username}
                                id="username"
                                disabled="disabled"
                                // value={this.props.userToBeEdited[0].username}
                                onChange={this.userNameChanged}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-2">
                            Password
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                placeholder="alice"
                                value={this.state.password}
                                // value={this.props.userToBeEdited[0].password}
                                id="password"
                                onChange={this.passwordChanged}
                            />
                        </div>
                    </div>


                    <div className="form-group row">
                        <label htmlFor="firstName" className="col-sm-2">
                            First Name
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"

                                 value={this.state.firstName!==undefined ? this.state.firstName : 'Alice' }
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
                                value={this.state.lastName !==undefined ? this.state.lastName: 'Wonder' }
                                // value={this.props.userToBeEdited[0].lastName}
                                id="lastName"
                                onChange={this.lastNameChanged}
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
                                value={this.state.address!==undefined ? this.state.address : 'Boston'}
                                // value={this.props.userToBeEdited[0].address}
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
                                value={this.state.phoneNumber!==undefined ?this.state.phoneNumber: '726663662' }
                                // value={this.props.userToBeEdited[0].phoneNumber}
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
                                type="email"
                                className="form-control"
                                value={this.state.email!==undefined ? this.state.email: 'matan@gl.com'  }
                                id="email"
                                onChange={this.emailChanged}
                            />
                        </div>
                    </div>

                </div>

                <button type="button"
                        className="btn btn-dark ml-2 mr-2 mb-4 mt-1" onClick={() => {
                    this.setUpdateuserForm()
                    this.editUser()
                }}>
                    Save after editing
                </button>




                        </React.Fragment>
                    )}
                </MyContext.Consumer>

            </div>

        )
    }

}


export default withRouter((props) => (
    <MyContext.Consumer>
        {(context) => <ProfilePage {...props} context={context}/>}
    </MyContext.Consumer>
))