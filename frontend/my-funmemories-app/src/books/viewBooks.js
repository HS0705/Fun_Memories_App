import React, {Component} from 'react';
import axios from 'axios';
import { Button, Jumbotron} from 'react-bootstrap';

class ViewBooks extends Component{
    constructor(props){
        super(props);
        this.state = {
            books:[],
            searchWord:''
        }
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
    handleUpdateBook(data){
       this.props.history.push('/updateBook/'+data.id+'/'+data.title+'/'+data.category)
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
                if(err.response){
                    alert(err.response.data);
                }
            })
    }
    showAddBookButton(data){
        this.props.history.push('/addBook/'+data.id+'/'+data.title+'/'+data.category)
    }
    showData(data) {
        if (data.length===0) {
            return( 
                <Jumbotron align="text-center">
                    <p style={{"color":"purple"}}> No books added yet to the collection .Lets start adding memories !!</p>
                    <Button className="btn-1" onClick={()=>this.showAddBookButton({id:this.props.match.params.id,title:this.props.match.params.title,category:this.props.match.params.category}) }>
                        AddBook
                    </Button>
                </Jumbotron>
                )
        }
        else{
            return(
                <div className="flexbox-container" style={{display:"flex",flexDirection:"row", padding:"10px 10px 10px 10px",align:"center"}} >
                {data.map((item, key)=>{
                return (
                    <div className="flip-card" key= {key}style={{display:"flex"}} >
                        <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img  className="img-class" src={item.image} alt="bookimage" style={{height:"400px",width:"300px"}}/>                 
                        </div>
                        <div className="flip-card-back" >
                            <div>
                                <h3> {item.title.toUpperCase()} </h3>
                                <p>Category:{item.category}</p>
                                <p> Gifted By:{item.giftBy}</p>
                                <p> Started Reading: {item.startedReading.slice(0,10)}</p>
                                <p> Finished Reading: {item.finishedReading.slice(0,10)}</p>
                                <p> Comments: {item.comments}</p>
                            </div>
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <Button className="btn-1" onClick={()=>{this.handleUpdateBook({id:item._id,title:this.props.match.params.title,category:this.props.match.params.category})}}>EDIT</Button>
                                <Button className="btn-3" onClick={()=>{this.handleDeleteBook(item._id)} }>DELETE</Button>
                            </div>
                        </div>
                        </div>
                    </div>
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
                    <h3>  <span>{this.props.match.params.title.toUpperCase()} </span></h3>
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