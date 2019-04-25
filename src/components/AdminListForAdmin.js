import React from 'react'
import AdminUserService from "../service/AdminUserService"

class AdminListForAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance();
        this.state={
            adminList:[]

        }
    }

    getAllAdmins = () => {
        let adminUser = []
        this.adminUserService.getAllUsers().then(
            users => {

                for (let i = 0; i < users.length; i++) {
                    if (users[i].isAdmin === true) {
                        adminUser.push(users[i]);
                    }
                }

                this.setState({
                                  adminList: adminUser

                              })

            }
        )
    };


    componentDidMount() {
        this.getAllAdmins()
    }

    render() {

        return (

            <div>

                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col"> Role</th>
                        <th scope="col"> Username</th>
                        <th scope="col"> Password</th>
                        <th scope="col"> FirstName</th>
                        <th scope="col"> LastName</th>
                        <th scope="col"> Date of Birth</th>
                        <th scope="col"> Address</th>
                        <th scope="col"> Email ID</th>
                        <th scope="col"> Phone Number</th>

                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.state.adminList.map(
                            (user) =>
                                <tr key={user._id}>
                                    <th scope="row">Admin</th>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.dob}</td>
                                    <td>{user.address}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>

                                    </td>

                                </tr>
                        )
                    }

                    </tbody>



                </table>

            </div>
        )
    }
}
export default AdminListForAdmin