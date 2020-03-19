import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { withRouter } from 'react-router-dom';

function ShowStudent(props) {
    console.log('props.match.params', props.match.params.id)
    const [data, setData] = useState({});
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3000/students/" + props.match.params.id;
    const apiStudentCourseListUrl = "http://localhost:3000/api/studentCourses/" + props.match.params.id;
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        setShowLoading(false);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            console.log('results from students', result.data);
            setData(result.data);

            const resultCourseList = await axios(apiStudentCourseListUrl);
            console.log('results from courseList', resultCourseList.data);
            setCourseData(resultCourseList.data);

            setShowLoading(false);
        };

        fetchData();
    }, []);

    const editStudent = (id) => {
        props.history.push({
            pathname: '/editStudnet/' + id
        });
    };

    const deleteStudent = (id) => {
        setShowLoading(true);
        const student = {
            studentNumber: data.studentNumber,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            city: data.city,
            phoneNumber: data.phoneNumber,
            email: data.email,
            program: data.program
        };

        axios.delete(apiUrl, student)
            .then((result) => {
                setShowLoading(false);
                props.history.push('/list')
            }).catch((error) => setShowLoading(false));
    };
    return (
        <div>
            {showLoading && <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}
            <Jumbotron>
                <h1>{data.studentNumber} {data.firstName} {data.lastName}</h1>
                <p>{data.email}</p>
                <p> Your password is stored the encrypted password for the following:</p>
                <p>{data.password}</p>

                <p>{data.address} {data.city}</p>
                <p>{data.phoneNumber}</p>
                <p>{data.program}</p>
                <p>
                    <Button type="button" variant="primary" onClick={() => { editStudent(data._id) }}>Edit</Button>&nbsp;
                    <Button type="button" variant="danger" onClick={() => { deleteStudent(data._id) }}>Delete</Button>
                </p>
            </Jumbotron>

            <h2>List of Courses</h2><br />

            <Table responsive>
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Section</th>
                        <th scope="col">Semester</th>
                    </tr>
                </thead>
                <tbody>
                    {courseData.map((item, idx) => (
                        <tr>
                            <td>{item.courseCode}</td>
                            <td>{item.courseName}</td>
                            <td>{item.section}</td>
                            <td>{item.semester}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </div>
    );
}
export default withRouter(ShowStudent);
