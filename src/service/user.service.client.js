class UserService {

    constructor() {
        this.API_URL =  'https://project-final-mint.herokuapp.com/api/';
    }

    getProfile =() =>
        fetch(this.API_URL+"profile",{
            credentials: "include"
        })
            .then(response =>
                response.json());


    findCourseById = (courseId) =>
        fetch(this.API_URL+'courses/'+courseId,{
            credentials: "include"
        })
            .then(response =>
                response.json());




    loginUser = (credentials) => {

        return fetch(this.API_URL+'login', {
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include'
        }).then( function(response){
            return response.json()
        })
    };



    updateProfile = (userId, user) => {
        return fetch(this.API_URL + user.userId, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            credentials: 'include'
        }).then( function(response){
            return response.json()
        })
    };

    updateProfileNew = (userId, user) => {

        console.log("Inside update service", userId, user)
        return fetch(this.API_URL +'update/session/'+ userId, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            credentials: 'include'
        }).then( function(response){
            return response.json()
        })
    };

    registerUser = (user) => {
        return fetch(this.API_URL+'register', {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include'
        }).then( function(response){
            return response.json()
        })
    };

    logoutUser = (user) => {
        return fetch(this.API_URL+"logout", {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include'
        }).then( function(response){

        })
    }


}
export default UserService