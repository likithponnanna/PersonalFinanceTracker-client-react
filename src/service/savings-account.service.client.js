class SavingsAccountService {

    constructor() {
        this.API_URL = 'https://project-final-mint.herokuapp.com/api/';
    }

    findAllSavingsAccounts = () => {
        return fetch(this.API_URL+'saving/account', {
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

    findSavingsAccountId = (savingsAcc) =>
        fetch(this.API_URL+'saving/account/'+savingsAcc._id,{
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
        return fetch(this.API_URL+'saving/account/'+savingsAccId, {
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
        return fetch(this.API_URL + 'saving/account', {
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
        return fetch(this.API_URL+'saving/account/'+savingsAcc._id, {
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