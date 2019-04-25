import React from 'react'
import AdminUserService from "../service/AdminUserService"
import MyContext from './MyContext'
import CreditCardHomePage from "./CreditCardHomePage";

class AddUserByAdmin extends React.Component{
    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance();
        this.state ={
            firstName:" ",
            lastName:" ",
            dob:" ",
            address:" ",
            phoneNumber:" ",
            email:" ",
            username:" ",
            password:" ",
            addFormFlag:this.props.addForm,
            falseFlag:false,
            userList:this.props.userList
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
                          dob: event.target.value
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

    setAddFormFlag = () => {
        this.setState({
                          addFormFlag:this.state.falseFlag
                      })
        console.log("addFormFlag",this.state.addFormFlag)
    }

    render() {
        return (
            <div>

                {this.state.addFormFlag === true &&

                 <div>

                     <div className="form-group row">
                         <label htmlFor="username" className="col-sm-2">
                             UserName
                         </label>
                         <div className="col-sm-10">
                             <input
                                 className="form-control"
                                 placeholder="username"
                                 id="username"
                                 onChange={this.userNameChanged}
                             />
                         </div>
                     </div>

                     < div className="form-group row">
                         <label htmlFor="password" className="col-sm-2">
                             Password
                         </label>
                         <div className="col-sm-10">
                             <input
                                 className="form-control"
                                 placeholder="password"
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
                                 placeholder="firstName"
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
                                 placeholder="lastName"
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
                                 placeholder="dob"
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
                                 placeholder="address"
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
                                 placeholder="phoneNumber"
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
                                 placeholder="email"
                                 id="email"
                                 onChange={this.emailChanged}
                             />
                         </div>
                     </div>

                     <button
                         className="btn-primary"
                         onClick={() => {
                             this.props.createUser(this.state);
                             this.setAddFormFlag();
                         }}
                     >
                         ADD
                     </button>

                 </div>

                }





            </div>
        )
    }
}
export default AddUserByAdmin;