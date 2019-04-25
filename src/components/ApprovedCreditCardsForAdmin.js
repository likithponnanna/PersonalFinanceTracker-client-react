import React from "react";
import AdminUserService from "../service/AdminUserService"
import MyContext from './MyContext'
import './MainPageStyle.css'
import GuestProductService from "../service/GuestProductService"


class ApprovedCreditCardsForAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.guestProductService = GuestProductService.getInstance()
        this.state = {
            guestCreditCardList:[]
        }
    }


    getGuestUsersForCreditCardStatusFixed = () => {
        let initList = []
        this.guestProductService.getGuestUsers().then(
            (guests) => {
                console.log("guests",guests);
                // this.setState({
                //                   guestListStatusFixed:[]
                //               });

                for(let i=0; i<guests.length;i++)
                {
                    if(guests[i].status === "APPROVED" || guests[i].status === "REJECTED" )
                    {
                        initList.push(guests[i])
                    }
                }

                this.setState({
                                  guestCreditCardList:initList
                              })

                console.log("guestlist",this.state.guestCreditCardList)

            }
        )
    }

    componentDidMount() {
        this.getGuestUsersForCreditCardStatusFixed()
    }





    render () {

        return (

            <div>


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

                {
                    this.state.guestCreditCardList.map(
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
                            <td>{guest.product ? guest.product.name: "No Product Exists" }</td>

                        </tr>
                )
                }



                </tbody>

            </table>

                </div>


            </div>

        )

    }

}
export default ApprovedCreditCardsForAdmin