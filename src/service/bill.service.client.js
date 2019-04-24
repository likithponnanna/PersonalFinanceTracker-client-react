class BillService {

    constructor() {
        this.API_URL = 'https://project-final-mint.herokuapp.com/api/';
    }

    findPendingBills = () => {
        return fetch(this.API_URL+'bill/pending/all', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());
    };

    findPaidBills = () => {
        return fetch(this.API_URL+'bill/paid/all', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());
    };


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


    payBill = (Bill) => {
        return fetch(this.API_URL+'/api/bill/'+Bill._id, {
            body: JSON.stringify(Bill),
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

export default BillService