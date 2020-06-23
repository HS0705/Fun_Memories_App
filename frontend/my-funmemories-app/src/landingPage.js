import React, {Component} from 'react';
import axios from 'axios';
import {Carousel,Card, Button, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';


class LandingPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            nickName:'',
            userId:'',
            collections:[]
        }
    }
    componentDidMount() {
            axios.get('http://localhost:5000/userCollection/landing/',{
                headers:{
                    'authorization':`${localStorage.getItem('usertoken')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                const user=res.data.user;
                const collections =res.data.collections;
                this.setState({
                    userName:user.userName,
                    nickName:user.nickName,
                    userId:user._id,
                    collections:collections
                })
        })
            .catch((err) => {
                console.log(err);
            })   
    }
    
    showData(data) {
        if (data.length==0){
            return( <div className="container-fluid">
                <Jumbotron>
                <p style={{"color":"purple"}}>Hey {this.state.userName}, you dont have any collections .Lets start adding memories !!</p>
                <Link to ={'/addBookCollection/'+this.state.userId}>Add Collection</Link>
                </Jumbotron>
            
        </div>)
        }
        else{
            return(
            <div className="container-fluid"> 
            <p style={{"alignItems":"center"}}>
            <Link to ={'/addBookCollection/'+this.state.userId}>Add Collection</Link>
            </p> 
            <Carousel>
            {data.map((item, key) => {
            return(
                <Carousel.Item key={key} style={{'height':"400px"}}>
                    <Carousel.Caption>
                        <Card className="text-center p-3" style={{'height':"300px"}}>
                            <Card.Title>Series: {item.collectionName}</Card.Title>
                                <Card.Subtitle>Author: {item.author}</Card.Subtitle>
                            <Card.Body>
                                <Card.Text>About: {item.description}</Card.Text>
                                <Card.Text><Link to ={'/viewBooks/'+item._id}>View Books</Link></Card.Text>
                            </Card.Body>
                            <Card.Footer><Link to ={"/addBook/"+ item._id }>Add Book</Link></Card.Footer>
                        </Card>                       
                    </Carousel.Caption>
                </Carousel.Item>
                ) 
                }) }   
            </Carousel>
            
            </div>  
            )}
    }
    render() {
        const data = this.state.collections;
        return(
            <div className="container-fluid">
                <h3>Welcome {this.state.nickName}</h3>
                    <div className="container-fluid">
                        {this.showData(data)}
                    </div>
            </div>
        )
}
}
export default LandingPage;