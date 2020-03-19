import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

//
function CreateCourse(props) {
    //
    const studentNumber = props.screen;
    console.log('props.screen',props.screen)
    const [course, setCourse] = useState(
        { _id: '',
         courseCode: '',
         courseName: '',
         section: '',
         semester: '',
         studentNumber: '' });

    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "http://localhost:3000/api/courses"
    //
    const [validated, setValidated] = useState(false);
    //
    const saveCourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            courseCode: course.courseCode,
            courseName: course.courseName,
            section: course.section,
            semester: course.semester,
            studentNumber: studentNumber };
        //
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
    
        setValidated(true);
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save course:',result.data)
            props.history.push('/showCourse/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();
        setCourse({...course, [e.target.name]: e.target.value});
      }
    
    return (
        <div>
        <h2> Create an course for {studentNumber} </h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
        <Jumbotron>
            <Form noValidate validated={validated} onSubmit={saveCourse}>
              <Form.Group>
                <Form.Label> Course Code</Form.Label>
                <Form.Control  required type="text" name="courseCode" id="courseCode" placeholder="Enter Course Code" value={course.courseCode} onChange={onChange} />
                <Form.Control.Feedback type="invalid">
              Please provide correct course code.
            </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label> Course Name</Form.Label>
                <Form.Control required type="text" name="courseName" id="courseName" placeholder="Enter Course Name" value={course.courseName} onChange={onChange} />
                <Form.Control.Feedback type="invalid">
                Please provide course name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label> Section</Form.Label>
                <Form.Control required type="text" name="section" id="section" placeholder="Enter section" value={course.section} onChange={onChange} />
                <Form.Control.Feedback type="invalid">
                Please provide section.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label> Semester</Form.Label>
                <Form.Control required  type="text" name="semester" id="semester" placeholder="Enter semester" value={course.semester} onChange={onChange} />
                <Form.Control.Feedback type="invalid">
                Please provide semester.
                </Form.Control.Feedback>
              </Form.Group>
                            
              <Button variant="primary" type="submit">
                Save Course
              </Button>
            </Form>
          </Jumbotron>
        </div>
    );


}

export default withRouter(CreateCourse);
