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

    createUser = (user) => {
        let newUser = {
            username:user.username,
            password:user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.dob,
            phoneNumber: user.phoneNumber,
            email: user.email,
            address: user.address,
            product: user.product

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

}
export default AdminUserService