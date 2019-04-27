import React, {Component} from 'react'
import MyContext from './MyContext'
import '../styling/modals.style.client.css'

class SavingsAccountAddModal extends Component{
    constructor(props){
        super(props);
        this.state ={
            accountNo: "",
            bankName: "",
            accountName: "",
            balance: "",
            type: 'SAVING',
        }
    }

    accountNoChanged = (event) =>
        this.setState({
            accountNo: event.target.value
        });

    bankNameChanged = (event) =>
        this.setState({
            bankName: event.target.value
        });
    accountNameChanged = (event) =>
        this.setState({
            accountName: event.target.value
        });

    balanceChanged = (event) =>
        this.setState({
            balance: event.target.value
        });



    addSavingsAcc = () => {
        this.props.addSavingsAccount(this.state);


    };
    clearForm = () => {
        document.getElementById("savings-form").reset();
    };





    render() {
        return(
            <div className="container web-dev-z-index" >
                <div className="modal fade" id="savingsModalCenter" tabIndex="1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-dark web-dev-login-margin-adjust ">
                                <h5 className="modal-title " id="exampleModalLongTitle">Savings Account Creation Form</h5>
                                <button type="button" className="close web-dev-close-color" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="savings-form" className="p-2">
                                    <div className="form-group">
                                        <label htmlFor="cardNumFld">Account Number</label>
                                        <input type="number" className="form-control" id="cardNumFld"
                                               aria-describedby="card" placeholder="111-4454-1111-1111" onChange={(event)=> this.accountNoChanged(event)}/>
                                        <small id="emailHelp" className="form-text text-muted">Enter Your Account Number</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="bankNameFld">Bank Name</label>
                                        <input type="text" className="form-control" id="bankNameFld"
                                               placeholder="Capital One" onChange={(event)=> this.bankNameChanged(event)}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="accNameFld">Account Name</label>
                                        <input type="text" className="form-control" id="accNameFld"
                                               placeholder="Premium Rewards" onChange={(event)=> this.accountNameChanged(event)}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="rewFld">Balance</label>
                                        <input type="number" className="form-control" id="rewFld"
                                               placeholder="2" onChange={(event)=> this.balanceChanged(event)}/>
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer row btn-group m-2">
                                <button type="reset" className="btn btn-block btn-dark border-0 "  onClick={() =>{ this.addSavingsAcc(); this.clearForm()} }>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}
SavingsAccountAddModal.contextType = MyContext;
export default SavingsAccountAddModal