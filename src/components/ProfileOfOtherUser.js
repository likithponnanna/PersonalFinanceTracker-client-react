import React from "react";
import AdminUserService from "../service/AdminUserService";

class ProfileOfOtherUser extends React.Component {
    constructor(props) {
        super(props);
        this.adminUserService=AdminUserService.getInstance()
        this.adminService = new AdminUserService();
        this.state = {
            userid: this.props.match.params.userid,
            user: undefined
        }

    }

    findUserGivenId = (userid) => {
        this.adminUserService.findUserGivenId(userid).then(
            user => {
                console.log("inside function 1",user)
                this.setState({
                    user:user
                              })
                console.log("inside function",user)
            }

        )

    }

    componentDidMount() {
       // this.adminUserService.findUserGivenId(this.state.userid);
        this.adminUserService.findUserGivenId(this.props.match.params.userid)
            .then((user) => {
                this.setState({
                    user:user
                              })
            })

    }



    render () {

        return (

            <div>

                <h2>Details of User {this.state.user ? this.state.user.firstName : " "}</h2>


                <table className="table">

                    <thead className="thead-dark">
                    <tr>


                        <th scope="col"> FirstName</th>
                        <th scope="col"> LastName</th>
                        <th scope="col"> Date of Birth</th>
                        <th scope="col"> Address</th>
                        <th scope="col"> Email ID</th>
                        <th scope="col"> Phone Number</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>


                        <td><h3>{this.state.user ? this.state.user.firstName : " "}</h3></td>
                        <td><h3>{this.state.user ? this.state.user.lastName : " "}</h3></td>
                        <td><h3>{this.state.user ? this.state.user.dob : " "}</h3></td>
                        <td><h3>{this.state.user ? this.state.user.address : " "}</h3></td>
                        <td><h3>{this.state.user ? this.state.user.email : " "}</h3></td>
                        <td><h3>{this.state.user ? this.state.user.phoneNumber : " "}</h3></td>
                    </tr>


                    </tbody>

                </table>

            </div>

        )

    }

}
export default ProfileOfOtherUser
