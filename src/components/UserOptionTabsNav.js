import React, {Componenet} from 'react';
import {Link} from "react-router-dom";
import MyContext from "./MyContext";
import  '../styling/modals.style.client.css'

const UserOptionTabsNav = ({props}) =>
    <div className="web-dev-tab-style-par ">
        <MyContext.Consumer>
            {(context) => (
                <React.Fragment>
    <nav className="nav nav-tabs nav-justified ">
        <Link to="/user" onClick={()=>context.setCurrentSelectedTab('OVERVIEW')}> <li className={`nav-item nav-link mr-2 border-bottom  ${ window.location.pathname=== '/user' ? 'active bg-dark' : 'web-dev-active-pills-user-home-n btn-outline-secondary'}`}  >Overview</li></Link>
        <Link to="/credit-score" onClick={()=>context.setCurrentSelectedTab('CREDIT-SCORE')} > <li className={`nav-item nav-link mr-2 border-bottom ${ window.location.pathname=== '/credit-score'  ? 'active bg-dark' : 'web-dev-active-pills-user-home-n btn-outline-secondary  web-dev-border-pills'}`} >Credit Score</li></Link>
        <Link to="/transactions" onClick={()=>context.setCurrentSelectedTab('TRANSACTIONS')}><li className={`nav-item nav-link mr-2 border-bottom ${ window.location.pathname=== '/transactions'  ? 'active bg-dark' : 'web-dev-active-pills-user-home-n btn-outline-secondary'}`} >Transactions</li></Link>
        <Link to="/stock-search" onClick={()=>context.setCurrentSelectedTab('STOCK-SEARCH')}><li className={`nav-item nav-link mr-2 border-bottom ${ window.location.pathname=== '/stock-search' || window.location.pathname.includes("search") ? 'active bg-dark' : 'web-dev-active-pills-user-home-n btn-outline-secondary'}`} >Stock Search</li></Link>
        <Link to="/budget" onClick={()=>context.setCurrentSelectedTab('BUDGET')}><li className={`nav-item nav-link mr-2 border-bottom ${window.location.pathname=== '/budget' ? 'active bg-dark' : 'web-dev-active-pills-user-home-n btn-outline-secondary'}`} >Budget</li></Link>
        <Link to="/bills" onClick={()=>context.setCurrentSelectedTab('BILLS')}><li className={`nav-item nav-link mr-2 border-bottom ${window.location.pathname=== '/bills'  ? 'active bg-dark'  : 'web-dev-active-pills-user-home-n btn-outline-secondary'}`} >Bills</li></Link>
        <Link to="/forex-conversion" onClick={()=>context.setCurrentSelectedTab('FOREX')}> <li className={`nav-item nav-link mr-2 border-bottom  ${window.location.pathname=== '/forex-conversion'  ? 'active bg-dark' : 'web-dev-active-pills-user-home-n btn-outline-secondary'}`} >Investment Assistant</li></Link>

    </nav>
                </React.Fragment>
            )}
        </MyContext.Consumer>
    </div>
;

export default UserOptionTabsNav