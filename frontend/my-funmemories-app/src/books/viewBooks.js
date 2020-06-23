import React, {Component} from 'react';
import axios from 'axios';
import {Card, Button, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import UpdateBook from './updateBook';

class ViewBooks extends Component{
    constructor(props){
        super(props);
        this.state = {
            books:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/bookCollection/series/'+this.props.match.params.id)
        .then((res)=>{
            this.setState({
                books:res.data.Books
            })
        })
        .catch((err)=>{
            console.log(err)
        })
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
                    console.log(err)
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    showData(data) {
        if (data.length===0) {
            return( 
                <Jumbotron>
                <p style={{"color":"purple"}}> No books added yet to the collection .Lets start adding memories !!</p>
                <Link to ={'/addBook/'+this.props.match.params.id}>Add Books</Link>
                </Jumbotron>
                )
        }
        else{
            return(
                <div className="container-fluid">
                    <div className="column">
                        <div className="row">
                            {data.map((item, key)=>{
                                return (
                                        <Card className="text-center card-columns p-5" key={key} style={{"height":"15rem","width":"20rem"}}>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Footer className=" p-4 d-flex justify-content-between">
                                                <Button variant="outline-info" onClick={()=>{this.handleUpdateBook(item._id)}}>EDIT</Button>
                                                <Button variant="outline-danger" onClick={()=>{this.handleDeleteBook(item._id)} }>DELETE</Button>
                                            </Card.Footer>
                                        </Card>
                                    )
                                })}
                                </div>
                                </div>
                                </div>
                                )}
                                }
    render() {
        const data= this.state.books;
        return(
            <div>
                {this.showData(data)}
            </div>
            
        )
    }
}

export default ViewBooks;