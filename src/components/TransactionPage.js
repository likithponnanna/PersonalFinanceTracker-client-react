import React, {Component} from 'react';
import MyContext from "./MyContext";
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import TransactionTabContent from "./TransactionTabContent";
import TransactionClientServiceClient from '../service/transaction.service.client'
import Register from "./Register";

class TransactionPage  extends Component{

    constructor(props) {
        super(props);
        this.transactionService = new TransactionClientServiceClient();
        this.state ={
            selectedSort: 'ALL',
            updateFlag: false,
            addFlag: false,
            category: undefined,
            payment_type: undefined,
            date_of_transaction: undefined,
            payment_source: undefined,
            amount: undefined,
            updateId: undefined
        }
    }

    componentDidMount() {
            this.transactionService.findAllTransactions()
                .then(transactions => {console.log("Transactions did mount", transactions);
                this.context.setTransactions(transactions)})
    }

    addTransaction = ()=>
        this.transactionService.createTransaction(this.state)
            .then(transaction => {console.log(transaction);
            this.context.pushTransaction(transaction);
            });

    deleteTransaction =(transactionId) =>
        this.transactionService.deleteTransaction(transactionId)
            .then(response => this.context.deleteTransaction(transactionId));

    updateTransaction = () => {
        let updatetransaction = {
            _id: this.state.updateId,
            category: this.state.category,
            amount: this.state.amount,
            date_of_transaction: this.state.date_of_transaction,
            payment_source: this.state.payment_source,
            payment_type: this.state.payment_type

        }

        this.transactionService.updateTransaction(updatetransaction)
            .then(transaction => this.context.updateTransaction(updatetransaction))
    }

    getAllTransactions = () =>
        this.transactionService.findAllTransactions()
            .then(transactions =>
                this.context.setTransactions(transactions))

    getLastWeekTransaction = () =>
        this.transactionService.findAllTransactionWeek()
            .then(transactions => this.context.setTransactions(transactions))

    getLastMonthTransaction = () =>
        this.transactionService.findAllTransactionMonth()
            .then(transactions => this.context.setTransactions(transactions))

    setUpdateId = (updateId)=>
        this.setState({
            updateId: updateId
        })

    toggleUpdate =() =>
        this.setState({
            updateFlag: !this.state.updateFlag
        })

    toggleAdd =() =>
        this.setState({
            addFlag: !this.state.addFlag
        })

    categoryChanged =(event)=>
        this.setState({
            category: event.target.value
        });
    paymentTypeChanged =(event)=>
        this.setState({
            payment_type: event.target.value
        });
    dateChanged =(event)=>
        this.setState({
            date_of_transaction: event.target.value
        });
    paymentSourceChanged =(event)=>
        this.setState({
            payment_source: event.target.value
        });
    amountChanged =(event)=>
        this.setState({
            amount: event.target.value
        });

    setSelectedBtn = (btn) =>{
        this.setState({
            selectedSort: btn
        })
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
                                        <TransactionTabContent
                                            categoryChanged ={this.categoryChanged}
                                            paymentTypeChanged = {this.paymentTypeChanged}
                                            dateChanged ={this.dateChanged}
                                            paymentSourceChanged ={this.paymentSourceChanged}
                                            amountChanged ={this.amountChanged}
                                            toggleUpdate ={this.toggleUpdate}
                                            toggleAdd ={this.toggleAdd}
                                            updateFlag ={this.state.updateFlag}
                                            addFlag = {this.state.addFlag}
                                            addTransaction ={this.addTransaction}
                                            deleteTransaction ={this.deleteTransaction}
                                            updateTransaction ={this.updateTransaction}
                                            setUpdateId ={this.setUpdateId}
                                            updateId = {this.state.updateId}
                                            getLastWeekTransaction = {this.getLastWeekTransaction}
                                            getLastMonthTransaction ={this.getLastMonthTransaction}
                                            getAllTransactions = {this.getAllTransactions}
                                            amount ={this.state.amount}
                                            category = {this.state.category}
                                            payment_type ={this.state.payment_type}
                                            date_of_transaction = {this.state.date_of_transaction}
                                            selectedSort ={this.state.selectedSort}
                                            setSelectedBtn ={this.setSelectedBtn}
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

TransactionPage.contextType = MyContext;
export default TransactionPage