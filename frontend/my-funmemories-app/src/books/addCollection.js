import React,{Component} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';

class AddBookCollection extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            description:'',
            author:'',
            category:'',
            image:'',
            comments:''
        }
        this.onChange= this.onChange.bind(this);
        this.onChangeFile =this.onChangeFile.bind(this);
        this.handleCollection = this.handleCollection.bind(this);
    }
    onChange (event) {
        this.setState({[event.target.name] : event.target.value})
    }
   onChangeFile (event){
       let file =event.target.files;
       let fileReader = new FileReader();
       fileReader.readAsDataURL(file[0]);
       fileReader.onload = (event)=>{
           this.setState({image:event.target.result})
       }
   }
    handleCollection (event){
        event.preventDefault();
        const newBook = {
            userId:this.props.match.params.id,
            title : this.state.title,
            description : this.state.description,
            author: this.state.author,
            category: this.state.category,
            image:this.state.image,
            comments:this.state.comments
        }
        axios.post('http://localhost:5000/bookCollection/addCollection', newBook) 
        .then ((res) =>{
            this.props.history.push('/landing')
        })
        .catch((err) =>{
            console.log(err.res);
        })
        this.setState({
            userId:this.props.match.params.id,
            title:'',
            description:'',
            author:'',
            category:'',
            image:'',
            comments:''
        })
    }
    render() {
        return(
            <div>
                <Form className="form-cl" onSubmit ={this.handleCollection}>
                <Form.Group controlId="loginUserId">
                    <Form.Control hidden name="userId" defaultValue={this.props.match.params.id} />
                </Form.Group>
                <Form.Group controlId="collectionNameId">
                    <Form.Label>Collections</Form.Label>
                    <Form.Control type="text" name="title" placeholder="Enter the Collection Name" value={this.state.title} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="descriptionId">
                    <Form.Label>Description</Form.Label>
                    <Form.Control  type="text" name="description" placeholder="Enter the description" value={this.state.description} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="authorId">
                    <Form.Label>Author</Form.Label>
                    <Form.Control  type="text" name="author" placeholder="Enter the author " value={this.state.author} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="categoryId">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" name="category" onChange={this.onChange}>
                        <option>Select</option>
                        <option>Fiction</option>
                        <option>Non Fiction</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="imageId">
                    <Form.Label>Image</Form.Label>
                    <input type="file" name="imgFile" placeholder="upload book image" onChange={this.onChangeFile}/>
                </Form.Group>
                <Form.Group controlId="commentsId">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control name="comments" as="textarea" rows="5" onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="addButtonId">
                    <input type="submit" value="ADD" className="btn btn-primary" />
                </Form.Group> 
            </Form>
            </div>)
    }
}

export default AddBookCollection;