import React, {Component} from 'react'
import {Button, Collapse, ListGroup, ListGroupItem} from "reactstrap";
import MyContext from "./MyContext";
import CreditCardService from '../service/credit-card.service.client'
import PropertyService from '../service/properties.service.client'
import SavingsAccountService from '../service/savings-account.service.client'
import CheckingAccountService from '../service/checking-account.service.client'
import StockService from '../service/stocks.service.client'
import Login from "./Login";
import CreditCardModal from "./CreditCardModal";
import '../styling/modals.style.client.css'
import CreditCardMainComponent from "./CreditCardMainComponent";
import SavingsAccountAddModal from "./SavingsAccountAddModal";
import PropertyAddModal from "./PropertyAddModal";
import CheckingAccountAddModal from "./CheckingAccountAddModal";


class SideBarUser extends Component {

    constructor(props){
        super(props);
        this.creditCardService = new CreditCardService();
        this.propertyService = new PropertyService();
        this.savingsAccountService = new SavingsAccountService();
        this.checkingAccountService = new CheckingAccountService();
        this.stockService = new StockService();
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
            propertyFlipped: false,
            stockFlipped: false,
            selectedCreditCard: undefined,
            selectedProperty: undefined,
            selectedStock: undefined,
            selectedSavingsAcc: undefined,
            selectedChecking: undefined,

            toggleUpdate: false,
            togglePropertyUpdate: false,
            toggleStockUpdate: false,
            toggleSavingsUpdate: false,
            toggleCheckingUpdate: false,

            cardNumChanged: "",
            propValueChanged: "",
            stockNameChanged: "",
            savingsAccBalChanged: "",
            checkingAccBalChanged: ""

        }

    }

    selectCreditCard = (credId) =>
        this.setState({
            selectedCreditCard: credId
        })

    selectedProperty = (propertyId) =>
        this.setState({
            selectedProperty: propertyId
        })

    selectedStock = (StockdId) =>
        this.setState({
            selectedStock: StockdId
        })

    selectedSavingsAcc = (SavingsAccId) =>
        this.setState({
            selectedSavingsAcc: SavingsAccId
        })

    selectedChecking = (CheckingAccId) =>
        this.setState({
            selectedChecking: CheckingAccId
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

    flipCPropertyClose =() =>
        this.setState(
            {
                propertyFlipped: false
            }
        );



    flipSavingsAccOpen =() =>
        this.setState(
            {
                showSavingsModal: true
            }
        );

    flipSavingsAccClose =() =>
        this.setState(
            {
                showSavingsModal: false
            }
        );

    flipCheckingAccOpen =() =>
        this.setState(
            {
                showSavingsModal: true
            }
        );

    flipCheckingAccClose =() =>
        this.setState(
            {
                showSavingsModal: false
            }
        );

    flipPropertyOpen =() =>
        this.setState(
            {
                propertyFlipped: true
            }
        );

    flipStockClose =() =>
        this.setState(
            {
                stockFlipped: false
            }
        );

    flipStockOpen =() =>
        this.setState(
            {
                stockFlipped: true
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
            .then(credits => {console.log("Credit Cards in Sidebar",credits);
            credits!==undefined ? this.props.context.setCreditCards(credits): this.props.context.setCreditCards([])});
        this.propertyService.findAllProperties()
            .then(properties => {console.log("Properties in Sidebar", properties);
                properties!==undefined ? this.props.context.setProperties(properties): this.props.context.setProperties([])
            });
        this.stockService.findAllStocks()
            .then(stocks => {console.log("Stocks in Sidebar", stocks);
            this.props.context.setStocksOwned(stocks);
                stocks!==undefined ?  this.props.context.setStocksOwned(stocks):  this.props.context.setStocksOwned([])
            });

        this.savingsAccountService.findAllSavingsAccounts()
            .then(savingsAccounts => {console.log("Savings Account in Sidebar", savingsAccounts);

                savingsAccounts!==undefined ?  this.props.context.setSavingsAccounts(savingsAccounts):  this.props.context.setSavingsAccounts([])
            });

        this.checkingAccountService.findAllCheckingAccounts()
            .then(checkingAccounts => {console.log("Checking Account in Sidebar", checkingAccounts);
                checkingAccounts!==undefined ?  this.props.context.setcheckingAccounts(checkingAccounts):  this.props.context.setcheckingAccounts([])
            })
    }

    addCreditCard = (creditCard) => {

        console.log("Credit Card",creditCard);
        if (creditCard !== [] || creditCard!==undefined) {
            this.creditCardService.createCreditCard(creditCard)
                .then(creditCard => {
                    console.log("Credit Card Inside", creditCard )
                    this.props.context.pushCreditCard(creditCard)
                })
                .catch(reason => {console.log(reason)})
        }
    };

    addSavingsAccount = (SavingsAccount) => {
        if (SavingsAccount !== [] || SavingsAccount!==undefined) {
            this.savingsAccountService.createSavingsAccount(SavingsAccount)
                .then(SavingsAccount => {
                    this.props.context.pushSavingsAccount(SavingsAccount)
                })
                .catch(reason => {console.log(reason)})
        }
    };

    addCheckingAccountAccount = (CheckingAccount) => {
        if (CheckingAccount !== [] || CheckingAccount!==undefined) {
            this.checkingAccountService.createCheckingAccount(CheckingAccount)
                .then(CheckingAccount => {
                    this.props.context.pushCheckingAccount(CheckingAccount)
                })
                .catch(reason => {console.log(reason)})
        }
    };

    addProperty = (property) => {
        if(property!==[] || property!==undefined){
            this.propertyService.createProperty(property)
                .then(property => {
                    this.props.context.pushProperty(property)
                })
        }
    };

    addStock = (Stock) => {

        if(Stock!==[] || Stock!==undefined){
            this.stockService.createStock(Stock)
                .then(Stock => {
                    this.props.context.pushStockOwned(Stock)
                })
        }
    };

    deleteCreditCard = (creditCardId) =>
        this.creditCardService.deleteCreditCard(creditCardId)
            .then(response => {
                this.props.context.deleteCreditCard(creditCardId);
            })
            .catch(reason => {console.log(reason)});

    deleteSavingsAccount = (SavingsAccount) =>
        this.savingsAccountService.deleteSavingsAccount(SavingsAccount)
            .then(response => {
                this.props.context.deleteSavingsAccount(SavingsAccount);
            })
            .catch(reason => {console.log(reason)});

    deleteCheckingAccount = (CheckingAccount) =>
        this.checkingAccountService.deleteCheckingAccount(CheckingAccount)
            .then(response => {
                this.props.context.deleteCheckingAccount(CheckingAccount);
            })
            .catch(reason => {console.log(reason)});

    deleteProperty = (Property) =>
        this.propertyService.deleteProperty(Property)
            .then(response => {
                this.props.context.deleteProperty(Property);
            })
            .catch(reason => {console.log(reason)});

    deleteStock = (StockId) =>
        this.stockService.deleteStock(StockId)
            .then(response => {
                this.props.context.deleteStockOwned(StockId);
            })
            .catch(reason => {console.log(reason)});

    toggleUpdate = () =>
        this.setState({
            toggleUpdate: !this.state.toggleUpdate
        });

    togglePropertyUpdate = () =>
        this.setState({
            togglePropertyUpdate: !this.state.togglePropertyUpdate
        });

    toggleStockUpdate = () =>
        this.setState({
            toggleStockUpdate: !this.state.toggleStockUpdate
        });

    toggleSavingsUpdate = () =>
        this.setState({
            toggleSavingsUpdate: !this.state.toggleSavingsUpdate
        });

    toggleCheckingUpdate = () =>
        this.setState({
            toggleCheckingUpdate: !this.state.toggleCheckingUpdate
        });





    cardNumChanged = (event) =>
        this.setState({
            cardNumChanged: event.target.value
        });


    propValueChanged = (event) =>
        this.setState({
            propValueChanged: event.target.value
        });

    savingsAccBalChanged =(event) =>
        this.setState({
            savingsAccBalChanged: event.target.value
        })

    checkingAccBalChanged =(event) =>
        this.setState({
            checkingAccBalChanged: event.target.value
        })







    updateCreditCardNum = (creditCard) =>
    {
        if (this.state.cardNumChanged !== "" || this.state.cardNumChanged !== undefined) {
            creditCard.accountNo = this.state.cardNumChanged;
            this.creditCardService.updateCreditCard(creditCard)
                .then(
                        this.props.context.updateCreditCard(creditCard)
                ).catch(reason => {console.log(reason)})


        }else {
            alert("Invalid Card Number");
        }
    };

    updatePropertyValue = (Property) =>
    {
        console.log("Property in update", Property)
        if (this.state.propValueChanged !== "" || this.state.propValueChanged !== undefined) {
            Property.value = this.state.propValueChanged;
            this.propertyService.updateProperty(Property)
                .then(
                    this.props.context.updateProperty(Property)
                ).catch(reason => {console.log(reason)})


        }else {
            alert("Invalid Address");
        }
    };

    updateSavingsAccBal = (SavingsAcc) =>
    {
        if (this.state.savingsAccBalChanged !== "" || this.state.savingsAccBalChanged !== undefined) {
            SavingsAcc.balance = this.state.savingsAccBalChanged;
            this.savingsAccountService.updateSavingsAccount(SavingsAcc)
                .then(
                    this.props.context.updateSavingsAccount(SavingsAcc)
                ).catch(reason => {console.log(reason)})


        }else {
            alert("Invalid Account");
        }
    };

    updateCheckingAccBal = (CheckingAcc) =>
    {
        if (this.state.checkingAccBalChanged !== "" || this.state.checkingAccBalChanged !== undefined) {
            CheckingAcc.balance = this.state.checkingAccBalChanged;
            this.checkingAccountService.updateCheckingAccount(CheckingAcc)
                .then(
                    this.props.context.updateCheckingAccount(CheckingAcc)
                ).catch(reason => {console.log(reason)})


        }else {
            alert("Invalid Account");
        }
    };




    updatePropertyValue = (Property) =>
    {
        console.log("Property in update", Property)
        if (this.state.propValueChanged !== "" || this.state.propValueChanged !== undefined) {
            Property.value = this.state.propValueChanged;
            this.propertyService.updateProperty(Property)
                .then(
                    this.props.context.updateProperty(Property)
                ).catch(reason => {console.log(reason)})


        }else {
            alert("Invalid Address");
        }
    };

    updateStockName = (Stock) =>
    {
        if (this.state.stockNameChanged !== "" || this.state.stockNameChanged !== undefined) {
            Stock.address = this.state.stockNameChanged;
            this.stockService.updateStock(Stock)
                .then(
                    this.props.context.updateStockOwned(Stock)
                ).catch(reason => {console.log(reason)})


        }else {
            alert("Invalid Stock");
        }
    };





    render(){
        return(

            <div id="hideOverflowFld" className="container-fluid">

                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <CreditCardModal addCreditCard ={this.addCreditCard}/>
                                <PropertyAddModal addProperty={this.addProperty}/>
                                <SavingsAccountAddModal addSavingsAccount={this.addSavingsAccount}/>
                                <CheckingAccountAddModal addCheckingAccountAccount={this.addCheckingAccountAccount}/>


                <nav id="sidebar" className={`web-dev-overflowScroll ${context.state.sidebarAct ? 'active' : ''} `} >
                    <div className="sidebar-header">
                        <h3>Finance Tracker</h3>
                    </div>

                    <div className="container-fluid web-dev-overflowScrollN">
                        <Button className="btn-block mb-0 web-dev-collapse-border" onClick={context.toggleCreditCard} style={{marginBottom: '1rem'}}>Credit Cards</Button>
                        <Collapse  isOpen={context.state.creditItemsCollapse}>
                            <div className="bg-light">
                                <ListGroup>
                                    <button type="button" className="btn  btn-outline-secondary m-2" data-toggle="modal"
                                            data-target="#exampleModalCenter" onClick={this.handleCreditModalShow}>
                                        Add Credit Card
                                    </button>

                                    <div>
                                        {



                                            context.state.creditCards!==undefined  ?
                                            <div>
                                                {

                                                    context.state.creditCards.map((creditCard, index) =>
                                                        <div onClick={() => {
                                                            this.flipCreditCardOpen();
                                                            this.selectCreditCard(creditCard._id)
                                                        }}>
                                                            <div key={index}>
                                                                {creditCard._id !== this.state.selectedCreditCard &&
                                                                <div className="list-group border border-white m-2 web-dev-word-wrap"
                                                                     key={index} onMouseEnter={() => {
                                                                    this.flipCreditCardOpen();
                                                                    this.selectCreditCard(creditCard._id)
                                                                }}>
                                                                    <div
                                                                        className="web-dev-word-wrap list-group-item list-group-item-action flex-column align-items-start web-dev-credit-card">
                                                                        <div
                                                                            className="d-flex w-100 justify-content-between web-dev-word-wrap">
                                                                            <p className="row web-dev-font-large web-dev-word-wrap mb-1"> Card: {creditCard.accountName}  </p>
                                                                            <small>Limit: {creditCard.maxLimit}</small>
                                                                        </div>
                                                                        <p className="mb-1">  {creditCard.accountNo}   </p>
                                                                        <div className="row web-dev-overflow-x-hidden">
                                                                            <small
                                                                                className="col-12 web-dev-overflow-x-hidden ">Bank: {creditCard.bankName}</small>
                                                                            <small
                                                                                className="col-12 web-dev-overflow-x-hidden ">Reward: {creditCard.rewardAmount}</small>
                                                                        </div>
                                                                    </div>
                                                                </div>}
                                                                {creditCard._id === this.state.selectedCreditCard &&
                                                                <div className="list-group border border-info m-2"
                                                                     key={index} onMouseLeave={() => {
                                                                    this.flipCreditCardClose();
                                                                    this.selectCreditCard("");
                                                                }}>
                                                                    <div
                                                                        className="list-group-item list-group-item-action flex-column align-items-start"
                                                                    >
                                                                        <div
                                                                            className="d-flex w-100 justify-content-between web-dev-word-wrap">
                                                                            <div className="row web-dev-word-wrap">
                                                                                <button
                                                                                    className=" web-dev-active-dark btn btn-block btn-outline-primary web-dev-credit-card m-2"
                                                                                    onClick={() => this.deleteCreditCard(creditCard._id)}> Delete
                                                                                    Card
                                                                                </button>
                                                                                {this.state.toggleUpdate === false &&
                                                                                <button
                                                                                    className=" web-dev-active-dark btn btn-block btn-outline-primary web-dev-credit-card m-2"
                                                                                    onClick={() => {
                                                                                        this.toggleUpdate()
                                                                                    }}> Update Card Num </button>}
                                                                            </div>
                                                                        </div>
                                                                        {this.state.toggleUpdate === false && <div>
                                                                            <small
                                                                                className="mb-1 web-dev-credit-card-black web-dev-word-wrap"> Card: {creditCard.accountName}   </small>
                                                                            <h6 className="mb-1 mt-2 web-dev-credit-card-black web-dev-word-wrap">  {creditCard.accountNo}   </h6>
                                                                        </div>}
                                                                        {this.state.toggleUpdate === true && creditCard._id === this.state.selectedCreditCard
                                                                        && <div><input type="number"
                                                                                       onChange={(event) => this.cardNumChanged(event)}
                                                                                       placeholder="Enter CardNumber"
                                                                                       className="col-12"/>
                                                                            <i onClick={() => {
                                                                                this.updateCreditCardNum(creditCard);
                                                                                this.toggleUpdate();
                                                                            }}
                                                                               className="fa fa-check my-float ml-4 align-content-center col-2"/>
                                                                        </div>}

                                                                    </div>
                                                                </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }</div>:<div/>

                                        }
                                    </div>
                                </ListGroup>
                            </div>
                        </Collapse>
                        <Button className="btn-block mb-0 web-dev-collapse-border" onClick={context.toggleSavings} style={{marginBottom: '1rem'}}>Savings Account</Button>
                        <Collapse  isOpen={context.state.savingsCollapse}>
                            <div className="bg-light">
                                <ListGroup>
                                    <button type="button" className="btn  btn-outline-secondary m-2" data-toggle="modal"
                                            data-target="#savingsModalCenter" onClick={this.handleCreditModalShow}>
                                        Add Savings Account
                                    </button>
                                    <div>
                                        {

                                            context.state.savingsAccounts!==undefined ?
                                                <div >
                                                    {

                                                        context.state.savingsAccounts.map((SavingsAccount, index) =>
                                                            <div onClick={() => {
                                                                this.flipSavingsAccOpen();
                                                                this.selectedSavingsAcc(SavingsAccount._id)
                                                            }}>
                                                                <div key={index}>
                                                                    {SavingsAccount._id !== this.state.selectedSavingsAcc &&
                                                                    <div className="list-group border border-white m-2"
                                                                         key={index} onMouseEnter={() => {
                                                                        this.flipSavingsAccOpen();
                                                                        this.selectedSavingsAcc(SavingsAccount._id)
                                                                    }}>
                                                                        <div
                                                                            className="list-group-item list-group-item-action flex-column align-items-start web-dev-savings"
                                                                        >
                                                                            <div className="d-flex w-100 justify-content-between web-dev-word-wrap">
                                                                                <div  className="mb-1  web-dev-font-large web-dev-word-wrap mr-1"> Bank: {SavingsAccount.bankName} </div>

                                                                            </div>
                                                                            <h6 className=""> Balance:
                                                                                ${SavingsAccount.balance} </h6>
                                                                            <div className="mb-0 mt-2 web-dev-font-small ">Acc No: {SavingsAccount.accountNo}   </div>
                                                                            <div className="mt-2 web-dev-font-small ">Acc Name: {SavingsAccount.accountName}   </div>
                                                                        </div>
                                                                    </div>}
                                                                    {SavingsAccount._id === this.state.selectedSavingsAcc &&
                                                                    <div className="list-group border border-info m-2"
                                                                         key={index} onMouseLeave={() => {
                                                                        this.flipSavingsAccClose();
                                                                        this.selectedSavingsAcc("");
                                                                    }}>
                                                                        <div
                                                                            className="list-group-item list-group-item-action flex-column align-items-start"
                                                                        >
                                                                            <div
                                                                                className="d-flex w-100 justify-content-between">
                                                                                <div className="row">
                                                                                    <button
                                                                                        className=" web-dev-active-dark btn btn-block btn-outline-primary web-dev-credit-card m-2"
                                                                                        onClick={() => this.deleteSavingsAccount(SavingsAccount._id)}> Delete
                                                                                        Account
                                                                                    </button>
                                                                                    {this.state.toggleSavingsUpdate === false &&
                                                                                    <button
                                                                                        className=" web-dev-active-dark btn btn-block btn-outline-primary web-dev-credit-card m-2"
                                                                                        onClick={() => {
                                                                                            this.toggleSavingsUpdate()
                                                                                        }}> Update Balance
                                                                                        Value </button>}
                                                                                </div>
                                                                            </div>
                                                                            {this.state.toggleSavingsUpdate === false &&
                                                                            <div>

                                                                                <h6 className="mb-1 web-dev-credit-card-black web-dev-word-wrap"> Balance: {SavingsAccount.balance}   </h6>
                                                                            </div>}
                                                                            {this.state.toggleSavingsUpdate === true && SavingsAccount._id === this.state.selectedSavingsAcc
                                                                            && <div><input type="number"
                                                                                           onChange={(event) => this.savingsAccBalChanged(event)}
                                                                                           placeholder="Enter New Balance"
                                                                                           className="col-12"/>
                                                                                <i onClick={() => {
                                                                                    this.updateSavingsAccBal(SavingsAccount);
                                                                                    this.toggleSavingsUpdate();
                                                                                }}
                                                                                   className="fa fa-check my-float ml-4 align-content-center col-2"/>
                                                                            </div>}

                                                                        </div>
                                                                        }
                                                                    </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    }</div>:<div/>

                                        }
                                    </div>
                                </ListGroup>
                            </div>
                        </Collapse>
                        <Button className="btn-block mb-0 web-dev-collapse-border" onClick={context.toggleChecking} style={{marginBottom: '1rem'}}>Checking Accounts</Button>
                        <Collapse  isOpen={context.state.checkingCollapse}>
                            <div className="bg-light">
                                <ListGroup>
                                    <button type="button" className="btn  btn-outline-secondary m-2" data-toggle="modal"
                                            data-target="#checkingModalCenter" onClick={this.handleCreditModalShow}>
                                        Add Checking Account
                                    </button>
                                    <div>
                                        {

                                            context.state.checkingAccounts!==undefined ?
                                                <div>
                                                    {

                                                        context.state.checkingAccounts.map((CheckingAccount, index) =>
                                                            <div onMouseEnter={() => {
                                                                this.flipCheckingAccOpen();
                                                                this.selectedChecking(CheckingAccount._id)
                                                            }} onClick={() => {
                                                                this.flipCheckingAccOpen();
                                                                this.selectedChecking(CheckingAccount._id)
                                                            }}>
                                                                <div key={index}>
                                                                    {CheckingAccount._id !== this.state.selectedChecking &&
                                                                    <div className="list-group border border-white m-2"
                                                                         key={index} onMouseEnter={() => {
                                                                        this.flipCheckingAccOpen();
                                                                        this.selectedChecking(CheckingAccount._id)
                                                                    }}>
                                                                        <div
                                                                            className="list-group-item list-group-item-action flex-column align-items-start web-dev-checking web-dev-word-wrap"
                                                                        >
                                                                            <div className="d-flex w-100 justify-content-between web-dev-word-wrap">
                                                                                <div className="web-dev-font-large mb-1 web-dev-word-wrap"> Bank: {CheckingAccount.bankName} </div>

                                                                            </div>
                                                                            <h6> Balance:
                                                                                ${CheckingAccount.balance} </h6>
                                                                            <div className="mb-0 mt-2 web-dev-font-small">Acc
                                                                                No: {CheckingAccount.accountNo}   </div>
                                                                            <div className="mb-1 mt-2 web-dev-font-small">Acc
                                                                                Name: {CheckingAccount.accountName}   </div>
                                                                        </div>
                                                                    </div>}
                                                                    {CheckingAccount._id === this.state.selectedChecking &&
                                                                    <div className="list-group border border-info m-2"
                                                                         key={index} onMouseLeave={() => {
                                                                        this.flipCheckingAccClose();
                                                                        this.selectedChecking("");
                                                                    }}>
                                                                        <div
                                                                            className="list-group-item list-group-item-action flex-column align-items-start"
                                                                        >
                                                                            <div
                                                                                className="d-flex w-100 justify-content-between">
                                                                                <div className="row">
                                                                                    <button
                                                                                        className=" web-dev-active-dark btn btn-block btn-outline-primary web-dev-credit-card m-2"
                                                                                        onClick={() => this.deleteCheckingAccount(CheckingAccount._id)}> Delete
                                                                                        Account
                                                                                    </button>
                                                                                    {this.state.toggleCheckingUpdate === false &&
                                                                                    <button
                                                                                        className=" web-dev-active-dark btn btn-block btn-outline-primary web-dev-credit-card m-2"
                                                                                        onClick={() => {
                                                                                            this.toggleCheckingUpdate()
                                                                                        }}> Update Balance</button>}
                                                                                </div>
                                                                            </div>
                                                                            {this.state.toggleCheckingUpdate === false &&
                                                                            <div>

                                                                                <div className="web-dev-font-small mb-1 web-dev-credit-card-black web-dev-word-wrap"> Balance: {CheckingAccount.balance}   </div>
                                                                            </div>}
                                                                            {this.state.toggleCheckingUpdate === true && CheckingAccount._id === this.state.selectedChecking
                                                                            && <div><input type="number"
                                                                                           onChange={(event) => this.checkingAccBalChanged(event)}
                                                                                           placeholder="Enter New Balance"
                                                                                           className="col-12"/>
                                                                                <i onClick={() => {
                                                                                    this.updateCheckingAccBal(CheckingAccount);
                                                                                    this.toggleCheckingUpdate();
                                                                                }}
                                                                                   className="fa fa-check my-float ml-4 align-content-center col-2"/>
                                                                            </div>}

                                                                        </div>
                                                                        }
                                                                    </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    }</div>:<div/>

                                        }
                                    </div>
                                </ListGroup>
                            </div>
                        </Collapse>
                        <Button className="btn-block mb-0 web-dev-collapse-border" onClick={context.toggleStocks} style={{marginBottom: '1rem'}}>Stock Investment</Button>
                        <Collapse  isOpen={context.state.stockCollapse}>
                            <div className="bg-light">
                                <ListGroup>
                                    <div className="btn-dark web-dev-font-small text-center" aria-disabled="true">Add Stock From Search</div>

                                    {
                                        context.state.stocksOwned!==undefined && context.state.stocksOwned.length>=0 ?
                                    <div>
                                        {

                                            context.state.stocksOwned.map((Stock,index)  =>
                                                <div>

                                                    <div key={index}>
                                                        {Stock._id !== this.state.selectedStock  &&
                                                        <div className="list-group border border-white m-2" key={index} onMouseEnter={()=>{ this.flipStockOpen(); this.selectedStock(Stock._id)}}>
                                                            <div className="list-group-item list-group-item-action flex-column align-items-start web-dev-stock"
                                                            >

                                                                <h6>Stock Symbol: {Stock.stock_symbol} </h6>
                                                                <div className="mb-1 mt-2 web-dev-font-medium">Category:  {Stock.category}   </div>
                                                            </div>
                                                        </div> }
                                                        {Stock._id === this.state.selectedStock &&
                                                        <div className="list-group border border-info m-2" key={index} onMouseLeave={()=>{ this.flipStockClose();this.selectedStock("");}}>
                                                            <div className="list-group-item list-group-item-action flex-column align-items-start"
                                                            >
                                                                <div className="d-flex w-100 justify-content-between" >
                                                                    <div className="row">
                                                                        <button className=" web-dev-active-dark btn btn-block btn-outline-primary web-dev-credit-card m-2" onClick={()=> this.deleteStock(Stock._id)}>  Delete Stock </button>
                                                                    </div>
                                                                </div>
                                                                    <small className="mb-1 web-dev-credit-card-black overflow-auto"> Purchase Date: {Stock.purchase_date.length > 11 ? Stock.purchase_date.slice(0,10) :Stock.purchase_date }   </small>

                                                            </div>
                                                        </div>
                                                        }
                                                    </div>
                                                </div>
                                            )

                                        }
                                    </div>:<div/>



                                    }
                                </ListGroup>
                            </div>
                        </Collapse>
                        <Button className="btn-block mb-0 web-dev-collapse-border" onClick={context.toggleProperty} style={{marginBottom: '1rem'}}>Properties</Button>
                        <Collapse  isOpen={context.state.propertyCollapse}>
                            <div className="bg-light">
                                <ListGroup>
                                    <button type="button" className="btn  btn-outline-secondary m-2" data-toggle="modal"
                                            data-target="#propertyModalCenter" onClick={this.handleCreditModalShow}>
                                        Add Property
                                    </button>
                                    <div>
                                        {

                                            context.state.properties!==undefined ? <div>{

                                                    context.state.properties.map((Property, index) =>
                                                        <div>
                                                            <div key={index}>
                                                                {Property._id !== this.state.selectedProperty &&
                                                                <div className="list-group border border-white m-2"
                                                                     key={index} onMouseEnter={() => {
                                                                    this.flipPropertyOpen();
                                                                    this.selectedProperty(Property._id)
                                                                }}>
                                                                    <div
                                                                        className="list-group-item list-group-item-action flex-column align-items-start web-dev-property"
                                                                    >
                                                                        <div
                                                                            className="d-flex w-100 justify-content-between">
                                                                            <h6 className="mb-1"> Address: {Property.address}  </h6>
                                                                            <small>Area: {Property.area} Sq.Ft</small>
                                                                        </div>
                                                                        <p className="mb-1 web-dev-word-wrap">Value: ${Property.value}   </p>
                                                                    </div>
                                                                </div>}
                                                                {Property._id === this.state.selectedProperty &&
                                                                <div className="list-group border border-info m-2"
                                                                     key={index} onMouseLeave={() => {
                                                                    this.flipCPropertyClose();
                                                                    this.selectedProperty("");
                                                                }}>
                                                                    <div
                                                                        className="list-group-item list-group-item-action flex-column align-items-start"
                                                                    >
                                                                        <div
                                                                            className="d-flex w-100 justify-content-between">
                                                                            <div className="row">
                                                                                <button
                                                                                    className=" web-dev-active-dark btn btn-block btn-outline-primary web-dev-credit-card m-2"
                                                                                    onClick={() => this.deleteProperty(Property._id)}> Delete
                                                                                    Property
                                                                                </button>
                                                                                {this.state.togglePropertyUpdate === false &&
                                                                                <button
                                                                                    className=" web-dev-active-dark btn btn-block btn-outline-primary web-dev-credit-card m-2"
                                                                                    onClick={() => {
                                                                                        this.togglePropertyUpdate()
                                                                                    }}> Update Property Value </button>}
                                                                            </div>
                                                                        </div>
                                                                        {this.state.togglePropertyUpdate === false && <div>
                                                                            <small
                                                                                className="mb-1 web-dev-credit-card-black overflow-auto"> Address: {Property.address}   </small>
                                                                            <h6 className="mb-1 mt-2 web-dev-credit-card-black web-dev-word-wrap"> Value: ${Property.value}   </h6>
                                                                        </div>}
                                                                        {this.state.togglePropertyUpdate === true && Property._id === this.state.selectedProperty
                                                                        && <div><input type="number"
                                                                                       onChange={(event) => this.propValueChanged(event)}
                                                                                       placeholder="Enter Value"
                                                                                       className="col-12"/>
                                                                            <i onClick={() => {
                                                                                this.updatePropertyValue(Property);
                                                                                this.togglePropertyUpdate();
                                                                            }}
                                                                               className="fa fa-check my-float ml-4 align-content-center col-2"/>
                                                                        </div>}

                                                                    </div>
                                                                </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                            }</div>:<div></div>

                                        }
                                    </div>
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

export default (props) => (
    <MyContext.Consumer>
        {(context) => <SideBarUser {...props} context={context}/>}
    </MyContext.Consumer>
)
