import React, {Component} from 'react';
import MyContext from "./MyContext";
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import BillsContent from "./BillsContent";
import BillsService from '../service/bill.service.client'

class BillsMainComponent  extends Component{

    constructor(props){
        super(props);
        this.billService = new BillsService();
        this.state ={
            paidBills: [],
            unpaidBills: []
        }
    }

    componentDidMount() {
        this.billService.findPendingBills()
            .then(bills => this.setState({
                paidBills: bills
            }) )


    }

    getUnpaidBills = () =>
        this.billService.findPendingBills()
            .then(bills => this.setState({
                paidBills: bills
            }) )

    getPaidBills = () =>
        this.billService.findPaidBills()
            .then(bills => this.setState({
                unpaidBills: bills
            }))

    payBill =(Bill) =>
    {
        let newbill = Bill;
        newbill.bill_pending = true;

        this.billService.payBill(Bill)
            .then(response =>
            this.setState({
                    unPaidBills: this.state.unPaidBills.filter(bill => bill._id !== Bill._id)
                }
                )
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

export default BillsMainComponent