import AlphaVantageService from "../service/AlphaVantage";
import TransactionService from "../service/TransactionService";
import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import CustomerOnBoardPage from "./CustomerOnBoardPage";
import Charts from "./Charts";
import MyProvider from "./MyProvider";
import UserHome from "./UserHome";
import BarChart from "./BarChart";
import {HorizontalBar} from "react-chartjs-2";
import PieChart from "./PieChart";
import TransactionPage from "./TransactionPage";
import CreditScoreMainComponent from "./CreditScoreMainComponent";
import BillsMainComponent from "./BillsMainComponent";
import ForexConversionMainComponent from "./ForexConversionMainComponent";
import BudgetTabMainContent from "./BudgetTabMainContent";
import StockSearchMainComponent from "./StockSearchMainComponent";
import UserOnboardModal from "./UserOnboardModal";
import 'react-router-modal/css/react-router-modal.css';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import CustomerOnBoardLogin from "./CustomerOnBoardLogin";
import AdminMainPage from "./AdminMainPage";
import CheckingAccountAddModal from "./CheckingAccountAddModal";
import StockSearchDetailsMainComponent from "./StockSearchDetailsMainComponent";
import SavingHomePage from "./SavingHomePage";
import CheckingHomePage from "./CheckingHomePage";
import CreditCardHomePage from "./CreditCardHomePage";
import ApplyForProduct from "./ApplyForProduct";
import SavingsAccountApplyMain from "./SavingsAccountApplyMain";
import CheckingAccountApplyMain from "./CheckingAccountApplyMain";
import ApplyProductMainPage from "./ApplyProductMainPage";
import TransactionsForAdmin from "./TransactionsForAdmin";
import TransactionListParent from "./TransactionListParent";
import AdminUsersListMainContent from "./AdminUsersListMainContent";
import { AnimatedSwitch } from 'react-router-transition';
import ProductApplicationsMain from "./ProductApplicationsMain";
import ProductAddPageMain from "./ProductAddPageMain";
import ProfilePage from "./ProfilePage";
import AnotherUserProfileLookupMain from "./AnotherUserProfileLookupMain";
import ProfileLookup from "./ProfileLookup";
import ProfileMainContent from "./ProfileMainContent";
import AdminBillsEditorMain from "./AdminBillsEditorMain";

class HomePage extends Component{

    constructor() {
        super();
        this.alphaVantageService = new AlphaVantageService();
        this.transactionservice = new TransactionService();
        this.alpha = require('alphavantage')({key: 'QZTS8QOG36E6LQEI'});
        this.state = {
            stockSymbolForSearch: null,
            state: undefined

        }
    }


        render(){
        return(
            <div>
                <MyProvider>
                <Router>
                  <div>


                        <Route path='/' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <CustomerOnBoardPage {...props}

                                   />) } }/>

                        <Route path='/admin' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <AdminMainPage {...props}

                                   />) } }/>
                        <Route path='/login' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <CustomerOnBoardLogin {...props}

                                   />) } }/>


                        <Route path='/home/creditCard' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <CreditCardHomePage {...props}

                                   />) } }/>



                        <Route path='/home/saving' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <SavingsAccountApplyMain {...props}

                                   />) } }/>


                        <Route path='/home/checking' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <CheckingAccountApplyMain {...props}

                                   />) } }/>


                        <Route path='/user/:id' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <CheckingAccountAddModal {...props}

                                   />) } }/>

                        <Route path='/credit-score' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <CreditScoreMainComponent {...props}

                                   />) } }/>



                        <Route path='/user' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <UserHome {...props}

                                   />) } }/>


                        <Route path='/transactions' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <TransactionPage {...props}

                                   />) } }/>


                        <Route path='/bills' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <BillsMainComponent {...props}

                                   />) } }/>


                        <Route path='/forex-conversion' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <ForexConversionMainComponent {...props}

                                   />) } }/>


                        <Route path='/budget' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <BudgetTabMainContent {...props}

                                   />) } }/>

                        <Route path='/stock-search' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <StockSearchMainComponent {...props}

                                   />) } }/>



                        <Route path='/search' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <StockSearchMainComponent {...props}

                                   />) } }/>


                        <Route path='/search/details' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <StockSearchDetailsMainComponent {...props}

                                   />) } }/>


                        <Route path='/charts' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <Charts {...props}

                                   />) } }/>



                        <Route path='/login' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <UserOnboardModal {...props}

                                   />) } }/>


                        <Route path='/home/apply/:id/:name' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <ApplyProductMainPage {...props}

                                   />) } }/>

                        <Route path='/transactions-admins/:userid' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <TransactionListParent {...props}

                                   />) } }/>

                        <Route path='/admin/users' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <AdminUsersListMainContent {...props}

                                   />) } }/>

                        <Route path='/admin/applications' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <ProductApplicationsMain {...props}

                                   />) } }/>

                        <Route path='/admin/products' exact
                               render={(props) =>{
                                   document.body.style.backgroundColor="#FFFFFF";
                                   return( <ProductAddPageMain {...props}

                                   />) } }/>

                      <Route path='/admin/bills/:id' exact
                             render={(props) =>{
                                 document.body.style.backgroundColor="#FFFFFF";
                                 return( <AdminBillsEditorMain {...props}

                                 />) } }/>

                      <Route path='/profile' exact
                             render={(props) =>{
                                 document.body.style.backgroundColor="#FFFFFF";
                                 return( <ProfileMainContent {...props}

                                 />) } }/>

                      <Route path='/profile/:id' exact
                             render={(props) =>{
                                 document.body.style.backgroundColor="#FFFFFF";
                                 return( <ProfileLookup {...props}

                                 />) } }/>






                  </div>
                </Router>
                </MyProvider>


            </div>


        )
        }
    }

    export default HomePage;

