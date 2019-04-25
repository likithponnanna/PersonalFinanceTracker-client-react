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
import ApprovedCreditCardsForAdmin from './ApprovedCreditCardsForAdmin'
import PendingCreditCardByAdmin from "./PendingCreditCardByAdmin";

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
            viewTransNeeded:false,
            guestListStatusFixed:[],
            guestListStatusPending:[],
            addBillNeeded:false,
            addBill:true


        }
    }

    setAddBill = () => {
        this.setState({
                          addBillNeeded:this.state.addBill
                      })
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

    getGuestUsersForCreditCardStatusFixed = () => {
        this.guestProductService.getGuestUsers().then(
            (guests) => {
                console.log("guests",guests);
                this.setState({
                                  guestListStatusFixed:[]
                              });

                for(let i=0; i<guests.length;i++)
                {
                    if(guests[i].status === "APPROVED" || guests[i].status === "REJECTED" )
                    {
                        this.state.guestListStatusFixed.push(guests[i])
                    }
                }

                this.setState({
                                  guestListStatusFixed:this.state.guestListStatusFixed
                              })

                console.log("guestlist",this.state.guestListStatusFixed)

            }
        )
    }

    getGuestUsersForCreditCardStatusPending = () => {
        this.guestProductService.getGuestUsers().then(
            (guests) => {
                console.log("guests",guests);
                this.setState({
                                  guestListStatusPending:[]
                              });

                for(let i=0; i<guests.length;i++)
                {
                    if(guests[i].status === "PENDING" )
                    {
                        this.state.guestListStatusPending.push(guests[i])
                    }
                }

                this.setState({
                                  guestListStatusPending:this.state.guestListStatusPending
                              })

                console.log("guestlist pending",this.state.guestListStatusPending)

            }
        )
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

                                {/*<li onClick = {() =>*/}
                                {/*{*/}
                                    {/*this.getAllUsers();*/}
                                    {/*context.state.selectedTabForAdminUser = 'USERS'*/}
                                {/*}}>*/}
                                    {/*<a className="nav-link" data-toggle="tab"  href="#">*/}
                                        {/*Users*/}
                                    {/*</a>*/}
                                {/*</li>*/}


                                <li className="nav-item">
                                    <Link to ={`/admin/users`} className="nav-link">USERS</Link>
                                </li>



                                {/*<li onClick = {() =>*/}
                                {/*{*/}
                                    {/*this.getAllUsers();*/}
                                    {/*context.state.selectedTabForAdminUser = 'ADMINS'*/}
                                {/*}}>*/}
                                    {/*<a className="nav-link" data-toggle="tab"  href="#">*/}
                                        {/*Admins*/}
                                    {/*</a>*/}
                                {/*</li>*/}

                                <li className="nav-item">
                                    <Link to ={`/admin/admins`} className="nav-link">ADMINS</Link>
                                </li>


                                {/*<li onClick={ () =>*/}
                                {/*{*/}
                                    {/*this.getGuestUsersForCreditCardStatusFixed();*/}
                                    {/*context.setSelectedTabForAdminUser('CREDITCARDS')*/}
                                    {/*console.log(context.state.selectedTabForAdminUser)*/}
                                {/*}}*/}
                                {/*>*/}
                                    {/*<a className="nav-link" data-toggle="tab"  href="#">Credit Cards Applications</a>*/}
                                {/*</li>*/}


                                <li className="nav-item">
                                    <Link to ={`/admin/creditCards`} className="nav-link">CREDIT CARD APPLICATIONS</Link>
                                </li>


                                {/*<li onClick={ () => {*/}
                                    {/*context.setSelectedTabForAdminUser('TRANSACTION')*/}
                                    {/*console.log("after click",context.state.selectedTabForAdminUser)*/}
                                {/*} }>*/}
                                    {/*<a className="nav-link" data-toggle="tab"  href="#">Track Transactions</a>*/}
                                {/*</li>*/}


                                <li className="nav-item">
                                    <Link to ={`/admin/transactions`} className="nav-link">TRACK TRANSACTIONS</Link>
                                </li>


                                {/*<li onClick={() => {*/}
                                    {/*context.setSelectedTabForAdminUser('PENDINGCREDITCARDS')*/}
                                    {/*this.getGuestUsersForCreditCardStatusPending();*/}
                                {/*}}>*/}
                                    {/*<a className="nav-link" data-toggle="tab"  href="#">Pending Credit Cards Applications</a>*/}
                                {/*</li>*/}


                                <li className="nav-item">
                                    <Link to ={`/admin/pendingCreditCards`} className="nav-link">PENDING CREDIT CARDS</Link>
                                </li>


                            </ul>
                            <div>




                                {/*{context.state.selectedTabForAdminUser === 'CREDITCARDS' &&*/}

                                 {/*<div>*/}
                                     {/*<ApprovedCreditCardsForAdmin*/}
                                         {/*guestListStatusFixed={this.state.guestListStatusFixed}/>*/}
                                 {/*</div>*/}
                                {/*}*/}


                                {context.state.selectedTabForAdminUser === 'PENDINGCREDITCARDS' &&

                                 <div>
                                     <PendingCreditCardByAdmin
                                         getGuestUsersForCreditCardStatusPending = {this.getGuestUsersForCreditCardStatusPending}
                                         guestListStatusPending={this.state.guestListStatusPending}/>
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