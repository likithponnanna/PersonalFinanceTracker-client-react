import React from 'react'
import AdminUserService from "../service/AdminUserService"

class AdminUser extends React.Component{
    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance();
        this.state = {
            isActive:false

        }
    }

    setActive = () => {
        this.isActive = true;
        this.setState = {
            isActive:this.state.isActive,
            userList: [],
            adminList: []
        }

    }

    getAllUsers = () => {
        this.adminUserService.
    }

    render () {

        return (
         <div>

             <h1>Welcome Admin </h1>

             <ul className="nav nav-tabs">

                 <li >
                     <a className="nav-link" data-toggle="tab"  href="#">
                         Users
                     </a>
                 </li>

                 <li>
                     <a className="nav-link" data-toggle="tab"  href="#">
                         Admins
                     </a>
                 </li>

                 <li>
                     <a className="nav-link" data-toggle="tab"  href="#">CC</a>
                 </li>

             </ul>


         </div>


        )
    }

}
export default AdminUser;