import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';


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



const HorizontalBarChart =() =>
    <div>
        <h2>Horizontal Bar Example</h2>
        <HorizontalBar data={data} />
    </div>;


export default HorizontalBarChart