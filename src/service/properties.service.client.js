class PropertyService {

    constructor() {
        this.API_URL = 'https://project-final-mint.herokuapp.com/api/';
    }

    findAllProperties = () => {
        return fetch(this.API_URL+'property', {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json())
            .catch(reason => console.log(reason))
    };

    findPropertyById = (Property) =>
        fetch(this.API_URL+'property/'+Property._id,{
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response =>
                response.json());

    deleteProperty = (PropertyId) =>
    {
        return fetch(this.API_URL+'property/'+PropertyId, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            credentials: 'include'
        }).then(function (response) {
            return response.json()
        })

    };

    createProperty = (Property) => {
        return fetch(this.API_URL + 'property', {
            body: JSON.stringify(Property),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include'
        }).then( function(response){

            return response.json()

        })
    };


    updateProperty = (Property) => {
        return fetch(this.API_URL+'property/'+Property._id, {
            body: JSON.stringify(Property),
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

export default PropertyService