import React, {Component} from 'react'
import MyContext from './MyContext'
import {Link, Redirect} from "react-router-dom";
import history from './History'
import UserOnboardModal from "./UserOnboardModal";

class Register extends Component{

    constructor(props){
        super(props);
        this.state ={

        }
    }

 /*= ({registerUserNameChanged, registerPasswordChanged, verifyPasswordChanged,signUpUser }) => {*/

 /*   if(this.context.state.user !==undefined){
        this.props.histoy.push("/user")r
    }*/

    render(){
        if(this.context.state.user !==undefined) {
            return (<Redirect to="/user"/>)
        }
    return (
        <div>
            <div>
                <div className="form-group row">
                    <label htmlFor="username" className="col-sm-2 col-form-label">
                        Username </label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               id="username"
                               placeholder="Alice"
                               onChange={(event) => this.props.registerUserNameChanged(event)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">
                        Password </label>
                    <div className="col-sm-10">
                        <input type="password"
                               className="form-control wbdv-password-fld"
                               id="password"
                               placeholder="123qwe#$%"
                               onChange={(event) => this.props.registerPasswordChanged(event)}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="verifyPassword" className="col-sm-2 col-form-label">
                        Verify Password </label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control wbdv-password-fld"
                               id="verifyPassword" placeholder="123qwe#$%"
                               onChange={(event) => this.props.verifyPasswordChanged(event)}/>
                    </div>
                </div>
                <button className="btn btn-block btn-info" data-dismiss="modal" onClick={() => this.props.signUpUser()}>SignUp</button>

            </div>
        </div>
    )
}

}


Register.contextType = MyContext;
export default Register
