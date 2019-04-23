import React from "react";
import AdminUserService from "../service/AdminUserService";

class ProfileOfOtherUser extends React.Component {
    constructor(props) {
        super(props);
        this.adminUserService=AdminUserService.getInstance()
        this.state = {
            userid: props.match.params.userid,
            user: undefined
        }

    }

    findUserGivenId = (userid) => {
        this.adminUserService.findUserGivenId(userid).then(
            user => {
                this.setState({
                    user:this.state.user
                              })
            }
        )

    }


    render () {

        return (

            <div>
                hi
            </div>

        )

    }

}
export default ProfileOfOtherUser
