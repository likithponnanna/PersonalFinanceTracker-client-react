import React, {Component} from 'react'
import MyContext from './MyContext'
import Login from "./Login";
import Register from "./Register";
import UserService from '../service/user.service.client'
import '../styling/modals.style.client.css'

class UserOnboardModal extends Component{
    constructor(props){
        super(props);
        this.userService = new UserService();

        this.state ={
            loginRegisterFlag: true,
            loginUserName: '',
            passwordLogin: '',
            registerPassword: '',
            verifyPassword: null,
            registerUserName: '',
            user: undefined

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

    loginUser = () => {
        let credentials ={
            username: this.state.loginUserName,
            password: this.state.passwordLogin
        };
        this.userService.loginUser(credentials)
            .then(user =>{
                console.log("Reg User", user);
                if(user.username!==null && user.status===undefined && user._id !== null) {
                this.context.setUser(user);
            }else {
                alert("User does not exist");
            }}).catch(reason => alert("Server Error"));

    };

    signUpUser = () =>{
        if(this.state.registerPassword === this.state.verifyPassword){
            let user = {
                username: this.state.registerUserName,
                password: this.state.registerPassword
            };
            this.userService.registerUser(user)
                .then(user => {
                    console.log("Reg User", user);
                    if(user.username!==null && user.status===undefined && user._id !== null) {
                        this.context.setUser(user);
                        this.props.history.push('/users')
                    }else {
                        alert("Issue registering");
                    }
                }).catch(reason => alert("Server Error"))

        }else {
            alert("Password's don't match");
        }
    };


    render() {
        return(
            <div className="container web-dev-test">
            <div className="modal fade show" id="exampleModalCenter" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">


                            {
                                this.state.loginRegisterFlag ?
                                <div>
                                    <div className="modal-header bg-secondary web-dev-login-margin-adjust ">
                                        <h5 className="modal-title " id="exampleModalLongTitle">Login</h5>
                                        <button type="button" className="close web-dev-close-color" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                {
                                        <div className="modal-body">
                                            <Login loginUserNameChanged={this.loginUserNameChanged}
                                            passwordLoginChanged={this.passwordLoginChanged}
                                                   loginUser ={this.loginUser}
                                            />
                                        </div>
                                }</div>: <div> <div className="modal-header bg-secondary web-dev-login-margin-adjust">
                                        <h5 className="modal-title" id="exampleModalLongTitle">SignUp</h5>
                                        <button type="button" className="close web-dev-close-color" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                        <div className="modal-body">
                                            <Register registerPasswordChanged={this.registerPasswordChanged}
                                                   verifyPasswordChanged={this.verifyPasswordChanged}
                                                      registerUserNameChanged ={this.registerUserNameChanged}
                                                      signUpUser = {this.signUpUser}
                                            />
                                        </div>

                                </div>
                            }

                        <div className="modal-footer row btn-group m-2">
                            {this.state.loginRegisterFlag ===false &&  <button type="button" className="btn btn-block btn-outline-info border-0 " onClick={() => this.loginRegisterFlagToggle()} >Login ?</button> }
                            {this.state.loginRegisterFlag ===true &&  <button type="button" className="btn btn-block btn-outline-info border-0 " onClick={() => this.loginRegisterFlagToggle()}>Sign Up ?</button> }
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }


}
UserOnboardModal.contextType = MyContext;
export default UserOnboardModal