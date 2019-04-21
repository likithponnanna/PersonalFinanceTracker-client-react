import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import MyContext from "./MyContext";
import UserOptionTabsNav from "./UserOptionTabsNav";

const UserNavBar = ({sidebarCollapse}) =>
    <MyContext.Consumer>
        {(context) => (
            <React.Fragment>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

            <button type="button" id="sidebarCollapse" className="btn " onClick={() => sidebarCollapse()}>
                <i className="fa fa-align-left btn-outline-success p-1"/>
            </button>
            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button"
                    data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation" onClick={()=> context.toggleUserMainNavBar()}>
                <i className="fa fa-align-justify"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Team</a>
                    </li>
                </ul>
            </div>
        </div>


    </nav>
            </React.Fragment>
        )}
    </MyContext.Consumer>;
    export default UserNavBar

