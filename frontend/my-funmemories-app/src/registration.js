import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import axios from 'axios';

class RegisterPage extends Component{
    constructor() {
        super();
         this.state = {
            userName:'',
            password:'',
            nickName:''
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
            nickName: this.state.nickName
        })
        .then (res =>{
                console.log(res.data)
                this.props.history.push('/login')
                })
        .catch((err) =>{
                    alert("UserName already exist. Register with a different username.")
            console.log(err)
        })
        }
    render() {
        return(
            <div className = "container-fluid" style={{width:"50%"}}>
                <h3>New User Please Signup. Existing Users click on the following link to Login </h3>
                <Form noValidate onSubmit ={this.handleFormSubmit}>
                    <Form.Group controlId = "userNameId">
                        <Form.Label>
                            User Name: 
                        </Form.Label>
                        <Form.Control type="text" name="userName" placeholder= "Enter user name" value ={this.state.userName} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId = "passwordId">
                        <Form.Label>
                            Password: 
                        </Form.Label>
                        <Form.Control type="password" name="password" placeholder= "Enter the password" value ={this.state.password} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId = "nickNameId">
                        <Form.Label>
                            Nick Name: 
                        </Form.Label>
                        <Form.Control type="text" name="nickName" placeholder= "Enter the nick name" value={this.state.nickName} onChange={this.onChange} />
                    </Form.Group>
                    <Form.Group controlId = "submitFormId">
                        <input type="submit" value ="Register" className="btn btn-primary"/>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default RegisterPage;