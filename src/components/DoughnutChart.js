import React from 'react';
import {Doughnut} from 'react-chartjs-2';


const data = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const   options = {
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI
}

const DoughnutChart =() =>
    <div>
        <h2>Doughnut Example</h2>
        <Doughnut data={data}
                  options={options}/>
    </div>;


    export default DoughnutChart