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

//
function App() {

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>
          
          <Route render ={()=> < Home />} path="/home" />


      </div>

    </Router>


  );
}

//<Route render ={()=> < App />} path="/" />
export default App;
