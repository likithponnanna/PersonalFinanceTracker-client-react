import React, {Component} from 'react'
import {Button, Collapse, ListGroup, ListGroupItem} from "reactstrap";
import MyContext from "./MyContext";

class SideBarUser extends Component {

    constructor(props){
        super(props);
        this.state = {

        }

    }


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
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Cras justo odio </ListGroupItem>
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Dapibus ac facilisis in </ListGroupItem>
                                    <ListGroupItem className="justify-content-between web-dev-fg-black">Morbi leo risus </ListGroupItem>
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


export default SideBarUser