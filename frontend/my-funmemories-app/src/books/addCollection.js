import React,{Component} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';

class AddBookCollection extends Component{
    constructor(props){
        super(props);
        this.state={
            collectionName:'',
            description:'',
            author:''
        }
        this.onChange= this.onChange.bind(this);
        this.handleCollection = this.handleCollection.bind(this);
    }
    onChange (event) {
        this.setState({[event.target.name] : event.target.value})
    }
   
    handleCollection (event){
        event.preventDefault();
        const newBook = {
            userId:this.props.match.params.id,
            collectionName : this.state.collectionName,
            description : this.state.description,
            author: this.state.author,
        }
        axios.post('http://localhost:5000/bookCollection/addCollection', newBook) 
        .then ((res) =>{
            alert("Collection added to the database!")
        })
        .catch((err) =>{
            console.log(err.res);
        })
        this.setState({
            userId:this.props.match.params.id,
            collectionName:'',
            description:'',
            author:''
        })
    }
    render() {
        return(
            <div className="container-fluid">
                <Form onSubmit ={this.handleCollection}>
                <Form.Group controlId="loginUserId">
                    <Form.Control hidden name="userId" value={this.props.match.params.id} />
                </Form.Group>
                <Form.Group controlId="collectionNameId">
                    <Form.Label>Collections</Form.Label>
                    <Form.Control type="text" name="collectionName" placeholder="Enter the Collection Name" value={this.state.collectionName} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="descriptionId">
                    <Form.Label>Description</Form.Label>
                    <Form.Control  type="text" name="description" placeholder="Enter the description" value={this.state.description} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="authorId">
                    <Form.Label>Author</Form.Label>
                    <Form.Control  type="text" name="author" placeholder="Enter the author " value={this.state.author} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="addButtonId">
                    <input type="submit" value="ADD" className="btn btn-primary" />
                </Form.Group> 
            </Form>
            </div>)
    }
}

export default AddBookCollection;