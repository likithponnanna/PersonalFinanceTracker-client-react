import React, {Component} from 'react';
import MyContext from "./MyContext";
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import CreditScoreContent from "./CreditScoreContent";
import UniversalService from '../service/universal.service.client'
import Chart from "react-apexcharts";
import '../styling/modals.style.client.css'

import {RadialBarChart, RadialBar, Legend} from 'recharts';




const data = [

    {name: 'unknow', uv: 6.67, pv: 4800, fill: '#ffc658'}
];

const style = {
    top: 0,
    left: 350,
    lineHeight: '24px',


};

class CreditScoreMainComponent  extends Component{

    constructor(props) {

        super(props);
        this.universalService = new UniversalService();
        this.state ={
                creditScore: 0,
                totalAsset: 0,
                totalDebt: 0,

            data : [


            ]



        }
    }


    setCreditScore =(creditScore) =>{
        let data = [
            {name: 'Minimum Score', uv: 300, pv: 1398, fill: '#383fe1'},
            {name: 'National Avg', uv: 690, pv: 1398, fill: '#8dd1e1'},
            {name: 'Your Score', uv: creditScore, pv: 4567, fill: '#2cad51'},
            {name: 'Max Score', uv: 750, pv: 2400, fill: '#c15a37'},

            ]
    }


    componentDidMount() {
        console.log("data", this.state.data)

        this.universalService.findAssetTotal()
            .then(response => {console.log("Response Credit Score",response);

                    let dataN = [
                        {name: 'Minimum Score', uv: 300, pv: 250, fill: '#383fe1'},
                        {name: 'National Avg', uv: 710, pv: 1398, fill: '#8dd1e1'},
                        {name: 'Your Score', uv: response["CreditScore"], pv: 4567, fill: '#2cad51'},
                        {name: 'Max Score', uv: 800, pv: 2400, fill: '#c15a37'},

                    ]



            this.setState({
                creditScore: response["CreditScore"],
                totalAsset: response["TotalAsset"],
                totalDebt: response["TotalDebt"],
                data: dataN

            })}


            )
    }


    render() {

        return(

            <div>
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <div className="wrapper">
                                <SideBarUser/>
                                <div id="content" className={` ${context.state.sidebarAct  ? 'active' : ''} `}>
                                    <UserNavBar
                                        sidebarCollapse={context.sidebarCollapse}/>
                                    <div className="ml-5">
                                        <UserOptionTabsNav/></div>
                                    <div className="container web-dev-overflow-scroll">
                                        <br/><br/> <br/>
                                        <div className="row web-dev-overflow-scroll row">
                                            <div className="justify-content-center web-dev-parent col-12">
                                                <div className="web-dev-child  ">
                                            <RadialBarChart  width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={100} data={this.state.data}>
                                                <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise={true} dataKey='uv'/>
                                                <Legend iconSize={25} width={200} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
                                            </RadialBarChart>
                                                </div>
                                        </div >

                                            <h1 className="mt-2 card col-12 web-dev-parent m-auto "> Your Credit Score is <b className="web-dev-cred-score-color">{this.state.creditScore}</b></h1>
                                                <br/>
                                                     {this.state.creditScore>=750 &&  <h3 className=" mt-2 card col-12 web-dev-parent"> This is a <b className="web-dev-green"> Very Good</b> score keep up the great work</h3>}
                                                     {this.state.creditScore>650 && this.state.creditScore<750 && <h3 className="m-auto card col-12 web-dev-parent"> This is a <b className="web-dev-light-green">  Good</b> making your payments in time for a great score</h3>}
                                                     {this.state.creditScore<650 &&  <h3 className="m-auto card col-12 web-dev-parent"> This is a <b className="web-dev-red"> Very Poor </b> score pay your bills in time</h3>}

                                        </div>
                                    </div>
                                </div>
                            </div>


                        </React.Fragment>
                    )}
                </MyContext.Consumer>
            </div>
        )
    }


}

export default CreditScoreMainComponent