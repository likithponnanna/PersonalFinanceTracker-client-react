import React from 'react'
import AdminUserService from "../service/AdminUserService"
import MyContext from './MyContext'
import AddUserByAdmin from "./AddUserByAdmin"
import CustomerOnBoardPage from "./CustomerOnBoardPage";
import {Route} from "react-router";

class AdminUser extends React.Component{
    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance();
        this.state = {
            isActive:false,
            userList: [],
            adminList: [],
            addUserFormNeeded: false,
            addUserForm: true


        }
    }

    setAdduserForm = () => {
        this.setState({
                          addUserFormNeeded:this.state.addUserForm
                      })
    }



    getAllUsers = () => {
        this.adminUserService.getAllUsers().then(
            users => {
                this.setState ({
                    userList: [],
                    adminList: []
                });

                for(let user in users) {
                    console.log(users[user].isAdmin);
                    if(users[user].isAdmin === true) {
                        console.log(users[user])
                        this.state.adminList.push([users[user]]);
                    }
                    else if(users[user].isAdmin === false) {
                        this.state.userList.push([users[user]]);
                    }
                }

                this.setState({
                                  userList :this.state.userList,
                                  adminList: this.state.adminList
                              })
                console.log(this.state.userList);
                console.log(this.state.adminList);

            }
        )
    }

    render () {

        return (
         <div>
             <MyContext.Consumer>
                 {(context) => (
                     <React.Fragment>
             <h1>Welcome Admin </h1>

             <ul className="nav nav-tabs">

                 <li onClick = {() =>
                 {
                     this.getAllUsers();
                     context.state.selectedTabForAdminUser = 'USERS'
                 }}>
                     <a className="nav-link" data-toggle="tab"  href="#">
                         Users
                     </a>
                 </li>


                 <li onClick = {() =>
                 {
                     this.getAllUsers();
                     context.state.selectedTabForAdminUser = 'ADMINS'
                 }}>
                     <a className="nav-link" data-toggle="tab"  href="#">
                         Admins
                     </a>
                 </li>


                 <li>
                     <a className="nav-link" data-toggle="tab"  href="#">CC</a>
                 </li>

             </ul>

                         <div>

                             {context.state.selectedTabForAdminUser === 'USERS' &&

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
                                                      this.setAdduserForm()
                                                  }> Add User
                                          </button>
                                      </th>
                                  </tr>
                                  </thead>
                                  <tbody>

                                  {
                                      this.state.userList.map(
                                          (user) =>
                                              <tr key={user[0]._id}>
                                                  <th scope="row">User</th>
                                                  <td>{user[0].username}</td>
                                                  <td>{user[0].password}</td>
                                                  <td>{user[0].firstName}</td>
                                                  <td>{user[0].lastName}</td>
                                                  <td>{user[0].dob}</td>
                                                  <td>{user[0].address}</td>
                                                  <td>{user[0].email}</td>
                                                  <td>{user[0].phoneNumber}</td>

                                              </tr>
                                      )
                                  }


                                  </tbody>
                              </table>






                              </div>




                             }

                             {context.state.selectedTabForAdminUser === 'ADMINS' &&

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
                                  </tr>
                                  </thead>
                                  <tbody>

                                  {
                                      this.state.adminList.map(
                                          (user) =>
                                              <tr key={user[0]._id}>
                                                  <th scope="row">Admin</th>
                                                  <td>{user[0].username}</td>
                                                  <td>{user[0].password}</td>
                                                  <td>{user[0].firstName}</td>
                                                  <td>{user[0].lastName}</td>
                                                  <td>{user[0].dob}</td>
                                                  <td>{user[0].address}</td>
                                                  <td>{user[0].email}</td>
                                                  <td>{user[0].phoneNumber}</td>

                                              </tr>
                                      )
                                  }


                                  </tbody>
                              </table>


                             }








                                 </div>



                         <div>
                         {this.state.addUserFormNeeded === true &&
                             <div>
                               <AddUserByAdmin/>
                             </div>
                         }
                         </div>



                     </React.Fragment>
                 )}
             </MyContext.Consumer>

         </div>


        )
    }

}
export default AdminUser;