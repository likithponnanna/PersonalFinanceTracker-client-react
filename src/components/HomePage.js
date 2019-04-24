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
                               render={(props) =>{
                                   return( <CustomerOnBoardPage {...props}

                                   />) } }/>

                        <Route path='/admin' exact
                               render={(props) =>{
                                   return( <AdminMainPage {...props}

                                   />) } }/>
                        <Route path='/login' exact
                               render={(props) =>{
                                   return( <CustomerOnBoardLogin {...props}

                                   />) } }/>
                        <Route path="/user/:id" exact
                               component={Charts}
                        />
                        <Route path='/credit-score'
                               render={() => <CreditScoreMainComponent/>}/>
                        <Route path="/user"exact
                               component={UserHome}
                        />
                        <Route path="/transactions" exact
                               component={TransactionPage}/>
                        <Route path="/bills" exact
                               component={BillsMainComponent}
                        />

                        <Route path="/forex-conversion" exact
                               component={ForexConversionMainComponent}
                        />
                        <Route path="/budget" exact
                               component={BudgetTabMainContent}
                        />
                        <Route path="/stock-search" exact
                               component={StockSearchMainComponent}
                        />
                        <Route path="/stock-search/search" exact
                               component={StockSearchMainComponent}/>
                        <Route path="/charts" exact
                               component={Charts}/>

                        <Route path="/login" exact
                               component={UserOnboardModal}/>
                        <ModalRoute path='/modal-test' parentPath='/'>
                            Hello
                        </ModalRoute>
                        <ModalRoute component={UserOnboardModal} path='/login' className='test-modal test-modal-foo'/>








                    </div>
                </Router>
                </MyProvider>


            </div>


        )
        }
    }

    export default HomePage;

