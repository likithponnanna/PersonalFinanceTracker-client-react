import React from 'react'
import AdminUserService from "../service/AdminUserService"

class EditUserByAdmin extends React.Component{

    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance();
        this.state ={
            firstName:this.props.userToBeEdited.firstName,
            lastName:this.props.userToBeEdited.lastName,
            dob:this.props.userToBeEdited.dob,
            address:this.props.userToBeEdited.address,
            phoneNumber:this.props.userToBeEdited.phoneNumber,
            email:this.props.userToBeEdited.email,
            username:this.props.userToBeEdited.username,
            password:this.props.userToBeEdited.password,
            _id:this.props.userToBeEdited._id,
            editFormFlag:this.props.editForm,
            falseFlag:false
        }
    }

    userNameChanged = event => {
        this.setState({
                          username: event.target.value
                      })
    };

    passwordChanged = event => {
        this.setState({
                          password: event.target.value
                      })
    };

    firstNameChanged = event => {
        this.setState({
                          firstName: event.target.value
                      })
    };

    lastNameChanged = event => {
        this.setState({
                          lastName: event.target.value
                      });
    };

    dobChanged = event => {
        this.setState({
                          DOB: event.target.value
                      });
    };

    addressChanged = event => {
        this.setState({
                          address: event.target.value
                      });
    };

    phoneNumberChanged = event => {
        this.setState({
                          phoneNumber: event.target.value
                      });
    };

    emailChanged = event => {
        this.setState({
                          email: event.target.value
                      });
    };




    setEditFormFlag = () => {
        this.setState({
                          editFormFlag:this.state.falseFlag
                      })
    }

    render () {

        return (
            <div>
                {console.log("edit is entered",this.state.editFormFlag)}

                {this.state.editFormFlag === true &&

                    <div>

                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2">
                                UserName
                            </label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control"
                                    placeholder={this.props.userToBeEdited.username}
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
                                    placeholder={this.props.userToBeEdited.password}
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
                                    placeholder={this.props.userToBeEdited.firstName}
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
                                    placeholder={this.props.userToBeEdited.lastName}
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
                                    placeholder={this.props.userToBeEdited.DOB}
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
                                    placeholder={this.props.userToBeEdited.address}
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
                                    placeholder={this.props.userToBeEdited.phoneNumber}
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
                                    placeholder={this.props.userToBeEdited.email}
                                    // value={this.props.userToBeEdited[0].email}
                                    id="email"
                                    onChange={this.emailChanged}
                                />
                            </div>
                        </div>

                        <button
                            className="btn-primary"
                            onClick={() => {
                                this.props.editUser(this.state);
                                this.setEditFormFlag();
                            }}
                        >
                            EDIT
                        </button>


                    </div>

                }

            </div>

        )
    }

}
export default EditUserByAdmin