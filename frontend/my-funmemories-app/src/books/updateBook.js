import React,{Component} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';
import DatePicker from 'react-datepicker';

class UpdateBook extends Component{
    constructor(props){
        super(props);
        this.state={
            collectionId:'',
            title:'',
            giftBy:'',
            startedReading:'',
            finishedReading:new Date(),
            comments:'',
            image:''
        }
        this.onChange= this.onChange.bind(this);
        this.onChangeFinishDate=this.onChangeFinishDate.bind(this);
        this.onChangeFile=this.onChangeFile.bind(this);
        this.handleBookUpdate = this.handleBookUpdate.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:5000/bookSeries/book/'+this.props.match.params.id)
        .then((res) => {
            this.setState({
                collectionId:res.data.Book.collectionId,
                title:res.data.Book.title,
                giftBy:res.data.Book.giftBy,
                startedReading:res.data.Book.startedReading,
                // finishedReading:res.data.Book.finishedReading,
                image:res.data.Book.image,
                comments:res.data.Book.comments
            })
        })
        .catch((err) => {
            console.log(err);
        })   
}
    onChange (event) {
        this.setState({[event.target.name] : event.target.value})
    }
    onChangeFinishDate(date){
     this.setState({finishedReading: date})
    }
    onChangeFile (event){
        let file =event.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file[0]);
        fileReader.onload = (event)=>{
            this.setState({image:event.target.result})
        }
    }
    handleBookUpdate (event){
        event.preventDefault();
        const updatedBook = {
            collectionId:this.state.collectionId,
            title:this.state.title,
            giftBy:this.state.giftBy,
            startedReading:this.state.startedReading,
            finishedReading:this.state.finishedReading,
            image:this.state.image,
            comments:this.state.comments
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
            <div className="container-fluid" style={{width:"300px"}}>
                <Form onSubmit ={this.handleBookUpdate}>
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
                    <Form.Label>Finished Reading</Form.Label>
                    <DatePicker
                        selected={ this.state.finishedReading }
                        onChange={ this.onChangeFinishDate}
                        dateFormat="MM/dd/yyyy"
                    />
                </Form.Group>
                <Form.Group controlId="imageId">
                    <Form.Label>Image</Form.Label>
                    <img src={this.state.image} alt="book" sytle={{height:"100px",width:"75px"}} />
                    <input type="file" name="imgFile" placeholder="upload book image" onChange={this.onChangeFile}/>
                </Form.Group>
                <Form.Group controlId="commentsId">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control name="comments" onChange={this.onChange} as="textarea" rows="5" />
                </Form.Group>
                <Form.Group controlId="updateButtonId">
                    <input type="submit" value="Update" className="btn btn-primary" />
                </Form.Group> 
            </Form>
            </div>)
    }
}

export default UpdateBook;