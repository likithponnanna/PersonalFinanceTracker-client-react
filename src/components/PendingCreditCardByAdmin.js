import React from "react";
import GuestProductService from "../service/GuestProductService"


class PendingCreditCardByAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.guestProductService = GuestProductService.getInstance();
        this.state = {
            guestListStatusPending:[]
        }
    }


    getGuestUsersForCreditCardStatusPending = () => {
        let initList = [];
        this.guestProductService.getGuestUsers().then(
            (guests) => {
                console.log("guests",guests);
                // this.setState({
                //                   guestListStatusPending:[]
                //               });

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

                console.log("guestlist pending",this.state.guestListStatusPending)

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




    render() {

        return (

            <div>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col"> Role</th>
                        <th scope="col"> FirstName</th>
                        <th scope="col"> LastName</th>
                        <th scope="col"> Date of Birth</th>
                        <th scope="col"> Address</th>
                        <th scope="col"> Email ID</th>
                        <th scope="col"> Phone Number</th>
                        <th scope="col"> Status</th>
                        <th scope="col">Product</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.state.guestListStatusPending.map(
                        (guest) =>
                            <tr key={guest._id}>
                                <th scope="row">Guest</th>
                                <td>{guest.firstName}</td>
                                <td>{guest.lastName}</td>
                                <td>{guest.dob}</td>
                                <td>{guest.address}</td>
                                <td>{guest.email}</td>
                                <td>{guest.phoneNumber}</td>
                                <td>{guest.status}</td>
                                <td>{guest.product ? guest.product.name : "No Product Exists"}</td>
                                <td> <button type="button"
                                             className="btn btn-outline-success"
                                             id="editButton"
                                             onClick={() =>
                                                 this.approveGuestUsers(guest)
                                             }>Approve </button> </td>
                                <td> <button type="button"
                                             className="btn btn-outline-danger"
                                             id="editButton"
                                             onClick={() =>
                                                 this.rejectGuestUsers(guest)
                                             }>Reject </button> </td>

                            </tr>
                    )
                    }

                    </tbody>

                </table>

            </div>


        )

    }

}
export default PendingCreditCardByAdmin