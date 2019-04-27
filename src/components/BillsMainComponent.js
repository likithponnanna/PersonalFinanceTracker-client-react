import React, {Component} from 'react';
import MyContext from "./MyContext";
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import BillsContent from "./BillsContent";
import BillsService from '../service/bill.service.client'
import AdminUserService from "../service/admin.service.client";
import {withRouter} from "react-router";

class BillsMainComponent  extends Component{

    constructor(props){
        super(props);
        this.billService = new BillsService();
        this.adminService = new AdminUserService();
        this.state ={
            paidBills: [],
            unpaidBills: []
        }
    }

    componentDidMount() {
        this.adminService.findCurrentLoggedInUser()
            .then(user => {
                if (user === undefined) {
                    this.props.history.push('/login')
                }
            });

        this.billService.findPendingBills()
            .then(bills => {this.setState({
                unpaidBills: bills
            })
            console.log("Unpaid", bills);
                console.log("State Unpaid", this.state.unpaidBills)
            })



    }

    getUnpaidBills = () =>
        this.billService.findPendingBills()
            .then(bills => this.setState({
                unpaidBills: bills
            }) )

    getPaidBills = () =>
        this.billService.findPaidBills()
            .then(bills =>{ this.setState({
                paidBills: bills
            })
            console.log("Paid Bills", bills)
            })

    payBill =(Bill) =>
    {
        let newbill ={};
         newbill = Bill;
        newbill["bill_pending"] = false;

        console.log("Inside Pay bill", newbill, "Sent Bill", Bill);

        this.billService.payBill(Bill)
            .then(response =>{

                this.billService.findPendingBills()
                    .then(bills => this.setState({
                        unpaidBills: bills
                    }) )}
            )
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
                                    <div className="ml-5">
                                        <UserOptionTabsNav/></div>
                                    <div className="container">
                                        <br/><br/> <br/>
                                        <BillsContent
                                            paidBills ={this.state.paidBills}
                                            unpaidBills = {this.state.unpaidBills}
                                            payBill ={this.payBill}
                                            getPaidBills = {this.getPaidBills}
                                            getUnpaidBills ={this.getUnpaidBills}

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
        {(context) => <BillsMainComponent {...props} context={context}/>}
    </MyContext.Consumer>
))
