import React from 'react'
import AdminUserService from "../service/AdminUserService"

class AddBillForUserByAdmin extends React.Component{

    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance();
        this.state = {
            userid:props.match.params.userid,
            username:props.match.params.username,
            billType: '',
            billName: '',
            bill_due_date: '',//Date,
            bill_posted_date: '',//Date,
            bill_pending: Boolean,
            bill_amount: Number,
            registeredFlag: false,
            registeredFlagTrue: true,
        }
    }

    setRegisteredFlagTrue = () => {
        this.setState({
                          registeredFlag:this.state.registeredFlagTrue
                      })
    }


    billTypeChanged = event => {
        this.setState({
                          billType: event.target.value
                      })
    };

    billNameChanged = event => {
        this.setState({
                          billName: event.target.value
                      })
    };

    billDueDateChanged = event => {
        this.setState({
                          bill_due_date: event.target.value
                      })
    };

    billPostedDateChanged = event => {
        this.setState({
                          bill_posted_date: event.target.value
                      })
    };

    billPendingChanged = event => {
        this.setState({
                          bill_pending: event.target.value
                      })
    };

    billAmountChanged = event => {
        this.setState({
                          bill_amount: event.target.value
                      })
    };

    addBillForUSer = () =>
    {
        this.adminUserService.addBillForUser(this.state)
    }

    render () {

        return (

            <div>

                <h1> Add Bill for {this.state.username} </h1>

                <div className="form-group row">
                    <label htmlFor="billtype" className="col-sm-2">
                        BillType
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            placeholder="billtype"
                            id="billtype"
                            onChange={this.billTypeChanged}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="billname" className="col-sm-2">
                        BillName
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            placeholder="billname"
                            id="billname"
                            onChange={this.billNameChanged}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="billduedate" className="col-sm-2">
                        BillDueDate
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            placeholder="billduedate"
                            id="billduedate"
                            onChange={this.billDueDateChanged}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="billposteddate" className="col-sm-2">
                        BillPostedDate
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            placeholder="billposteddate"
                            id="billposteddate"
                            onChange={this.billPostedDateChanged}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="billpending" className="col-sm-2">
                        BillPending
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            placeholder="billpending"
                            id="billpending"
                            onChange={this.billPendingChanged}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="v" className="col-sm-2">
                        BillAnmount
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            placeholder="billamount"
                            id="billamount"
                            onChange={this.billAmountChanged}
                        />
                    </div>
                </div>


                <button type="button"
                        className="btn btn-success" onClick={() =>
                {
                    this.addBillForUSer();
                    this.setRegisteredFlagTrue();

                }}>
                    ADD
                </button>


                {this.state.registeredFlag === true &&

                 <div className="alert alert-success" role="alert" id="alert">
                     You have successfully added bill to {this.state.username}
                 </div>

                }



            </div>

        )
    }
}
export default AddBillForUserByAdmin