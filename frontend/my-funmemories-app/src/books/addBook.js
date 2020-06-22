import React,{Component} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class AddBookSeries extends Component{
    constructor(props){
        super(props);
        this.state={
            title:''
        }
        this.onChange= this.onChange.bind(this);
        this.handleBook = this.handleBook.bind(this);
    }
    onChange (event) {
        this.setState({[event.target.name] : event.target.value})
    }
   
    handleBook (event){
        event.preventDefault();
        const newBook = {
            collectionId:this.props.match.params.id,
            title:this.state.title
        }
        axios.post('http://localhost:5000/bookSeries/addBook', newBook) 
        .then ((res) => {
            alert("Book added to the collection!")
        })
        .catch((err) =>{
            console.log(err.res);
        })
        this.setState({
            collectionId:this.props.match.params.id,
            title:''
        })
    }
    render() {
        return(
            <div className="container-fluid">
                <Form onSubmit ={this.handleBook}>
                <Form.Group controlId="collectionId">
                    <Form.Control  name="collectionId" value={this.props.match.params.id} />
                </Form.Group>
                <Form.Group controlId="titleId">
                    <Form.Label>Title</Form.Label>
                    <Form.Control  type="text" name="title" placeholder="Enter the title " value={this.state.title} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="addButtonId">
                    <input type="submit" value="ADD" className="btn btn-primary" />
                </Form.Group> 
            </Form>
            </div>)
    }
}

export default AddBookSeries;