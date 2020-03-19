import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateStudent(props) {
  const [student, setStudent] 
  = useState({ 
      _id: '',
      studentNumber: '',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      city:'',
      phoneNumber:'',
      email:'',
      program:''
    
    });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/";
  const [validated, setValidated] = useState(false);

  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { 
        studentNumber: student.studentNumber,
        password: student.password,
        firstName: student.firstName,
        lastName: student.lastName,
        address: student.address,
        city: student.city,
        phoneNumber: student.phoneNumber,
        email: student.email,
        program:student.program
        
    };
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/showStudent/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form noValidate validated={validated} onSubmit={saveUser}>

          <Form.Group  >
            <Form.Label> Student Number </Form.Label>
            <Form.Control required type="number" name="studentNumber" id="studentNumber" placeholder="Enter Student Number" value={student.studentNumber} onChange={onChange} />
            <Form.Control.Feedback type="invalid">
              Please provide student number.
            </Form.Control.Feedback>
          </Form.Group>
       
          <Form.Group >
            <Form.Label> Password </Form.Label>
            <Form.Control required type="text" name="password" id="password" placeholder="Enter the password" value={student.password} onChange={onChange} />
            <Form.Control.Feedback type="invalid">
              Please provide password.
            </Form.Control.Feedback>
          </Form.Group>
       
       
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control required type="text" name="firstName" id="firstName" placeholder="Enter first name" value={student.firstName} onChange={onChange} />
            <Form.Control.Feedback type="invalid">
              Please provide first name.
            </Form.Control.Feedback>
          </Form.Group>
       
          <Form.Group>
            <Form.Label> Last Name </Form.Label>
            <Form.Control required type="text" name="lastName" id="lastName" placeholder="Enter last name" value={student.lastName} onChange={onChange} />
            <Form.Control.Feedback type="invalid">
              Please provide last name.
            </Form.Control.Feedback>
          </Form.Group>
       
          <Form.Group>
            <Form.Label> Address </Form.Label>
            <Form.Control required type="text" name="address" id="address" placeholder="Enter the address" value={student.address} onChange={onChange} />
            <Form.Control.Feedback type="invalid">
             Please fill a valid email addres.
            </Form.Control.Feedback>
          </Form.Group>
       
          <Form.Group>
            <Form.Label> City </Form.Label>
            <Form.Control required type="text" name="city" id="city" placeholder="Enter the city" value={student.city} onChange={onChange} />
            <Form.Control.Feedback type="invalid">
              Please provide city.
            </Form.Control.Feedback>
          </Form.Group>
       
          <Form.Group>
            <Form.Label> Phone Number </Form.Label>
            <Form.Control required type="number" name="phoneNumber" id="phoneNumber" placeholder="Enter the phone number" value={student.phoneNumber} onChange={onChange} />
            <Form.Control.Feedback type="invalid">
              Please provide phone number.
            </Form.Control.Feedback>
          </Form.Group>
       
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control required type="text" name="email" id="email" rows="3" placeholder="Enter email" value={student.email} onChange={onChange} />
            <Form.Control.Feedback type="invalid">
              Please provide email addreess.
            </Form.Control.Feedback>
          </Form.Group>
       
          <Form.Group>
            <Form.Label> Program </Form.Label>
            <Form.Control required type="text" name="program" id="program" placeholder="Enter the program" value={student.program} onChange={onChange} />
            <Form.Control.Feedback type="invalid">
              Please provide program.
            </Form.Control.Feedback>
          </Form.Group>
       
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateStudent);
