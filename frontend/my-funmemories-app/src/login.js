import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
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
    render() {
        return(
            <div className="container-fluid" style={{width:"50%"}}>
                <h3>Login Page</h3>
                <Form onSubmit={this.handleLogin}>
                    <Form.Group controlId="loginUserNameId">
                        <Form.Label>
                            User Name:
                        </Form.Label>
                        <Form.Control type="text" name="userName" placeholder="Enter the User Name" value={this.state.userName} onChange={this.loginChange}/>
                    </Form.Group>
                    <Form.Group controlId="loginPasswordId">
                        <Form.Label>
                            Password:
                        </Form.Label>
                        <Form.Control type="password" name="password" placeholder="Enter the Password" value={this.state.password} onChange={this.loginChange} />
                    </Form.Group>
                    <Form.Group controlId="loginButtonId">
                        <input type="submit" value="LOGIN" className="btn btn-primary" />
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default LoginPage;