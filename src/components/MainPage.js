import React from 'react';
import { Button } from 'react-bootstrap'
import './MainPageStyle.css'
import MyContext from './MyContext'
import MainPageService from "../service/MainPageService";
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


