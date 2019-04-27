import React, {Component} from 'react';
import MyContext from "./MyContext";
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import BudgetTabContent from "./BudgetTabContent";
import BudgetService from '../service/budget.service.client'
import TransactionService from "../service/TransactionService";
import AdminUserService from "../service/admin.service.client";
import {withRouter} from "react-router";

class BudgetTabMainContent  extends Component{

    constructor(props) {
        super(props);
        this.budgetService = new BudgetService();
        this.transactionService = new TransactionService();
        this.adminService = new AdminUserService();
        this.state = {
            budget: [],
            budgetFlag: false,
            newBudget: "",
            spendsJson: [],
            labelsJson:[],
            data: [],
            dataNew : {
                labels: ["April", "March","April", "March","April", "March"],
                datasets: [
                    {
                        label: "Spend Trend",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: '#000000',
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
                        data: [1,2,3,4,6],
                        display: false,
                        spendThisMonth: undefined
                    }
                ]
            },
            dataLine: undefined



        }

    }

    componentDidMount() {
        this.adminService.findCurrentLoggedInUser()
            .then(user => {
                if (user === undefined) {
                    this.props.history.push('/login')
                }
            });

        this.budgetService.findBudget()
            .then(budget => {
                this.setState({
                budget: budget!==undefined && budget.length>0? budget[0] : budget
            })});

        let labelsMix = [];

        for (let i = 0; i < 6; i++) {

            labelsMix.push(this.state.budget);

        }



        this.budgetService.findAllTransactionHalfYear()
            .then(budget => {console.log("Budget", budget);
            let labels =[];
            let spends =[];
                    let spendThisMonth = 0;


                    for (let i = 0; i < budget["amount"].length; i++) {


                        spends.push(budget["amount"][i])
                        labels.push(budget["month"][i])
                    }

                        spendThisMonth = budget["amount"][0];
                    console.log("Spend this month" , spendThisMonth);


                    labels = labels.reverse();
                    spends =spends.reverse();


                    let spendsNew = JSON.stringify(budget["amount"]);
                    let labelsNew = JSON.stringify(budget["month"]);

                    this.setState({
                        spendsJson: spendsNew,
                        labelsJson: labelsNew,
                        spendThisMonth: spendThisMonth,
                        data: {
                            labels: labels,
                            datasets: [{
                                label: "Monthly Average Spend",
                                data: spends,
                                backgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                    '#FFCE56',
                                    '#85ff63',
                                    '#20ebd2',
                                    '#8238ff'
                                ],
                                hoverBackgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                    '#FFCE56',
                                    '#85ff63',
                                    '#20ebd2',
                                    '#8238ff'
                                ]
                            }]
                        },
                        dataLine : {
                            labels: labels,
                            datasets: [
                                {
                                    label: "Spend Trend",
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
                                    data: spends,
                                    display: false
                                }
                            ]
                        },
                        dataMix: {
                            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                            datasets: [{
                                label: 'Sales',
                                type:'line',
                                data: [51, 65, 40, 49, 60, 37, 40],
                                fill: false,
                                borderColor: '#EC932F',
                                backgroundColor: '#EC932F',
                                pointBorderColor: '#EC932F',
                                pointBackgroundColor: '#EC932F',
                                pointHoverBackgroundColor: '#EC932F',
                                pointHoverBorderColor: '#EC932F',
                                yAxisID: 'y-axis-2'
                            },{
                                label: 'Other',
                                type:'line',
                                data: [12, 32, 32, 32, 23, 32, 32],
                                fill: true,
                                backgroundColor: "rgba(244, 144, 128, 0.8)",
                                borderColor: '#EC932F',
                                pointBorderColor: '#EC932F',
                                pointBackgroundColor: '#EC932F',
                                pointHoverBackgroundColor: '#EC932F',
                                pointHoverBorderColor: '#EC932F',
                                yAxisID: 'y-axis-2'
                            }]
                        }
                    })

}




          /*      this.setState({
                    dataMix:  {
                        labels:budget["month"],
                        datasets: [{
                            label: 'Sales',
                            type:'line',
                            data: labelsMix,
                            fill: false,
                            borderColor: '#EC932F',
                            backgroundColor: '#EC932F',
                            pointBorderColor: '#EC932F',
                            pointBackgroundColor: '#EC932F',
                            pointHoverBackgroundColor: '#EC932F',
                            pointHoverBorderColor: '#EC932F',
                            yAxisID: 'y-axis-2'
                        },{
                            type: 'bar',
                            label: 'Visitor',
                            data: budget["amount"],
                            fill: false,
                            backgroundColor: '#71B37C',
                            borderColor: '#71B37C',
                            hoverBackgroundColor: '#71B37C',
                            hoverBorderColor: '#71B37C',
                            yAxisID: 'y-axis-1'
                        }]
                    }

            })*/

            )

    }

    createBudget =() =>
    {
        if(this.state.newBudget!=="") {
            let newBudget;
            newBudget ={
                amount: this.state.newBudget
            };

            this.budgetService.createBudget(newBudget)
                .then(budget => this.setState({
                    budget: budget
                }))
        }else {

        }
    };

    updateBudget =() =>
    {
         let newBudget;
        newBudget ={
            _id: this.state.budget._id,
            amount: this.state.newBudget
        };



        this.budgetService.updateBudget(newBudget)
            .then(budget => {
                this.setState({
                    budget: newBudget
                })

            }
            )


    };

    toggleBudgetUpdate =() =>
        this.setState({
            budgetFlag: !this.state.budgetFlag
        });

    categoryChanged =(event)=>
        this.setState({
            newBudget: event.target.value
        });


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
                                    <div className="container">
                                        <br/><br/> <br/>
                                        <BudgetTabContent
                                            budget = {this.state.budget}
                                            createBudget ={this.createBudget}
                                            updateBudget ={this.updateBudget}
                                            toggleBudgetUpdate ={this.toggleBudgetUpdate}
                                            categoryChanged ={this.categoryChanged}
                                            newBudget ={this.state.newBudget}
                                            budgetFlag ={this.state.budgetFlag}
                                            data ={this.state.data}
                                            dataMix ={this.state.dataMix}
                                            dataNew={ this.state.dataNew}
                                            dataLine = {this.state.dataLine}
                                            spendThisMonth ={this.state.spendThisMonth}
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


export default withRouter((props) => (
    <MyContext.Consumer>
        {(context) => <BudgetTabMainContent {...props} context={context}/>}
    </MyContext.Consumer>
))
