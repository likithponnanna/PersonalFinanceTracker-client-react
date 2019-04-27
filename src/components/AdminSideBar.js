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
import {Link} from "react-router-dom";


class AdminSideBar extends Component {

    constructor(props){
        super(props);
        this.creditCardService = new CreditCardService();
        this.propertyService = new PropertyService();
        this.savingsAccountService = new SavingsAccountService();
        this.checkingAccountService = new CheckingAccountService();
        this.stockService = new StockService();
        this.handleCreditModalClose = this.handleCreditModalClose.bind(this);
        this.handleStockModalShow = this.handleStockModalShow.bind(this);
        this.state = {
            creditCard: {

            },
            showCreditModal: false,

            selectedCreditCard: undefined,
            selectedProperty: undefined,
            selectedStock: undefined,
            selectedSavingsAcc: undefined,
            selectedChecking: undefined,

            toggleUpdate: false,

        }

    }

    selectCreditCard = (credId) =>
        this.setState({
            selectedCreditCard: credId
        })


    handleCreditModalClose = () =>
        this.setState({ showCreditModal: false });


    handleStockModalShow= () =>
        this.setState({ showStockModal: true });



    componentDidMount() {

    }






    addStock = (Stock) => {

        if(Stock!==[] || Stock!==undefined){
            this.stockService.createStock(Stock)
                .then(Stock => {
                    this.context.pushStockOwned(Stock)
                })
        }
    };



    propValueChanged = (event) =>
        this.setState({
            propValueChanged: event.target.value
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

            <div className="">

                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>

                            <nav id="sidebar" className={` web-dev-admin-side-bar-color web-dev-overflowScroll ${context.state.sidebarAct ? 'active' : ''} `} >
                                <div className="sidebar-header">
                                    <h3>Admin</h3>
                                    <ul className="list-unstyled components">
                                        <p>You have full admin rights</p>
                                        <Link to="/admin" >
                                            <li className={`${ window.location.pathname=== '/admin' 
                                            || window.location.pathname.includes("transactions-admins") 
                                                || window.location.pathname.includes('admin/bills') ? 'active' : ''}`}  >
                                                <a>Overview</a>
                                            </li>
                                        </Link>
                                        <Link to="/admin/users" >
                                            <li className={`${ window.location.pathname=== '/admin/users'   ? 'active' : ''}`}  >
                                                <a>Users</a>
                                            </li>
                                        </Link>
                                        <Link to="/admin/applications" >
                                            <li className={`${ window.location.pathname=== '/admin/applications'  ? 'active' : ''}`}  >
                                                <a>Applications</a>
                                            </li>
                                        </Link>
                                        <Link to="/admin/products" >
                                            <li className={`${ window.location.pathname=== '/admin/products'    ? 'active' : ''}`}  >
                                                <a>Products</a>
                                            </li>
                                        </Link>




                                    </ul>

                                </div>
                            </nav>


                        </React.Fragment>
                    )}
                </MyContext.Consumer>


            </div>

        )
    }

}

AdminSideBar.contextType = MyContext;
export default AdminSideBar