import React from 'react'
import AdminUserService from "../service/AdminUserService"
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

class TrackTransactionsByAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance()
        this.state = {
            userList:[]
        }
    }

    getAllUsers = () => {
        let nonAdminUser = []
        this.adminUserService.getAllUsers().then(
            users => {

                for (let i = 0; i < users.length; i++) {
                    if (users[i].isAdmin === false) {
                        nonAdminUser.push(users[i]);
                    }
                }

                this.setState({
                                  userList: nonAdminUser

                              })

            }
        )
    };

    componentDidMount() {
        this.getAllUsers()
    }

    render() {

        return (

            <div>

                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col"> Role</th>
                        <th scope="col"> FirstName</th>
                        <th scope="col"> LastName</th>
                        <th scope="col">username</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.state.userList.map(
                            (user) =>
                                <tr key={user._id}>
                                    <th scope="row">User</th>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.username}</td>

                                    <td>

                                        <Link to ={`/transForAdmin/${user._id}`}>
                                            <button type="button"
                                                    className="btn btn-outline-success" id="editButton"
                                                    // onClick={() =>
                                                    // {
                                                    //     context.setUserForViewingTrans(user);
                                                    //     this.setViewTransNeeded()
                                                    // }}
                                            > View Transactions </button>
                                        </Link>
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
export default TrackTransactionsByAdmin