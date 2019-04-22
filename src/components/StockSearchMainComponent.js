import React, {Component} from 'react';
import MyContext from "./MyContext";
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import CreditScoreContent from "./CreditScoreContent";
import StockSearchContent from "./StockSearchContent";
import queryString from 'query-string'
import AlphaVantageService from '../service/AlphaVantage';
import StockService from '../service/stocks.service.client'

class StockSearchMainComponent  extends Component{

    constructor(props){
        super(props);
        this.stockService = new StockService();
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


    buyStock =(StockSymbol, stock) => {
        console.log("Stock Buy", StockSymbol);
        let newStock = ""+StockSymbol+"";
        if (StockSymbol !== [] || StockSymbol !== undefined) {

            this.alpha.data.daily_adjusted(newStock, `compact`, `json`, 60).then(data => {

                let openPrice;
                let dateN;
                for(let i in data["Time Series (Daily)"]){
                    let key = i;
                    dateN =i;
                    openPrice = data["Time Series (Daily)"][key]["1. open"];
                    if(openPrice!==undefined && openPrice>0){
                        break;
                    }
                }

                let stockToAdd = {
                    stock_name: stock[0].stockName,
                    stock_symbol: StockSymbol,
                    purchase_price: openPrice,
                    category: stock[0].stockEquity,
                    purchase_date: dateN,
                    no_of_shares: 1

                };

                console.log("Data", data);
                console.log("Date",dateN );
                console.log("openPrice", openPrice);



                this.stockService.createStock(stockToAdd)
                    .then(Stock => {
                        console.log("Stock inside then add", Stock);
                        this.context.pushStockOwned(Stock)
                    })





            })

            /*            this.alpha.data.daily_adjusted(this.state.stockSymbolForSearch, `compact`, `json`, 60)
                            .then(stock => console.log("Stock Buy after", stock))
                            .catch(reason => console.log(reason))*/

            /*
                        this.stockService.createStock(Stock)
                            .then(Stock => {
                                this.context.pushStockOwned(Stock)
                            })*/

        }
    }

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
                                        buyStock ={this.buyStock}
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
StockSearchMainComponent.contextType = MyContext;
export default StockSearchMainComponent