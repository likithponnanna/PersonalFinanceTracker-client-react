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
import StockDetailsModal from "./StockDetailsModal";

class StockSearchMainComponent  extends Component{

    constructor(props){
        super(props);
        this.stockService = new StockService();
        const values = queryString.parse(this.props.location.search);
        this.alpha = require('alphavantage')({ key: 'QZTS8QOG36E6LQEI' });
        this.state = {
            stockSymbol: values.stockSymbol,
            showStockDetailModal: false,
            searchStockData: [],
            stateSearchData: [],
            x_axis: [],
            y_axis: [],
            stock_symbol: '',
            purchase_price: 0,
            stock_name: '',
            category: '',
            purchase_date: null


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

    handleStockDetailModalOpen = () =>
        this.setState({ showStockDetailModal: true });

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


    buyStock =(StockSymbol, stock, stockName) => {
       /* console.log("Stock Buy", StockSymbol);*/
        let newStock = ""+StockSymbol+"";
        if (StockSymbol !== [] || StockSymbol !== undefined) {



            this.alpha.data.daily_adjusted(newStock, `compact`, `json`, 60).then(data => {
                //console.log("Orginal data", data["Meta Data"]["2. Symbol"]);
               // console.log("Orginal data", data);
                let openPrice;
                let dateN;
                for(let i in data["Time Series (Daily)"]){
                    let key = i;
                    dateN =i;
                    openPrice = data["Time Series (Daily)"][key]["1. open"];
                    if(openPrice!==undefined && openPrice==1){
                        break;
                    }
                }
                let x_axis = [];
                let y_axis = [];
                for(let i in data["Time Series (Daily)"]){
                    let key = i;
                   /* y_axis[key].push(data["Time Series (Daily)"][key]["1. open"]);
                    x_axis[key].push(key);*/

                    y_axis.push(data["Time Series (Daily)"][key]["1. open"]);
                    x_axis.push(key);
                }
                x_axis = x_axis.reverse();
                y_axis = y_axis.reverse();

                console.log("X axis before", x_axis);
                console.log("Y axis before", y_axis);


                this.setState({
                    x_axis:x_axis,
                    y_axis: y_axis,
                    stock_name: stockName,
                    stock_symbol: StockSymbol,
                    purchase_price: openPrice,
                    category: stock[0].stockEquity,
                    purchase_date: dateN,
                    no_of_shares: 1
                }

            );




            })

        }
    }

    render() {

        return(

            <div>
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>


                            <div className="wrapper">
                                {this.state.x_axis!==undefined &&  <StockDetailsModal
                                    stock_symbol={this.state.stock_symbol}
                                    x_axis ={this.state.x_axis}
                                    y_axis={this.state.y_axis}
                                    purchase_price ={this.state.purchase_price}
                                    stock_name ={this.state.stock_name}
                                    category ={this.state.category}
                                    purchase_date ={this.state.purchase_date}
                                    no_of_shares ={this.state.no_of_shares}
                                    data = {this.state.data}
                                /> }
                                <SideBarUser/>
                                <div id="content" className={` ${context.state.sidebarAct  ? 'active' : ''} `}>
                                    <UserNavBar
                                        sidebarCollapse={context.sidebarCollapse}/>
                                    <div className="ml-5">
                                        <UserOptionTabsNav/></div>
                                    <div className="container ">
                                        <br/><br/> <br/>
                                        <StockSearchContent
                                            handleStockDetailModalOpen ={this.handleStockDetailModalOpen}
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