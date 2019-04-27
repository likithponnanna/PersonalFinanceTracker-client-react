import React from "react";
import MainPageService from "../service/MainPageService";
import AdminUserService from "../service/admin.service.client";


class AnotherUserProfileLookupMain extends React.Component {
    constructor(props) {
        super(props);
        this.mainPageService = MainPageService.getInstance();
        this.adminUserService = AdminUserService.getInstance();
        this.state = {

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
                _id:props.match.params.id
            }

        }
    }

    setUpdateuserForm = () => {
        this.setState({
            updateUserFormNeeded:this.state.updateUserForm
        })
    };





    componentDidMount() {
        console.log(this.state._id)
    }

    render () {

        return (

            <div>

                <h1> PROFILE LOOKUP</h1>

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




            </div>

        )
    }

}
export default AnotherUserProfileLookupMain