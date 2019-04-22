import React, {Component} from 'react'
import MyContext from './MyContext'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import UserOverViewTabContent from "./UserOverViewTabContent";
import '../styling/transaction.style.client.css'

const TransactionTabContent =() =>
            <div>
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <div className="wrapper">
                                <div className="card">
                                    <h5 className="card-header text-center font-weight-bold text-uppercase py-4">Transactions</h5>
                                    <div className="card-body">
                                        <div id="table" className="table-editable">
                                            <div className="input-group row">
                                                <input/><input/><input/>
                                            </div>
                                          <span className="table-add float-right mb-3 mr-2"><a href="#!" className="text-success">
                                              <i className="fa fa-plus" aria-hidden="true"/></a></span>

                                            <table
                                                className="table table-bordered table-responsive-md table-striped text-center">

                                                <tr>
                                                    <th className="text-center">Person Name</th>
                                                    <th className="text-center">Age</th>
                                                    <th className="text-center">Company Name</th>
                                                    <th className="text-center">Country</th>
                                                    <th className="text-center">City</th>
                                                    <th className="text-center">Sort</th>
                                                    <th className="text-center">Remove</th>
                                                </tr>
                                                <tr>
                                                    <td className="pt-3-half" >Aurelia Vega</td>
                                                    <td className="pt-3-half" >30</td>
                                                    <td className="pt-3-half" >Deepends</td>
                                                    <td className="pt-3-half" >Spain</td>
                                                    <td className="pt-3-half" >Madrid</td>
                                                    <td className="pt-3-half">
                                                        <span className="table-up"><a href="#!" className="indigo-text">
                                                            <i className="fas fa-long-arrow-alt-up" aria-hidden="true"/></a></span>
                                                        <span className="table-down">
                                                            <a href="#!" className="indigo-text">
                                                                <i className="fas fa-long-arrow-alt-down"
                                                            aria-hidden="true"/></a></span>
                                                    </td>
                                                    <td>
                                                        <span className="table-remove"><button type="button"
                                                                                               className="btn btn-danger btn-rounded btn-sm my-0">Remove</button></span>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="pt-3-half" contentEditable="true">Guerra Cortez</td>
                                                    <td className="pt-3-half" contentEditable="true">45</td>
                                                    <td className="pt-3-half" contentEditable="true">Insectus</td>
                                                    <td className="pt-3-half" contentEditable="true">USA</td>
                                                    <td className="pt-3-half" contentEditable="true">San Francisco</td>
                                                    <td className="pt-3-half">
                                                        <span className="table-up"><a href="#!" className="indigo-text">
                                                            <i className="fas fa-long-arrow-alt-up" aria-hidden="true"/></a></span>
                                                        <span className="table-down">
                                                            <a href="#!" className="indigo-text">
                                                                <i className="fas fa-long-arrow-alt-down"
                                                            aria-hidden="true"/></a></span>
                                                    </td>
                                                    <td>
                                                        <span className="table-remove"><button type="button"
                                                                                               className="btn btn-danger btn-rounded btn-sm my-0">Remove</button></span>
                                                    </td>
                                                </tr>





                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </React.Fragment>
                    )}
                </MyContext.Consumer>
            </div>;

export default TransactionTabContent