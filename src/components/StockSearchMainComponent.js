import React, {Component} from 'react';
import MyContext from "./MyContext";
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import CreditScoreContent from "./CreditScoreContent";
import StockSearchContent from "./StockSearchContent";
import queryString from 'query-string'

class StockSearchMainComponent  extends Component{

    constructor(props){
        super(props);
        const values = queryString.parse(this.props.location.search);
        this.alpha = require('alphavantage')({ key: 'QZTS8QOG36E6LQEI' });
        this.state = {
            stockSymbol: values.stockSymbol,
            searchStockData: [],
            stateSearchData: []
        }
    }

    componentDidMount() {
        console.log(this.props.location.search);
        const values = queryString.parse(this.props.location.search);
        console.log(values.stockSymbol);
        this.setState({
            stockSymbol: values.stockSymbol
        })

        if(this.state.stockSymbol!==undefined){
            this.searchStock(values.stockSymbol)
        }
    }

    searchStock = (stockSymbol) => {
        this.alpha.data.search(stockSymbol)
            .then(symbols => {
                this.setState({
                    searchStockData: [],
                    stateSearchData: []
                });
                for (let stock in symbols["bestMatches"]) {
                    this.state.stateSearchData.push([{
                        id: new Date().getTime(),
                        stockSymbol: symbols["bestMatches"][stock]["1. symbol"],
                        stockName: symbols["bestMatches"][stock]["2. name"],
                        stockEquity: symbols["bestMatches"][stock]["3. type"]
                    }])
                }
                this.setState({
                    stateSearchData: this.state.stateSearchData
                });

            });
    };

    stockSymbolSearchChange = (event) =>
        this.setState(
            {
                stockSymbolForSearch: event.target.value
            });

    render() {

        return(

            <div>
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <div className="wrapper">
                                <SideBarUser/>
                                <div id="content" className={` ${context.state.sidebarAct  ? 'active' : ''} `}>
                                    <UserNavBar
                                        sidebarCollapse={context.sidebarCollapse}/>
                                    <div className="ml-5">
                                        <UserOptionTabsNav/></div>
                                    <div className="container ">
                                        <br/><br/> <br/>
                                        <StockSearchContent
                                        urlStockSymbol = {this.state.stockSymbol}
                                        stockSymbolForSearch ={this.state.stockSymbolForSearch}
                                        searchStock ={this.searchStock}
                                        stateSearchData ={this.state.stateSearchData}
                                        stockSymbolSearchChange ={this.stockSymbolSearchChange}
                                        />
                                    </div>
                                </div>
                            </div>


                        </React.Fragment>
                    )}
                </MyContext.Consumer>
            </div>
        )
    }


}

export default StockSearchMainComponent