import React from 'react'
import AdminUserService from "../service/admin.service.client"
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import MyContext from './MyContext'

class AdminBillsContent extends React.Component{
    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance();
        this.state = {
            billName: '',
            billType: '',
            bill_due_date: '',
            bill_pending:'',
            bill_amount: '',
            type:'PENDING',
            productList:[],
            productToBeEdited: undefined,
            activeBtn: 'PENDING',
            addUserFormNeeded: false,
            addUserForm: true,
            updateUserFormNeeded: false,
            editForm:true,
            userId: props.userId,
            bills : [],
            billToBeEdited: undefined


        }
    }


    componentDidMount() {
        console.log("Params in bill", this.props.userId);

        this.adminUserService.findBillsByUserID(this.props.userId)
            .then(bills => {

                console.log("Bills returned", bills);

                let BillsList = [];
                for (let i = 0; i < bills.length; i++) {

                    if (bills.length !== 0) {
                        if (bills[i].bill_pending === true) {
                            BillsList.push(bills[i]);
                        }
                    }
                }


                this.setState({
                    bills: BillsList
                })


            }
            )



        //console.log("Bills for user", this.state.bills);



    }


    getPendingBills =() => {

        this.adminUserService.findBillsByUserID(this.props.userId)
            .then(bills => {

                let BillsList =[];
                for (let i = 0; i <bills.length ; i++) {

                    if(bills.length!==0) {
                        if (bills[i].bill_pending === true) {
                            BillsList.push(bills[i]);
                        }
                    }
                }


                this.setState({
                    bills: BillsList
                })


            })

    }

    getPaidBills =() => {

        this.adminUserService.findBillsByUserID(this.props.userId)
            .then(bills => {

                let BillsList =[];
                for (let i = 0; i <bills.length ; i++) {

                    if(bills.length!==0) {
                        if (bills[i].bill_pending === false) {
                            BillsList.push(bills[i]);
                        }
                    }
                }

                this.setState({
                    bills: BillsList
                })})

    }





    toggleAddUSer = () => {
        this.setState({
            addUserFormNeeded: !this.state.addUserFormNeeded
        })
    };



    createBill = () => {
        if(this.state.billName!==""|| this.state.billType !=="" || this.state.bill_due_date !=="" || this.state.bill_amount !=="") {

            let newBill = {
                billName: this.state.billName,
                billType: this.state.billType,
                bill_due_date: this.state.bill_due_date,
                bill_pending: true,
                bill_amount: this.state.bill_amount
            };

            console.log("Create User bill", newBill);


            this.adminUserService.createBill(newBill, this.state.userId)
                .then(bill =>{
                    this.getPendingBills()


                   /* console.log("Create User response", bill);
                         this.setState({
                             bills : this.state.bills.push(bill)
                     })*/
                    }
                )

        }else {
            alert("Fields cannot be left empty");
        }

    };

    updateBill = () =>{


        let newBill = {
            _id: this.state.billToBeEdited._id,
            billName: this.state.billName,
            billType: this.state.billType,
            bill_due_date: this.state.bill_due_date,
            bill_pending: true,
            bill_amount: this.state.bill_amount
        }


        this.adminUserService.updateBill(newBill)
            .then(response =>{  this.setState({
                bills: this.state.bills.map(bill =>
                    bill._id === newBill._id ? newBill : bill,
                )
            })  }
        );
    };


    deleteBill = (billId) =>{
        this.adminUserService.deleteBill(billId)
            .then(response =>{
                this.setState({
                    bills :  this.state.bills.filter(bill => bill._id !== billId) })
            })

    };


    toggleUpdateForm = () => {
        this.setState({
            updateUserFormNeeded: !this.state.updateUserFormNeeded
        })
    };

    setBillToBeEdited=  (bill) => {

        this.setState({
            billToBeEdited:bill,
            billName: bill.billName,
            billType: bill.billType,
            bill_due_date: bill.bill_due_date,
            bill_pending: bill.bill_pending,
            bill_amount: bill.bill_amount,

        })
    };



    billNameChanged = event => {
        this.setState({
            billName: event.target.value
        })
    };

    billTypeChanged = event => {
        this.setState({
            billType: event.target.value
        })
    };

    bill_due_dateChanged = event => {
        this.setState({
            bill_due_date: event.target.value
        })
    };



    bill_amountChanged = event => {
        this.setState({
            bill_amount: event.target.value
        });
    };




    setActiveBtn = (btn) => {

        if(btn==='PENDING') {
            this.setState({
                activeBtn: btn,
                type: btn
            })
        }else if(btn==='PAID') {
            this.setState({
                activeBtn: btn,
                type: btn
            })
        }
    }



    render () {

        return (
            <div className="container web-dev-overflow p-0">
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>


                            <div className="wrapper container web-dev-overflow p-0">


                                <div className="card col-12 web-dev-overflow p-0">

                                    <h5 className="card-header text-center font-weight-bold text-uppercase py-4">Bill Manager</h5>

                                    <div className="card-body web-dev-overflow">
                                        <div id="table" className="table-editable">
                                            <table
                                                className="table  table-responsive-md table-striped text-center ">
                                                <tr>
                                                    <button onClick={()=>{ this.setActiveBtn('PENDING');this.getPendingBills() }} className={` mr-2 ${this.state.activeBtn==='PENDING' ? 'btn-secondary' : 'btn-outline-secondary'} `}>
                                                        Pending Bills
                                                    </button>
                                                    <button onClick={()=>{ this.setActiveBtn('PAID'); this.getPaidBills()} } className={`ml-2 mr-1 ${this.state.activeBtn==='PAID' ? 'btn-secondary' : 'btn-outline-secondary'} `} >
                                                        Paid Bills
                                                    </button>
                                                </tr>
                                            </table>



                                            <span className="table-add float-right mb-3 mr-2 " onClick={()=> this.toggleAddUSer()}><a href="#!" className="text-success">
                                              <i className="fa fa-plus" aria-hidden="true"/></a></span>

                                            <table
                                                className="table table-bordered table-responsive-md table-striped text-center ">

                                                <tr>
                                                    <th className="text-center">Bill Type</th>
                                                    <th className="text-center">Bill Name</th>
                                                    <th className="text-center">Bill Due Date</th>
                                                    <th className="text-center">Bill Amount</th>
                                                    <th className="text-center"> </th>
                                                    <th className="text-center"> </th>
                                                </tr>

                                                {this.state.updateUserFormNeeded &&    <tr>
                                                    <td className="pt-3-half"  ><input value={this.state.billType} type="text" onChange={(event)=>this.billTypeChanged(event)}/> </td>
                                                    <td className="pt-3-half" ><input value={this.state.billName} type="text" onChange={(event)=>this.billNameChanged(event)}/></td>
                                                    <td className="pt-3-half" ><input value={this.state.bill_due_date.slice(0,10)} type="date"  onChange={(event)=>this.bill_due_dateChanged(event)}/></td>
                                                    <td className="pt-3-half" ><input value={this.state.bill_amount} type="number" onChange={(event)=>this.bill_amountChanged(event)}/></td>
                                                    <td className="pt-3-half">
                                                      <span className="table-remove"><button type="button"
                                                                                             className="btn  btn-rounded btn-sm my-0"> </button></span>
                                                    </td>
                                                    <td>
                                                        <span className="table-remove"><button type="button"
                                                                                               className="btn btn-danger btn-rounded btn-sm my-0" onClick={()=>{ this.toggleUpdateForm(); this.updateBill() }}>Update</button></span>
                                                    </td>

                                                </tr>}


                                                {this.state.addUserFormNeeded && <tr>
                                                    <td className="pt-3-half"  ><input type="text"  onChange={(event)=>this.billTypeChanged(event)}/> </td>
                                                    <td className="pt-3-half"  ><input type="text" onChange={(event)=>this.billNameChanged(event)}/> </td>
                                                    <td className="pt-3-half" ><input type="date" onChange={(event)=>this.bill_due_dateChanged(event)}/></td>
                                                    <td className="pt-3-half" ><input type="number" onChange={(event)=>this.bill_amountChanged(event)}/></td>
                                                    <td className="pt-3-half">
                                                      <span className="table-remove"><button type="button"
                                                                                             className="btn btn-success btn-rounded btn-sm my-0" onClick={()=>{ this.toggleAddUSer(); this.createBill()}}>Add</button></span>
                                                    </td>
                                                    <td>
                                                        <span className="table-remove"><button type="button"
                                                                                               className="btn  btn-rounded btn-sm my-0"> </button></span>
                                                    </td>

                                                </tr>
                                                }

                                                {

                                                        this.state.bills.map((bill, index) =>
                                                                <tr key={index}>
                                                                    <td className="pt-3-half">{bill.billType}</td>
                                                                    <td className="pt-3-half">{bill.billName}</td>
                                                                    <td className="pt-3-half">{bill.bill_due_date.slice(0,10)}</td>
                                                                    <td className="pt-3-half">{bill.bill_amount}</td>
                                                                    <td className="pt-3-half">
                                                                        {this.state.addUserFormNeeded === true || this.state.updateUserFormNeeded === true ?
                                                                            <div/> :
                                                                            <span className="table-remove"><i
                                                                                onClick={() => {
                                                                                    this.toggleUpdateForm();
                                                                                    this.setBillToBeEdited(bill)
                                                                                }} className="fa fa-edit fa-2x"
                                                                                aria-hidden="true"/></span>
                                                                        }

                                                                    </td>
                                                                    <td>
                                                                        {this.state.addUserFormNeeded === true || this.state.updateUserFormNeeded === true ?
                                                                            <div/> :
                                                                            <span className="table-trash">
                                                        <i onClick={() => this.deleteBill(bill._id)}
                                                           className="fa fa-trash fa-2x " aria-hidden="true"/>
                                                    </span>}
                                                                    </td>

                                                                </tr>
                                                        )


                                                }






                                            </table>
                                        </div>
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
AdminBillsContent.contextType = MyContext;
export default AdminBillsContent



