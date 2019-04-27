class TransactionClientServiceClient {

    constructor() {
        this.API_URL = 'https://project-final-mint.herokuapp.com/api/';
    }

    findAllTransactions = () => {
        return fetch(this.API_URL+'transaction', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json())
            .catch(reason => console.log(reason))
    };

    findAllTransactionMonth = () => {
        return fetch(this.API_URL+'transaction/month/all', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json())
            .catch(reason => console.log(reason))
    };

    findAllTransactionWeek = () => {
        return fetch(this.API_URL+'transaction/week/all', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json())
            .catch(reason => console.log(reason))
    };

    findAllCategoryTransactions =(categoryName) => {
        return fetch(this.API_URL+'category/transaction/'+categoryName, {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());
    };



    findTransactionById = (transaction) =>
        fetch(this.API_URL+'transaction/'+transaction._id,{
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());

    deleteTransaction = (transactionId) =>
    {
        return fetch(this.API_URL+'transaction/'+transactionId, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            credentials: 'include'
        }).then(function (response) {
            return response.json()
        })

    };

    createTransaction = (transaction) => {
        return fetch(this.API_URL+'transaction', {
            body: JSON.stringify(transaction),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include'
        }).then( function(response){

            return response.json()

        })
    };


    updateTransaction = (transaction) => {
        return fetch(this.API_URL+'transaction/'+transaction._id, {
            body: JSON.stringify(transaction),
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

export default TransactionClientServiceClient