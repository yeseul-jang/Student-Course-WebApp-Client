import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditStudent(props) {
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
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/students/" + props.match.params.id;
  const [validated, setValidated] = useState(false);
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setStudent(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateStudent = (e) => {
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
    axios.put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/showStudent/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };

  //runs when student enters a field
  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }

  return (
    
    <div className="StudentList">
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>

        <h2 className="Title">Edit Student</h2>

        <Form noValidate validated={validated} onSubmit={updateStudent}>

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
              Please provide address.
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
            Please fill a valid email address
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
            Update
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditStudent);
