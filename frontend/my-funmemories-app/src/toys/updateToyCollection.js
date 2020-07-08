import React,{Component} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';

class UpdateToyCollection extends Component{
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
        this.handleCollectionUpdate = this.handleCollectionUpdate.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:5000/toyCollection/collection/'+this.props.match.params.id)
        .then((res) => {           
            const result=res.data.Collection[0]
            this.setState({
                title:result.title,
                description:result.description,
                brand:result.brand,
                category:result.category,
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
        const updatedToy = {
            collectionId:this.props.match.params.id,
            title : this.state.title,
            description : this.state.description,
            brand: this.state.brand,
            category: this.state.category,
            image:this.state.image,
            comments:this.state.comments
        }
        axios.post('http://localhost:5000/toyCollection/updateToyCollection/'+this.props.match.params.id, updatedToy) 
        .then ((res) =>{
            alert("Successfully updated Toy")
            this.props.history.push('/landing')
        })
        .catch((err) =>{
            if(err.response){
                alert(err.response.data);
            }
        })
        this.setState({
            collectionId:this.props.match.params.id,
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
                <Form className="form-cl" onSubmit ={this.handleCollectionUpdate}>
                <h3 align="center">Edit Toy Collection </h3>
                <Form.Group controlId="collectionNameId">
                    <Form.Label>Collection Name</Form.Label>
                    <Form.Control type="text" name="title"  value={this.state.title} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="descriptionId">
                    <Form.Label>Description</Form.Label>
                    <Form.Control  type="text" name="description"  value={this.state.description} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="brandId">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control  type="text" name="brand"  value={this.state.brand} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="categoryId">
                    <Form.Label>Category</Form.Label>
                    <input value={this.state.category} />
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
                    <img src={this.state.image} alt="Toy" style={{ height:"200px",width:"150px" }} />
                    <input type="file" name="imgFile" accept="image/x-png,image/gif,image/jpeg" onChange={this.onChangeFile}/>
                </Form.Group>
                <Form.Group controlId="commentsId">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control name="comments" as="textarea" rows="5" value={this.state.comments} onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="editButtonId">
                    <input type="submit" value="EDIT" className="btn btn-primary" />
                </Form.Group> 
            </Form>
            </div>)
    }
}

export default UpdateToyCollection;