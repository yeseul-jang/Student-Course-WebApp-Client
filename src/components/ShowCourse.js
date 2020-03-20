import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

function ShowCourse(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;
  const apiStudentListUrl = "http://localhost:3000/api/studentListByCourse/" + props.match.params.id;
  const [studentData, setStudentData] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from courses', result.data);
      setData(result.data.course);
      setSessionId(result.data.sessionId);

      const resultStudentList = await axios(apiStudentListUrl);
      console.log('results from studentList', resultStudentList.data);
      setStudentData(resultStudentList.data);

      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editCourse = (id, creatorId) => {
    console.log("creatorId >>> ", creatorId);

    if (creatorId != sessionId) {
      console.log("diff session !!");
      setMessage('You are not allow to edit course !');

    } else {
      props.history.push({
        pathname: '/editCourse/' + id
      });
    }

  };

  const deleteCourse = (id, creatorId) => {
    console.log("creatorId >>> ", creatorId);

    if (creatorId != sessionId) {
      console.log("diff session !!");
      setMessage('You are not allow to delete course !');

    } else {
      setShowLoading(true);
      const course = {
        courseCode: data.courseCode,
        courseName: data.courseName,
        section: data.section,
        semester: data.semester,
        studentNumber: data.studentNumber
      };
      axios.delete(apiUrl, course)
        .then((result) => {
          setShowLoading(false);
          props.history.push('/listCourses')
        }).catch((error) => setShowLoading(false));
    }
  };

  return (
    <div className="StudentList">
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}

      {message != '' &&
        <Alert variant="danger">
          Message : {message}
        </Alert>
      }

      <Jumbotron>
        <h1>Course Name: {data.courseName}</h1>
        <p>Course Code: {data.courseCode}</p>
        <p>Section: {data.section}</p>
        <p>Semester: {data.semester}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { editCourse(data._id, data.creator) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteCourse(data._id, data.creator) }}>Delete</Button>
        </p>
      </Jumbotron>


      <h2 className="Title">List of Students</h2><br />

      <Table responsive>
        <thead>
          <tr>
            <th scope="col">Student Number</th>
            <th scope="col">Name</th>
            <th scope="col">Program</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((item, idx) => (
            <tr>
              <td>{item.studentNumber}</td>
              <td>{item.fullName}</td>
              <td>{item.program}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default withRouter(ShowCourse);
