import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowCourse(props) {
  console.log('props.match.params',props.match.params.id)
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from courses',result.data);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editCourse = (id) => {
    console.log(id);
    props.history.push({
      pathname: '/editCourse/' + id
    });
    
  };
/*


  const deleteArticle = (id) => {
    setShowLoading(true);
    const article = { title: data.title, content: data.content };
    //
    axios.delete(apiUrl, article)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/listarticles')
      }).catch((error) => setShowLoading(false));
  };
          <p>
          <Button type="button" variant="primary" onClick={() => { editArticle(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteArticle(data._id) }}>Delete</Button>
        </p>
*/

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
        <h1>Course Name: {data.courseName}</h1>
        <p>Course Code: {data.courseCode}</p>
        <p>Section: {data.section}</p>
        <p>Semester: {data.semester}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { editCourse(data._id) }}>Edit</Button>&nbsp;
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowCourse);
