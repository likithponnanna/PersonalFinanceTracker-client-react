import AlphaVantageService from "../service/AlphaVantage";
import TransactionService from "../service/TransactionService";
import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import CustomerOnBoardPage from "./CustomerOnBoardPage";
import Charts from "./Charts";
import MyProvider from "./MyProvider";
import MainPage from "./MainPage";
import AdminUser from "./AdminUser";
import TransactionsForAdmin from "./TransactionsForAdmin";
import ProfileOfOtherUser from "./ProfileOfOtherUser";
import CreditCardHomePage from "./CreditCardHomePage";
import ApplyForProduct from "./ApplyForProduct";
import SavingHomePage from "./SavingHomePage";
import CheckingHomePage from "./CheckingHomePage"
import AddBillForUserByAdmin from './AddBillForUserByAdmin'
import UserListForAdmin from "./UserListForAdmin";
import AdminListForAdmin from './AdminListForAdmin'
import ApprovedCreditCardsForAdmin from './ApprovedCreditCardsForAdmin'
import TrackTransactionsByAdmin from './TrackTransactionsByAdmin'
import PendingCreditCardBYAdmin from './PendingCreditCardByAdmin'
import Profile from './Profile'

class HomePage extends Component{

    constructor() {
        super();
        this.alphaVantageService = new AlphaVantageService();
        this.transactionservice = new TransactionService();
        this.alpha = require('alphavantage')({key: 'QZTS8QOG36E6LQEI'});
        this.state = {
            stockSymbolForSearch: null,

        }
    }


        render(){
        return(
            <div>
                <MyProvider>
                <Router>
                    <div>

                        <Route path='/' exact
                               render={() =>
                                   <CustomerOnBoardPage
                                        />}/>
                        <Route path="/user/:id" exact
                               component={Charts}

                        />
                        <Route path='/charts'
                               render={() => <Charts/>}/>

                        <Route path ='/home' exact
                        render={() =>
                        <MainPage/>}/>

                        <Route path ='/admin' exact
                               render={() =>
                                   <AdminUser/>}/>

                        <Route path ='/transForAdmin/:userid' exact
                               render = {(props) =>
                               <TransactionsForAdmin{...props}/>}/>

                        <Route path ='/profile/:userid' exact
                               render = {(props) =>
                               <ProfileOfOtherUser{...props}/>}/>

                        <Route path = '/home/creditCard' exact
                        render = {() => <CreditCardHomePage/>}/>

                        <Route path = '/home/saving' exact
                               render = {() => <SavingHomePage/>}/>

                        <Route path = '/home/checking' exact
                               render = {() => <CheckingHomePage/>}/>

                        <Route path = '/admin/users' exact
                               render = {() => <UserListForAdmin/>}/>

                        <Route path = '/admin/admins' exact
                               render = {() => <AdminListForAdmin/>}/>


                        <Route path = '/admin/creditCards' exact
                               render = {() => <ApprovedCreditCardsForAdmin/>}/>


                        <Route path = '/admin/transactions' exact
                               render = {() => <TrackTransactionsByAdmin/>}/>

                        <Route path = '/admin/pendingCreditCards' exact
                               render = {() => <PendingCreditCardBYAdmin/>}/>

                        <Route path = '/profile' exact
                               render = {() => <Profile/>}/>

                        <Route path = '/home/apply/:id/:name' exact
                        render = {(props) =>
                            <ApplyForProduct{...props}/>}/>


                        <Route path = '/admin/addBill/:userid/:username' exact
                        render = {(props) =>
                        <AddBillForUserByAdmin{...props}/>}/>




                    </div>
                </Router>
                </MyProvider>


            </div>


        )
        }
    }

    export default HomePage;

