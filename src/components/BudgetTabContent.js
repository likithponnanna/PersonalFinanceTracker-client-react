import React, {Component} from 'react'
import MyContext from './MyContext'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../styling/modals.style.client.css'
import PieChart from "./PieChart";
import {Pie} from "react-chartjs-2";
import {HorizontalBar} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';

const options = [{
    title: {
        display: true,
        text: 'Custom Chart Title'
    }
}]

const optionsMix = {
    responsive: true,
    tooltips: {
        mode: 'label'
    },
    elements: {
        line: {
            fill: false
        }
    },
    scales: {
        xAxes: [
            {
                display: true,
                gridLines: {
                    display: false
                },
                labels: {
                    show: true
                }
            }
        ],
        yAxes: [
            {
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
                gridLines: {
                    display: false
                },
                labels: {
                    show: true
                }
            },
            {
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-2',
                gridLines: {
                    display: false
                },
                labels: {
                    show: true
                }
            }
        ]
    }
};

const plugins = [{
    afterDraw: (chartInstance, easing) => {
        const ctx = chartInstance.chart.ctx;
        ctx.fillText("This text drawn by a plugin", 100, 100);
    }
}];


const BudgetTabContent = ({budget, createBudget, updateBudget, newBudget, budgetFlag, categoryChanged, toggleBudgetUpdate, data, dataMix}) =>

    <div className="container">
        <MyContext.Consumer>
            {(context) => (
                <React.Fragment>
        { budget.length===0 && budgetFlag ===false && <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">$</span>
            </div>
            <input type="number" className="form-control"
                   aria-label="Enter monthly budget mount (to the nearest dollar)" onChange={(event)=>categoryChanged(event)}
            />

                <div className="input-group-append">
                    <span className="input-group-text">.00</span>
                </div>
            <button className="btn btn-secondary ml-2" onClick={()=>createBudget()}>Create Budget</button>
        </div>}
        {budget!==null && budget.amount!==undefined && budgetFlag ===false && <div className="input-group row">
            <div className="col-12 web-dev-text-center">Your Monthly budget is</div>
            <div className="input-group-prepend">
                <span className="input-group-text disabled">$</span>
            </div>
            <input type="number" className="form-control input-group-append " disabled="disabled" aria-label="Monthly budget" value={budget.amount}/>
            <button className="btn btn-outline-secondary ml-2" onClick={()=>toggleBudgetUpdate()}>Update Budget</button>
        </div>}


                    {budget!==null && budgetFlag ===true && <div className="input-group row">
                        <div className="col-12 web-dev-text-center">Your Monthly budget is</div>
                        <div className="input-group-prepend">
                            <span className="input-group-text disabled">$</span>
                        </div>
                        <input type="number" className="form-control input-group-append"  aria-label="Monthly budget"
                               onChange={(event)=>categoryChanged(event)}/>
                        <button className="btn btn-success ml-2" onClick={()=>{toggleBudgetUpdate(); updateBudget()}}>Update Now</button>
                    </div>}
                    {budget!==null && data!==undefined && <div className="card mr-4 mt-4">
                    <h4 className="card-title text-center">Monthly Spend Category </h4>
                     <div > <HorizontalBar  data={data}  /></div>
                    </div>}

                  {/*  {budget!==null && dataMix!==undefined && <Bar
                        data={data}
                        options={options}
                        plugins={plugins}
                    />}*/}
                </React.Fragment>
            )}
        </MyContext.Consumer>

    </div>;

export default BudgetTabContent
