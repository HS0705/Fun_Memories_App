import React, {Component} from 'react';
import axios from 'axios';
import {Jumbotron, Card, Button } from "react-bootstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

class LandingPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            nickName:'',
            userId:'',
            collections:[],
            searchWord:''
        }
        this.onChange=this.onChange.bind(this);
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
                alert(err);
            })   
    }
    onChange(event){
        this.setState({searchWord:event.target.value.toLowerCase()})
    }
    showAddCollectionButton(id){
        this.props.history.push('/addBookCollection/'+id)
    }
    showViewBooksButton(id){
        this.props.history.push('/viewBooks/'+id)
    }
    showAddBookButton(id){
        this.props.history.push('/addBook/'+id)
    }
    showData(data) {
        if (data.length===0){
            return( <div className="container-fluid">
                <Jumbotron align="text-center">
                    <p style={{"color":"purple"}}>Hey {this.state.userName}, you dont have any collections .Lets start adding memories !!</p>
                    <Button className="btn-1" onClick={()=> this.showAddCollectionButton(this.state.userId)}>AddNewCollection</Button>
                </Jumbotron>
            
        </div>)
        }
        else{   
            const responsive = {
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 3
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 2
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1
                }
              }      
                    return(
                            <Carousel
                                responsive={responsive}
                                ssr
                                showDots={true}
                                slidesToSlide={3}
                                infinite
                                containerClass='container-with-dots'
                                itemClass='image-item'
                                deviceType={this.props.deviceType}
                                >
                                    {data.map((item, key) => {
                                        return(
                                            <Card key={key} style={{ height:"350px",width: '300px',align:"text-center" }}>
                                                <Card.Img variant="top" src={item.image} alt="Collection Image" style={{ height:"200px" }}/>
                                                <Card.Body>
                                                    <Card.Title>{item.title}</Card.Title>
                                                    <Card.Text align="center">
                                                        By: {item.author}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer style={{display:"flex", justifyContent:"space-between"}}>
                                                    <Button className="btn-1" onClick={()=>this.showViewBooksButton(item._id)}>
                                                        ViewCollection
                                                    </Button>
                                                    <Button className="btn-1" onClick={()=>this.showAddBookButton(item._id)}>
                                                        AddBook
                                                    </Button>
                                                </Card.Footer>
                                            </Card>
                                        )
                                    })}
                                </Carousel>
            )}
            }
   
    render() {
        let data = this.state.collections.filter(
                 (item)=>{
                    return item.title.indexOf(this.state.searchWord)!== -1 }
                )   
        return(
            <div className="container-fluid">
                <div style={{display: "flex", justifyContent: "space-between",align:"text-center", paddingTop:"15px"}}>
                    <h3>Welcome {this.state.nickName}</h3>
                    <div style={{justifyContent:"flex-end"}}>
                        <input type="text" className="searchBox" placeholder="Search by Title" onChange={this.onChange} />
                    </div>
                </div>
                <br />
                <div className="container-fluid">
                    {this.showData(data)}
                </div>
                <br/>
                <br/>
                <div style={{display:"flex", justifyContent: "center"}}>
                    <Button 
                            variant="primary" style={{borderRadius:"25px" }}
                            onClick={()=> this.showAddCollectionButton(this.state.userId)}>
                            AddNewCollection
                    </Button>
                </div>
            </div>
                
        )
}
}
export default LandingPage;