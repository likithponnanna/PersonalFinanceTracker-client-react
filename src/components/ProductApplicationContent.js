import React from "react";
import GuestProductService from "../service/GuestProductService"
import MyContext from "./MyContext";


class ProductApplicationContent extends React.Component {
    constructor(props) {
        super(props);
        this.guestProductService = GuestProductService.getInstance();
        this.state = {
            guestListStatusPending:[],
            activeBtn: 'PENDING'
        }
    }


    getGuestUsersForCreditCardStatusPending = () => {
        let initList = [];
        this.guestProductService.getGuestUsers().then(
            (guests) => {
                for(let i=0; i<guests.length;i++)
                {
                    if(guests[i].status === "PENDING" )
                    {
                        initList.push(guests[i])
                    }
                }
                this.setState({
                    guestListStatusPending:initList
                })

            }
        )
    }


    getGuestUsersForCreditCardStatusApproved = () => {
        let initList = [];
        this.guestProductService.getGuestUsers().then(
            (guests) => {
                for(let i=0; i<guests.length;i++)
                {
                    if(guests[i].status === "APPROVED" )
                    {
                        initList.push(guests[i])
                    }
                }
                this.setState({
                    guestListStatusPending:initList
                })

            }
        )
    }

    getGuestUsersForCreditCardStatusRejected = () => {
        let initList = [];
        this.guestProductService.getGuestUsers().then(
            (guests) => {
                for(let i=0; i<guests.length;i++)
                {
                    if(guests[i].status === "REJECTED" )
                    {
                        initList.push(guests[i])
                    }
                }
                this.setState({
                    guestListStatusPending:initList
                })

            }
        )
    }




    approveGuestUsers = (guest) => {
        this.guestProductService.approveGuestUsers(guest).then(
            () => this.getGuestUsersForCreditCardStatusPending()
        )
    }

    rejectGuestUsers = (guest) => {
        this.guestProductService.rejectGuestUsers(guest).then(
            () => this.getGuestUsersForCreditCardStatusPending()
        )
    }

    componentDidMount() {
        this.getGuestUsersForCreditCardStatusPending()
    }

    setActiveBtn = (btn) =>
        this.setState({
            activeBtn: btn
        })




    render() {

        return (

            <div className="container web-dev-overflow p-0">
            <MyContext.Consumer>
            {(context) => (
            <React.Fragment>

                <div className="wrapper container web-dev-overflow p-0">


                    <div className="card col-12 web-dev-overflow p-0">

                        <h5 className="card-header text-center font-weight-bold text-uppercase py-4">Product Applications</h5>

                        <div className="card-body web-dev-overflow">
                            <div id="table" className="table-editable">
                                <table
                                    className="table  table-responsive-md table-striped text-center ">
                                    <tr>
                                        <button onClick={()=>{ this.setActiveBtn('PENDING');this.getGuestUsersForCreditCardStatusPending() }} className={` mr-2 ${this.state.activeBtn==='PENDING' ? 'btn-secondary' : 'btn-outline-secondary'} `}>
                                            Pending Applications
                                        </button>
                                        <button onClick={()=>{ this.setActiveBtn('APPROVED'); this.getGuestUsersForCreditCardStatusApproved()} } className={`ml-2 mr-1 ${this.state.activeBtn==='APPROVED' ? 'btn-secondary' : 'btn-outline-secondary'} `} >
                                            Approved Applications
                                        </button>
                                        <button onClick={()=>{ this.setActiveBtn('REJECTED'); this.getGuestUsersForCreditCardStatusRejected()} } className={`ml-2 mr-1 ${this.state.activeBtn==='REJECTED' ? 'btn-secondary' : 'btn-outline-secondary'} `} >
                                            Rejected Applications
                                        </button>
                                    </tr>
                                </table>


                                <table
                                    className="table table-bordered table-responsive-md table-striped text-center ">

                                    <tr>
                                        <th className="text-center">First Name</th>
                                        <th className="text-center">LastName</th>
                                        <th className="text-center">Date of Birth</th>
                                        <th className="text-center">Address</th>
                                        <th className="text-center">Email ID </th>
                                        <th className="text-center">Phone Number </th>
                                        <th className="text-center"> Status</th>
                                           <th className="text-center"> Product</th>
                                        {this.state.activeBtn==='PENDING' && <th className="text-center"> Approve </th> }
                                        {this.state.activeBtn==='PENDING' && <th className="text-center">Reject</th>}
                                    </tr>






                                    {

                                        this.state.guestListStatusPending.map((guest,index)  =>
                                            <tr key={index}>
                                                <td className="pt-3-half" >{guest.firstName}</td>
                                                <td className="pt-3-half" >{guest.lastName}</td>
                                                <td className="pt-3-half" >{guest.dob}</td>
                                                <td className="pt-3-half" >{guest.address}</td>
                                                <td className="pt-3-half" >{guest.email}</td>
                                                <td className="pt-3-half" >{guest.phoneNumber}</td>
                                                <td className="pt-3-half" >{guest.status }</td>
                                                <td className="pt-3-half" >{guest.product ? guest.product.name : "No Product Exists"}</td>
                                                {this.state.activeBtn==='PENDING' &&    <td className="pt-3-half">

                                                        <span className="table-remove" ><i onClick={() =>
                                                            this.approveGuestUsers(guest)}  className="fa fa-check fa-2x" aria-hidden="true"/></span>
                                                </td>}
                                                {this.state.activeBtn === 'PENDING' && <td>

                                                        <span className="table-trash">
                                                        <i onClick={() =>
                                                            this.rejectGuestUsers(guest)} className="fa fa-trash fa-2x "
                                                           aria-hidden="true"/>
                                                    </span>
                                                </td>
                                                }

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
export default ProductApplicationContent
