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
        let newUser = {
            username:user.username,
            password:user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            DOB: user.DOB,
            phoneNumber: user.phoneNumber,
            email: user.email,
            address: user.address,


        }

        return fetch(this.API_URL + "register", {
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            method: 'POST'
        }
        ).then(response => response.json())
    };


    deleteUser = (userid) => {
        console.log("inside service delete",userid)
        return fetch(this.API_URL + "delete/" + userid , {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'   },
            credentials: "include"
        })
    };

    updateUser = (user) => {

        console.log("inside update service the param user")
        console.log(user)

        let newUser = {

            username:user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            DOB:user.dob,
            phoneNumber: user.phoneNumber,
            email: user.email,
            address: user.address,

        }
        console.log("inside service update new user")
        console.log(newUser)
        let id = user._id;
        console.log("id",id)

        return fetch(this.API_URL+"update/" +id,{
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json' },
            credentials: "include",
            method: 'PUT'

        }).then(response =>
                    response.json())

    }

    makeUserAdmin = (user) => {
        let username = user[0].username
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



}




export default AdminUserService