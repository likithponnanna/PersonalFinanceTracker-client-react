import React from 'react'
import AdminUserService from "../service/admin.service.client"
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import MyContext from './MyContext'

class AdminUserListContent extends React.Component{
    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance();
        this.state = {
            userList:[],
            addUserFormNeeded: false,
            addForm:true,
            addUserForm: true,
            updateUserFormNeeded: false,
            updateUserForm: true,
            editForm:true,
            makeAdmin:true,
            makeAdminNeeded:false,
            firstName:"",
            lastName:"",
            dob:"",
            address:"",
            phoneNumber:"",
            email:"",
            username:"",
            password:"",
            userToBeEdited: undefined,
            activeBtn: false
        }
    }



    toggleAddUSer = () => {
        this.setState({
            addUserFormNeeded: !this.state.addUserFormNeeded
        })
    };


    getAllUsers = () => {
        let nonAdminUser = []
        this.adminUserService.getAllUsers().then(
            users => {

                for (let i = 0; i < users.length; i++) {
                    if (users[i].isAdmin === false) {
                        nonAdminUser.push(users[i]);
                    }
                }

                this.setState({
                    userList: nonAdminUser

                })

            }
        )
    };


    createUser = () => {
        if(this.state.username!==""|| this.state.password !=="") {

            let newUser = {
                username: this.state.username,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                DOB: this.state.dob.toString(),
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,


            }


            this.adminUserService.createUser(newUser)
                .then(
                    () => {
                        this.getAllUsers();
                    }
                )

        }else {
            alert("Username and Password cannot be empty");
        }


    };

    updateUser = () =>{
        console.log("Inside update User ", this.state.userToBeEdited._id);

        let newUser = {
            _id: this.state.userToBeEdited._id,
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            DOB: this.state.dob,
            address: this.state.address,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber
        }


        this.adminUserService.updateUser(newUser).then(
            response =>{
                console.log("User return update", response)
                this.getAllUsers()}
        );
    };


    deleteUser = (userId) =>{
        this.adminUserService.deleteUser(userId)
            .then(
                () => this.getAllUsers()
            );
    };


    toggleUpdateForm = () => {
        this.setState({
            updateUserFormNeeded: !this.state.updateUserFormNeeded
        })
    };

    setUserToBeEdited =  (user) => {

        console.log("Set  User ", user._id);
        this.setState({
            userToBeEdited:user,
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.DOB,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,

        })
    };

    setMakeAdmin = () => {
        this.setState({
            makeAdminNeeded:this.state.makeAdmin
        })
    };

    makeUserAdmin = (user) =>
    {
        this.adminUserService.makeUserAdmin(user).then(
            () => this.getAllUsers()
        );
    };


    componentDidMount() {
        this.getAllUsers()
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

    setActiveBtn = () =>
        this.setState({
            activeBtn: !this.state.activeBtn
        })

    getAllAdmins = () => {
        let adminUsers = []
        this.adminUserService.getAllUsers().then(
            users => {

                for (let i = 0; i < users.length; i++) {
                    if (users[i].isAdmin === true) {
                        adminUsers.push(users[i]);
                    }
                }

                this.setState({
                    userList: adminUsers

                })

            }
        )
    };



    render () {

        return (
            <div className="container web-dev-overflow p-0">
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>

                <div className="wrapper container web-dev-overflow p-0">


                    <div className="card col-12 web-dev-overflow p-0">

                        <h5 className="card-header text-center font-weight-bold text-uppercase py-4">User List</h5>

                        <div className="card-body web-dev-overflow">
                            <div id="table" className="table-editable">
                                <table
                                    className="table  table-responsive-md table-striped text-center ">
                                    <tr>
                                        <button onClick={()=>{ this.setActiveBtn();this.getAllUsers() }} className={` mr-2 ${this.state.activeBtn===false ? 'btn-secondary' : 'btn-outline-secondary '} `}>
                                             Users
                                        </button>
                                        <button onClick={()=>{ this.setActiveBtn(); this.getAllAdmins()} } className={`ml-2 mr-1 ${this.state.activeBtn===true ? 'btn-secondary' : 'btn-outline-secondary '} `} >
                                            Admins
                                        </button>
                                    </tr>
                                </table>



                                <span className="table-add float-right mb-3 mr-2 " onClick={()=> this.toggleAddUSer()}><a href="#!" className="text-success">
                                              <i className="fa fa-plus" aria-hidden="true"/></a></span>

                                <table
                                    className="table table-bordered table-responsive-md table-striped text-center ">

                                    <tr>
                                        <th className="text-center">Username</th>
                                        <th className="text-center">Password</th>
                                        <th className="text-center">First Name</th>
                                        <th className="text-center">Last Name</th>
                                        <th className="text-center">DOB</th>
                                        <th className="text-center">Address</th>
                                        <th className="text-center">Phone</th>
                                        <th className="text-center">Email</th>
                                        <th className="text-center"> </th>
                                        <th className="text-center"> </th>
                                        <th className="text-center">Make Admin</th>
                                    </tr>

                                    {this.state.updateUserFormNeeded &&    <tr>
                                        <td className="pt-3-half "  ><input  className="bg-gray" value={this.state.username} type="text"/> </td>
                                        <td className="pt-3-half"  ><input value={this.state.password} type="text" onChange={(event)=>this.passwordChanged(event)}/> </td>
                                        <td className="pt-3-half" ><input value={this.state.firstName} type="text" onChange={(event)=>this.firstNameChanged(event)}/></td>
                                        <td className="pt-3-half" ><input value={this.state.lastName} type="text"  onChange={(event)=>this.lastNameChanged(event)}/></td>
                                        <td className="pt-3-half" ><input value={this.state.dob} type="date" onChange={(event)=>this.dobChanged(event)}/></td>
                                        <td className="pt-3-half" ><input value={this.state.address} type="text"  onChange={(event)=>this.addressChanged(event)}/></td>
                                        <td className="pt-3-half" ><input value={this.state.phoneNumber} type="number" onChange={(event)=>this.phoneNumberChanged(event)} /></td>
                                        <td className="pt-3-half" ><input value={this.state.email} type="email"  onChange={(event)=>this.emailChanged(event)}/></td>

                                        <td className="pt-3-half">
                                                      <span className="table-remove"><button type="button"
                                                                                             className="btn  btn-rounded btn-sm my-0"> </button></span>
                                        </td>
                                        <td>
                                                        <span className="table-remove"><button type="button"
                                                                                               className="btn btn-danger btn-rounded btn-sm my-0" onClick={()=>{ this.toggleUpdateForm(); this.updateUser() }}>Update</button></span>
                                        </td>
                                        <td className="pt-3-half">
                                                      <span className="table-remove"><button type="button"
                                                                                             className="btn  btn-rounded btn-sm my-0"> </button></span>
                                        </td>
                                    </tr>}


                                    {this.state.addUserFormNeeded && <tr>
                                        <td className="pt-3-half"  ><input type="text"  onChange={(event)=>this.userNameChanged(event)}/> </td>
                                        <td className="pt-3-half"  ><input type="text" onChange={(event)=>this.passwordChanged(event)}/> </td>
                                        <td className="pt-3-half" ><input type="text" onChange={(event)=>this.firstNameChanged(event)}/></td>
                                        <td className="pt-3-half" ><input type="text" onChange={(event)=>this.lastNameChanged(event)}/></td>
                                        <td className="pt-3-half" ><input type="date" onChange={(event)=>this.dobChanged(event)}/></td>
                                        <td className="pt-3-half" ><input type="text" onChange={(event)=>this.addressChanged(event)}/></td>
                                        <td className="pt-3-half" ><input type="number" onChange={(event)=>this.phoneNumberChanged(event)}/></td>
                                        <td className="pt-3-half" ><input type="email" onChange={(event)=>this.emailChanged(event)}/></td>

                                        <td className="pt-3-half">
                                                      <span className="table-remove"><button type="button"
                                                                                             className="btn btn-success btn-rounded btn-sm my-0" onClick={()=>{ this.toggleAddUSer(); this.createUser()}}>Add</button></span>
                                        </td>
                                        <td>
                                                        <span className="table-remove"><button type="button"
                                                                                               className="btn  btn-rounded btn-sm my-0"> </button></span>
                                        </td>
                                        <td className="pt-3-half">
                                                      <span className="table-remove"><button type="button"
                                                                                             className="btn  btn-rounded btn-sm my-0"> </button></span>
                                        </td>
                                    </tr>
                                    }


                                    {

                                        this.state.userList.map((user,index)  =>
                                            <tr key={index}>
                                                <td className="pt-3-half" >{user.username}</td>
                                                <td className="pt-3-half" >{user.password}</td>
                                                <td className="pt-3-half" >{user.firstName}</td>
                                                <td className="pt-3-half" >{user.lastName}</td>
                                                <td className="pt-3-half" >{user.DOB}</td>
                                                <td className="pt-3-half" >{user.address}</td>
                                                <td className="pt-3-half" >{user.phoneNumber }</td>
                                                <td className="pt-3-half" >{user.email}</td>
                                                <td className="pt-3-half">
                                                    { this.state.addUserFormNeeded===true || this.state.updateUserFormNeeded===true ? <div/>:
                                                    <span className="table-remove" ><i onClick={()=>{ this.toggleUpdateForm(); this.setUserToBeEdited(user)}}  className="fa fa-edit fa-2x" aria-hidden="true"/></span>
                                                       }

                                                </td>
                                                <td>
                                                    { this.state.addUserFormNeeded===true || this.state.updateUserFormNeeded===true ? <div/>:
                                                    <span className="table-trash">
                                                        <i onClick={()=> this.deleteUser(user._id)} className="fa fa-trash fa-2x " aria-hidden="true"/>
                                                    </span>}
                                                </td>
                                                <td>
                                                    { this.state.addUserFormNeeded===true || this.state.updateUserFormNeeded===true ? <div/>:
                                                    <span className="table-trash">
                                                        {this.state.activeBtn===false ?   <i onClick={()=> this.makeUserAdmin(user)} className="fa fa-check fa-2x " aria-hidden="true"/> : <i/>}
                                                    </span>}
                                                </td>
                                            </tr>
                                        )

                                    }






                                </table>
                            </div>
                        </div>
                    </div>
                </div>




            </React.Fragment>
        )}
</MyContext.Consumer>

            </div>
        )
    }

}
AdminUserListContent.contextType = MyContext;
export default AdminUserListContent



