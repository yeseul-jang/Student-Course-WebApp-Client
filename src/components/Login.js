import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
//
import View from './View'
//
function Login(props) {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');
  //store input field data, student number and password
  const [studentNumber, setStudentNumber] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/signin";

  //send studentNumber and password to the server
  // for initial authentication
  const auth = async () => {
    console.log('calling auth')
    console.log(studentNumber)

    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { studentNumber, password } }
      //call api
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth);
      console.log(res.data.screen);
      console.log(res.data.fullName);
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) { //print the error
      console.log(e);
    }

  };

  //check if the user already logged-in
  const readCookie = async () => {
    try {
      //
      console.log('--- in readCookie function ---');
      const res = await axios.get('/read_cookie');
      // 
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []);

  const register = () => {
    props.history.push({
      pathname: '/createStudent'
    });
  }

  //
  return (
    <div>
      <div className="App">
        <h2> Kyungjin and Yeseul Lab3 </h2>
        <p>React front-end calls Express REST API to add, list, update, or delete a user</p>
      </div>
      <br /><br />
      <div className="LoginForm">
        {screen === 'auth'
          ?
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Student Number</Form.Label>
              <Form.Control type="email" placeholder="Enter student number" type="text" onChange={e => setStudentNumber(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <div className="Buttons">
              <Button variant="primary" onClick={auth}>Login</Button><br /><br />
              <Button variant="success" onClick={() => { register() }}>Regester</Button>
            </div>
          </Form>
          : <View screen={screen} setScreen={setScreen} />
        }
      </div>
    </div>
  );
}

export default withRouter(Login);

