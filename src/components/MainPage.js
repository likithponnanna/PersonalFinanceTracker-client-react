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
            loginFlag:false,
            username:'',
            password:'',
            submitFlag:false,
            firstName:''
        }
    }

    userNameChanged = event => {
        this.setState({
                          username: event.target.value
                      })
    };

    passwordChanged = event => {
        this.setState({
                          password: event.target.value
                      })
    };

    loginUser = (user) => {
        console.log(user)
        this.mainPageService.loginUser(user).then(
            (res) =>{
                console.log(res)
            }
        )

    }

    render() {
      return (


          <div className="container">

              <MyContext.Consumer>
                  {(context) => (
                      <React.Fragment>


                          <div className="ButtonList" id="button">
                              <Button variant="outline-primary" size="sm" onClick={() => {
                                  this.setState({
                                      loginFlag:true
                                                })
                              }
                              }>Login</Button>
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



                              {this.state.loginFlag === true &&

                               <div>
                                   <div className="form-group row">
                                       <label htmlFor="username" className="col-sm-2">
                                           UserName
                                       </label>
                                       <div className="col-sm-10">
                                           <input
                                               className="form-control"
                                               placeholder="username"
                                               id="username"
                                               onChange={this.userNameChanged}
                                           />
                                       </div>
                                   </div>

                                   <div className="form-group row">
                                       <label htmlFor="password" className="col-sm-2">
                                           Password
                                       </label>
                                       <div className="col-sm-10">
                                           <input
                                               className="form-control"
                                               placeholder="password"
                                               id="password"
                                               onChange={this.passwordChanged}
                                           />
                                       </div>
                                   </div>

                                   <Link to={`/profile`}>
                                   <button className="btn-success" onClick={() => {

                                       this.loginUser(this.state)
                                       console.log(this.state.username,this.state.password)

                                   }
                                   }>
                                       SUBMIT
                                   </button>
                                   </Link>

                               </div>

                              }



                          </ul>






                      </React.Fragment>
                  )}
              </MyContext.Consumer>





          </div>


      )
    }
}
export default MainPage;


