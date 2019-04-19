class TransactionService {

    constructor() {
        this.API_URL= 'https://project-final-mint.herokuapp.com/api/transaction';


    }


/*    findAllCourses = () =>
        fetch(this.COURSE_API_URL,{
            credentials: "include"
        })
            .then(response =>
                response.json());*/



    findStock = (stockSymbol) =>
        fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+stockSymbol+'&apikey=QZTS8QOG36E6LQEI', {
            credentials: "include"
        })
            .then(response => response.json());


    findAllTransaction = () =>
        fetch(this.API_URL, {credentials: "include"})
            .then(response => response.json());


}

export default TransactionService