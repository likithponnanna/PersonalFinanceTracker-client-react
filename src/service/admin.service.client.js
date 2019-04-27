class AdminUserService {

    constructor() {
        this.API_URL = 'https://project-final-mint.herokuapp.com/api/';

    }

    static myInstance = null;

    static getInstance() {
        if (AdminUserService.myInstance == null) {
            AdminUserService.myInstance = new AdminUserService();
        }
        return this.myInstance;
    }


    getAllUsers = () => {
        return fetch(this.API_URL+"user", {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include"
        }).then(function (response) {
            return response.json();
        })
    }

    findUserGivenId = (userid) => {
        return fetch(this.API_URL+"user/" + userid, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include"
        }).then(function (response) {
            return response.json();

        })
    }

    createUser = (user) => {


        return fetch(this.API_URL + "register", {
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                method: 'POST'
            }
        ).then(response => response.json())
    };


    deleteUser = (userid) => {

        return fetch(this.API_URL + "delete/" + userid , {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'   },
            credentials: "include"
        })
    };

    updateUser = (user) => {
        console.log("Inside service Update", user);

        return fetch(this.API_URL+"update/" +user._id,{
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json' },
            credentials: "include",
            method: 'PUT'

        }).then(response =>
            response.json())

    }

    makeUserAdmin = (user) => {
        let username = user.username
        console.log(user)
        return fetch(this.API_URL+"user/" +username+"/admin",{
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json' },
            credentials: "include",
            method: 'PUT'
        }).then(response =>
            response.json())

    }

    getTransactions = (user) => {
        return fetch(this.API_URL+"transaction/user/" +user, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include"
        }).then(function (response) {
            return response.json();
        })


    }

    addBillForUser = (bill) => {

        let newBill = {

            user: bill.userid,
            billType: bill.billType,
            billName: bill.billName,
            bill_due_date: bill.bill_due_date,
            bill_posted_date: bill.bill_posted_date,
            bill_pending: bill.bill_pending,
            bill_amount: bill.bill_amount

        }

        return fetch(this.API_URL + "admin/bill", {
                body: JSON.stringify(newBill),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                method: 'POST'
            }
        ).then(response => response.json())


    }

    findAllProducts = () => {
        return fetch(this.API_URL+'product', {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include"
        }).then(function (response) {
            return response.json();
        })
    }

    createProduct = (product) =>{

        return fetch(this.API_URL + 'product', {
                body: JSON.stringify(product),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                method: 'POST'
            }
        ).then(response => response.json())

    }

    deleteProduct = (productId) =>{
        return fetch(this.API_URL + 'product/' + productId , {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'   },
            credentials: "include"
        })
    }

    updateProduct = (product) =>{

        return fetch(this.API_URL+'product/'+product._id,{
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json' },
            credentials: "include",
            method: 'PUT'
        }).then(response =>
            response.json())
    }

    findAllGuest = () => {
        return fetch(this.API_URL+'guest', {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include"
        }).then(function (response) {
            return response.json();
        })
    }

    findCurrentLoggedInUser = () => {
        return fetch(this.API_URL+'profile', {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include"
        }).then(function (response) {
            return response.json();
        }).catch(reason => console.log(reason))
    }


    findBillsByUserID = (userId) =>{
      console.log("User Id inside service", userId);

        return fetch(this.API_URL+'bill/user/'+userId, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include"
        }).then(function (response) {
            return response.json();
        }).catch(reason => console.log(reason))
    }


    createBill = (Bill, userId) =>{

        return fetch(this.API_URL + 'admin/bill/'+userId, {
                body: JSON.stringify(Bill),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                method: 'POST'
            }
        ).then(response => response.json())

    }

    deleteBill = (BillId) =>{
        return fetch(this.API_URL + 'bill/' + BillId , {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'   },
            credentials: "include"
        })
    }


    findAllBillsByAdmin =()=>{
        return fetch(this.API_URL+'admin/bill', {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include"
        }).then(function (response) {
            return response.json();
        }).catch(reason => console.log(reason))
    }


    updateBill = (Bill) =>{

        return fetch(this.API_URL+'bill/'+Bill._id,{
            body: JSON.stringify(Bill),
            headers: {
                'Content-Type': 'application/json' },
            credentials: "include",
            method: 'PUT'
        }).then(response =>
            response.json())
    }

    findNumberOfTransactions = () => {
        return fetch(this.API_URL+'number/transaction', {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include"
        }).then(function (response) {
            return response.json();
        }).catch(reason => console.log(reason))
    }

    findNumberTotalUsersBudget = () => {
        return fetch(this.API_URL+'total/budget', {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include"
        }).then(function (response) {
            return response.json();
        }).catch(reason => console.log(reason))
    }









}




export default AdminUserService