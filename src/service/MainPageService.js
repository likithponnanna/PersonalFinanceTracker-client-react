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



}
export default MainPageService;





