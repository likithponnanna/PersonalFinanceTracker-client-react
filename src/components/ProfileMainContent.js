import React, {Component} from 'react'
import MyContext from './MyContext'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import UserOverViewTabContent from "./UserOverViewTabContent";
import CreditCardModal from "./CreditCardModal";
import PropertyService from "../service/properties.service.client";
import ProfilePage from "./ProfilePage";
import AdminUserService from "../service/admin.service.client";
import {withRouter} from "react-router";



class ProfileMainContent extends Component{
    constructor(props){

        super(props);
        this.propertyService = new PropertyService();
        this.adminService = new AdminUserService();
        this.state = {

        }
    }

    componentDidMount() {
        this.adminService.findCurrentLoggedInUser()
            .then(user => {
                if (user === undefined) {
                    this.props.history.push('/login')
                }
            });
    }


    render() {
        return(

            <div>

                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>

                            <div className="wrapper">
                                <SideBarUser/>
                                <div id="content" className={` ${context.state.sidebarAct  ? 'active' : ''} `}>
                                    <UserNavBar
                                        sidebarCollapse={context.sidebarCollapse}/>

                                    <div className="container">

                                        <br/><br/> <br/>
                                        <ProfilePage

                                        />
                                    </div>
                                </div>
                            </div>


                        </React.Fragment>
                    )}
                </MyContext.Consumer>
            </div>
        )
    }
}

export default withRouter((props) => (
    <MyContext.Consumer>
        {(context) => <ProfileMainContent {...props} context={context}/>}
    </MyContext.Consumer>
))
