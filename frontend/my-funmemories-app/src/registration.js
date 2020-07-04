import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

class RegisterPage extends Component{
    constructor() {
        super();
         this.state = {
            userName:'',
            password:'',
            nickName:'',
            email:''
        }
        this.onChange = this.onChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    onChange (event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleFormSubmit (event) {
        event.preventDefault();
        axios.post('http://localhost:5000/userCollection/register', {
            userName:this.state.userName,
            password:this.state.password,
            nickName:this.state.nickName,
            email:this.state.email
        })
        .then (res =>{
            alert("Registration Complete")
            this.props.history.push('/login')
            })
        .catch((err) =>{
            console.log(err)
        })
        }
    render() {
        return(
            <div className="register-container">
            <h3 align="center">REGISTER</h3>
            <div>
                <Form noValidate onSubmit ={this.handleFormSubmit}>
                    <div>
                        <Form.Group controlId = "userNameId">
                            <Form.Label>
                                User Name 
                            </Form.Label>
                            <Form.Control type="text" name="userName" placeholder= "Enter user name" value ={this.state.userName} onChange={this.onChange}/>
                        </Form.Group>
                        <Form.Group controlId = "passwordId">
                            <Form.Label>
                                Password 
                            </Form.Label>
                            <Form.Control type="password" name="password" placeholder= "Enter the password" value ={this.state.password} onChange={this.onChange}/>
                        </Form.Group>
                        <Form.Group controlId = "nickNameId">
                            <Form.Label>
                                Nick Name 
                            </Form.Label>
                            <Form.Control type="text" name="nickName" placeholder= "Enter the nick name" value={this.state.nickName} onChange={this.onChange} />
                        </Form.Group>
                        <Form.Group controlId = "emailId">
                            <Form.Label>
                                Email 
                            </Form.Label>
                            <Form.Control type="email" name="email" placeholder= "Enter a valid email" value={this.state.email} onChange={this.onChange} />
                        </Form.Group>
                        </div>
                    <div>
                        <Form.Group controlId = "submitFormId">
                            <input type="submit" value ="REGISTER" className="btn btn-primary" style={{"width":"100%", "borderRadius":"25px"}}/>
                        </Form.Group>
                    </div>
                    </Form>  
            </div>
            <div align="center">
                <p>Already a member? </p>
                <Link to ='/login'>
                    <Button className="btn-2">
                        LOGIN
                    </Button>
                </Link>
        </div>
        </div>
        )
    }
}

export default RegisterPage;