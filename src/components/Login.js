import React, {Component} from 'react'
import MyContext from './MyContext'
import Register from "./Register";
import {Redirect} from "react-router";

class Login extends Component{

 render(){
     if(this.context.state.user !==undefined) {
        // this.props.history.push('/user')
         return (<Redirect to="/user"/>)
     }
 return(
     <div>
         <div>
             <div className="form-group row">
                 <label htmlFor="username" className="col-sm-2 col-form-label">
                     Username </label>
                 <div className="col-sm-10">
                     <input className="form-control"
                            id="username"
                            placeholder="Alice"
                            onChange={(event) => this.props.loginUserNameChanged(event)}/>
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
                            onChange={(event) => this.props.passwordLoginChanged(event)}/>
                 </div>
             </div>
             <button className="btn btn-block btn-info" data-dismiss="modal" onClick={() => this.props.loginUser()}> Login</button>
         </div>
     </div>


 )}
}

Login.contextType = MyContext;
    export default Login
