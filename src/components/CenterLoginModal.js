import React,{Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
import {ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import UserService from "../service/user.service.client";
import Login from "./Login";
import Register from "./Register";
import {Link, Redirect, withRouter} from "react-router-dom";
import MyContext from "./MyContext";
import AdminUserService from "../service/admin.service.client";

class CenterLoginModal extends React.Component {

    constructor(props){
        super(props);
        this.userService = new UserService();
        this.adminService = new AdminUserService();
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

        console.log("Login cred" , credentials);
        this.userService.loginUser(credentials)
            .then(user =>{
                console.log("Logged User", user[0], "Context", this.props.context.state.user);
                if(user[0]!==undefined && user[0].username!==null  && user[0].status===undefined && user[0]._id !== null &&
                    user[0].username!=='INVALID') {

                    this.props.context.setUser(user[0]);
                    if(user[0] !==undefined && user[0].isAdmin!==undefined && user[0].isAdmin===false) {
                        this.props.history.push('/user')
                    }else if(user[0] !==undefined && user[0].isAdmin!==undefined && user[0].isAdmin===true){
                        this.props.history.push('/admin')
                    }
                }else {
                    alert("User does not exist");
                }})

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
                    if(user.username !=="duplicate_777" &&  user.username!==null) {
                        this.props.context.setUser(user);
                        if(user.isAdmin!==undefined && user.isAdmin===false) {
                            this.props.history.push('/user')
                        }else if(user.isAdmin!==undefined && user.isAdmin===true){
                            this.props.history.push('/admin')
                        }

                    }else {
                        alert("Issue registering orDuplicate User");
                    }
                }).catch(reason => console.log(reason))

        }else {
            alert("Password's don't match");
        }
    };

    render() {


        return (
            <div className="container-fluid">

            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    {
                        this.state.loginRegisterFlag ?
                            <div>
                                <div className="modal-header bg-dark  ">
                                    <h5 className="modal-title " id="exampleModalLongTitle">Login</h5>
                                  <Link to="/">  <button type="button" className="close web-dev-close-color"
                                            data-dismiss="modal" aria-label="Close" >
                                        <span aria-hidden="true">&times;</span>
                                  </button> </Link>
                                </div>
                                {
                                    <div className="modal-body">
                                        <Login loginUserNameChanged={this.loginUserNameChanged}
                                               passwordLoginChanged={this.passwordLoginChanged}
                                               loginUser ={this.loginUser}
                                        />
                                    </div>
                                }</div>: <div> <div className="modal-header bg-dark ">
                                <h5 className="modal-title" id="exampleModalLongTitle">SignUp</h5>
                                <Link to="/">  <button type="button" className="close web-dev-close-color" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button> </Link>
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
                </Modal.Body>
                <Modal.Footer>

                    {this.state.loginRegisterFlag ===false &&  <button type="button" className="btn btn-block btn-outline-info border-0 " onClick={() =>{ this.loginRegisterFlagToggle()}} >Login ?</button> }
                    {this.state.loginRegisterFlag ===true &&  <button type="button" className="btn btn-block btn-outline-info border-0 " onClick={() => this.loginRegisterFlagToggle()}>Sign Up ?</button> }
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
}
export default withRouter((props) => (
    <MyContext.Consumer>
        {(context) => <CenterLoginModal {...props} context={context}/>}
    </MyContext.Consumer>
))


