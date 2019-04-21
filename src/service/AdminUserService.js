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
        return fetch(this.API_URL+"product", {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include"
        }).then(function (response) {
            return response.json();
        })
    }

}
export default AdminUserService