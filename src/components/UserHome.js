import React, {Component} from 'react'
import MyContext from './MyContext'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Helmet} from "react-helmet";
import Charts from "./Charts";
import BarChart from "./BarChart";
import HorizontalBarChart from "./HorizontalBarChart";
import { Collapse, Button, CardBody, Card, ListGroup, ListGroupItem } from 'reactstrap';

class UserHome extends Component{


    constructor(props){
        super(props);
        this.toggleCreditCard = this.toggleCreditCard.bind(this);
        this.toggleSavings = this.toggleSavings.bind(this);
        this.toggleChecking = this.toggleChecking.bind(this);
        this.toggleStocks = this.toggleStocks.bind(this);
        this.toggleProperty = this.toggleProperty.bind(this);
        this.state = {
            sidebarAct: false,
            creditItemsCollapse: true,
            savingsCollapse: false,
            checkingCollapse: false,
            stockCollapse: false,
            propertyCollapse: false

        }

    }

    toggleCreditCard() {
        this.setState(state => ({ creditItemsCollapse: !state.creditItemsCollapse }));
    }

    toggleSavings() {
        this.setState(state => ({ savingsCollapse: !state.savingsCollapse }));
    }
    toggleChecking() {
        this.setState(state => ({ checkingCollapse: !state.checkingCollapse }));
    }
    toggleStocks() {
        this.setState(state => ({ stockCollapse: !state.stockCollapse }));
    }
    toggleProperty() {
        this.setState(state => ({ propertyCollapse: !state.propertyCollapse }));
    }


    sidebarCollapse = () =>
        this.setState({
            sidebarAct: !this.state.sidebarAct
        });


    render() {
        return(

            <div>
             {/*   <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <p>Age: {context.state.age}</p>
                            <p>Name: {context.state.name}</p>
                            <button onClick={context.growAYearOlder}>Add one to age</button>
                        </React.Fragment>
                    )}
                </MyContext.Consumer>*/}

                <div className="wrapper">
                    <nav id="sidebar" className={`web-dev-overflowScroll ${this.state.sidebarAct  ? 'active' : ''} `} >
                        <div className="sidebar-header">
                            <h3>Finance Tracker</h3>
                        </div>

                            <div>
                                <Button className="btn-block mb-0" onClick={this.toggleCreditCard} style={{ marginBottom: '1rem' }}>Credit Cards</Button>
                                <Collapse  isOpen={this.state.creditItemsCollapse}>
                                    <div className="bg-light">
                                        <ListGroup>
                                            <ListGroupItem className="justify-content-between web-dev-fg-black">Cras justo odio </ListGroupItem>
                                            <ListGroupItem className="justify-content-between web-dev-fg-black">Dapibus ac facilisis in </ListGroupItem>
                                            <ListGroupItem className="justify-content-between web-dev-fg-black">Morbi leo risus </ListGroupItem>
                                        </ListGroup>
                                    </div>
                                </Collapse>
                                <Button className="btn-block mb-0" onClick={this.toggleSavings} style={{ marginBottom: '1rem' }}>Savings Account</Button>
                                <Collapse  isOpen={this.state.savingsCollapse}>
                                    <div className="bg-light">
                                        <ListGroup>
                                            <ListGroupItem className="justify-content-between web-dev-fg-black">Cras justo odio </ListGroupItem>
                                            <ListGroupItem className="justify-content-between web-dev-fg-black">Dapibus ac facilisis in </ListGroupItem>
                                            <ListGroupItem className="justify-content-between web-dev-fg-black">Morbi leo risus </ListGroupItem>
                                        </ListGroup>
                                    </div>
                                </Collapse>
                                <Button className="btn-block mb-0" onClick={this.toggleChecking} style={{ marginBottom: '1rem' }}>Checking Accounts</Button>
                                <Collapse  isOpen={this.state.checkingCollapse}>
                                    <div className="bg-light">
                                        <ListGroup>
                                            <ListGroupItem className="justify-content-between web-dev-fg-black">Cras justo odio </ListGroupItem>
                                            <ListGroupItem className="justify-content-between web-dev-fg-black">Dapibus ac facilisis in </ListGroupItem>
                                            <ListGroupItem className="justify-content-between web-dev-fg-black">Morbi leo risus </ListGroupItem>
                                        </ListGroup>
                                    </div>
                                </Collapse>
                                <Button className="btn-block mb-0" onClick={this.toggleStocks} style={{ marginBottom: '1rem' }}>Stock Investment</Button>
                                <Collapse  isOpen={this.state.stockCollapse}>
                                    <div className="bg-light">
                                        <ListGroup>
                                            <ListGroupItem className="justify-content-between web-dev-fg-black">Cras justo odio </ListGroupItem>
                                            <ListGroupItem className="justify-content-between web-dev-fg-black">Dapibus ac facilisis in </ListGroupItem>
                                            <ListGroupItem className="justify-content-between web-dev-fg-black">Morbi leo risus </ListGroupItem>
                                        </ListGroup>
                                    </div>
                                </Collapse>
                                <Button className="btn-block mb-0" onClick={this.toggleProperty} style={{ marginBottom: '1rem' }}>Properties</Button>
                                <Collapse  isOpen={this.state.propertyCollapse}>
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


                    <div id="content" className={` ${this.state.sidebarAct  ? 'active' : ''} `}>

                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="container-fluid">

                                <button type="button" id="sidebarCollapse" className="btn " onClick={() => this.sidebarCollapse()}>
                                    <i className="fa fa-align-left btn-outline-success p-1"/>
                                </button>
                                <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button"
                                        data-toggle="collapse" data-target="#navbarSupportedContent"
                                        aria-controls="navbarSupportedContent" aria-expanded="false"
                                        aria-label="Toggle navigation">
                                    <i className="fa fa-align-justify"/>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="nav navbar-nav ml-auto">
                                        <li className="nav-item active">
                                            <a className="nav-link" href="#">Page</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Page</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Page</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Page</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        <div className="container">

                        <h2>Collapsible Sidebar Using Bootstrap 4</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <div className="line"></div>

                        <h2>Lorem Ipsum Dolor</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <div className="line"></div>

                        <h2>Lorem Ipsum Dolor</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <div className="line"></div>

                        <h3>Lorem Ipsum Dolor</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>











            </div>
        )
    }


}

export default UserHome