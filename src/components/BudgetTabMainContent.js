import React, {Component} from 'react';
import MyContext from "./MyContext";
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import BudgetTabContent from "./BudgetTabContent";
import BudgetService from '../service/budget.service.client'

class BudgetTabMainContent  extends Component{

    constructor(props) {
        super(props);
        this.budgetService = new BudgetService();
        this.state = {
            budget: [],
            budgetFlag: false,
            newBudget: "",

        }

    }

    componentDidMount() {
        this.budgetService.findBudget()
            .then(budget => {
                this.setState({
                budget: budget.length>0? budget[0] : budget
            })})

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