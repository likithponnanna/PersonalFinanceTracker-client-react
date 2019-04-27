import React, {Component} from 'react'
import {withRouter} from "react-router";
import MyContext from "./MyContext";
import AdminUserService from "../service/admin.service.client";

class AdminInfoPills extends Component{
    constructor(props){
        super(props);
        this.adminService = new AdminUserService();
        this.state ={
            numOfBudget: 0,
            numOfTransactions: 0,
            userListNum: 0,
            adminListNum: 0
        }
    }

    componentDidMount() {
        this.adminService.findNumberOfTransactions()
            .then(transaction => {console.log("Total num of transaction", transaction)
            this.setState({
                numOfTransactions: transaction.count
            })
            })

        this.adminService.findNumberTotalUsersBudget()
            .then(budget => {
                console.log("Budget", budget);

                this.setState({
                    numOfBudget: budget.count
                })
            })

        this.adminService.getAllUsers().then(
            users => {
             let UserList= [];
             let adminList = [];
             let adminNum = 0;
             let userNum = 0;


                for(let user in users) {
                    //console.log(users[user].isAdmin);
                    if(users[user].isAdmin === true) {
                        //console.log(users[user])
                       // adminList.push(users[user]);

                        adminNum++;
                    }
                    else if(users[user].isAdmin === false) {
                        //UserList.push(users[user]);
                        userNum++;
                    }
                }

                /*this.setState({
                    userListNum :this.state.userList.count,
                    adminListNum: this.state.adminList.count
                })*/
                 console.log("User num",userNum);
                console.log("Admin Num", adminNum);

                this.setState({
                    adminNum: adminNum,
                    userNum: userNum
                })

            }
        )


    }


    render(){

        return(

            <div className="row">
                <div className="col-md-3">
                    <div className="card-counter primary">
                        <i className="fa fa-user"/>
                        <span className="count-numbers">{this.state.adminNum}</span>
                        <span className="count-name">Admins</span>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card-counter danger">
                        <i className="fa fa-usd"/>
                        <span className="count-numbers">{this.state.numOfTransactions}</span>
                        <span className="count-name">Transactions</span>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card-counter success">
                        <i className="fa fa-money"/>
                        <span className="count-numbers">{this.state.numOfBudget}</span>
                        <span className="count-name">Total Budget</span>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card-counter info">
                        <i className="fa fa-users"/>
                        <span className="count-numbers">{this.state.userNum}</span>
                        <span className="count-name">Users</span>
                    </div>
                </div>
            </div>

        )
    }



}

export default withRouter((props) => (
    <MyContext.Consumer>
        {(context) => <AdminInfoPills {...props} context={context}/>}
    </MyContext.Consumer>
))