import React, {Component} from 'react';
import axios from 'axios';
import {Card, Button, Jumbotron} from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';

class ViewToys extends Component{
    constructor(props){
        super(props);
        this.state = {
            toys:[],
            isFlipped:false,
            searchWord:''
        }
        this.handleCardClick = this.handleCardClick.bind(this);
        this.onChangeSearch=this.onChangeSearch.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:5000/toyCollection/series/'+this.props.match.params.id)
        .then((res)=>{
            this.setState({
                toys:res.data.Toys
            })
        })
        .catch((err)=>{
            if(err.response){
                alert(err.response.data);
            }
        })
    }
    onChangeSearch(event){
        this.setState({searchWord:event.target.value.toLowerCase()})
    }
    handleCardClick(event){
        event.preventDefault();
        this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
    }
    handleUpdateToy(id){
       this.props.history.push('/updateToy/'+id)
    }
    handleDeleteToy(id) {
            axios.post('http://localhost:5000/toySeries//deleteToy/'+id)
            .then((res)=>{
                axios.get('http://localhost:5000/toyCollection/series/'+this.props.match.params.id)
                .then((res)=>{
                    this.setState({
                        toys:res.data.Toys
                    })
                })
                .catch((err)=>{
                    if(err.response){
                        alert(err.response.data);
                    }
                })
            })
            .catch((err)=>{
                if(err.response){
                    alert(err.response.data);
                }
            })
    }
    showAddToyButton(id){
        this.props.history.push('/addToy/'+id)
    }
    showData(data) {
        if (data.length===0) {
            return( 
                <Jumbotron align="text-center">
                    <p style={{"color":"purple"}}> No toys added yet to the collection .Lets start adding memories !!</p>
                    <Button className="btn-1" onClick={()=>this.showAddToyButton(this.props.match.params.id)}>
                        AddToy
                    </Button>
                </Jumbotron>
                )
        }
        else{
            return(
                <div className="container-fluid">
                {data.map((item, key)=>{
                return (
                    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal" key={key} style={{height:"350px"}} >
                        <Card  key="front">
                            <Card.Img variant="top" src={item.image} alt="toyimage" style={{height:"200px"}} />
                            <Card.Body>
                                <h4>{item.title}</h4>
                                <p>Gifted By:{item.giftBy}</p>
                            </Card.Body>
                            <Card.Footer style={{display:"flex", justifyContent:"space-between"}}>
                                <Button className="btn-1" onClick={()=>{this.handleUpdateToy(item._id)}}>EDIT</Button>
                                <Button className="btn-3" onClick={()=>{this.handleDeleteToy(item._id)} }>DELETE</Button>
                                <Button className="btn-1" onClick={this.handleCardClick}>FLIP</Button>
                            </Card.Footer>  
                        </Card>
                        <Card key="back">
                            <Card.Body>
                                <Card.Text><h3>{item.title}</h3></Card.Text>
                                <Card.Text>
                                Date: {item.date}<br />
                                Comments: {item.comments}
                                </Card.Text>
                                
                            </Card.Body>
                            <Card.Footer>
                                <Button className="btn-1" onClick={this.handleCardClick}>COVER</Button>
                            </Card.Footer>
                        </Card>
                        </ReactCardFlip>
                    )
                })}
                </div>
                )}
                }
    render() {
        const data= this.state.toys.filter(
            (item)=>{
               return item.title.indexOf(this.state.searchWord)!== -1 }
           )   ;
        return(
            <div className="container-fluid">
                <div style={{display: "flex", justifyContent: "space-between",align:"text-center", paddingTop:"15px"}}>
                    <h3> Amazing Collection</h3>
                    <div style={{justifyContent:"flex-end"}}>
                        <input type="text"  className="searchBox" placeholder="Search by Title" onChange={this.onChangeSearch} style={{width:"350px",color:"green"}}/>
                    </div>
                </div>
                <br />
                <div>
                    {this.showData(data)}
                </div>
            </div>
        )
    }
}

export default ViewToys;