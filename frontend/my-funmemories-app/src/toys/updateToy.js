import React,{Component} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';

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
            console.log(res)
            this.setState({
                collectionId:res.data.Toy.collectionId,
                collectionName:res.data.Toy.collectionName,
                category:res.data.Toy.category,
                title:res.data.Toy.title,
                giftBy:res.data.Toy.giftBy,
                date:res.data.Toy.date,
                image:res.data.Toy.image,
                comments:res.data.Toy.comments
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
    handleToyUpdate (event){
        event.preventDefault();
        const updatedToy = {
            collectionId:this.state.collectionId,
            collectionName:this.props.match.params.title,
            category:this.props.match.params.category,
            title:this.state.title,
            giftBy:this.state.giftBy,
            date:this.state.date,
            image:this.state.image,
            comments:this.state.comments
        }
        axios.post('http://localhost:5000/toySeries/updateToy/'+this.props.match.params.id, updatedToy) 
        .then ((res) => {
            alert(`${this.state.title}, updated`  )
            this.props.history.push('/landing')
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
                <Form.Group controlId="collectionNameId">
                    <Form.Label>Collection Name</Form.Label>
                    <Form.Control  readOnly type="text" name="collectionName"  value={this.props.match.params.title}  />
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
                    <Form.Control  type="text" name="giftBy" placeholder="Enter the name of person who gifted the toy" value={this.state.giftBy} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="dateId">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="text" readOnly  value={this.state.date} />
                </Form.Group>
                <Form.Group controlId="imageId">
                    <img src={this.state.image} alt="Toy" style={{ height:"200px",width:"150px" }} />
                    <input type="file" name="imgFile" accept="image/x-png,image/gif,image/jpeg" onChange={this.onChangeFile}/>
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