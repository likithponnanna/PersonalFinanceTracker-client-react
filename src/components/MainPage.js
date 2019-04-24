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
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'


class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.mainPageService = MainPageService.getInstance();
        this.state ={

        }
    }

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

                              <li className="nav-item">
                                  <Link to ={`/home/creditCard`} className="nav-link">CREDIT CARDS</Link>
                              </li>


                              <li className="nav-item">
                                  <Link to ={`/home/saving`} className="nav-link">SAVING ACCOUNT</Link>
                              </li>


                              <li className="nav-item">
                                  <Link to ={`/home/checking`} className="nav-link">CHECKING ACCOUNT</Link>
                              </li>


                          </ul>


                      </React.Fragment>
                  )}
              </MyContext.Consumer>





          </div>


      )
    }
}
export default MainPage;


