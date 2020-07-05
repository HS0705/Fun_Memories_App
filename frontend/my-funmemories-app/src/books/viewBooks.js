import React, {Component} from 'react';
import axios from 'axios';
import {Card, Button, Jumbotron} from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';

class ViewBooks extends Component{
    constructor(props){
        super(props);
        this.state = {
            books:[],
            isFlipped:false,
            searchWord:''
        }
        this.handleCardClick = this.handleCardClick.bind(this);
        this.onChangeSearch=this.onChangeSearch.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:5000/bookCollection/series/'+this.props.match.params.id)
        .then((res)=>{
            this.setState({
                books:res.data.Books
            })
        })
        .catch((err)=>{
            if(err.response){
                alert(err.response.data);
            }
        })
    }
    onChangeSearch(event){
        this.setState({searchWord:event.target.value.toLowerCase()})
    }
    handleCardClick(event){
        event.preventDefault();
        this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
    }
    handleUpdateBook(id){
       this.props.history.push('/updateBook/'+id)
    }
    handleDeleteBook(id) {
            axios.post('http://localhost:5000/bookSeries//deleteBook/'+id)
            .then((res)=>{
                axios.get('http://localhost:5000/bookCollection/series/'+this.props.match.params.id)
                .then((res)=>{
                    this.setState({
                        books:res.data.Books
                    })
                })
                .catch((err)=>{
                    if(err.response){
                        alert(err.response.data);
                    }
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    showAddBookButton(id){
        this.props.history.push('/addBook/'+id)
    }
    showData(data) {
        if (data.length===0) {
            return( 
                <Jumbotron align="text-center">
                    <p style={{"color":"purple"}}> No books added yet to the collection .Lets start adding memories !!</p>
                    <Button className="btn-1" onClick={()=>this.showAddBookButton(this.props.match.params.id)}>
                        AddBook
                    </Button>
                </Jumbotron>
                )
        }
        else{
            return(
                <div className="flexbox-container" style={{display:"flex",flexDirection:"row"}}>
                {data.map((item, key)=>{
                return (
                    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal" >
                        <div key="front" style={{ align:"center",border:"1px solid green"}}>
                            <img  src={item.image} alt="bookimage" style={{height:"150px",width:"200px"}} />
                                <h3>{item.title}</h3>
                                <p>Gifted By:{item.giftBy}</p>
                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <Button className="btn-1" onClick={()=>{this.handleUpdateBook(item._id)}}>EDIT</Button>
                                <Button className="btn-3" onClick={()=>{this.handleDeleteBook(item._id)} }>DELETE</Button>
                                <Button className="btn-1" onClick={this.handleCardClick}>FLIP</Button>
                            </div>  
                        </div>
                        <div key="back">
                            <h3>{item.title}</h3><br/>
                            Started Reading: {item.startedReading}<br />
                            Finished Reading: {item.finishedReading}<br />
                            Comments: {item.comments}
                            <div>
                                <Button className="btn-1" onClick={this.handleCardClick}>COVER</Button>
                            </div>
                        </div>
                        </ReactCardFlip>
                    )
                })}
                </div>
                )}
                }
    render() {
        const data= this.state.books.filter(
            (item)=>{
               return item.title.indexOf(this.state.searchWord)!== -1 }
           )   ;
        return(
            <div className="container-fluid">
                <div style={{display: "flex", justifyContent: "space-between",align:"text-center", paddingTop:"15px"}}>
                    <h3> Amazing Collection</h3>
                    <div style={{justifyContent:"flex-end"}}>
                        <input type="text"  className="searchBox" placeholder="Search by Title" onChange={this.onChangeSearch} style={{width:"350px",color:"green"}}/>
                    </div>
                </div>
                <br />
                <div>
                    {this.showData(data)}
                </div>
            </div>
        )
    }
}

export default ViewBooks;