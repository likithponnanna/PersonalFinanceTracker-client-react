class CheckingAccountService {

    constructor() {
        this.API_URL = 'https://project-final-mint.herokuapp.com/api/';
    }

    findAllCheckingAccounts = () => {
        return fetch(this.API_URL+'checking-account', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());
    };

    findCheckingAccountId = (checkingAcc) =>
        fetch(this.API_URL+'checking-account/'+checkingAcc._id,{
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());

    deleteCheckingAccount = (checkingAccId) =>
    {
        return fetch(this.API_URL+'checking-account/'+checkingAccId, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            credentials: 'include'
        }).then(function (response) {
            return response.json()
        })

    };

    createCheckingAccount = (checkingAcc) => {
        return fetch(this.API_URL + 'checking-account', {
            body: JSON.stringify(checkingAcc),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include'
        }).then( function(response){

            return response.json()

        })
    };


    updateCheckingAccount = (checkingAcc) => {
        return fetch(this.API_URL+'checking-account/'+checkingAcc._id, {
            body: JSON.stringify(checkingAcc),
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

export default CheckingAccountService