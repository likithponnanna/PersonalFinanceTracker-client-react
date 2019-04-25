import React from "react";
import MainPageService from "../service/MainPageService";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.mainPageService = MainPageService.getInstance()
        this.state = {
            profile:{
                currentUser: []
            }
        }
    }

    getProfile = () =>
    {
        this.mainPageService.getProfile().then (
            (sess) => {
                this.setState({
                    profile:sess
                              })
                console.log(this.state.profile)
            }
        )
    }

    componentDidMount() {
        this.getProfile()
        console.log(this.state.profile)
    }

    render () {

        return (

            <div>

<h1>{JSON.stringify(this.state.profile.currentUser[0])}</h1>

            </div>

        )
    }

}
export default Profile