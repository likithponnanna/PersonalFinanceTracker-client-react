import React, {Component} from 'react'
import MyContext from './MyContext'
import '../styling/modals.style.client.css'
import StockService from "../service/stocks.service.client";
import {Line} from "react-chartjs-2";
import {Link} from "react-router-dom";


const options = {
    scales: {
        xAxes: [{
            gridLines: {
                drawOnChartArea: false
            }
        }],
        yAxes: [{
            gridLines: {
                drawOnChartArea: false
            }
        }]
    }
};

class StockDetailsContent extends Component{
    constructor(props){
        super(props);
        this.alpha = require('alphavantage')({ key: 'QZTS8QOG36E6LQEI' });
        this.stockService = new StockService();
        this.state ={
            accountNo: "",
            data: [],
            noOfShares: 0,
            ownedNoOFShare:0
        }
    }


    buyStockNew =(StockSymbol, stock) => {
        let newStock = ""+StockSymbol+"";
        if (StockSymbol !== [] || StockSymbol !== undefined) {

            this.alpha.data.daily_adjusted(newStock, `compact`, `json`, 60).then(data => {

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

                console.log("X axis before", x_axis);
                console.log("Y axis before", y_axis);



                this.setState({
                        x_axis:x_axis,
                        y_axis: y_axis,
                        stock_name: stock[0].stockName,
                        stock_symbol: StockSymbol,
                        purchase_price: openPrice,
                        category: stock[0].stockEquity,
                        purchase_date: dateN,
                        no_of_shares: 1
                    }

                );

                console.log("Data", data);
                console.log("Date",dateN );
                console.log("openPrice", openPrice);
                console.log("State Stock", this.state);



            })

        }
    }


    finalBuyStock = () =>{
        if(this.state.noOfShares!==0 && this.state.noOfShares!==undefined) {
            let newCount;
            newCount = this.props.no_of_shares + this.state.noOfShares;
            let stock = {
                stock_symbol: this.props.stock_symbol,
                stock_name: this.props.stock_name,
                category: this.props.category,
                purchase_date: this.props.purchase_date,
                purchase_price: this.props.purchase_price,
                no_of_shares: newCount
            }

            this.stockService.createStock(stock)
                .then(Stock => {
                    console.log("Stock inside then Modal add", Stock);
                    this.context.pushStockOwned(Stock)
                })
        }else {
            alert("Number of Shares to buy should not be zero")
        }


    };

    noOfSharesChanged = (event) =>
        this.setState({
            noOfShares: event.target.value
        });




    clearForm = () => {
        document.getElementById("stock-form").reset();
    }





    render() {
        return(

            <div className="overflow-auto " >
                <div className="modal fade" id="stockDetailModalCenter" tabIndex="1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content web-dev-margin-lot">
                            <div className="modal-header bg-secondary  ">
                                <h5 className="modal-title " id="exampleModalLongTitle">Stock Performance Details</h5>
                                <button type="button" className="close web-dev-close-color" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="card">
                                <Line  data={this.props.data} options={options}/>
                            </div>
                            <div className="modal-body">
                                <form id="stock-form">
                                    <div className="form-group">
                                        <label htmlFor="cardNumFld">Stock Name</label>
                                        <input type="number" className="form-control" id="cardNumFld"
                                               aria-describedby="card" placeholder="AAPL"  disabled="disabled" value={this.props.stock_name}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="bankNameFld">Stock Symbol</label>
                                        <input type="text" className="form-control" id="bankNameFld"
                                               placeholder="Apple"  disabled="disabled" value={this.props.stock_symbol}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="accNameFld">Stock Type</label>
                                        <input type="text" className="form-control" id="accNameFld"
                                               placeholder="Equity"  disabled="disabled" value={this.props.category}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="creditLimitFld">Number of Stocks You Own</label>
                                        <input type="number"   disabled="disabled"  className="form-control" id="creditLimitFld"
                                               placeholder="0" value={this.state.ownedNoOFShare} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="aprFld">Current Price</label>
                                        <input type="number" className="form-control" id="aprFld"
                                               placeholder="$250" disabled="disabled" value={this.props.purchase_price}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="creditLimitFld">Number of Stocks To Buy</label>
                                        <input type="number"     className="form-control" id="creditLimitFld"
                                               placeholder="0"  onChange={(event)=>this.noOfSharesChanged(event)}/>
                                    </div>

                                </form>
                            </div>

                            <div className="modal-footer row btn-group m-2">
                                <Link to={`/search/details?stockSymbol=${this.state.stock_symbol}&stockName=${this.state.stock_name}&stockType=${this.state.category}`}>     <button type="reset" className="btn btn-block btn-outline-info border-0 "
                                                                                                                                                                                     onClick={() =>{ this.finalBuyStock(); this.clearForm()} }>Add</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }


}
StockDetailsContent.contextType = MyContext;
export default StockDetailsContent