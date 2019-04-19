class AlphaVantage {

    constructor() {
        this.API_URL= 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=aapl&apikey=QZTS8QOG36E6LQEI';
       // this.DEMO_URL = 'https://cloud.iexapis.com/beta/stock/aapl/chart/1m/tops?token=pk_22f2a0efda6d469784a201a7bc6a7237';

    }


    findAllCourses = () =>
        fetch(this.COURSE_API_URL,{
            credentials: "include"
        })
            .then(response =>
                response.json());



    findStock = (stockSymbol) =>
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+stockSymbol+'&apikey=QZTS8QOG36E6LQEI', {
        credentials: "include"
    })
        .then(response => response.json())


}

export default AlphaVantage