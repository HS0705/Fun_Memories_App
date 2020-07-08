import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavigationBar from './navigationBar';
import FirstPage from './firstPage';
import LoginPage from './login';
import RegisterPage from './registration';
import LandingPage from './landingPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AddBookCollection from './books/addBookCollection';
import UpdateBookCollection from './books/updateBookCollection';
import AddBookSeries from './books/addBook';
import ViewBooks from './books/viewBooks';
import UpdateBook from './books/updateBook';
import AddToyCollection from './toys/addToyCollection';
import UpdateToyCollection from './toys/updateToyCollection';
import AddToySeries from './toys/addToy';
import UpdateToy from './toys/updateToy';
import ViewToys from './toys/viewToys';

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
        <Route path="/updateBookCollection/:id/" component={UpdateBookCollection} />
        <Route path="/addBook/:id/:title/:category" component={AddBookSeries} />
        <Route path="/viewBooks/:id/:title/:category" component={ViewBooks} />
        <Route path="/updateBook/:id/:title/:category" component={UpdateBook} />
        <Route path="/addToyCollection/:id" component={AddToyCollection} />
        <Route path="/updateToyCollection/:id" component={UpdateToyCollection} />
        <Route path="/addToy/:id/:title/:category" component={AddToySeries} />
        <Route path="/updateToy/:id/:title/:category" component={UpdateToy} />
        <Route path="/viewToys/:id/:title/:category" component={ViewToys} />
      </Router>
    )}
}

export default App;
