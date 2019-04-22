class GuestProductService {

    constructor() {
        this.API_URL = 'https://project-final-mint.herokuapp.com/api/';

    }



    static myInstance = null;

    static getInstance() {
        if (GuestProductService.myInstance == null) {
            GuestProductService.myInstance = new GuestProductService();
        }
        return this.myInstance;
    }


    createGuestProduct = (user) => {
        let newUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            DOB: user.DOB,
            phoneNumber: user.phoneNumber,
            email: user.email,
            address: user.address,
            product: user.product

        }
        return fetch(this.API_URL + "guest", {
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            method: 'POST'
                     }
        ).then(response => response.json())


    };

    getGuestUsers = () => {
        return fetch(this.API_URL+"guest", {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include"
        }).then(function (response) {
            return response.json();
        })
    }


}

export default GuestProductService;