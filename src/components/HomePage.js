import AlphaVantageService from "../service/AlphaVantage";
import TransactionService from "../service/TransactionService";
import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import CustomerOnBoardPage from "./CustomerOnBoardPage";
import Charts from "./Charts";
import MyProvider from "./MyProvider";
import UserHome from "./UserHome";
import BarChart from "./BarChart";

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
                        <Route path="/user"exact
                               component={UserHome}
                        />
                        <Route path="/chart" exact
                               component={Charts}/>
                        <Route path="/bar" exact
                               component={BarChart}
                        />



                    </div>
                </Router>
                </MyProvider>


            </div>


        )
        }
    }

    export default HomePage;

