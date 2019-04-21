class StockService {

    constructor() {
        this.API_URL = 'https://project-final-mint.herokuapp.com/api/';
    }

    findAllStocks = () => {
        return fetch(this.API_URL+'stock', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());
    };

    findStockId = (Stock) =>
        fetch(this.API_URL+'stock/'+Stock._id,{
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());

    deleteStock = (StockId) =>
    {
        return fetch(this.API_URL+'stock/'+StockId, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            credentials: 'include'
        }).then(function (response) {
            return response.json()
        })

    };

    createStock = (Stock) => {
        return fetch(this.API_URL + 'stock', {
            body: JSON.stringify(Stock),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include'
        }).then( function(response){

            return response.json()

        })
    };


    updateStock = (Stock) => {
        return fetch(this.API_URL+'stock/'+Stock._id, {
            body: JSON.stringify(Stock),
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

export default StockService