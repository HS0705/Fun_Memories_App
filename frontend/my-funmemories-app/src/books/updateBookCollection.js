import React,{Component} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';

class UpdateBookCollection extends Component{
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
        this.handleCollectionUpdate = this.handleCollectionUpdate.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:5000/bookCollection/collection/'+this.props.match.params.id)
        .then((res) => {
            const result=res.data.Collection[0]
            this.setState({
            title : result.title,
            description : result.description,
            author: result.author,
            category: result.category,
            image:result.image,
            comments:result.comments
            })
        })
        .catch((err) => {
            if(err.response){
                alert(err.response.data);
            }
        })   
}
    onChange (event) {
        this.setState({[event.target.name] : event.target.value})
    }
   onChangeFile (event){
       let file =event.target.files;
       let fileReader = new FileReader();
       if(event.target.files[0]){
        fileReader.readAsDataURL(file[0])
       }
       else{
           alert("Error uploading an image, Please Try again")
       }
       fileReader.onload = (event)=>{
           this.setState({image:event.target.result})
       }
   }
    handleCollectionUpdate (event){
        event.preventDefault();
        const updatedCollection = {
            collectionId:this.props.match.params.id,
            title : this.state.title,
            description : this.state.description,
            author: this.state.author,
            category: this.state.category,
            image:this.state.image,
            comments:this.state.comments
        }
        axios.post('http://localhost:5000/bookCollection/updateBookCollection/'+this.props.match.params.id, updatedCollection) 
        .then ((res) =>{
            alert("Collection Updated!!")
            this.props.history.push('/landing')
        })
        .catch((err) =>{
            if (err.response)
            {
                alert(err.response.data)
            } 
        })
        this.setState({
            collectionId:this.props.match.params.id,
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
                <Form className="form-cl" onSubmit ={this.handleCollectionUpdate}>
                <h3 align="center">Edit Book Collection </h3>
                <Form.Group controlId="collectionNameId">
                    <Form.Label>Collection Name</Form.Label>
                    <Form.Control type="text" name="title"  value={this.state.title} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="descriptionId">
                    <Form.Label>Description</Form.Label>
                    <Form.Control  type="text" name="description"  value={this.state.description} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="authorId">
                    <Form.Label>Author</Form.Label>
                    <Form.Control  type="text" name="author"  value={this.state.author} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="categoryId">
                    <Form.Label>Category</Form.Label><br />
                    <input readOnlytype="text" value={this.state.category} />
                    <Form.Control as="select" name="category" onChange={this.onChange}>
                        <option>Select</option>
                        <option>Fiction</option>
                        <option>Non Fiction</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="imageId">
                    <Form.Label>Image</Form.Label>
                    <div style={{display:"flex"}}>
                        <img src={this.state.image} alt="book" style={{height:"200px",width:"150px"}} />
                    </div>
                    <input type="file" name="imgFile" accept="image/x-png,image/gif,image/jpeg" onChange={this.onChangeFile}/>
                </Form.Group>
                <Form.Group controlId="commentsId">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control name="comments" as="textarea" rows="5" value={this.state.comments} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="editButtonId">
                    <input type="submit" value="Edit" className="btn btn-primary" />
                </Form.Group> 
            </Form>
            </div>)
    }
}

export default UpdateBookCollection;