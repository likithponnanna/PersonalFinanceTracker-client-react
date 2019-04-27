import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Map from "./Map";
import PropertyService from "../service/properties.service.client";
import MyContext from "./MyContext";
import mapStyle from '../styling/mapStyle'
import UniversalService from "../service/universal.service.client";
import AdminUserService from "../service/admin.service.client";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import AdminUserListContent from "./AdminUserListContent";
import AdminSideBar from "./AdminSideBar";
import UserNavBar from "./UserNavBar";
import AdminInfoPills from "./AdminInfoPills";


class AdminUsersListMainContent extends Component {
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



    }




    render(){
        return(
            <MyContext.Consumer>
                {(context) => (
                    <React.Fragment>
                        <div className="wrapper bg-dark">
                            <AdminSideBar/>
                            <div id="content" className={` ${context.state.sidebarAct  ? 'active' : ''} `}>
                                <UserNavBar
                                    sidebarCollapse={context.sidebarCollapse}/>

                                <div className="container">


                        <div className="container ">

                            <h2 className="web-dev-text-center mb-2"> Overview </h2>


                                <AdminInfoPills/>

                                <div className="row card mt-4">


                                                <AdminUserListContent/>

                                </div>



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

AdminUsersListMainContent.contextType = MyContext;
export default AdminUsersListMainContent