
import { withRouter } from 'react-router-dom';

import React, { Component }  from 'react';

function Home(props)
{


    return (
        <div>
            <h2> Kyungjin & Yeseul Lab3 </h2>
            <p>React front-end calls Express REST API to add, 
            list, update, or delete a user</p>
        </div>
    );

}

export default withRouter(Home);