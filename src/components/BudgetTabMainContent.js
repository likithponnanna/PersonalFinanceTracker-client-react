import React, {Component} from 'react';
import MyContext from "./MyContext";
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import BudgetTabContent from "./BudgetTabContent";
import BudgetService from '../service/budget.service.client'
import TransactionService from "../service/TransactionService";

class BudgetTabMainContent  extends Component{

    constructor(props) {
        super(props);
        this.budgetService = new BudgetService();
        this.transactionService = new TransactionService();
        this.state = {
            budget: [],
            budgetFlag: false,
            newBudget: "",
            spendsJson: [],
            labelsJson:[],
            data: undefined


        }

    }

    componentDidMount() {
        this.budgetService.findBudget()
            .then(budget => {
                this.setState({
                budget: budget.length>0? budget[0] : budget
            })});

        let labelsMix = [];
        for (let i = 0; i < 6; i++) {
            labelsMix.push(this.state.budget);

        }



        this.budgetService.findAllTransactionHalfYear()
            .then(budget => {console.log("Budget", budget);
            let labels =[];
            let spends =[];

            for(let i in budget["amount"]){
                console.log("Inside budget for", budget[i], "I", i)

            }

                for (let i = 0; i <budget["amount"].length ; i++) {

                   //console.log("Inside second for", budget["amount"][i]);
                   spends.push(budget["amount"][i])
                    labels.push(budget["month"][i])
                }
               /* var object =   budget["amount"] ,
                    result = Object.keys(object).reduce(function (r, k) {
                        return k.concat(object[k]);
                    }, []);*/

                let spendsNew = JSON.stringify(budget["amount"]);
                let labelsNew  = JSON.stringify(budget["month"]);

              this.setState({
                  spendsJson: spendsNew,
                  labelsJson : labelsNew,
                  data : {
                      labels: budget["month"],
                      datasets: [{
                          label: 'Monthly Trends',
                          data: budget["amount"],
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
                  }
              })




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

            })

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

export default BudgetTabMainContent