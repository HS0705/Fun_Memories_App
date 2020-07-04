import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

class LoginPage extends Component{
    constructor() {
        super();
        this.state ={
            userName:'',
            password:''
        }
        this.loginChange = this.loginChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    loginChange (event) {
        this.setState({[event.target.name]:event.target.value})
    }
    handleLogin (event) {
        event.preventDefault();
        axios.post('http://localhost:5000/userCollection/login', {
                userName: this.state.userName,
                password: this.state.password
            })
            .then((res) =>{
                if (res) {
                    localStorage.setItem('usertoken', res.data)
                    this.props.history.push('/landing')
                } else {
                    alert("Incorrect Password");
                }
            })
    }
    handleRegister(){
         this.props.history.push('/register')
    }
    render() {
        return(
                <div className="login-container">
                     <Form onSubmit={this.handleLogin}>
                         <div><h4 align="center" style={{color:"blue"}}>SIGN IN</h4></div>
                         <div>
                            <Form.Group controlId="loginUserNameId">
                                <Form.Label>
                                    User Name
                                </Form.Label>
                                <Form.Control type="text" name="userName" placeholder="Enter the User Name" value={this.state.userName} onChange={this.loginChange}/>
                            </Form.Group>
                         </div>
                         <div>
                            <Form.Group controlId="loginPasswordId">
                                <Form.Label>
                                    Password
                                </Form.Label>
                                <Form.Control type="password" name="password" placeholder="Enter the Password" value={this.state.password} onChange={this.loginChange} />
                            </Form.Group>
                         </div>
                         <div>
                            <Form.Group controlId="loginButtonId">
                                <input type="submit" value="LOGIN" className="btn btn-primary" style={{"width":"100%", "borderRadius":"25px"}} />
                            </Form.Group>
                         </div>
                         <div></div>
                     <div align="center">   
                        <p>Not registered?</p>
                            <Link to ="/register">
                            <Button className="btn-2">REGISTER</Button>
                            </Link>
                     </div>
                     </Form>
                </div>       
        )    
}}

export default LoginPage;