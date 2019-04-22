import React, {Component} from 'react'
import MyContext from './MyContext'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import UserOverViewTabContent from "./UserOverViewTabContent";
import '../styling/transaction.style.client.css'
import TransactionPage from "./TransactionPage";

const TransactionTabContent =({categoryChanged, paymentTypeChanged, dateChanged, amountChanged, toggleUpdate, toggleAdd, updateFlag, addFlag,
                                  addTransaction,deleteTransaction, updateTransaction, setUpdateId, getLastWeekTransaction, getLastMonthTransaction, getAllTransactions,
                                  amount, payment_type, category, date_of_transaction }) =>
            <div>
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <div className="wrapper">


                                <div className="card col-12">

                                    <h5 className="card-header text-center font-weight-bold text-uppercase py-4">Transactions</h5>
                                    <div className="input-group row">

                                    </div>
                                    <div className="card-body web-dev-overflow">
                                        <div id="table" className="table-editable">
                                            <table
                                                className="table  table-responsive-md table-striped text-center ">
                                            <tr>
                                                <th className="mr-1 btn btn-secondary text-center web-dev-text-size-transaction" onClick={()=> getAllTransactions()}>All Transactions</th>
                                                <th className="ml-1 mr-1 btn btn-secondary text-center web-dev-text-size-transaction" onClick={()=> getLastMonthTransaction()}>One Month Transactions</th>
                                                <th className="ml-1 btn btn-secondary text-center web-dev-text-size-transaction" onClick={()=> getLastWeekTransaction()}>Past Week Transaction</th>
                                            </tr>
                                            </table>

                                          <span className="table-add float-right mb-3 mr-2 " onClick={()=> toggleAdd()}><a href="#!" className="text-success">
                                              <i className="fa fa-plus" aria-hidden="true"/></a></span>

                                            <table
                                                className="table table-bordered table-responsive-md table-striped text-center ">

                                                <tr>
                                                    <th className="text-center">Amount</th>
                                                    <th className="text-center">Category</th>
                                                    <th className="text-center">Payment Type</th>
                                                    <th className="text-center">Date</th>

                                                    <th className="text-center"/>
                                                    <th className="text-center"/>
                                                </tr>

                                                {

                                                    context.state.transactions.map((transaction,index)  =>
                                                <tr key={index}>
                                                    <td className="pt-3-half" >{transaction.amount}</td>
                                                    <td className="pt-3-half" >{transaction.category}</td>
                                                    <td className="pt-3-half" >{transaction.payment_type}</td>
                                                    <td className="pt-3-half" >{transaction.date_of_transaction }</td>
                                                    <td className="pt-3-half">
                                                        <span className="table-remove" ><i onClick={()=>{ toggleUpdate(); setUpdateId(transaction._id)}}  className="fa fa-edit fa-2x" aria-hidden="true"/></span>
                                                    </td>
                                                    <td>
                                                        <span className="table-trash"><i onClick={()=> deleteTransaction(transaction._id)} className="fa fa-trash fa-2x " aria-hidden="true"/></span>
                                                    </td>
                                                </tr>
                                                    )

                                                }


                                                {updateFlag &&    <tr>
                                                    <td className="pt-3-half"  ><input value={amount} type="number" onChange={(event)=>amountChanged(event)}/> </td>
                                                    <td className="pt-3-half" ><input value={category} type="text" onChange={(event)=>categoryChanged(event)}/></td>
                                                    <td className="pt-3-half" ><input value={payment_type} type="text" onChange={(event)=>paymentTypeChanged(event)}/></td>
                                                    <td className="pt-3-half" ><input value={date_of_transaction} type="date" onChange={(event)=>dateChanged(event)}/></td>
                                                    <td className="pt-3-half">
                                                      <span className="table-remove"><button type="button"
                                                                                             className="btn  btn-rounded btn-sm my-0"> </button></span>
                                                    </td>
                                                    <td>
                                                        <span className="table-remove"><button type="button"
                                                                                               className="btn btn-danger btn-rounded btn-sm my-0" onClick={()=>{ toggleUpdate(); updateTransaction() }}>Update</button></span>
                                                    </td>
                                                </tr>}


                                                {addFlag && <tr>
                                                    <td className="pt-3-half"  ><input type="number" onChange={(event)=>amountChanged(event)}/> </td>
                                                    <td className="pt-3-half" ><input type="text" onChange={(event)=>categoryChanged(event)}/></td>
                                                    <td className="pt-3-half" ><input type="text" onChange={(event)=>paymentTypeChanged(event)}/></td>
                                                    <td className="pt-3-half" ><input type="date" onChange={(event)=>dateChanged(event)}/></td>
                                                    <td className="pt-3-half">
                                                      <span className="table-remove"><button type="button"
                                                                                             className="btn btn-success btn-rounded btn-sm my-0" onClick={()=>{ toggleAdd(); addTransaction()}}>Add</button></span>
                                                    </td>
                                                    <td>
                                                        <span className="table-remove"><button type="button"
                                                                                               className="btn  btn-rounded btn-sm my-0"> </button></span>
                                                    </td>
                                                </tr>
                                                }





                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </React.Fragment>
                    )}
                </MyContext.Consumer>
            </div>;

TransactionTabContent.contextType = MyContext;
export default TransactionTabContent