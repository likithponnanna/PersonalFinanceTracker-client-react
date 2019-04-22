import React from 'react';
import { Button } from 'react-bootstrap'
import './MainPageStyle.css'
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar'
import CardDeck from 'react-bootstrap/CardDeck'
// import Nav from 'react-bootstrap/Nav'
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import MyContext from './MyContext'
import MainPageService from "../service/MainPageService";
import CreditCardHomePage from "./CreditCardHomePage";
import SavingHomePage from "./SavingHomePage"
import CheckingHomePage from "./CheckingHomePage"


class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.mainPageService = MainPageService.getInstance();
        this.state ={
            creditCardList :[],
            savingList: [],
            checkingList: [],
            guestUserForm: false
        }
    }


    getProducts = (type) => {
        this.mainPageService.findProducts().then(
            products => {
                console.log(products);
                this.setState({
                    creditCardList :[],
                    savingList: [],
                    checkingList: []
                              });

                console.log(type);

                for(let prod in products) {
                    console.log(products[prod].type);
                    if(products[prod].type==="CREDIT_CARD") {
                       this.state.creditCardList.push([products[prod]]);

                        //console.log("inside for",this.state.creditCardList);
                    }

                    else if(products[prod].type==="SAVING") {
                        this.state.savingList.push([products[prod]]);
                    }

                    else if(products[prod].type==="CHECKING") {
                        this.state.checkingList.push([products[prod]]);
                    }

                }

                // console.log(this.state.creditCardList);
                // console.log(this.state.savingList);
                // console.log(this.state.checkingList);


                this.setState({
                                  creditCardList :this.state.creditCardList,
                                  savingList: this.state.savingList,
                                  checkingList: this.state.checkingList
                              })
                //
                // console.log("after set state");
                // console.log(this.state.creditCardList);
                // console.log(this.state.savingList);
                // console.log(this.state.checkingList);



            }
        )
    }


    // getGuestUserForm = () => {
    //     this.state.guestUserForm=true;
    //
    // }




    render() {
      return (


          <div className="container">
              <MyContext.Consumer>
                  {(context) => (
                      <React.Fragment>


              <div className="ButtonList" id="button">
              <Button variant="outline-primary" size="sm">Login</Button>
              <Button variant="outline-success" size="sm">Register</Button>
          </div>

              <h1 id="heading"> MINT APP</h1>





                  <ul className="nav nav-tabs">

                  <li  onClick = {() => {
                  this.getProducts('CREDIT_CARD');
                  context.state.selectedTabForGuest = 'CREDIT_CARD'
                  }}><a className="nav-link"  data-toggle="tab" href="#">CREDIT CARD</a></li>

                  <li onClick = {() =>{
                      this.getProducts('SAVING');
                      context.state.selectedTabForGuest = 'SAVING'
                  }}><a className="nav-link" data-toggle="tab" href="#">SAVING</a></li>

                  <li onClick = {() => {
                      this.getProducts('CHECKING');
                      context.state.selectedTabForGuest = 'CHECKING'
                  }}><a className="nav-link" data-toggle="tab" href="#">CHECKING</a></li>

              </ul>

                          <div>
                              {context.state.selectedTabForGuest === 'CREDIT_CARD' &&

                                this.state.creditCardList.map(
                                    (card) => {
                                       // console.log(card);
                                        return (
                                            <CreditCardHomePage
                                             key={card._id}
                                             card={card}
                                             />
                                        )
                                    }
                                )

                              }

                              {context.state.selectedTabForGuest === 'SAVING' &&

                               this.state.savingList.map(
                                   (saving) => {
                                      // console.log(saving);
                                       return (
                                           <SavingHomePage
                                               key={saving._id}
                                               saving={saving}
                                           />
                                       )
                                   }
                               )

                              }

                              {context.state.selectedTabForGuest === 'CHECKING' &&

                               this.state.checkingList.map(
                                   (checking) => {
                                      // console.log(checking);
                                       return (
                                           <CheckingHomePage
                                               key={checking._id}
                                               checking={checking}
                                           />
                                       )
                                   }
                               )

                              }
                      </div>







                      </React.Fragment>
                  )}
              </MyContext.Consumer>
          </div>


      )
    }
}
export default MainPage;


