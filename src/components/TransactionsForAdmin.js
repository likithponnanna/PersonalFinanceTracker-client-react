import React from 'react'
import AdminUserService from '../service/admin.service.client'
import MyContext from './MyContext'
import {Link} from "react-router-dom";
import AdminInfoPills from './AdminInfoPills'

class TransactionsForAdmin extends React.Component{
    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance();

        this.state = {
            transList:[],
            userid: props.userid
        }
    }

    componentDidMount = () => {
        this.getTransactions()
    }


    getTransactions = () => {
        this.adminUserService.getTransactions(this.state.userid).then(
            trans => {
                this.setState({
                    transList:[]
                });

                for(let i=0; i<trans.length;i++){
                    this.state.transList.push(trans[i])
                }
                this.setState({
                    transList:this.state.transList
                })

            }

        )
    };

    render () {

        return (

            <div>

                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>


                                <AdminInfoPills/>

                            <div className="wrapper container web-dev-overflow p-0">


                                <div className="card col-12 web-dev-overflow p-0">

                                    <h5 className="card-header text-center font-weight-bold text-uppercase py-4">User Transaction</h5>

                                    <div className="card-body web-dev-overflow">
                                        <div id="table" className="table-editable">
                                            <table
                                                className="table  table-responsive-md table-striped text-center ">
                                            </table>


                                            <table
                                                className="table table-bordered table-responsive-md table-striped text-center ">

                                                <tr>
                                                    <th className="text-center">Category</th>
                                                    <th className="text-center">Payment Type</th>
                                                    <th className="text-center">Date of Transaction</th>
                                                    <th className="text-center"> Payment Source </th>
                                                    <th className="text-center"> Amount </th>
                                                </tr>






                                                {

                                                    this.state.transList.map((trans,index)  =>
                                                        <tr key={index}>
                                                            <td className="pt-3-half" >{trans.category}</td>
                                                            <td className="pt-3-half" >{trans.payment_type}</td>
                                                            <td className="pt-3-half" >{trans.date_of_transaction.length > 11 ? trans.date_of_transaction.slice(0,10) : trans.date_of_transaction}</td>
                                                            <td className="pt-3-half" >{trans.payment_source}</td>
                                                            <td className="pt-3-half" >{trans.amount}</td>
                                                        </tr>
                                                    )

                                                }

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </React.Fragment>
                    )}
                </MyContext.Consumer>

            </div>



        )

    }
}
export default TransactionsForAdmin