import React, {Component} from 'react'
import MyContext from './MyContext'
import '../styling/modals.style.client.css'
import StockService from "../service/stocks.service.client";
import {Line} from "react-chartjs-2";


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

class StockDetailsModal extends Component{
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

   componentWillReceiveProps(nextProps, nextContext) {


    this.stockService.findAllStocks()
            .then(stocks => {console.log("Stocks I own", stocks);
                for(let st in stocks){
                    if(stocks[st].stock_symbol === this.props.stock_symbol){
                        this.setState({
                            ownedNoOFShare: stocks[st].no_of_shares,
                            data : {
                                labels: this.props.x_axis,
                                datasets: [
                                    {
                                        label: this.props.stock_symbol,
                                        fill: false,
                                        lineTension: 0.1,
                                        backgroundColor: '#fff',
                                        borderColor: '#fff',
                                        borderCapStyle: 'butt',
                                        borderDash: [],
                                        borderDashOffset: 0.0,
                                        borderJoinStyle: 'miter',
                                        pointBorderColor: 'rgba(0, 0, 0, 0.5)',
                                        pointBackgroundColor: '#fff',
                                        pointBorderWidth: 1,
                                        pointHoverRadius: 5,
                                        pointHoverBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        pointHoverBorderColor: 'rgba(0, 0, 0, 0.5)',
                                        pointHoverBorderWidth: 2,
                                        pointRadius: 1,
                                        pointHitRadius: 10,
                                        data: this.props.y_axis,
                                        display: false
                                    }
                                ]
                            }
                        })
                    }
                }
            });



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

                /*        let  new_x_axis = x_axis.map((item,index) => {

                            return(
                                item
                            )

                        });

                        let new_y_axis = y_axis.map(
                            (item)=>{
                                return{
                                    item
                                }
                            }
                        )

                         console.log("NEw x axis", new_x_axis);
                         console.log("NEw y axis", new_y_axis);*/

                /*  let stockToAdd = {
                      stock_name: stock[0].stockName,
                      stock_symbol: StockSymbol,
                      purchase_price: openPrice,
                      category: stock[0].stockEquity,
                      purchase_date: dateN,
                      no_of_shares: 1

                  };*/

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



                /*   this.stockService.createStock(stockToAdd)
                       .then(Stock => {
                           console.log("Stock inside then add", Stock);
                           this.context.pushStockOwned(Stock)
                       })*/


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

            <div className=" web-dev-z-index overflow-auto " >
                <div className="modal fade" id="stockDetailModalCenter" tabIndex="1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content web-dev-margin-lot">
                            <div className="modal-header bg-secondary web-dev-login-margin-adjust ">
                                <h5 className="modal-title " id="exampleModalLongTitle">Stock Performance Details</h5>
                                <button type="button" className="close web-dev-close-color" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="card">
                                   <Line  data={this.state.data} options={options}/>
                            </div>
                            <div className="modal-body">
                                <form id="stock-form">


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
                                <button type="reset" className="btn btn-block btn-outline-info border-0 "  onClick={() =>{ this.finalBuyStock(); this.clearForm()} }>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }


}
StockDetailsModal.contextType = MyContext;
export default StockDetailsModal