import React from "react";
import MainPageService from "../service/MainPageService";
import AdminUserService from "../service/AdminUserService";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.mainPageService = MainPageService.getInstance();
        this.adminUserService = AdminUserService.getInstance()
        this.state = {
            // profile:{
            //     currentUser: [{
            //         firstName:" ",
            //         lastName:" ",
            //         dob:" ",
            //         address:" ",
            //         phoneNumber:" ",
            //         email:" ",
            //         username:" ",
            //         password:" ",
            //         _id:" "
            //     }]
            // },
            updateUserFormNeeded: false,
            updateUserForm: true,
            editForm:true,
            profile:{
                firstName:" ",
                lastName:" ",
                dob:" ",
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
                             dob: this.state.profile.dob,
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
                dob: this.state.profile.dob,
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
                dob: this.state.profile.dob,
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
                dob: this.state.profile.dob,
                address: this.state.profile.address,
                phoneNumber: this.state.profile.phoneNumber,
                email: this.state.profile.email,
                username: this.state.profile.username,
                password: this.state.profile.password,
                _id: this.state.profile._id
            }
                      });
    };

    dobChanged = event => {
        this.setState({
            profile: {
                firstName: this.state.profile.firstName,
                lastName: this.state.profile.lastName,
                dob: event.target.value,
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
                dob: this.state.profile.dob,
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
                dob:this.state.profile.dob,
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
                              dob:this.state.profile.dob,
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

        // console.log("inside editUser",user)
        // this.setState({
        //
        //               })
        this.mainPageService.updateUserWithSession(user)
            .then(() => this.getProfile())

    };



    componentDidMount() {
        this.getProfile()
        console.log(this.state.profile)
    }

    render () {

        return (

            <div>

{/*<h1>{this.state.profile.currentUser[0].username}</h1>*/}
                {/*<h1>{this.state.profile.currentUser[0]._id}</h1>*/}
                {/*/!*<h1>{JSON.stringify(this.state.selectedUser)}</h1>*!/*/}



                <h1> PROFILE</h1>

                <div>

                    <div className="form-group row">

                        <label htmlFor="username" className="col-sm-2">
                            UserName
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                placeholder={this.state.profile.username}
                                id="username"
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
                                placeholder={this.state.profile.password}
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
                                placeholder={this.state.profile.firstName}
                                // value={this.props.userToBeEdited[0].firstName}
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
                                placeholder={this.state.profile.lastName}
                                // value={this.props.userToBeEdited[0].lastName}
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
                                className="form-control"
                                placeholder={this.state.profile.DOB}
                                // value={this.props.userToBeEdited[0].DOB}
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
                                placeholder={this.state.profile.address}
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
                                className="form-control"
                                placeholder={this.state.profile.phoneNumber}
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
                                className="form-control"
                                placeholder={this.state.profile.email}
                                // value={this.props.userToBeEdited[0].email}
                                id="email"
                                onChange={this.emailChanged}
                            />
                        </div>
                    </div>

            </div>

                <button type="button"
                        className="btn btn-outline-success" onClick={() => {
                    this.setUpdateuserForm()
                    console.log("clicking edit",this.state.profile)
                    console.log(this.state.phoneNumber)
                    this.editUser(this.state.profile)
                }}>
                    Save after editing
                </button>


<h1> haha </h1>


            </div>

        )
    }

}
export default Profile