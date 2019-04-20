import React, {Component} from 'react'
import MyContext from './MyContext'

import '../styling/CustomerOnboard.style.client.css'
import UserOnboardModal from "./UserOnboardModal";

class CustomerOnBoardPage extends Component{


    constructor(props){
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
            this.state = {
                show: false,
            }

    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }


    render() {
        return(

            <div className="container-fluid p-0 m-0">
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                                <a className="web-dev-logo" href="#">Logo<i className="fa fa-piggy-bank btn-outline-success p-1 web-dev-logo"/></a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
                                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                        <li className="nav-item active">
                                            <a className="nav-link" href="#">Home <span
                                                className="sr-only">(current)</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">About</a>
                                        </li>
                                    </ul>
                                    <div className="form-inline my-2 my-lg-0">
                                        <button type="button" className="btn btn-primary" data-toggle="modal"
                                                data-target="#exampleModalCenter" onClick={this.handleShow}>
                                            Login / SingUp
                                        </button>

                                    </div>
                                </div>
                            </nav>

                      <UserOnboardModal/>
                            <p>Age: {context.state.age}</p>
                            <p>Name: {context.state.name}</p>
                            <button onClick={context.growAYearOlder}>Add one to age</button>
                        </React.Fragment>
                    )}
                </MyContext.Consumer>
            </div>
        )
    }


}

export default CustomerOnBoardPage