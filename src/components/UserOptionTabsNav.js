import React, {Componenet} from 'react';
import {Link} from "react-router-dom";
import MyContext from "./MyContext";

const UserOptionTabsNav = () =>
    <div className="web-dev-tab-style-par ">
        <MyContext.Consumer>
            {(context) => (
                <React.Fragment>
    <nav className="nav nav-tabs nav-justified">

        <Link to="/user" onClick={()=>context.setCurrentSelectedTab('OVERVIEW')}> <li className={`nav-item nav-link mr-2 border-bottom  ${context.state.currentSelectedTab==='OVERVIEW'  ? 'active bg-dark' : 'web-dev-active-pills-user-home-n'}`}  >Overview</li></Link>
        <Link to="/credit-score" onClick={()=>context.setCurrentSelectedTab('CREDIT-SCORE')} > <li className={`nav-item nav-link mr-2 border-bottom ${context.state.currentSelectedTab==='CREDIT-SCORE'  ? 'active bg-dark' : 'web-dev-active-pills-user-home-n'}`} >Credit Score</li></Link>
        <Link to="/transactions" onClick={()=>context.setCurrentSelectedTab('TRANSACTIONS')}><li className={`nav-item nav-link mr-2 border-bottom ${context.state.currentSelectedTab==='TRANSACTIONS'  ? 'active bg-dark' : 'web-dev-active-pills-user-home-n'}`} >Transactions</li></Link>
        <Link to="/stock-search" onClick={()=>context.setCurrentSelectedTab('STOCK-SEARCH')}><li className={`nav-item nav-link mr-2 border-bottom ${context.state.currentSelectedTab==='STOCK-SEARCH'  ? 'active bg-dark' : 'web-dev-active-pills-user-home-n'}`} >Stock Search</li></Link>
        <Link to="/budget" onClick={()=>context.setCurrentSelectedTab('BUDGET')}><li className={`nav-item nav-link mr-2 border-bottom ${context.state.currentSelectedTab==='BUDGET'  ? 'active bg-dark' : 'web-dev-active-pills-user-home-n'}`} >Budget</li></Link>
        <Link to="/bills" onClick={()=>context.setCurrentSelectedTab('BILLS')}><li className={`nav-item nav-link mr-2 border-bottom ${context.state.currentSelectedTab==='BILLS'  ? 'active bg-dark' : 'web-dev-active-pills-user-home-n'}`} >Bills</li></Link>
        <Link to="/forex-conversion" onClick={()=>context.setCurrentSelectedTab('FOREX')}> <li className={`nav-item nav-link mr-2 border-bottom  ${context.state.currentSelectedTab==='FOREX'  ? 'active bg-dark' : 'web-dev-active-pills-user-home-n'}`} >Forex Conversion</li></Link>

    </nav>
                </React.Fragment>
            )}
        </MyContext.Consumer>
    </div>
;

export default UserOptionTabsNav