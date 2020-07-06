import React, {Component} from 'react';
import axios from 'axios';
import { Button, Jumbotron} from 'react-bootstrap';


class ViewToys extends Component{
    constructor(props){
        super(props);
        this.state = {
            toys:[],
            searchWord:''
        }
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
    handleUpdateToy(data){
       this.props.history.push('/updateToy/'+data.id+'/'+data.title+'/'+data.category)
    }
    handleDeleteToy(id) {
            axios.post('http://localhost:5000/toySeries//deleteToy/'+id)
            .then((res)=>{
                axios.get('http://localhost:5000/toyCollection/series/'+this.props.match.params.id)
                .then((res)=>{
                    alert(`Toy deleted from ${this.props.match.params.title} collection`)
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
    showAddToyButton(data){
        this.props.history.push('/addToy/'+data.id+'/'+data.title+'/'+data.category)
    }
    showData(data) {
        if (data.length===0) {
            return( 
                <Jumbotron align="text-center">
                    <p style={{"color":"purple"}}> No toys added yet to the collection .Lets start adding memories !!</p>
                    <Button className="btn-1" onClick={()=>this.showAddToyButton({id:this.props.match.params.id,title:this.props.match.params.title,category:this.props.match.params.category}) }>
                        AddToy
                    </Button>
                </Jumbotron>
                )
        }
        else{
            return(
                <div className="flexbox-container" style={{padding:"10px 10px 10px 10px",align:"center"}}>
                    <div className="row">
                    {data.map((item, key)=>{
                    return (
                        <div className="col-md-3" key= {key}>
                        <div className="flip-card" style={{display:"flex"}} >
                            <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img  className="img-class" src={item.image} alt="toyimage" style={{height:"400px",width:"300px"}}/>                 
                            </div>
                            <div className="flip-card-back" >
                                <div>
                                    <h3> {item.title.toUpperCase()} </h3>
                                    <p>Category:{item.category}</p>
                                    <p> Gifted By:{item.giftBy}</p>
                                    <p> Date: {item.date.slice(0,10)}</p>
                                    <p> Comments: {item.comments}</p>
                                </div>
                                <div style={{display:"flex", justifyContent:"center"}}>
                                    <Button className="btn-1" onClick={()=>{this.handleUpdateToy({id:item._id,title:this.props.match.params.title,category:this.props.match.params.category}) }}>EDIT</Button>
                                    <Button className="btn-3" onClick={()=>{this.handleDeleteToy(item._id)} }>DELETE</Button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        )
                    })}
                </div>
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
                    <h3> <span>{this.props.match.params.title.toUpperCase()} </span></h3>
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