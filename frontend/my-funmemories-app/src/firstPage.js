import React, {Component} from 'react';
import {Jumbotron, Button} from 'react-bootstrap';

class FirstPage extends Component{
    showLoginButton(){
        this.props.history.push('/login/')
    }
    showRegisterButton(){
        this.props.history.push('/register/')
    }
    render() {
        return(
            <div className="container-fluid" style={{padding:"15px 15px 15px 15px "}}>
                <Jumbotron align="text-center">
                    <h3 style={{"color":"purple"}}>Welcome to Fun Memories</h3>
                    <p>Hey There! Let us help you create your fun and best memories. </p>
                    <p>Fun memories app lets you create your best memories which you can cherish anytime. Add the best book series you read and when you started reading, completed the book and the different books in that book series,  add all those fun things at one place and the best part you can add images of your books, toys, drawings, art etc.</p>
                    <h5 style={{"color":"navy"}}>Create any memories by using Fun Memories App!!!!</h5> 
                    <div style={{ display: "flex", justifyContent:"center"}}>
                    <Button className="btn-1" onClick={()=>this.showRegisterButton()}>
                        REGISTER
                    </Button>
                    <Button className="btn-1" onClick={()=>this.showLoginButton()}>
                        LOGIN
                    </Button>
                    </div>
                    
                </Jumbotron>
                
                
                
            </div>
        )
    }
}

export default FirstPage;