import React, {Component} from 'react'
import {Button, Collapse, ListGroup, ListGroupItem} from "reactstrap";
import MyContext from "./MyContext";
import CreditCardService from '../service/credit-card.service.client'
import Login from "./Login";

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
            showStockModal:false


        }

    }

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

    addCreditCard = () => {
        this.setState({
            creditCard: {
                accountNo: 123,
                bankName: "BOFA",
                accountName: "Premier",
                balance: 12345,
                user: this.context.state.user,
                maxLimit: 2000,
                rewardAmount: 1,
                billingCyle: 10-11-2019,
                dueDate: 10-11-2019,
                amountDueOnDueDate: 5,
                interestRate: 11,
            }
        });

        let crde = {
            accountNo: 123,
            bankName: "BOFA",
            accountName: "Premier",
            balance: 12345,
            user: this.context.state.user,
            maxLimit: 2000,
            rewardAmount: 1,
            billingCyle: 10-11-2019,
            dueDate: 10-11-2019,
            amountDueOnDueDate: 5,
            interestRate: 11,
        }
        if (this.state.creditCard !== []) {
            this.creditCardService.createCreditCard(crde)
                .then(creditcard => {
                    this.context.pushCreditCard(creditcard)
                })
                .catch(reason => {console.log(reason)})
        }
    };


    render(){
        return(

            <div>
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>

                <nav id="sidebar" className={`web-dev-overflowScroll ${context.state.sidebarAct ? 'active' : ''} `} >
                    <div className="sidebar-header">
                        <h3>Finance Tracker</h3>
                    </div>

                    <div>
                        <Button className="btn-block mb-0" onClick={context.toggleCreditCard} style={{marginBottom: '1rem'}}>Credit Cards</Button>
                        <Collapse  isOpen={context.state.creditItemsCollapse}>
                            <div className="bg-light">
                                <ListGroup>
                                    <button className="btn btn-primary btn-block" onClick={()=>this.addCreditCard()}>Add Credit Card</button>
                                    {
                                        context.state.creditCards.map((creditCard,index)  =>
                                            <li key={creditCard._id}  className="justify-content-between web-dev-fg-black">{creditCard.bankName} </li>
                                        )
                                    }
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