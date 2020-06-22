import React, {Component} from 'react';
import axios from 'axios';
import {Card, Button, Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class ViewBooks extends Component{
    constructor(props){
        super(props);
        this.state = {
            books:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/bookCollection/series/'+this.props.match.params.id)
        .then((res)=>{
            this.setState({
                books:res.data.Books
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleDeleteBook(id) {
            axios.post('http://localhost:5000/bookSeries//deleteBook/'+id)
            .then((res)=>{
                this.props.history.push('/viewBooks/'+this.props.match.params.id)
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    render() {
        return(
        <div className="container-fluid">
            <div className="column">
            <div className="row">
            {this.state.books.map((item, key)=>{
                return (
                    <Card className="text-center card-columns p-5" key={key} style={{"height":"15rem","width":"20rem"}}>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Footer className=" p-4 d-flex justify-content-between">
                            <Link to={'/updateBook/'+item._id }>Edit</Link>
                            <Button onClick={()=>{this.handleDeleteBook(item._id)} }>Delete</Button>
                        </Card.Footer>
                    </Card>
                )
            })
        }
        </div>
        </div>
        </div>
        )
    }
}

export default ViewBooks;