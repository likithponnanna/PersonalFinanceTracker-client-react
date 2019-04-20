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






                    </div>
                </Router>
                </MyProvider>


            </div>


        )
        }
    }

    export default HomePage;

