import React from 'react'

const AdminInfoPills = () =>
    <div className="row">
        <div className="col-md-3">
            <div className="card-counter primary">
                <i className="fa fa-user"/>
                <span className="count-numbers">12</span>
                <span className="count-name">Admins</span>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card-counter danger">
                <i className="fa fa-usd"/>
                <span className="count-numbers">599</span>
                <span className="count-name">Transactions</span>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card-counter success">
                <i className="fa fa-money"/>
                <span className="count-numbers">6875</span>
                <span className="count-name">Budget</span>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card-counter info">
                <i className="fa fa-users"/>
                <span className="count-numbers">35</span>
                <span className="count-name">Users</span>
            </div>
        </div>
    </div>;

    export default AdminInfoPills