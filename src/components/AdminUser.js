import React from 'react'
import MyContext from './MyContext'
import './MainPageStyle.css'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

class AdminUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }




    render () {

        return (
            <div>
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <h1>Welcome Admin </h1>

                            <ul className="nav nav-tabs">


                                <li className="nav-item">
                                    <Link to ={`/admin/users`} className="nav-link">USERS</Link>
                                </li>


                                <li className="nav-item">
                                    <Link to ={`/admin/admins`} className="nav-link">ADMINS</Link>
                                </li>


                                <li className="nav-item">
                                    <Link to ={`/admin/creditCards`} className="nav-link">CREDIT CARD APPLICATIONS</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to ={`/admin/transactions`} className="nav-link">TRACK TRANSACTIONS</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to ={`/admin/pendingCreditCards`} className="nav-link">PENDING CREDIT CARDS</Link>
                                </li>



                                <li className="nav-item">
                                    <Link to ={`/admin/addProduct`} className="nav-link">ADD PRODUCTS</Link>
                                </li>

                            </ul>


                        </React.Fragment>
                    )}
                </MyContext.Consumer>

            </div>


        )
    }

}
export default AdminUser;