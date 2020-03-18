import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { withRouter } from 'react-router-dom';

function ShowStudent(props) {
    const [data, setData] = useState({});
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3000/students/" + props.match.params.id;

    useEffect(() => {
        setShowLoading(false);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setData(result.data);
            console.log(result.data.firstName);
            setShowLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div>
            {showLoading && <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}
            <Jumbotron>
                <h1>{data.firstName} {data.lastName}</h1>
                <p>{data.email}</p>
                <p> Your password is stored the encrypted password for the following:</p>
                <p>{data.password}</p>
            </Jumbotron>
        </div>
    );
}
export default withRouter(ShowStudent);
