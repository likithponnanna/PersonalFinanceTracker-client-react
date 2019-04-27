import React from "react";
import MainPageService from "../service/MainPageService";
import AdminUserService from "../service/admin.service.client";
import MyContext from "./MyContext";


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.mainPageService = MainPageService.getInstance();
        this.adminUserService = AdminUserService.getInstance()
        this.state = {
            updateUserFormNeeded: false,
            updateUserForm: true,
            editForm:true,
            profile:{
                firstName:" ",
                lastName:" ",
                DOB:" ",
                address:" ",
                phoneNumber:" ",
                email:" ",
                username:" ",
                password:" ",
                _id:" "
            }

        }
    }

    setUpdateuserForm = () => {
        this.setState({
            updateUserFormNeeded:this.state.updateUserForm
        })
    };

    userNameChanged = event => {
        this.setState({

            profile: {
                firstName: this.state.profile.firstName,
                lastName: this.state.profile.lastName,
                DOB: this.state.profile.DOB,
                address: this.state.profile.address,
                phoneNumber: this.state.profile.phoneNumber,
                email: this.state.profile.email,
                username: event.target.value,
                password: this.state.profile.password,
                _id: this.state.profile._id
            }

        })
    };

    passwordChanged = event => {
        this.setState({
            profile: {
                firstName: this.state.profile.firstName,
                lastName: this.state.profile.lastName,
                DOB: this.state.profile.DOB,
                address: this.state.profile.address,
                phoneNumber: this.state.profile.phoneNumber,
                email: this.state.profile.email,
                username: this.state.profile.username,
                password: event.target.value,
                _id: this.state.profile._id
            }

        })
    };

    firstNameChanged = event => {
        this.setState({
            profile: {
                firstName: event.target.value,
                lastName: this.state.profile.lastName,
                DOB: this.state.profile.DOB,
                address: this.state.profile.address,
                phoneNumber: this.state.profile.phoneNumber,
                email: this.state.profile.email,
                username: this.state.profile.username,
                password: this.state.profile.password,
                _id: this.state.profile._id
            }
        })
    };

    lastNameChanged = event => {
        this.setState({
            profile: {
                firstName: this.state.profile.firstName,
                lastName: event.target.value,
                DOB: this.state.profile.DOB,
                address: this.state.profile.address,
                phoneNumber: this.state.profile.phoneNumber,
                email: this.state.profile.email,
                username: this.state.profile.username,
                password: this.state.profile.password,
                _id: this.state.profile._id
            }
        });
    };

    DOBChanged = event => {
        this.setState({
            profile: {
                firstName: this.state.profile.firstName,
                lastName: this.state.profile.lastName,
                DOB: event.target.value,
                address: this.state.profile.address,
                phoneNumber: this.state.profile.phoneNumber,
                email: this.state.profile.email,
                username: this.state.profile.username,
                password: this.state.profile.password,
                _id: this.state.profile._id
            }
        });
    };

    addressChanged = event => {
        this.setState({
            profile: {
                firstName: this.state.profile.firstName,
                lastName: this.state.profile.lastName,
                DOB: this.state.profile.DOB,
                address: event.target.value,
                phoneNumber: this.state.profile.phoneNumber,
                email: this.state.profile.email,
                username: this.state.profile.username,
                password: this.state.profile.password,
                _id: this.state.profile._id
            }
        });
    };

    phoneNumberChanged = event => {
        this.setState({

            profile: {
                firstName:this.state.profile.firstName,
                lastName:this.state.profile.lastName,
                DOB:this.state.profile.DOB,
                address:this.state.profile.address,
                phoneNumber:event.target.value,
                email:this.state.profile.email,
                username:this.state.profile.username,
                password:this.state.profile.password,
                _id:this.state.profile._id
            }
            // phoneNumber: event.target.value
        });
    };

    emailChanged = event => {
        this.setState({
            profile: {
                firstName:this.state.profile.firstName,
                lastName:this.state.profile.lastName,
                DOB:this.state.profile.DOB,
                address:this.state.profile.address,
                phoneNumber:this.state.profile.phoneNumber,
                email:event.target.value,
                username:this.state.profile.username,
                password:this.state.profile.password,
                _id:this.state.profile._id
            }
        });
    };

    getProfile = () =>
    {
        this.mainPageService.getProfile().then (
            (sess) => {
                this.setState({
                    profile:sess
                })
                console.log(this.state.profile)
            }
        )
    }

    editUser = (user) =>{
        this.mainPageService.updateUserWithSession(user)
            .then(() => this.getProfile())

    };



    componentDidMount() {
        this.getProfile()
        console.log(this.state.profile)
    }

    render () {

        return (

            <div className="card">
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>


                <h1 className="text-center"> PROFILE</h1>

                <div className="container">

                    <div className="form-group row">

                        <label htmlFor="username" className="col-sm-2">
                            UserName
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control bg-gray"
                                placeholder={this.state.profile.username}
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
                                value={this.state.profile.password}
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

                                 value={this.state.profile.firstName!==undefined ? this.state.profile.firstName : 'Alice' }
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
                                value={this.state.profile.lastName !==undefined ? this.state.profile.lastName: 'Wonder' }
                                // value={this.props.userToBeEdited[0].lastName}
                                id="lastName"
                                onChange={this.lastNameChanged}
                            />
                        </div>
                    </div>



                 {/*   <div className="form-group row">
                        <label htmlFor="DOB" className="col-sm-2">
                            Date of Birth
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="date"
                                className="form-control"
                                value={this.state.profile.DOB !==undefined ? this.state.profile.DOB : '11-04-1994'}
                                id="DOB"
                                onChange={this.DOBChanged}
                            />
                        </div>
                    </div>
*/}

                    <div className="form-group row">
                        <label htmlFor="address" className="col-sm-2">
                            Address
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                value={this.state.profile.address!==undefined ? this.state.profile.address : 'Boston'}
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
                                value={this.state.profile.phoneNumber!==undefined ?this.state.profile.phoneNumber: '726663662' }
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
                                value={this.state.profile.email!==undefined ? this.state.profile.email: 'matan@gl.com'  }
                                //value={this.props.userToBeEdited[0].email}
                                id="email"
                                onChange={this.emailChanged}
                            />
                        </div>
                    </div>

                </div>

                <button type="button"
                        className="btn btn-dark ml-2 mr-2 mb-4 mt-1" onClick={() => {
                    this.setUpdateuserForm()
                    console.log("clicking edit",this.state.profile)
                    console.log(this.state.phoneNumber)
                    this.editUser(this.state.profile)
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
export default ProfilePage