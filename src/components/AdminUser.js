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
            // isActive:false,
            // userList: [],
            // adminList: [],
            // guestList:[],
            // addUserFormNeeded: false,
            // addUserForm: true,
            // userToBeDeleted:' ',
            // updateUserFormNeeded: false,
            // updateUserForm: true,
            // userToBeEdited:undefined,
            // addForm:true,
            // editForm:true,
            // makeAdmin:true,
            // makeAdminNeeded:false,
            // viewTrans:true,
            // viewTransNeeded:false,
            // guestListStatusFixed:[],
            // guestListStatusPending:[],
            // addBillNeeded:false,
            // addBill:true


        }
    }




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


                                <li className="nav-item">
                                    <Link to ={`/admin/profile`} className="nav-link">PENDING CREDIT CARDS</Link>
                                </li>


                            </ul>






                        </React.Fragment>
                    )}
                </MyContext.Consumer>

            </div>


        )
    }

}
export default AdminUser;