import React, {Component} from 'react'
import {Line, Bar, Doughnut, Pie} from 'react-chartjs-2';
import AlphaVantageService from '../service/AlphaVantage';
import TransactionService from '../service/TransactionService';
import '../styling/Charts.css'
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import DoughnutChart from "./DoughnutChart";
import HorizontalBarChart from "./HorizontalBarChart";
import GuageChart from  './GuageChart'

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

class Charts extends Component{

    constructor(){
        super();
        this.alphaVantageService = new AlphaVantageService();
        this.transactionservice = new TransactionService();
        this.alpha = require('alphavantage')({ key: 'QZTS8QOG36E6LQEI' });
        this.state ={
            stockSymbolForSearch: null,
            stateSearchData:[],
            searchStockData: [],
            searchSymbols: [],
            searchNames: [],
            searchEquities: [],
            data : { }

        }
    }


    getDemoStockInfo = () =>
        this.alpha.data.daily_adjusted(this.state.stockSymbolForSearch, `compact`, `json`, 60).then(data => {
            let x_axis = [];
            let y_axis = [];
            for(let i in data["Time Series (Daily)"]){
                let key = i;
                y_axis.push(data["Time Series (Daily)"][key]["1. open"]);
                x_axis.push(key);

            }
            //console.log("X_Axis",x_axis);
           // console.log("Y axis", y_axis);
            //console.log(data["Time Series (Daily)"])

            this.setState({
                data : {
                    labels: x_axis,
                    datasets: [
                        {
                            label: this.state.stockSymbolForSearch,
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
                            data: y_axis,
                            display: false
                        }
                    ]
                }
            })
        });

    searchStock = (stockSymbol) => {

        console.log("Before", this.state.stateSearchData);
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
    }


        stockSymbolSearchChange = (event) =>
            this.setState(
                {
                stockSymbolForSearch: event.target.value
            });


       findAllTransaction = () =>
           this.transactionservice.findAllTransaction()
               .then(transactions => console.log(transactions));

    render() {
        return(
            <div className="container">
                <br/>
                <button onClick={() => this.findAllTransaction()} className="btn-block btn-dark">Get Transaction</button>
                <br/>
                <HorizontalBarChart/>
                <br/>
                <DoughnutChart/>
                <br/>
                <PieChart/>
                <br/>
                <BarChart/>



                <br/>
                <Line  data={this.state.data} options={options}/>
                <br/>

                <div className="input-group mb-3">
                    <input onChange={(event) => this.stockSymbolSearchChange(event)} type="text" className="form-control" placeholder="Type your Search Query here"
                           aria-label="Type your Search Query here" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={() =>{ this.searchStock(this.state.stockSymbolForSearch);this.getDemoStockInfo(); }}>Search Stock</button>
                        </div>
                </div>

                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Symbol</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                    </tr>
                    </thead>
                    <tbody>
                  {
                        this.state.stateSearchData.map(
                            (stock, index) => {
                                return (
                                    <tr key={stock.id}>
                                        <th scope="row">{index+1}</th>
                                        <td>{stock[0].stockSymbol}</td>
                                        <td>{stock[0].stockName}</td>
                                        <td>{stock[0].stockEquity}</td>
                                    </tr>
                                )})
                  }

                    </tbody>
                </table>

            </div>

        )
    }

}

export default Charts