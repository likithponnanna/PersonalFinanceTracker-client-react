import React, {Component} from 'react'
import {ListGroup} from "reactstrap";
class  SavingsAccountMainSideBarComponent extends Component {

    render(){
        return(

            <div>
                {

                    this.props.savingsAccounts.map((creditCard,index)  =>
                        <div>
                            <div key={index}>
                                {creditCard._id !== this.props.selectedCreditCard  &&
                                <div className="list-group border border-white m-2" key={index} onMouseEnter={()=>{ this.props.flipCreditCardOpen(); this.props.selectCreditCard(creditCard._id)}}>
                                    <div className="list-group-item list-group-item-action flex-column align-items-start web-dev-credit-card"
                                    >
                                        <div className="d-flex w-100 justify-content-between"  >
                                            <h6 className="mb-1"> Card: {creditCard.accountName}  </h6>
                                            <small>Limit: {creditCard.maxLimit}</small>
                                        </div>
                                        <p className="mb-1">  {creditCard.accountNo}   </p>
                                        <div className="row">
                                            <small className="col-12">Bank: {creditCard.bankName}</small>
                                            <small className="col-12">Reward: {creditCard.rewardAmount}</small>
                                        </div>
                                    </div>
                                </div> }
                                {creditCard._id === this.props.selectedCreditCard &&
                                <div className="list-group border border-info m-2" key={index} onMouseLeave={()=>{ this.props.flipCreditCardClose();this.props.selectCreditCard("");}}>
                                    <div className="list-group-item list-group-item-action flex-column align-items-start"
                                    >
                                        <div className="d-flex w-100 justify-content-between" >
                                            <div className="row">
                                                <button className=" web-dev-active-dark btn btn-block btn-outline-primary web-dev-credit-card m-2" onClick={()=> this.props.deleteCreditCard(creditCard._id)}>  Delete Card </button>
                                                { this.props.toggleUpdate===false && <button className=" web-dev-active-dark btn btn-block btn-outline-primary web-dev-credit-card m-2" onClick={()=>{ this.props.toggleUpdate()}}> Update Card Num </button>}
                                            </div>
                                        </div>
                                        { this.props.toggleUpdate===false &&  <div>
                                            <small className="mb-1 web-dev-credit-card-black overflow-auto"> Card: {creditCard.accountName}   </small>
                                            <h6 className="mb-1 web-dev-credit-card-black">  {creditCard.accountNo}   </h6>
                                        </div>}
                                        { this.props.toggleUpdate===true && creditCard._id ===this.props.selectedCreditCard
                                        &&  <div><input type="number" onChange={(event) => this.props.cardNumChanged(event)} placeholder="Enter CardNumber" className="col-12"/>
                                            <i onClick={()=>{ this.props.updateCreditCardNum(creditCard); this.props.toggleUpdate();}} className="fa fa-check my-float ml-4 align-content-center col-2"/></div>}

                                    </div>}
                                </div>
                                }
                            </div>
                        </div>
                    )

                }
            </div>
        )
    }
}

export default SavingsAccountMainSideBarComponent