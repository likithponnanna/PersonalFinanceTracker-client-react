import React, {Component} from 'react'
import MyContext from './MyContext'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import UserOverViewTabContent from "./UserOverViewTabContent";
import CreditCardModal from "./CreditCardModal";
import PropertyService from "../service/properties.service.client";

const placesn = [
    {
        "id": 1,
        "name": "Park Slope",
        "latitude": "40.6710729",
        "longitude": "-73.9988001"
    },
    {
        "id": 2,
        "name": "Bushwick",
        "latitude": "40.6942861",
        "longitude": "-73.9389312"
    },
    {
        "id": 3,
        "name": "East New York",
        "latitude": "40.6577799",
        "longitude": "-73.9147716"
    }
]

class UserHome extends Component{
    constructor(props){

        super(props);
        this.propertyService = new PropertyService();
        this.state = {

            places: []
        }
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
                                        <div className="ml-5">
                                            <UserOptionTabsNav/></div>
                                    <div className="container">

                                        <br/><br/> <br/>
                                        <UserOverViewTabContent

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
export default UserHome