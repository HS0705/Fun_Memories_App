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
            bookCollections:[],
            toyCollections:[],
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
            const user=res.data.user[0];
            const books = res.data.books;
            const toys = res.data.toys;
            this.setState({
                userName:user.userName,
                nickName:user.nickName,
                userId:user._id,
                bookCollections:books,
                toyCollections:toys
            })
    })
        .catch((err) => {
            alert(err);
        })   
    }
    onChange(event){
        this.setState({searchWord:event.target.value.toLowerCase()})
    }
    showAddBookCollectionButton(id){
        this.props.history.push('/addBookCollection/'+id)
    }
    showAddToyCollectionButton(id){
        this.props.history.push('/addToyCollection/'+id)
    }
    showViewBooksButton(data){
        this.props.history.push('/viewBooks/'+data.id+'/'+data.title+'/'+data.category)
    }
    showViewToysButton(data){
        this.props.history.push('/viewToys/'+data.id+'/'+data.brand+'/'+data.category)
    }
    showAddToyButton(data){
        this.props.history.push('/addToy/'+data.id+'/'+data.brand+'/'+data.category)
    }
    showAddBookButton(data){
        this.props.history.push('/addBook/'+data.id+'/'+data.title+'/'+data.category)
    }
    showBookData(bookdata) {
        if (bookdata.length===0){
            return( <div className="container-fluid">
                <Jumbotron align="text-center">
                    <p style={{"color":"purple"}}>Hey {this.state.userName} you dont have any collections .Lets start adding memories !!</p>
                    <Button className="btn-1" onClick={()=> this.showAddBookCollectionButton(this.state.userId)}>AddBookCollection</Button>
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
                    {bookdata.map((item, key) => {
                        return(
                            <Card key={key}>
                                <Card.Img variant="top" src={item.image} alt="Collection Image" style={{ height:"200px" }}/>
                                <Card.Body align="center">
                                    <Card.Title>{item.title}</Card.Title>
                                        By: {item.author}<br/>
                                        Category: {item.category}
                                </Card.Body>
                                <Card.Footer style={{display:"flex", justifyContent:"space-between"}}>
                                    <Button className="btn-1" onClick={()=>this.showViewBooksButton({id:item._id,title:item.title,category:item.category})}>
                                        ViewCollection
                                    </Button>
                                    <Button className="btn-1" onClick={()=>this.showAddBookButton({id:item._id,title:item.title,category:item.category}) }>
                                        AddBook
                                    </Button>
                                </Card.Footer>
                            </Card>
                        )
                    })}
                    </Carousel>
    )}
    }
    showToyData(toydata) {
        if (toydata.length===0){
            return( <div className="container-fluid">
                <Jumbotron align="text-center">
                    <p style={{"color":"purple"}}>Hey {this.state.userName} you dont have any collections .Lets start adding memories !!</p>
                    <Button className="btn-1" onClick={()=> this.showAddToyCollectionButton(this.state.userId)}>AddToyCollection</Button>
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
                    {toydata.map((item, key) => {
                        return(
                            <Card key={key} style={{ height:"400px",width: '300px',align:"text-center" }}>
                                <Card.Img variant="top" src={item.image} alt="Collection Image" style={{ height:"200px" }}/>
                                <Card.Body align="center">
                                    <Card.Title>{item.title}</Card.Title>
                                        Brand: {item.brand}<br/>
                                        Category: {item.category}
                                </Card.Body>
                                <Card.Footer style={{display:"flex", justifyContent:"space-between"}}>
                                    <Button className="btn-1" onClick={()=>this.showViewToysButton({id:item._id,brand:item.brand,category:item.category})}>
                                        ViewCollection
                                    </Button>
                                    <Button className="btn-1" onClick={()=>this.showAddToyButton({id:item._id,brand:item.brand,category:item.category})}>
                                        AddToy
                                    </Button>
                                </Card.Footer>
                            </Card>
                        )
                    })}
                    </Carousel>
    )}
    }
    render() {
        let bookdata = this.state.bookCollections.filter(
                 (item)=>{
                    return item.title.indexOf(this.state.searchWord) !== -1
                 }
                )   
        let toydata = this.state.toyCollections.filter(
            (item)=>{
                return item.title.indexOf(this.state.searchWord) !== -1
            }
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
                <div>
                    <div>
                    <div className="container-fluid">
                    {this.showBookData(bookdata)}
                </div>
                <br/>
                <br/>
                <div style={{display:"flex", justifyContent: "center"}}>
                    <Button 
                            variant="primary" style={{borderRadius:"25px" }}
                            onClick={()=> this.showAddBookCollectionButton(this.state.userId)}>
                            NewBookCollection
                    </Button>
                </div>
                    </div>
                
                <br/>
                <br/>
                <div>
                <div>
                {this.showToyData(toydata)}
                </div>
                <br />
                <br />
                <div style={{display:"flex", justifyContent: "center"}}>
                    <Button 
                            variant="primary" style={{borderRadius:"25px" }}
                            onClick={()=> this.showAddToyCollectionButton(this.state.userId)}>
                            NewToyCollection
                    </Button>
                </div>
                </div>
                
                </div>
                
            </div>
                
        )
}
}
export default LandingPage;