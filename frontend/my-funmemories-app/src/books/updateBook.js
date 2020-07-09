import React,{Component} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';

class UpdateBook extends Component{
    constructor(props){
        super(props);
        this.state={
            collectionId:'',
            title:'',
            giftBy:'',
            startedReading:'',
            finishedReading:'',
            comments:'',
            image:''
        }
        this.onChange= this.onChange.bind(this);
        this.onChangeFile=this.onChangeFile.bind(this);
        this.handleBookUpdate = this.handleBookUpdate.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:5000/bookSeries/book/'+this.props.match.params.id)
        .then((res) => {
            this.setState({
                collectionId:res.data.Book.collectionId,
                collectionName:res.data.Book.collectionName,
                category:res.data.Book.category,
                title:res.data.Book.title,
                giftBy:res.data.Book.giftBy,
                startedReading:res.data.Book.startedReading,
                finishedReading:res.data.Book.finishedReading,
                image:res.data.Book.image,
                comments:res.data.Book.comments
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
    handleBookUpdate (event){
        event.preventDefault();
        const updatedBook = {
            collectionId:this.state.collectionId,
            collectionName:this.props.match.params.collectionName,
            category:this.props.match.params.category,
            title:this.state.title,
            giftBy:this.state.giftBy,
            startedReading:this.state.startedReading,
            finishedReading:this.state.finishedReading,
            image:this.state.image,
            comments:this.state.comments
        }
        axios.post('http://localhost:5000/bookSeries/updateBook/'+this.props.match.params.id, updatedBook) 
        .then ((res) => {
            alert(`${this.state.title}, updated`)
            this.props.history.push('/landing/')
        })
        .catch((err) =>{
            if(err.response){
                alert(err.response.data);
            }
        })
    }
    
    render() {
        return(
            <div>
                <Form className="form-cl" onSubmit ={this.handleBookUpdate}>
                <h3 align="center">Edit Book Details</h3>
                <Form.Group controlId="nameId">
                    <Form.Label>Collection Name</Form.Label>
                    <Form.Control  readOnly type="text" name="collectionName" value={this.props.match.params.title}  />
                </Form.Group>
                <Form.Group controlId="categoryId">
                    <Form.Label>Category</Form.Label>
                    <Form.Control  readOnly type="text" name="category"  value={this.props.match.params.category}  />
                </Form.Group>
                <Form.Group controlId="titleId">
                    <Form.Label>Title</Form.Label>
                    <Form.Control  type="text" name="title"  value={this.state.title} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="giftById">
                    <Form.Label>Gifted By</Form.Label>
                    <Form.Control  type="text" name="giftBy" placeholder="Enter the name of person who gifted the book" value={this.state.giftBy} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="startedId">
                    <Form.Label>Started Reading</Form.Label>
                    <Form.Control type="text" readOnly  value={this.state.startedReading} />
                </Form.Group>
                <Form.Group controlId="finishedId">
                    <Form.Label> Finished Reading</Form.Label>
                    <Form.Control type="text" readOnly  value={this.state.finishedReading} />
                </Form.Group>
                <Form.Group controlId="imageId">
                    <div style={{display:"flex"}}>
                        <img src={this.state.image} alt="book" style={{height:"200px",width:"150px"}} />
                    </div>
                    <input type="file" name="imgFile"  accept="image/x-png,image/gif,image/jpeg" onChange={this.onChangeFile}/>
                </Form.Group>
                <Form.Group controlId="commentsId">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control name="comments" value= {this.state.comments} onChange={this.onChange} as="textarea" rows="5" />
                </Form.Group>
                <Form.Group controlId="updateButtonId">
                    <input type="submit" value="Update" className="btn btn-primary" />
                </Form.Group> 
            </Form>
            </div>)
    }
}

export default UpdateBook;