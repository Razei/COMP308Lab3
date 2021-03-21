import {withRouter} from 'react-router-dom';
import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function StudentSignUp(props) {
    const iconStyle = {
        color: 'white',
        fontSize: '1.5rem',
    };
    const [user, setUser] = useState({ _id: '', firstName: '', lastName: '', email: '', password: '' });
    const [error, setError] = useState({ msg: '' });
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://localhost:3001";

    const saveUser = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        };

        axios.post(`${apiUrl}/signup`, data)
            .then((result) => {
                setShowLoading(false);
                props.history.push('/student/' + result.data._id)
            }).catch((error) => { 
                setShowLoading(false);
                setError(error.response.data);
            });
    };

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    return(
        <div className="container absolute-centered">
            <form method="GET" action="/" className="mb-2">
                <button className="btn btn-primary">
                    <i style={iconStyle} className="bi bi-arrow-left-square-fill"></i>
                </button>
            </form>

            <div className="row no-gutters">

            </div>

            <Form onSubmit={saveUser} className="shadowed p-5">
                {error && error.msg && 
                    <Alert variant={'danger'}>{error.msg} <Alert.Link href="/student/login">Sign in.</Alert.Link></Alert>
                }

                <h1 className="mb-4">Sign Up as Student:</h1>
                
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input name="firstName" type="text" className="form-control" id="firstName" aria-describedby="nameHelp" placeholder="John" required value={user.firstName} onChange={onChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input name="lastName" type="text" className="form-control" id="lastName" placeholder="Doe" required value={user.lastName} onChange={onChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" className="form-control" id="email" placeholder="johndoe@example.com" required value={user.email} onChange={onChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input name="password" pattern=".{6,}" title="6 characters minimum"  type="password" className="form-control" id="password" placeholder="*********" required value={user.password} onChange={onChange}/>
                </div>

                {showLoading ? 
                    <Button variant="primary" disabled>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="sr-only">Loading...</span>
                    </Button> : <button type="submit" className="btn btn-primary">Submit</button>
                }
            </Form>
        </div>
    );
}

export default withRouter(StudentSignUp);