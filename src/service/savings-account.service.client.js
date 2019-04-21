class SavingsAccountService {

    constructor() {
        this.API_URL = 'https://project-final-mint.herokuapp.com/api/';
    }

    findAllSavingsAccounts = () => {
        return fetch(this.API_URL+'savings-account', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());
    };

    findSavingsAccountId = (savingsAcc) =>
        fetch(this.API_URL+'savings-account/'+savingsAcc._id,{
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());

    deleteSavingsAccount = (savingsAccId) =>
    {
        return fetch(this.API_URL+'savings-account/'+savingsAccId, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            credentials: 'include'
        }).then(function (response) {
            return response.json()
        })

    };

    createSavingsAccount = (savingsAcc) => {
        return fetch(this.API_URL + 'savings-account', {
            body: JSON.stringify(savingsAcc),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include'
        }).then( function(response){

            return response.json()

        })
    };


    updateSavingsAccount = (savingsAcc) => {
        return fetch(this.API_URL+'creditCard/'+savingsAcc._id, {
            body: JSON.stringify(savingsAcc),
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

export default SavingsAccountService