import React,{Component} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class AddBookSeries extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            giftBy:'',
            startedReading: new Date(),
            finishedReading: new Date(),
            comments:'',
            image:''
        }
        this.onChange= this.onChange.bind(this);
        this.onChangeStart=this.onChangeStart.bind(this);
        this.onChangeEnd=this.onChangeEnd.bind(this);
        this.onChangeFile=this.onChangeFile.bind(this);
        this.handleBook = this.handleBook.bind(this);
    }
    onChange (event) {
        this.setState({[event.target.name] : event.target.value})
    }
    onChangeStart(date){
        this.setState({startedReading : date})
    }
    onChangeEnd(date){
        this.setState({finishedReading : date})
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
    handleBook (event){
        event.preventDefault();
        const newBook = {
            collectionId:this.props.match.params.id,
            collectionName:this.props.match.params.title,
            category:this.props.match.params.category,
            title:this.state.title,
            giftBy:this.state.giftBy,
            startedReading:this.state.startedReading,
            finishedReading:this.state.finishedReading,
            comments:this.state.comments,
            image:this.state.image
        }
        axios.post('http://localhost:5000/bookSeries/addBook', newBook) 
        .then ((res) => {
            alert(`Book added to the ${this.props.match.params.title} collection series!`)
            this.props.history.push('/landing')
        })
        .catch((err) =>{
            if(err.response){
                alert(err.response.data);
            }

        })
        this.setState({
            collectionId:this.props.match.params.id,
            collectionName:this.props.match.params.title,
            category:this.props.match.params.category,
            title:'',
            giftBy:'',
            startedReading:'',
            finishedReading:'',
            comments:'',
            image:''
        })
    }
    render() {
        return(
            <div>
                <Form className="form-cl" onSubmit ={this.handleBook}>
                <h3 align="center">New Book</h3>
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
                    <Form.Control  type="text" name="title" placeholder="Enter the title " value={this.state.title} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="giftById">
                    <Form.Label>Gifted By</Form.Label>
                    <Form.Control  type="text" name="giftBy" placeholder="Enter the name of person who gifted the book " value={this.state.giftBy} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="startedId">
                    <Form.Label>Started Reading</Form.Label>
                    <DatePicker
                        selected={this.state.startedReading}
                        onChange={ this.onChangeStart}
                        dateFormat="MM/dd/yyyy"
                    />
                </Form.Group>
                <Form.Group controlId="startedId">
                    <Form.Label>Finished Reading</Form.Label>
                    <DatePicker
                        selected={this.state.finishedReading}
                        onChange={ this.onChangeEnd}
                        dateFormat="MM/dd/yyyy"
                    />
                </Form.Group>
                <Form.Group controlId="imageId">
                    <Form.Label>Image</Form.Label>
                    <input type="file" name="imgFile" accept="image/x-png,image/gif,image/jpeg" onChange={this.onChangeFile}/>
                </Form.Group>
                <Form.Group controlId="commentsId">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control name="comments" value= {this.state.comments} onChange={this.onChange} as="textarea" rows="5" />
                </Form.Group>
                <Form.Group controlId="addButtonId">
                    <input type="submit" value="ADD" className="btn btn-primary" />
                </Form.Group> 
            </Form>
            </div>)
    }
}

export default AddBookSeries;