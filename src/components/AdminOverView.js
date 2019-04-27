import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Map from "./Map";
import PropertyService from "../service/properties.service.client";
import MyContext from "./MyContext";
import mapStyle from '../styling/mapStyle'
import UniversalService from "../service/universal.service.client";
import AdminUserService from "../service/admin.service.client";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'


class AdminOverView extends Component {
    constructor(props){

        super(props);
        this.universalService = new UniversalService();
        this.adminUserService = new AdminUserService()
        this.state = {
            isActive:false,
            userList: [],
            adminList: [],
            guestList:[],
            addUserFormNeeded: false,
            addUserForm: true,
            userToBeDeleted:' ',
            updateUserFormNeeded: false,
            updateUserForm: true,
            userToBeEdited:undefined,
            addForm:true,
            editForm:true,
            makeAdmin:true,
            makeAdminNeeded:false,
            viewTrans:true,
            viewTransNeeded:false,
            guestListStatusFixed:[],
            guestListStatusPending:[],
            addBillNeeded:false,
            addBill:true
        }
    }

    componentDidMount() {
        this.getAllUsers();


    }

    setAddBill = () => {
        this.setState({
            addBillNeeded:this.state.addBill
        })
    }

    setAdduserForm = () => {
        this.setState({
            addUserFormNeeded:this.state.addUserForm
        })
    }

    setUpdateuserForm = () => {
        this.setState({
            updateUserFormNeeded:this.state.updateUserForm
        })
    }

    setUserToBeEdited =  (user) => {
        this.setState({
            userToBeEdited:user,
        })
        console.log(this.state.userToBeEdited)
    }

    setMakeAdmin = () => {
        this.setState({
            makeAdminNeeded:this.state.makeAdmin
        })
    }

    setViewTransNeeded = () => {
        this.setState({
            viewTransNeeded:this.state.viewTrans
        })
    }

    getGuestUsersForCreditCardStatusFixed = () => {
        this.guestProductService.getGuestUsers().then(
            (guests) => {
                console.log("guests",guests);
                this.setState({
                    guestListStatusFixed:[]
                });

                for(let i=0; i<guests.length;i++)
                {
                    if(guests[i].status === "APPROVED" || guests[i].status === "REJECTED" )
                    {
                        this.state.guestListStatusFixed.push(guests[i])
                    }
                }

                this.setState({
                    guestListStatusFixed:this.state.guestListStatusFixed
                })

                console.log("guestlist",this.state.guestListStatusFixed)

            }
        )
    }


    getGuestUsersForCreditCardStatusPending = () => {
        this.guestProductService.getGuestUsers().then(
            (guests) => {
                console.log("guests",guests);
                this.setState({
                    guestListStatusPending:[]
                });

                for(let i=0; i<guests.length;i++)
                {
                    if(guests[i].status === "PENDING" )
                    {
                        this.state.guestListStatusPending.push(guests[i])
                    }
                }

                this.setState({
                    guestListStatusPending:this.state.guestListStatusPending
                })

                console.log("guestlist pending",this.state.guestListStatusPending)

            }
        )
    }


    getAllUsers = () => {
        this.adminUserService.getAllUsers().then(
            users => {
                this.setState ({
                    userList: [],
                    adminList: []
                });

                for(let user in users) {
                    //console.log(users[user].isAdmin);
                    if(users[user].isAdmin === true) {
                        //console.log(users[user])
                        this.state.adminList.push([users[user]]);
                    }
                    else if(users[user].isAdmin === false) {
                        this.state.userList.push([users[user]]);
                    }
                }

                this.setState({
                    userList :this.state.userList,
                    adminList: this.state.adminList
                })
                // console.log(this.state.userList);
                // console.log(this.state.adminList);

            }
        )
    }





    deleteUser = (userid) =>{
        this.adminUserService.deleteUser(userid).then(
            () => this.getAllUsers()
        );
    };

    makeUserAdmin = (username) =>
    {
        this.adminUserService.makeUserAdmin(username).then(
            () => this.getAllUsers()
        );
    };



    render(){
        return(
            <MyContext.Consumer>
                {(context) => (
                    <React.Fragment>
                        <div className="wrapper container web-dev-overflow p-0">


                            <div className="card col-12 web-dev-overflow p-0">

                                <h5 className="card-header text-center font-weight-bold text-uppercase py-4">Users</h5>

                                <div className="card-body web-dev-overflow">
                                    <div id="table" className="table-editable">
                                        <table
                                            className="table  table-responsive-md table-striped text-center ">
                                        </table>


                                        <table
                                            className="table table-bordered table-responsive-md table-striped text-center ">

                                            <tr>
                                                <th className="text-center">First Name</th>
                                                <th className="text-center">LastName</th>
                                                <th className="text-center">Username</th>
                                                <th className="text-center"> View Transactions </th>
                                                <th className="text-center"> Add Bill </th>
                                            </tr>



                                            {

                                                this.state.userList.map((user,index)  =>
                                                    <tr key={index}>
                                                        <td className="pt-3-half" >{user[0].firstName}</td>
                                                        <td className="pt-3-half" >{user[0].lastName}</td>
                                                        <td className="pt-3-half" >{user[0].username}</td>
                                                        <td className="pt-3-half">
                                                            <Link to ={`/transactions-admins/${user[0]._id}`}>
                                                                <span className="table-remove" ><i onClick={() =>
                                                        {
                                                            context.setUserForViewingTrans(user);
                                                            this.setViewTransNeeded()
                                                        }}  className="btn fa fa-eye " aria-hidden="true"/></span></Link>
                                                        </td>
                                                        <td className="pt-3-half">
                                                            <Link to ={`/admin/bills/${user[0]._id}`}>
                                                                <span className="table-remove" ><i  className="btn fa fa-file-archive-o " aria-hidden="true"/></span></Link>
                                                        </td>

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
        )
    }

}

AdminOverView.contextType = MyContext;
export default AdminOverView


