import React, {Component} from 'react';
import MyContext from "./MyContext";
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import queryString from 'query-string'
import StockService from '../service/stocks.service.client'
import {Line} from "react-chartjs-2";
import {Link} from "react-router-dom";

const options = {
    scales: {
        xAxes: [{
            gridLines: {
                drawOnChartArea: false
            },
            ticks: {
                beginAtZero:true,
                fontColor: 'black'
            }
        }],
        yAxes: [{
            gridLines: {
                drawOnChartArea: false
            },
            ticks: {
                beginAtZero:true,
                fontColor: 'black'
            }
        }]
    },
    legend: {
        labels: {
            fontColor: 'black'
        }
    }
};

class StockSearchDetailsMainComponent  extends Component{

    constructor(props){
        super(props);
        this.stockService = new StockService();
        const values = queryString.parse(this.props.location.search);
        this.alpha = require('alphavantage')({ key: 'QZTS8QOG36E6LQEI' });
        this.state = {
            stockSymbol: ""+values.stockSymbol+"",
           stockName: ""+values.stockSymbol+"",
            stockType: ""+values.stockType+"",
            data: undefined,
                noOfShares: 0,
            ownedNoOFSharen: 0,
            values: values,
            selectedStockId: undefined

        }
    }

    componentDidMount() {
        console.log(this.props.location.search);
        const values = queryString.parse(this.props.location.search);
        console.log("Values", values);

        this.showStock();

        this.stockService.findAllStocks()
            .then(stocks=>{ console.log("Stocks in details", stocks);
            let ownedNoOFSharen;
            let compName;
            let stockId;
            for(let i in stocks){
               let  key = i;
                if(stocks[key].stock_symbol === this.state.stockSymbol){

                    ownedNoOFSharen = stocks[key].no_of_shares;
                    compName = stocks[key].stock_name;
                    stockId  = stocks[key]._id;
                }
            }


           //let t =  stocks.map((stock) =>  stock.stock_symbol === this.state.stockSymbol)

           // console.log("ownedNoOFSharen",ownedNoOFSharen,"compName", compName , "T", t );


            this.setState({
                ownedNoOFShare: ownedNoOFSharen===undefined ? 0 : ownedNoOFSharen,
                stock_name: compName===undefined ? values.stockName.replace(/%20/g, " ") : compName,
                selectedStockId: stockId
            })
            })



    }

    noOfSharesChanged = (event) =>
        this.setState({
            noOfShares: event.target.value
        });



    showStock =() => {
        if (this.state.stockSymbol !== undefined ) {

            this.alpha.data.daily_adjusted(this.state.stockSymbol, `compact`, `json`, 60)
                .then(data => {
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

                    y_axis.push(data["Time Series (Daily)"][key]["1. open"]);
                    x_axis.push(key);
                }


                this.setState({
                        x_axis:x_axis,
                        y_axis: y_axis,
                        stock_symbol: this.state.stockSymbol,
                        purchase_price: openPrice,
                        category: this.state.stockType,
                        purchase_date: dateN,
                        no_of_shares: 1,
                         data : {
                                  labels: x_axis,
                                      datasets: [
                                 {
                                label: this.state.stockSymbol,
                                fill: true,
                                lineTension: 0.1,
                                backgroundColor: 'rgb(52,74,192, 1)',
                                borderColor: '#000000',
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: 'rgba(96,96,96,0.5)',
                                pointBackgroundColor: '#ffffff',
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                                pointHoverBorderColor: 'rgba(0, 0, 0, 0.5)',
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: y_axis,
                                display: false
                            }
                        ]
                    }
                    }

                );


            })

        }
    };


    buyByUpadatingStock = ()=>{

        if(this.state.ownedNoOFShare === 0)
        {
            let newStock = {
                stock_name: this.state.stockName,
                stock_symbol: this.state.stockSymbol,
                purchase_price: this.state.purchase_price,
                category: this.state.stockType,
                purchase_date: this.state.purchase_date,
                no_of_shares: this.state.ownedNoOFShare + this.state.noOfShares
            }
            this.stockService.createStock(newStock)
                .then(stock =>{

                this.context.pushStockOwned(stock);
                    this.setState({
                        ownedNoOFShare: this.state.ownedNoOFShare + this.state.noOfShares,
                        noOfShares : 0
                    })
                })

        }
        else if(this.state.ownedNoOFShare > 0){

            console.log("Here",this.state.ownedNoOFShare + this.state.noOfShares );
            let check


            let newStock = {
                _id: this.state.selectedStockId,
                stock_name: this.state.stockName,
                stock_symbol: this.state.stockSymbol,
                purchase_price: this.state.purchase_price,
                category: this.state.stockType,
                purchase_date: this.state.purchase_date,
                no_of_shares: this.state.ownedNoOFShare + this.state.noOfShares
            }

                this.stockService.updateStock(newStock)
                    .then(res=> this.stockService.findAllStocks()
                        .then(stocks=>{
                        this.context.setStocksOwned(stocks);
                        this.setState({
                            ownedNoOFShare: this.state.ownedNoOFShare + this.state.noOfShares,
                            noOfShares : 0
                        })
                        }))

        }else {
            alert(this.state.ownedNoOFShare+this.state.noOfShares)
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
                                    <div className="ml-5  row">
                                        <div className="col-12">
                                        <UserOptionTabsNav/>
                                        </div></div>
                                    <div className="container">
                                        <br/><br/> <br/>
                                        <div className="card">
                                            <div className="card mb-3">
                                                {this.state.data!==undefined && <div className="card-img-top">
                                                    <Line  data={this.state.data} options={options}/></div>}
                                                    <div className="card-body">

                                                        <form id="stock-form">

                                                            <div className="form-group">
                                                                <label htmlFor="bankNameFld">Stock Symbol</label>
                                                                <input type="text" className="form-control" id="bankNameFld"
                                                                       placeholder="Apple"  disabled="disabled" value={this.state.stock_symbol}/>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="accNameFld">Stock Type</label>
                                                                <input type="text" className="form-control" id="accNameFld"
                                                                       placeholder="Equity"  disabled="disabled" value={this.state.category}/>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="creditLimitFld">Number of Stocks You Own</label>
                                                                <input type="number"   disabled="disabled"  className="form-control" id="creditLimitFld"
                                                                       placeholder="0" value={this.state.ownedNoOFShare} />
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="aprFld">Current Price</label>
                                                                <input type="number" className="form-control" id="aprFld"
                                                                       placeholder="$250" disabled="disabled" value={this.state.purchase_price}/>
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="creditLimitFld">Number of Stocks To Buy</label>
                                                                <input type="number"     className="form-control" id="creditLimitFld"
                                                                       placeholder="0"  onChange={(event)=>this.noOfSharesChanged(event)}/>
                                                            </div>
                                                            <div className="form-group">

                                                                <Link to={`/search/details?stockSymbol=${this.state.stock_symbol}&stockName=${this.state.stock_name}&stockType=${this.state.category}`}>
                                                                    <button type="number"     className="form-control btn btn-info"
                                                                            placeholder="0"  onClick={()=>this.buyByUpadatingStock()}>Buy Stock </button> </Link>
                                                            </div>


                                                        </form>
                                                    </div>
                                            </div>

                                        </div>
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

/*export default (props) => (
    <MyContext.Consumer>
        {(context) => <StockSearchDetailsMainComponent {...props} context={context}/>}
    </MyContext.Consumer>
)*/

StockSearchDetailsMainComponent.contextType = MyContext;
export default StockSearchDetailsMainComponent