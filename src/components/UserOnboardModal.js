import React, {Component} from 'react'
import MyContext from './MyContext'
import Login from "./Login";
import Register from "./Register";

class UserOnboardModal extends Component{
    constructor(props){
        super(props)

        this.state ={
            loginRegisterFlag: true,
            loginUserName: '',
            passwordLogin: '',
            registerPassword: '',
            verifyPassword: null,
            registerUserName: ''

        }
    }

    registerUserNameChanged = (event) =>
        this.setState({
            registerUserName: event.target.value
        });

    loginUserNameChanged = (event) =>
        this.setState({
            loginUserName: event.target.value
        });
    passwordLoginChanged = (event) =>
        this.setState({
            passwordLogin: event.target.value
        });
    registerPasswordChanged = (event) =>
        this.setState({
            registerPassword: event.target.value
        });
    verifyPasswordChanged = (event) =>
        this.setState({
            verifyPassword: event.target.value
        });

    loginRegisterFlagToggle = () =>
        this.setState({
            loginRegisterFlag: !this.state.loginRegisterFlag
        });


    render() {
        return(
            <div className="container">
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">


                            {
                                this.state.loginRegisterFlag ?
                                <div>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Login</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                {
                                        <div className="modal-body">
                                            <Login loginUserNameChanged={this.loginUserNameChanged}
                                            passwordLoginChanged={this.passwordLoginChanged}
                                            />
                                        </div>
                                }</div>: <div> <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">SignUp</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                        <div className="modal-body">
                                            <Register registerPasswordChanged={this.registerPasswordChanged}
                                                   verifyPasswordChanged={this.verifyPasswordChanged}
                                                      registerUserNameChanged ={this.registerUserNameChanged}
                                            />
                                        </div>

                                </div>
                            }

                        <div className="modal-footer row btn-group m-2">
                            {this.state.loginRegisterFlag ===false &&  <button type="button" className="btn btn-block btn-dark " onClick={() => this.loginRegisterFlagToggle()} >Login ?</button> }
                            {this.state.loginRegisterFlag ===true &&  <button type="button" className="btn btn-block btn-dark " onClick={() => this.loginRegisterFlagToggle()}>Sign Up ?</button> }
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }


}

export default UserOnboardModal