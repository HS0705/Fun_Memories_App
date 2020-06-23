import React,{Component} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';

class UpdateBook extends Component{
    constructor(props){
        super(props);
        this.state={
            collectionId:'',
            title:'',
        }
        this.onChange= this.onChange.bind(this);
        this.handleBookUpdate = this.handleBookUpdate.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:5000/bookSeries/book/'+this.props.match.params.id)
        .then((res) => {
            this.setState({
                collectionId:res.data.Book.collectionId,
                title:res.data.Book.title
            })
        })
        .catch((err) => {
            console.log(err);
        })   
}
    onChange (event) {
        this.setState({[event.target.name] : event.target.value})
    }
   
    handleBookUpdate (event){
        event.preventDefault();
        const updatedBook = {
            collectionId:this.state.collectionId,
            title:this.state.title
        }
        axios.post('http://localhost:5000/bookSeries/updateBook/'+this.props.match.params.id, updatedBook) 
        .then ((res) => {
            this.props.history.push('/viewBooks/'+this.state.collectionId)
        })
        .catch((err) =>{
            console.log(err.res);
        })
    }
    
    render() {
        return(
            <div className="container-fluid">
                <Form onSubmit ={this.handleBookUpdate}>
                <Form.Group controlId="collectionId">
                    <Form.Label>Collection Id: </Form.Label>
                    <Form.Control hidden name="collectionId" value={this.state.collectionId} />
                </Form.Group>
                <Form.Group controlId="titleId">
                    <Form.Label>Title</Form.Label>
                    <Form.Control  type="text" name="title"  value={this.state.title} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="updateButtonId">
                    <input type="submit" value="Update" className="btn btn-primary" />
                </Form.Group> 
            </Form>
            </div>)
    }
}

export default UpdateBook;