import React,{Component} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';
import DatePicker from 'react-datepicker';

class UpdateToy extends Component{
    constructor(props){
        super(props);
        this.state={
            collectionId:'',
            title:'',
            giftBy:'',
            date:'',
            comments:'',
            image:''
        }
        this.onChange= this.onChange.bind(this);
        this.onChangeFile=this.onChangeFile.bind(this);
        this.handleToyUpdate = this.handleToyUpdate.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:5000/toySeries/toy/'+this.props.match.params.id)
        .then((res) => {
            this.setState({
                collectionId:res.data.Toy.collectionId,
                title:res.data.Toy.title,
                giftBy:res.data.Toy.giftBy,
                date:res.data.Toy.date,
                image:res.data.Toy.image,
                comments:res.data.Toy.comments
            })
        })
        .catch((err) => {
            console.log(err);
        })   
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
    handleToyUpdate (event){
        event.preventDefault();
        const updatedToy = {
            collectionId:this.state.collectionId,
            title:this.state.title,
            giftBy:this.state.giftBy,
            date:this.state.date,
            image:this.state.image,
            comments:this.state.comments
        }
        axios.post('http://localhost:5000/toySeries/updateToy/'+this.props.match.params.id, updatedToy) 
        .then ((res) => {
            this.props.history.push('/viewToys/'+this.state.collectionId)
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
                <Form className="form-cl" onSubmit ={this.handleToyUpdate}>
                <h3 align="center">Edit Toy Details</h3>
                <Form.Group controlId="titleId">
                    <Form.Label>Title</Form.Label>
                    <Form.Control  type="text" name="title"  value={this.state.title} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="giftById">
                    <Form.Label>Gifted By</Form.Label>
                    <Form.Control  type="text" name="giftBy" placeholder="Enter the name of person who gifted the toy" value={this.state.giftBy} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="dateId">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="text" readOnly  value={this.state.date} />
                </Form.Group>
                <Form.Group controlId="imageId">
                    <Form.Label>Image</Form.Label>
                    <img src={this.state.image} alt="Toy" style={{ height:"100px",width:"75px" }} />
                    <input type="file" name="imgFile"  placeholder="upload toy image" onChange={this.onChangeFile}/>
                </Form.Group>
                <Form.Group controlId="commentsId">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control name="comments" value={this.state.comments} onChange={this.onChange} as="textarea" rows="5" />
                </Form.Group>
                <Form.Group controlId="updateButtonId">
                    <input type="submit" value="Update" className="btn btn-primary" />
                </Form.Group> 
            </Form>
            </div>)
    }
}

export default UpdateToy;