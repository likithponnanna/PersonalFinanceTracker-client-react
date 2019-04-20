import React, {Component} from 'react'
import MyContext from './MyContext'

const Register = ({registerUserNameChanged, registerPasswordChanged, verifyPasswordChanged }) =>
    <div>
        <div>
            <div className="form-group row">
                <label htmlFor="username" className="col-sm-2 col-form-label">
                    Username </label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="username"
                           placeholder="Alice"
                           onChange={(event) => registerUserNameChanged(event)}/>
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
                           onChange={(event) => registerPasswordChanged(event)}/>
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="verifyPassword" className="col-sm-2 col-form-label">
                    Verify Password </label>
                <div className="col-sm-10">
                    <input type="password" className="form-control wbdv-password-fld"
                           id="verifyPassword" placeholder="123qwe#$%"
                           onChange={(event) => verifyPasswordChanged(event)}/>
                </div>
            </div>

        </div>
    </div>;

export default Register
