import React, {Component} from 'react'
import {Button, Collapse, ListGroup, ListGroupItem} from "reactstrap";
import MyContext from "./MyContext";
import CreditCardService from '../service/credit-card.service.client'
import Login from "./Login";
import CreditCardModal from "./CreditCardModal";
import '../styling/modals.style.client.css'


class SideBarUser extends Component {

    constructor(props){
        super(props);
        this.creditCardService = new CreditCardService();
        this.handleCreditModalClose = this.handleCreditModalClose.bind(this);
        this.handleCreditModalShow = this.handleCreditModalShow.bind(this);
        this.handleCheckingModalClose = this.handleCheckingModalClose.bind(this);
        this.handleCheckingModalShow = this.handleCheckingModalShow.bind(this);
        this.handleSavingsModalClose = this.handleSavingsModalClose.bind(this);
        this.handleSavingsModalShow = this.handleSavingsModalShow.bind(this);
        this.handlePropertiesModalClose = this.handlePropertiesModalClose.bind(this);
        this.handlePropertiesModalShow = this.handlePropertiesModalShow.bind(this);
        this.handleStockModalClose = this.handleStockModalClose.bind(this);
        this.handleStockModalShow = this.handleStockModalShow.bind(this);
        this.state = {
            creditCard: {

            },
            showCreditModal: false,
            showCheckingModal: false,
            showSavingsModal: false,
            showPropertiesModal: false,
            showStockModal:false,

            CardFlipped: false,
            selectedCreditCard: undefined,

            toggleUpdate: false,
            cardNumChanged: ""


        }

    }

    selectCreditCard = (credId) =>
        this.setState({
            selectedCreditCard: credId
        })

    flipCreditCardClose =() =>
        this.setState(
            {
                CardFlipped: false
            }
        );

    flipCreditCardOpen =() =>
        this.setState(
            {
                CardFlipped: true
            }
        );



    handleCreditModalClose = () =>
        this.setState({ showCreditModal: false });


    handleCreditModalShow= () =>
        this.setState({ showCreditModal: true });


    handleCheckingModalClose = () =>
        this.setState({ showCheckingModal: false });


    handleCheckingModalShow= () =>
        this.setState({ showCheckingModal: true });


    handleSavingsModalClose = () =>
        this.setState({ showSavingsModal: false });


    handleSavingsModalShow= () =>
        this.setState({ showSavingsModal: true });


    handlePropertiesModalClose = () =>
        this.setState({ showPropertiesModal: false });


    handlePropertiesModalShow= () =>
        this.setState({ showPropertiesModal: true });


    handleStockModalClose = () =>
        this.setState({ showStockModal: false });


    handleStockModalShow= () =>
        this.setState({ showStockModal: true });



    componentDidMount() {
        this.creditCardService.findAllCreditCards()
            .then(credits => {console.log(credits);
             this.context.setCreditCards(credits)})
    }

    addCreditCard = (creditCard) => {
        if (creditCard !== [] || creditCard!==undefined) {
            this.creditCardService.createCreditCard(creditCard)
                .then(creditCard => {
                    this.context.pushCreditCard(creditCard)
                })
                .catch(reason => {console.log(reason)})
        }
    };

    deleteCreditCard = (creditCardId) =>
        this.creditCardService.deleteCreditCard(creditCardId)
            .then(response => {
                this.context.deleteCreditCard(creditCardId);
            })
            .catch(reason => {console.log(reason)});

    toggleUpdate = () =>
        this.setState({
            toggleUpdate: !this.state.toggleUpdate
        });

    cardNumChanged = (event) =>
        this.setState({
            cardNumChanged: event.target.value
        });

    updateCreditCardNum = (creditCard) =>
    {
        if (this.state.cardNumChanged !== "" || this.state.cardNumChanged !== undefined) {
            creditCard.accountNo = this.state.cardNumChanged;
            this.creditCardService.updateCreditCard(creditCard)
                .then(
                        this.context.updateCreditCard(creditCard)
                ).catch(reason => {console.log(reason)})


        }else {
            alert("Invalid Card Number");
        }
    };



    render(){
        return(

            <div>

                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <CreditCardModal
                                addCreditCard ={this.addCreditCard}/>
                <nav id="sidebar" className={`web-dev-overflowScroll ${context.state.sidebarAct ? 'active' : ''} `} >
                    <div className="sidebar-header">
                        <h3>Finance Tracker</h3>
                    </div>

                    <div>
                        <Button className="btn-block mb-0" onClick={context.toggleCreditCard} style={{marginBottom: '1rem'}}>Credit Cards</Button>
                        <Collapse  isOpen={context.state.creditItemsCollapse}>
                            <div className="bg-light">
                                <ListGroup>
                                    <button type="button" className="btn  btn-outline-secondary m-2" data-toggle="modal"
                                            data-target="#exampleModalCenter" onClick={this.handleCreditModalShow}>
                                        Add Credit Card
                                    </button>
                                    <div>
                                    {

                                        context.state.creditCards.map((creditCard,index)  =>
                                            <div key={index}>
                                                {creditCard._id !== this.state.selectedCreditCard  &&
                                                <div className="list-group border border-white m-2" key={index} onMouseEnter={()=>{ this.flipCreditCardOpen(); this.selectCreditCard(creditCard._id)}}>
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
                                                {creditCard._id === this.state.selectedCreditCard &&
                                                <div className="list-group border border-info m-2" key={index} onMouseLeave={()=>{ this.flipCreditCardClose();this.selectCreditCard("");}}>
                                                    <div className="list-group-item list-group-item-action flex-column align-items-start"
                                                    >
                                                    <div className="d-flex w-100 justify-content-between" >
                                                            <div className="row">
                                                            <button className=" web-dev-active-dark btn btn-block btn-outline-primary web-dev-credit-card m-2" onClick={()=> this.deleteCreditCard(creditCard._id)}>  Delete Card </button>
                                                            { this.state.toggleUpdate===false && <button className=" web-dev-active-dark btn btn-block btn-outline-primary web-dev-credit-card m-2" onClick={()=>{ this.toggleUpdate()}}> Update Card Num </button>}
                                                            </div>
                                                        </div>
                                                        { this.state.toggleUpdate===false &&  <div>
                                                        <small className="mb-1 web-dev-credit-card-black overflow-auto"> Card: {creditCard.accountName}   </small>
                                                        <h6 className="mb-1 web-dev-credit-card-black">  {creditCard.accountNo}   </h6>
                                                        </div>}
                                                        { this.state.toggleUpdate===true && creditCard._id ===this.state.selectedCreditCard
                                                        &&  <div><input type="number" onChange={(event) => this.cardNumChanged(event)} placeholder="Enter CardNumber" className="col-12"/>
                                                            <i onClick={()=>{ this.updateCreditCardNum(creditCard); this.toggleUpdate();}} className="fa fa-check my-float ml-4 align-content-center col-2"/></div>}

                                                    </div>}
                                                    </div>
                                                }
                                            </div>
                                        )
                                        
                                    }
                                    </div>
                                </ListGroup>
                            </div>
                        </Collapse>
                        <Button className="btn-block mb-0" onClick={context.toggleSavings} style={{marginBottom: '1rem'}}>Savings Account</Button>
                        <Collapse  isOpen={context.state.savingsCollapse}>
                            <div className="bg-light">
                                <ListGroup>
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Cras justo odio </ListGroupItem>
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Dapibus ac facilisis in </ListGroupItem>
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Morbi leo risus </ListGroupItem>
                                </ListGroup>
                            </div>
                        </Collapse>
                        <Button className="btn-block mb-0" onClick={context.toggleChecking} style={{marginBottom: '1rem'}}>Checking Accounts</Button>
                        <Collapse  isOpen={context.state.checkingCollapse}>
                            <div className="bg-light">
                                <ListGroup>
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Cras justo odio </ListGroupItem>
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Dapibus ac facilisis in </ListGroupItem>
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Morbi leo risus </ListGroupItem>
                                </ListGroup>
                            </div>
                        </Collapse>
                        <Button className="btn-block mb-0" onClick={context.toggleStocks} style={{marginBottom: '1rem'}}>Stock Investment</Button>
                        <Collapse  isOpen={context.state.stockCollapse}>
                            <div className="bg-light">
                                <ListGroup>
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Cras justo odio </ListGroupItem>
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Dapibus ac facilisis in </ListGroupItem>
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Morbi leo risus </ListGroupItem>
                                </ListGroup>
                            </div>
                        </Collapse>
                        <Button className="btn-block mb-0" onClick={context.toggleProperty} style={{marginBottom: '1rem'}}>Properties</Button>
                        <Collapse  isOpen={context.state.propertyCollapse}>
                            <div className="bg-light">
                                <ListGroup>
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Cras justo odio </ListGroupItem>
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Dapibus ac facilisis in </ListGroupItem>
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Morbi leo risus </ListGroupItem>
                                </ListGroup>
                            </div>
                        </Collapse>
                    </div>


                </nav>

                        </React.Fragment>
                    )}
                </MyContext.Consumer>


            </div>

        )
    }

}

SideBarUser.contextType = MyContext;
export default SideBarUser