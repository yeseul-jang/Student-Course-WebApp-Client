import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
//

import Home from './components/Home';
import CreateStudent from './components/CreateStudent';
import EditCourse from './components/EditCourse';
import EditStudent from './components/EditStudent';
import ShowStudent from './components/ShowStudent';
import ShowCourse from './components/ShowCourse';
import ListCourses from './components/ListCourses';
import List from './components/List';

import Login from './components/Login';

//
function App() {

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
        
            <Nav.Link href="/createStudent">Student Registration</Nav.Link>
            <Nav.Link href="/list">All Students</Nav.Link>
            <Nav.Link href="/listCourses">All Courses</Nav.Link>
            
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>
          
          <Route render ={()=> < Home />} path="/home" />
          <Route render ={()=> < Login />} path="/login" />
          <Route render ={()=> < CreateStudent />} path="/createStudent" />
          <Route render ={()=> < ShowStudent />} path="/showStudent/:id" />
          <Route render ={()=> < EditStudent />} path="/edit/:id" />
          <Route render ={()=> < EditCourse />} path="/editCourse/:id" />
          
          <Route render ={()=> < ShowCourse />} path="/showCourse/:id" />

          <Route render ={()=> < List />} path="/list" />
          <Route render ={()=> < ListCourses />} path="/listCourses" />
          <Route render ={()=> < EditStudent />} path="/editStudnet/:id" />
          
     </div>

    </Router>


  );
}

//<Route render ={()=> < App />} path="/" />
export default App;
