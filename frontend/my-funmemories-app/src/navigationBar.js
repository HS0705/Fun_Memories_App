import React, {Component} from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


class NavigationBar extends Component{

    userlogout(event){
        event.preventDefault();
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    render() {
        const userNotSignedIn = (
            <Nav className="ml-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
        )
        const userSignedIn =(
            <Nav className="ml-auto">
                <Nav.Link href="/landing">Dashboard</Nav.Link> 
                <Nav.Link href="/logout" onClick ={this.userlogout.bind(this)}>Logout</Nav.Link>
            </Nav>
        )
        return(
            <Navbar >
                <Navbar.Brand href="/">
                    <span>Fun Memories</span>  
                </Navbar.Brand>             
            <Nav.Item>
                {localStorage.usertoken ? userSignedIn : userNotSignedIn}
            </Nav.Item>
            </Navbar>
            )
    }
}

export default withRouter(NavigationBar);