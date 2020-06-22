import React, {Component} from 'react';
import axios from 'axios';
import {Carousel,Card, Button} from 'react-bootstrap';
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
    render() {
        return(
            <div className="container-fluid">
                <h3>Welcome {this.state.nickName}</h3>
                <div className="container-fluid">
                    <Carousel>
                            {this.state.collections.map((item, key) => {
                        return(
                                <Carousel.Item key={key} style={{'height':"500px"}}>
                                    <Carousel.Caption>
                                        <Card className="text-center p-3" style={{'height':"300px"}}>
                                            <Card.Title>Series: {item.collectionName}</Card.Title>
                                                <Card.Subtitle>Author: {item.author}</Card.Subtitle>
                                            <Card.Body>
                                                <Card.Text>About: {item.description}</Card.Text>
                                                <Card.Text><Link to ={'/viewBooks/'+item._id}>Books</Link></Card.Text>
                                            </Card.Body>
                                            <Card.Footer><Link to ={"/addBook/"+ item._id }>AddBook</Link></Card.Footer>
                                        </Card>                       
                                    </Carousel.Caption>
                                </Carousel.Item>
                                ) 
                            }) }
                    </Carousel>
                </div>
            </div>
        )
}
}
export default LandingPage;