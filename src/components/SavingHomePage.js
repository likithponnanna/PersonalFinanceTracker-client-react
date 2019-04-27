import React from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import { Button } from 'react-bootstrap'
import GuestProductService from "../service/GuestProductService"
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import MainPageService from "../service/MainPageService";

class SavingHomePage extends React.Component {

    constructor(props) {
        super(props);
        this.guestproductService = GuestProductService.getInstance();
        this.mainPageService = MainPageService.getInstance();
        this.state = {
            savingList:[]
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
                    if(products[i].type==="SAVING") {
                        this.state.savingList.push(products[i]);

                    }

                }

                this.setState({
                    savingList :this.state.savingList

                })
                console.log(this.state.savingList)
            }
        )
    }



    render () {

        return (

            <div className="mt-2 mb-2">

                {
                    this.state.savingList.map(
                        (card) =>

                            <div key={card._id}>
                                <div className="card container mb-2">
                                    <div className="row ">
                                        <div className="col-auto">
                                            <img src={card.url}
                                                 className="img-fluid ml-lg-5 ml-md-5 ml-sm-1 mt-2" alt=""/>
                                        </div>
                                        <div className="col mt-4">
                                            <div className="card-block px-2">
                                                <h4 className="card-title text-center">{card.name}</h4>
                                                <h6 className="card-text text-center">  {card.bank}</h6>
                                                <div className="line"/>
                                                <p className="card-text text-center">   {card.details}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={`/home/apply/${card._id}/${card.name}`}>  <div className="card-footer w-100 text-muted mb-4">
                                        <button className="btn btn-block btn-dark">Apply</button>
                                    </div> </Link>
                                </div>
                            </div>

                    )

                }

            </div>

        )
    }

}
export default SavingHomePage