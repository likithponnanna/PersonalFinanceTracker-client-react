import React, {Component} from 'react'
import MyContext from './MyContext'
import '../styling/modals.style.client.css'

class CreditCardModal extends Component{
    constructor(props){
        super(props);
        this.state ={
            accountNo: "",
            bankName: "",
            accountName: "",
            maxLimit: "",
            rewardAmount: "",
            interestRate: "",
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
    maxLimitChanged = (event) =>
        this.setState({
            maxLimit: event.target.value
        });
    rewardAmountChanged = (event) =>
        this.setState({
            rewardAmount: event.target.value
        });

    interestRateChanged = (event) =>
        this.setState({
            interestRate: event.target.value
        });

    addCreditCard = () => {
        this.props.addCreditCard(this.state);


    }
    clearForm = () => {
        document.getElementById("create-credit-form").reset();
    }





    render() {
        return(
            <div className="container web-dev-z-index" >
                <div className="modal fade" id="exampleModalCenter" tabIndex="1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                                        <div className="modal-header bg-secondary web-dev-login-margin-adjust ">
                                            <h5 className="modal-title " id="exampleModalLongTitle">Credit Modal</h5>
                                            <button type="button" className="close web-dev-close-color" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                            <div className="modal-body">
                                <form id="create-credit-form">
                                    <div className="form-group">
                                        <label htmlFor="cardNumFld">Card Number</label>
                                        <input type="number" className="form-control" id="cardNumFld"
                                               aria-describedby="card" placeholder="111-4454-1111-1111" onChange={(event)=> this.accountNoChanged(event)}/>
                                            <small id="emailHelp" className="form-text text-muted">Enter Number on your card</small>
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
                                        <label htmlFor="creditLimitFld">Credit Limit</label>
                                        <input type="number" className="form-control" id="creditLimitFld"
                                               placeholder="1500" onChange={(event)=> this.maxLimitChanged(event)}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="aprFld">APR</label>
                                        <input type="number" className="form-control" id="aprFld"
                                               placeholder="15" onChange={(event)=> this.interestRateChanged(event)}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="rewFld">Reward Rate</label>
                                        <input type="number" className="form-control" id="rewFld"
                                               placeholder="2" onChange={(event)=> this.rewardAmountChanged(event)}/>
                                    </div>

                                </form>
                            </div>

                            <div className="modal-footer row btn-group m-2">
                               <button type="reset" className="btn btn-block btn-outline-info border-0 "  onClick={() =>{ this.addCreditCard(); this.clearForm()} }>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}
CreditCardModal.contextType = MyContext;
export default CreditCardModal