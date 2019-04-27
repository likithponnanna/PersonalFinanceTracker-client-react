import React, {Component} from 'react'
import MyContext from './MyContext'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import UserOverViewTabContent from "./UserOverViewTabContent";
import CreditCardModal from "./CreditCardModal";
import AdminSideBar from "./AdminSideBar";
import AdminOverView from "./AdminOverView";
import '../styling/admin.style.client.css'
import TransactionsForAdmin from "./TransactionsForAdmin";

class TransactionListParent extends Component{
    constructor(props){
        super(props);
        this.state = {
            userid: props.match.params.userid
        }
    }
    render() {
        return(

            <div>

                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>

                            <div className="wrapper bg-dark">
                                <AdminSideBar/>
                                <div id="content" className={` ${context.state.sidebarAct  ? 'active' : ''} `}>
                                    <UserNavBar
                                        sidebarCollapse={context.sidebarCollapse}/>

                                    <div className="container">
                                        <TransactionsForAdmin
                                            userid ={this.state.userid}/>
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
export default TransactionListParent