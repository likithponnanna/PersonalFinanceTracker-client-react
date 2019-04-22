class UniversalService {

    constructor() {
        this.API_URL = 'https://project-final-mint.herokuapp.com/api/';
    }

    findAssetTotal = () => {
        return fetch(this.API_URL+'universe/total', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());
    };




}

export default UniversalService