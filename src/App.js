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
            <Nav.Link href="/login">Home</Nav.Link>
        
            <Nav.Link href="/list">Students</Nav.Link>
            <Nav.Link href="/listCourses">Courses</Nav.Link>
            
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>
          
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

export default App;
