import React, {Component} from 'react'
import MyContext from './MyContext'

const Login = ({loginUserNameChanged, passwordLoginChanged }) =>
        <div>
            <div>
                <div className="form-group row">
                <label htmlFor="username" className="col-sm-2 col-form-label">
                Username </label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               id="username"
                               placeholder="Alice"
                               onChange={(event) => loginUserNameChanged(event)}/>
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
                               onChange={(event) => passwordLoginChanged(event)}/>
                    </div>
                </div>
            </div>
        </div>;

    export default Login
