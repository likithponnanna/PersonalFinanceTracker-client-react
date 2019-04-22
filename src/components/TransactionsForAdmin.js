import React from 'react'
import AdminUserService from '../service/AdminUserService'
import MyContext from './MyContext'

class TransactionsForAdmin extends React.Component{
    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance();

        this.state = {
            transList:[],
            userid: props.match.params.userid
        }
    }

    componentDidMount = () => {
        console.log("mounted")
        this.getTransactions()
    }


    getTransactions = () => {
        console.log("inside get Trans")
        console.log(this.state.userid)
        this.adminUserService.getTransactions(this.state.userid).then(
           trans => {
                this.setState({
                    transList:[]
                              });
                console.log("1st trans",trans[0]);
                for(let i=0; i<trans.length;i++){
                    this.state.transList.push(trans[i])
                }
                    //for(let tran in trans) {
                    //this.state.transList.push(tran[0])
                    //console.log("inside for",trans[tran])
                //}
                    console.log(this.state.transList)
                this.setState({
                    transList:this.state.transList
                              })
               console.log("after push",this.state.transList)

            }

        )
    };

    render () {

        return (

        <div>

            <MyContext.Consumer>
                {(context) => (
                    <React.Fragment>





            <table className="table table-dark">
                <thead>
                <tr>

                    <th scope="col"> Category</th>
                    <th scope="col"> Payment Type</th>
                    <th scope="col"> Date of Transaction</th>
                    <th scope="col"> Payment Source</th>
                    <th scope="col"> Amount</th>

                </tr>
                </thead>
                <tbody>

                {

                    this.state.transList.map(
                        (trans) =>
                            <tr key={trans._id}>
                                <th scope="row">Trans</th>
                                <td>{trans.category}</td>
                                <td>{trans.payment_type}</td>
                                <td>{trans.date_of_transaction}</td>
                                <td>{trans.payment_source}</td>
                                <td>{trans.amount}</td>

                            </tr>
                    )


                }

                </tbody>
            </table>
                    </React.Fragment>
                )}
            </MyContext.Consumer>

        </div>



        )

    }
}
export default TransactionsForAdmin


