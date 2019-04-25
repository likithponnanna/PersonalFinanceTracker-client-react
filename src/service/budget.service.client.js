class BudgetService {

    constructor() {
        this.API_URL = 'https://project-final-mint.herokuapp.com/api/';
    }

    findBudget = () => {
        return fetch(this.API_URL+'budget', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());
    };


    findAllTransactionHalfYear =() => {
        return fetch(this.API_URL+'transaction/halfYear/spends', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());
    };




    findBudgetByMonth = (month) =>
        fetch(this.API_URL+'budget/month/'+month,{
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());


    findBudgetById = (Budget) =>
        fetch(this.API_URL+'budget/'+Budget._id,{
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());

    deleteBudget = (BudgetId) =>
    {
        return fetch(this.API_URL+'budget/'+BudgetId, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            credentials: 'include'
        }).then(function (response) {
            return response.json()
        })

    };

    createBudget= (Budget) => {
        return fetch(this.API_URL + 'budget', {
            body: JSON.stringify(Budget),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include'
        }).then( function(response){

            return response.json()

        })
    };


    updateBudget = (Budget) => {
        return fetch(this.API_URL+'budget/'+Budget._id, {
            body: JSON.stringify(Budget),
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

export default BudgetService