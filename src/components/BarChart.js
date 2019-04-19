import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2';
import AlphaVantageService from '../service/AlphaVantage';
import TransactionService from '../service/TransactionService';
import '../styling/Charts.css'

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Budget Chart',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};





class BarChart extends Component{

    constructor() {
        super();
        this.alphaVantageService = new AlphaVantageService();
        this.transactionservice = new TransactionService();
        this.alpha = require('alphavantage')({key: 'QZTS8QOG36E6LQEI'});
        this.state = {
            data: {}

        }
    }


        render() {
            return(
                <div>
                    <Bar
                        data={data}

                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>

            )
        }

}

export default BarChart
