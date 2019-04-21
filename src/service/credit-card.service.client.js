class CreditCardService {

    constructor() {
        this.API_URL = 'https://project-final-mint.herokuapp.com/api/';
    }

    findAllCreditCards = () => {
        return fetch(this.API_URL+'creditCard', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());
    };

    findAllCreditCardById = (creditCard) =>
        fetch(this.API_URL+'creditCard/'+creditCard._id,{
            credentials: "include"
        })
            .then(response =>
                response.json());

    deleteCreditCard = (creditCard) =>
    {
        return fetch(this.API_URL+'creditCard/'+creditCard._id, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            credentials: 'include'
        }).then(function (response) {
            return response.json()
        })

    };

    createCreditCard = (creditCard) => {
        return fetch(this.API_URL + 'creditCard', {
            body: JSON.stringify(creditCard),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include'
        }).then( function(response){

            return response.json()

        })
    };


    updateCreditCard = (creditCard) => {
        return fetch(this.API_URL+'creditCard/'+creditCard._id, {
            body: JSON.stringify(creditCard),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            credentials: 'include'
        }).then( function(response){

            return response.json()

        })

    };


}

export default CreditCardService