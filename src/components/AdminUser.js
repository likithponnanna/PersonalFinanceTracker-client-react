import React from 'react'
import AdminUserService from "../service/AdminUserService"
import MyContext from './MyContext'
import AddUserByAdmin from "./AddUserByAdmin"
import CustomerOnBoardPage from "./CustomerOnBoardPage";
import './MainPageStyle.css'
import EditUserByAdmin from "./EditUserByAdmin"
import GuestProductService from "../service/GuestProductService"
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import TransactionsForAdmin from "./TransactionsForAdmin";

class AdminUser extends React.Component{
    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance();
        this.guestProductService = GuestProductService.getInstance();
        this.state = {
            isActive:false,
            userList: [],
            adminList: [],
            guestList:[],
            addUserFormNeeded: false,
            addUserForm: true,
            userToBeDeleted:' ',
            updateUserFormNeeded: false,
            updateUserForm: true,
            userToBeEdited:undefined,
            addForm:true,
            editForm:true,
            makeAdmin:true,
            makeAdminNeeded:false,
            viewTrans:true,
            viewTransNeeded:false


        }
    }

    setAdduserForm = () => {
        this.setState({
                          addUserFormNeeded:this.state.addUserForm
                      })
    }

    setUpdateuserForm = () => {
        this.setState({
                          updateUserFormNeeded:this.state.updateUserForm
                      })
    }

    setUserToBeEdited =  (user) => {
        this.setState({
                          userToBeEdited:user,
                      })
        console.log(this.state.userToBeEdited)
    }

    setMakeAdmin = () => {
        this.setState({
                          makeAdminNeeded:this.state.makeAdmin
                      })
    }

    setViewTransNeeded = () => {
        this.setState({
                          viewTransNeeded:this.state.viewTrans
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
                    //console.log(users[user].isAdmin);
                    if(users[user].isAdmin === true) {
                        //console.log(users[user])
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
                // console.log(this.state.userList);
                // console.log(this.state.adminList);

            }
        )
    }


    getGuestUsersForCreditCard = () => {
        this.guestProductService.getGuestUsers().then(
            (guests) => {
                console.log("guests",guests);
                this.setState({
                    guestList:[]
                              });

                for(let i=0; i<guests.length;i++){
                    this.state.guestList.push(guests[i])
                }

             this.setState({
                 guestList:this.state.guestList
                           })

             console.log("guestlist",this.state.guestList)

            }
        )
    }

    componentDidMount = () =>
             this.getAllUsers();

    deleteUser = (userid) =>{
        this.adminUserService.deleteUser(userid).then(
            () => this.getAllUsers()
        );
    };

    makeUserAdmin = (username) =>
    {
        this.adminUserService.makeUserAdmin(username).then(
            () => this.getAllUsers()
        );
    };








    // pushUserToList = (user) => {
    //     console.log("before set inside push",this.state.userList)
    //     this.setState({
    //                       userList: this.state.userList.push(user)
    //                   })
    //     console.log("inside push")
    //     console.log(this.state.userList)
    // }

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


                 <li onClick={ () =>
                 {
                    this.getGuestUsersForCreditCard();
                    context.state.selectedTabForAdminUser = 'CREDITCARDS'
                 }}
                 >
                     <a className="nav-link" data-toggle="tab"  href="#">Credit Cards Application</a>
                 </li>

                 <li onClick={ () => {
                     context.setSelectedTabForAdminUser('TRANSACTION')
                     console.log("after click",context.state.selectedTabForAdminUser)
                 } }>
                     <a className="nav-link" data-toggle="tab"  href="#">Track Transactions</a>
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
                                                  <td>
                                                      <button type="button"
                                                              className="btn btn-outline-danger"
                                                              onClick={() => {
                                                                  // console.log(user)
                                                                  this.deleteUser(user[0]._id)
                                                              }}>
                                                          Delete
                                                      </button>

                                                      <button type="button"
                                                              className="btn btn-outline-info"
                                                              id="editButton" onClick={() => {
                                                          this.setUpdateuserForm()
                                                          this.setUserToBeEdited(user)
                                                      }}>
                                                          EDIT
                                                      </button>

                                                      {/*<button type="button"*/}
                                                      {/*className="btn btn-success btn-circle btn-xl">*/}
                                                      {/*Make Admin*/}
                                                      {/*</button>*/}

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

                                                  </td>

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
                                                  <td>

                                                  </td>

                                              </tr>
                                      )
                                  }


                                  </tbody>
                              </table>

                             }


                             {context.state.selectedTabForAdminUser === 'CREDITCARDS' &&

                                 <div>

                                     <table className="table table-dark">
                                         <thead>
                                         <tr>
                                             <th scope="col"> Role</th>
                                             <th scope="col"> FirstName</th>
                                             <th scope="col"> LastName</th>
                                             <th scope="col"> Date of Birth</th>
                                             <th scope="col"> Address</th>
                                             <th scope="col"> Email ID</th>
                                             <th scope="col"> Phone Number</th>
                                             <th scope="col"> Status</th>
                                             <th scope="col">Product</th>
                                         </tr>
                                         </thead>
                                         <tbody>
                                             {this.state.guestList.map(
                                                 (guest) =>
                                                     <tr key={guest._id}>
                                                         <th scope="row">Guest</th>
                                                         <td>{guest.firstName}</td>
                                                         <td>{guest.lastName}</td>
                                                         <td>{guest.dob}</td>
                                                         <td>{guest.address}</td>
                                                         <td>{guest.email}</td>
                                                         <td>{guest.phoneNumber}</td>
                                                         <td>{guest.status}</td>
                                                         <td>{guest.product ? guest.product.name: "No Product Exists" }</td>
                                                        </tr>
                                             )
                                         }

                                         </tbody>
                                     </table>


                                 </div>

                             }

                                 </div>


                         <div>

                             {context.state.selectedTabForAdminUser === 'TRANSACTION' &&

                            <div>

                                <table className="table table-dark">
                                    <thead>
                                    <tr>
                                        <th scope="col"> Role</th>
                                        <th scope="col"> FirstName</th>
                                        <th scope="col"> LastName</th>
                                        <th scope="col">username</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        this.state.userList.map(
                                            (user) =>
                                                <tr key={user[0]._id}>
                                                    <th scope="row">User</th>
                                                    <td>{user[0].firstName}</td>
                                                    <td>{user[0].lastName}</td>
                                                    <td>{user[0].username}</td>

                                                    <td>

                                                        <Link to ={`/transForAdmin/${user[0]._id}`}>
                                                        <button type="button"
                                                                className="btn btn-outline-success" id="editButton"
                                                        onClick={() =>
                                                        {
                                                            context.setUserForViewingTrans(user);
                                                            this.setViewTransNeeded()
                                                        }}> View Transactions </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                        )
                                    }

                                    </tbody>
                                </table>

                            </div>


                             }

                         </div>



                         <div>
                         {this.state.addUserFormNeeded === true &&
                             <div>
                               <AddUserByAdmin
                               getAllUsers={this.getAllUsers}
                               userList={this.state.userList}
                               pushUserToList={this.pushUserToList}
                               addForm={this.state.addForm}/>
                             </div>
                         }
                         </div>

                         <div>
                             {this.state.updateUserFormNeeded === true &&
                                 <EditUserByAdmin
                                     getAllUsers={this.getAllUsers}
                                     userList={this.state.userList}
                                     pushUserToList={this.pushUserToList}
                                     userToBeEdited={this.state.userToBeEdited}
                                     editForm={this.state.editForm}

                                 />
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