import {withRouter} from 'react-router-dom';
import React, { useState, useEffect }  from 'react';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

function LoginStudent(props) {
    const iconStyle = {
        color: 'white',
        fontSize: '1.5rem',
    };

    //store input field data, user name and password
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const apiUrl = "http://localhost:3001";
    const [error, setError] = useState({msg: '' });

    //send username and password to the server
    // for initial authentication
    const auth = async () => {
        console.log('calling auth')
        console.log(email)
        try {
            //make a get request to /authenticate end-point on the server
            const loginData = {
                auth: {
                    email,
                    password
                }
            }

            //call api
            const res = await axios.post(`${apiUrl}/signin`, loginData);

            if (res.data.role && res.data.role === "student"){
                res.user = res.data;
                props.history.push('/student/' + res.data._id);
            } else {
                
            }
        } catch (e) { //print the error
            setError(e.response.data);
        }
    };

    //check if the user already logged-in
    const readCookie = async () => {
        try {
            console.log('--- in readCookie function ---');
            const res = await axios.get(`${apiUrl}/read_cookie`);

            if (res.data.role !== undefined) {
                props.history.push('/student/' + res.data._id);
            }

        } catch (e) {
            console.log(e);
        }
    };
    //runs the first time the view is rendered
    //to check if user is signed in
    useEffect(() => {
        readCookie();
    }, []); //only the first render
    //
    
    return (
        <div>
            <div className="container p-0 absolute-centered">
                <form method="GET" action="/" className="mb-2">
                    <button className="btn btn-primary">
                        <i style={iconStyle} className="bi bi-arrow-left-square-fill"></i>
                    </button>
                </form>

                <div className="p-5 shadowed">

                    {error && error.msg && 
                        <Alert variant={'danger'}>{error.msg}. Try again or <Alert.Link href="/student/signup">sign up.</Alert.Link></Alert>
                    }

                    <h1 className="mb-4">Login:</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input name="email" onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input name="password" onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Password"/>
                    </div>

                    <button onClick={auth} type="submit" className="btn btn-primary">Submit</button>
                </div>

                <div className="row no-gutters">
                    <div className="w-100 colour-block-2">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(LoginStudent);
