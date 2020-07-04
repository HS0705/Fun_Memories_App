import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavigationBar from './navigationBar';
import FirstPage from './firstPage';
import LoginPage from './login';
import RegisterPage from './registration';
import LandingPage from './landingPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AddBookCollection from './books/addCollection';
import AddBookSeries from './books/addBook';
import ViewBooks from './books/viewBooks';
import UpdateBook from './books/updateBook';

class App extends Component {

  render(){
    return (
      <Router>
        <NavigationBar />
        <Route exact path="/" component ={FirstPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/landing" component={LandingPage} />
        <Route path="/addBookCollection/:id" component={AddBookCollection} />
        <Route path="/addBook/:id" component={AddBookSeries} />
        <Route path="/viewBooks/:id" component={ViewBooks} />
        <Route path="/updateBook/:id" component={UpdateBook} />
      </Router>
    )}
}

export default App;
