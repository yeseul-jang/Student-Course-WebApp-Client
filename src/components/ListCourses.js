import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function ListCourses(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses";
  const apiAddCourseUrl = "http://localhost:3000/api/addCourse";
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:', result.data)

          console.log('data in if:', result.data)
          setData(result.data);
          setShowLoading(false);

        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
    };
    fetchData();
  }, []);

  const showDetail = (id) => {

    props.history.push({
      pathname: '/showCourse/' + id
    });
  }

  const addCourse = (courseId) => {
    setShowLoading(true);
    axios.post(apiAddCourseUrl + "/" + courseId, courseId)
      .then((result) => {
        setShowLoading(false);
        console.log('message:', result.data);
        setMessage(result.data);

      }).catch((error) => setShowLoading(false));
  }

  return (
    <div className="StudentList">
      {data.length !== 0
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>}

          {message != '' &&
            <Alert variant="primary">
              Message : {message}
            </Alert>
          }

          <h2 className="Title">List of Courses</h2>
          <br />
          <br/>
          <Table responsive>
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Section</th>
                <th scope="col">Semester</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr>
                  <td>{item.courseCode}</td>
                  <td>{item.courseName}</td>
                  <td>{item.section}</td>
                  <td>{item.semester}</td>
                  <td>
                    <Button className="ButtonSpace" onClick={() => { showDetail(item._id) }}>Detail</Button>
                    <Button className="ButtonSpace" variant="success" onClick={() => { addCourse(item._id) }}>Add Course</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <br/>
          <h5 className="Title">Total: {data.length}</h5>
        </div>
        : < Login />
      }
    </div>

  );
}
//
export default withRouter(ListCourses);
