import React,{Component} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';

class AddToyCollection extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            description:'',
            brand:'',
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
        const newToy = {
            userId:this.props.match.params.id,
            title : this.state.title,
            description : this.state.description,
            brand: this.state.brand,
            category: this.state.category,
            image:this.state.image,
            comments:this.state.comments
        }
        axios.post('http://localhost:5000/toyCollection/addToyCollection', newToy) 
        .then ((res) =>{
            this.props.history.push('/landing')
        })
        .catch((err) =>{
            if(err.response){
                alert(err.response.data);
            }
        })
        this.setState({
            userId:this.props.match.params.id,
            title:'',
            description:'',
            brand:'',
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
                <Form.Group controlId="brandId">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control  type="text" name="brand" placeholder="Enter the brand " value={this.state.brand} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="categoryId">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" name="category" onChange={this.onChange}>
                        <option>Select</option>
                        <option>Cars</option>
                        <option>Dolls</option>
                        <option>Legos</option>
                        <option>Action Figures</option>
                        <option>Board Games</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="imageId">
                    <Form.Label>Image</Form.Label>
                    <input type="file" name="imgFile" placeholder="upload toy image" onChange={this.onChangeFile}/>
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

export default AddToyCollection;