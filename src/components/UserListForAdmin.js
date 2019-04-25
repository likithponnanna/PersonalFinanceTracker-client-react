import React from 'react'
import AdminUserService from "../service/AdminUserService"
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import AddUserByAdmin from "./AddUserByAdmin";
import MyContext from './MyContext'
import EditUserByAdmin from "./EditUserByAdmin";

class UserListForAdmin extends React.Component{
    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance()
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
        }
    }



    setAddUserForm = () => {
        this.setState({
            addUserFormNeeded:this.state.addUserForm
                      })
    }


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


    createUser = (user) => {
        console.log("entered container")
        this.adminUserService.createUser(user)
            .then(
                () => {
                    this.getAllUsers();
                }
            )


    };

    editUser = (user) =>{
        this.adminUserService.updateUser(user).then(
            () => this.getAllUsers()
        );
    };


    deleteUser = (userid) =>{
        this.adminUserService.deleteUser(userid)
            .then(
            () => this.getAllUsers()
        );
    };


    setUpdateuserForm = () => {
        this.setState({
                          updateUserFormNeeded:this.state.updateUserForm
                      })
    };

    setUserToBeEdited =  (user) => {
        this.setState({
                          userToBeEdited:user,
                      })
        console.log(this.state.userToBeEdited)
    };

    setMakeAdmin = () => {
        this.setState({
                          makeAdminNeeded:this.state.makeAdmin
                      })
    };

    makeUserAdmin = (username) =>
    {
        this.adminUserService.makeUserAdmin(username).then(
            () => this.getAllUsers()
        );
    };


    componentDidMount() {
        this.getAllUsers()
    }

    render () {

        return (
           <div>

               <table className="table table-dark">
                   <thead>
                   <tr>
                       <th scope="col"> Role</th>
                       <th scope="col"> Username</th>
                       <th scope="col"> Password</th>
                       <th scope="col"> FirstName</th>
                       <th scope="col"> LastName</th>
                       <th scope="col"> Date of Birth</th>
                       <th scope="col"> Address</th>
                       <th scope="col"> Email ID</th>
                       <th scope="col"> Phone Number</th>
                       <th scope="col">
                           <button type="button" className="btn btn-outline-primary"
                                   onClick={() =>
                                       this.setAddUserForm()
                                   }
                            > Add User
                           </button>
                       </th>
                   </tr>
                   </thead>
                   <tbody>

                   {
                       this.state.userList.map(
                           (user) =>
                               <tr key={user._id}>
                                   <th scope="row">User</th>
                                   <td>{user.username}</td>
                                   <td>{user.password}</td>
                                   <td>{user.firstName}</td>
                                   <td>{user.lastName}</td>
                                   <td>{user.dob}</td>
                                   <td>{user.address}</td>
                                   <td>{user.email}</td>
                                   <td>{user.phoneNumber}</td>
                                   <td>
                                       <button type="button"
                                               className="btn btn-outline-danger"
                                               onClick={() => {
                                                   // console.log(user)
                                                   this.deleteUser(user._id)
                                               }}>
                                           Delete
                                       </button>

                                       <button type="button"
                                               className="btn btn-outline-info"
                                               id="editButton" onClick={() => {
                                           this.setUpdateuserForm()
                                           this.setUserToBeEdited(user)
                                           console.log("clicked edit")
                                       }}>
                                           EDIT
                                       </button>


                                       <button type="button"
                                               className="btn btn-outline-success"
                                               id="editButton"
                                               onClick={() => {
                                                   this.setMakeAdmin()
                                                   this.makeUserAdmin(user)
                                               }}
                                       >
                                           MAKE ADMIN
                                       </button>

                                       <Link to = {`/admin/addBill/${user._id}/${user.username}`}>
                                           <button type="button"
                                                   className="btn btn-outline-warning"
                                                   id="editButton"
                                           >
                                               ADD BILLS
                                           </button>
                                       </Link>

                                   </td>

                               </tr>
                       )
                   }
                   </tbody>
               </table>


                   {this.state.addUserFormNeeded === true &&
                    <div>
                        {console.log("inside add")}
                        <AddUserByAdmin
                            userList={this.state.userList}
                            addForm={this.state.addForm}
                            createUser={this.createUser}
                                />
                    </div>
                   }

               {this.state.updateUserFormNeeded === true &&

               <EditUserByAdmin

                   userList={this.state.userList}
                   userToBeEdited={this.state.userToBeEdited}
                   editForm={this.state.editForm}
                   editUser={this.editUser}

               />
               }


           </div>
        )
    }

}
export default UserListForAdmin