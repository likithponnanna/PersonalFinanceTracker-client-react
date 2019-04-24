import React from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import { Button } from 'react-bootstrap'
import GuestProductService from "../service/GuestProductService"
import MainPageService from "../service/MainPageService";
import {Link} from "react-router-dom";


class CheckingHomePage extends React.Component {

    constructor(props) {
        super(props);
        this.guestproductService = GuestProductService.getInstance();
        this.mainPageService = MainPageService.getInstance();
        this.state = {
            checkingList:[]
        }

    }

    componentWillMount () {
        console.log("i am executed inside mount")
        this.getProducts();

    }



    getProducts = () => {
        this.mainPageService.findProducts().then(
            products => {
                // console.log(products);
                // this.setState({
                //                   creditCardList :[]
                //               });

                console.log("inside get prod");

                for(let i=0; i<products.length;i++) {
                    // console.log(products[prod].type);
                    if(products[i].type==="CHECKING") {
                        this.state.checkingList.push(products[i]);

                    }

                }

                this.setState({
                                  savingList :this.state.checkingList

                              })
                console.log(this.state.checkingList)
            }
        )
    }



    render () {

        return (

            <div>

                {
                    this.state.checkingList.map(
                        (card) =>

                            <div key={card._id}>

                                <CardDeck>

                                    <div id="card1">
                                        <Card style={{ width: '25rem', height:'26rem' }} bg="secondary" >

                                            <Card.Body>
                                                <Card.Title>

                                                    <h2>{card.name}</h2>

                                                </Card.Title>
                                                <Card.Img variant="top" src="https://selflender.s3.amazonaws.com/blog/credit-card.png" id="cardImage"/>
                                                <Card.Text>

                                                    {card.bank}
                                                    {card.details}
                                                </Card.Text>

                                                <Link to={`/home/apply/${card._id}/${card.name}`}>
                                                    <Button variant="primary"
                                                    >APPLY</Button>
                                                </Link>


                                            </Card.Body>
                                        </Card>
                                    </div>
                                </CardDeck>



                            </div>


                    )

                }

            </div>

        )
    }

}
export default CheckingHomePage