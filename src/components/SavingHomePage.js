import React from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import { Button } from 'react-bootstrap'
import GuestProductService from "../service/GuestProductService"


class SavingHomePage extends React.Component {

    constructor(props) {
        super(props);
        this.guestProductService = GuestProductService.getInstance();
        this.state = {
            guestUserForm: true,
            guestUserFormNeeded: false,
            firstName:" ",
            lastName:" ",
            dob:" ",
            address:" ",
            phoneNumber:" ",
            email:" ",
            product:this.props.saving[0]._id
        }

    }

    setGuestUserForm = () => {
        this.setState({
                          guestUserFormNeeded:this.state.guestUserForm
                      })
    }


    firstNameChanged = event => {
        this.setState({
                          firstName: event.target.value
                      })
    };

    lastNameChanged = event => {
        this.setState({
                          lastName: event.target.value
                      });
    };

    dobChanged = event => {
        this.setState({
                          dob: event.target.value
                      });
    };

    addressChanged = event => {
        this.setState({
                          address: event.target.value
                      });
    };

    phoneNumberChanged = event => {
        this.setState({
                          phoneNumber: event.target.value
                      });
    };

    emailChanged = event => {
        this.setState({
                          email: event.target.value
                      });
    };

    createGuest = () => {
        console.log(this.state.product)
        this.guestproductService.createGuestProduct(this.state)

    }



    render () {

        return (
            <div key={this.props.key}>

                <CardDeck>

                    <div id="card1">
                        <Card style={{ width: '25rem', height:'23rem' }} bg="secondary" >

                            <Card.Body>
                                <Card.Title>

                                    <h2>{this.props.saving[0].name}</h2>

                                </Card.Title>
                                <Card.Img variant="top" src="https://selflender.s3.amazonaws.com/blog/credit-card.png" id="cardImage"/>
                                <Card.Text>

                                    {this.props.saving[0].bank}
                                    {this.props.saving[0].details}
                                </Card.Text>
                                <Button variant="primary"
                                        onClick = {() =>
                                            this.setGuestUserForm()
                                        }>APPLY</Button>

                            </Card.Body>
                        </Card>
                    </div>
                </CardDeck>


                <div>
                    {this.state.guestUserFormNeeded === true &&


                     <div>

                         <div className="form-group row">
                             <label htmlFor="firstName" className="col-sm-2">
                                 First Name
                             </label>
                             <div className="col-sm-10">
                                 <input
                                     className="form-control"
                                     placeholder="firstName"
                                     id="firstName"
                                     onChange={this.firstNameChanged}
                                 />
                             </div>
                         </div>


                         <div className="form-group row">
                             <label htmlFor="lastName" className="col-sm-2">
                                 Last Name
                             </label>
                             <div className="col-sm-10">
                                 <input
                                     className="form-control"
                                     placeholder="lastName"
                                     id="lastName"
                                     onChange={this.lastNameChanged}
                                 />
                             </div>
                         </div>

                         <div className="form-group row">
                             <label htmlFor="dob" className="col-sm-2">
                                 Date of Birth
                             </label>
                             <div className="col-sm-10">
                                 <input
                                     className="form-control"
                                     placeholder="dob"
                                     id="dob"
                                     onChange={this.dobChanged}
                                 />
                             </div>
                         </div>

                         <div className="form-group row">
                             <label htmlFor="address" className="col-sm-2">
                                 Address
                             </label>
                             <div className="col-sm-10">
                                 <input
                                     className="form-control"
                                     placeholder="address"
                                     id="address"
                                     onChange={this.addressChanged}
                                 />
                             </div>
                         </div>

                         <div className="form-group row">
                             <label htmlFor="phoneNumber" className="col-sm-2">
                                 Phone Number
                             </label>
                             <div className="col-sm-10">
                                 <input
                                     className="form-control"
                                     placeholder="phoneNumber"
                                     id="phoneNumber"
                                     onChange={this.phoneNumberChanged}
                                 />
                             </div>
                         </div>


                         <div className="form-group row">
                             <label htmlFor="email" className="col-sm-2">
                                 Email
                             </label>
                             <div className="col-sm-10">
                                 <input
                                     className="form-control"
                                     placeholder="email"
                                     id="email"
                                     onChange={this.emailChanged}
                                 />
                             </div>
                         </div>

                         <button
                             className="btn-primary"
                             onClick={() => {this.createGuest()

                             }}
                         >
                             REGISTER
                         </button>




                     </div>

                    }

                </div>

            </div>

        )
    }

}
export default SavingHomePage