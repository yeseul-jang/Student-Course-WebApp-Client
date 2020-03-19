import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditCourse(props) {
  const [course, setCourse] = useState(
    { _id: '',
     courseCode: '',
     courseName: '',
     section: '',
     semester: '',
    studentNumber:'' }); 

  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;
  const [validated, setValidated] = useState(false);
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setCourse(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
        courseCode: course.courseCode,
        courseName: course.courseName,
        section: course.section,
        semester: course.semester,
        studentNumber: course.studentNumber
    };
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    axios.put(apiUrl, data)
      .then((result) => {
        console.log('after calling put to update',result.data )
        setShowLoading(false);
        props.history.push('/showCourse/' + props.match.params.id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setCourse({...course, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
      <Form noValidate validated={validated} onSubmit={updateCourse}>
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
                Update Course
              </Button>
            </Form>
        
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditCourse);
