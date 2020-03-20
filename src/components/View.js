import React, { useState } from 'react';
import CreateCourse from './CreateCourse';
import Button from 'react-bootstrap/Button';
//
import axios from 'axios';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  const [course,setCourse] = useState('');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    
    try {
      const res = await axios.get('/welcome');
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  const createCourse = () => {
    console.log('in createCourse')
    setCourse('OK')

  }
  //
  return (
    <div className="App">
    {course !== 'OK'
      ? <div>
      <p>{screen}</p>
      <p>{data}</p>

      <Button className="ButtonSpace" variant="primary" onClick={verifyCookie}>Verify Cookie</Button>
      <Button className="ButtonSpace" variant="success" onClick={createCourse}>Create Course</Button>
      <Button className="ButtonSpace" variant="warning" onClick={deleteCookie}>Log out</Button>
      </div>            
        : <CreateCourse screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}
//
export default View;