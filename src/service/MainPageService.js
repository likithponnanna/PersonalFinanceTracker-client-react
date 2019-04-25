class MainPageService {

    constructor() {
        this.API_URL = 'https://project-final-mint.herokuapp.com/api/';

    }

    static myInstance = null;

    static getInstance() {
        if (MainPageService.myInstance == null) {
            MainPageService.myInstance = new MainPageService();
        }
        return this.myInstance;
    }


    findProducts = () =>
    {
        return fetch(this.API_URL+"product", {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include"
        }).then(function (response) {
            return response.json();
        })
    }


    loginUser = (user) =>
    {
        let newUser = {
            username:user.username,
            password:user.password
        }
        console.log("inside service",newUser)

        return fetch(this.API_URL + "login", {
                         body: JSON.stringify(newUser),
                         headers: {
                             'Content-Type': 'application/json'
                         },
                         credentials: "include",
                         method: 'POST'
                     }
        ).then(response => response.json())
    }


    getProfile = () =>
    {
        return fetch(this.API_URL+"session", {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include"
        }).then(function (response) {
            return response.json();
        })
    }


    //session only has what ever u pass in login, so get session error in parent component



}
export default MainPageService;





