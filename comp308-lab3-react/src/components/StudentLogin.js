import {withRouter} from 'react-router-dom';
import React, { useState, useEffect }  from 'react';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

class StudentLogin extends React.Component {
    state = {
        email: '',
        password: '',
        error: {msg: ''},
    }

    constructor(){
        super();
        this.iconStyle = {
            color: 'white',
            fontSize: '1.5rem',
        };
    
        //store input field data, user name and password
        this.apiUrl = "http://localhost:3001";
        this.axiosConfig = {withCredentials: true,};
    }

    //runs the first time the view is rendered
    //to check if user is signed in
    
    componentDidMount() {
        this.readCookie();
    } //only the first render

    //send username and password to the server
    // for initial authentication
    auth = async () => {
        console.log('calling auth')
        try {
            //make a get request to /authenticate end-point on the server
            const loginData = {
                auth: {
                    email: this.state.email,
                    password: this.state.password
                }
            }

            //call api
            const res = await axios.post(`${this.apiUrl}/signin`, loginData, this.axiosConfig);

            if (res.data.role && res.data.role === "student"){
                res.user = res.data;
                this.props.history.push('/student/' + res.data._id);
            } else {
                
            }
        } catch (e) { //print the error
            this.setStateByKey(e.response.data, 'error');
        }
    }

    setStateByKey(value, key){
        this.setState(prevState => ({...prevState,  [key]: value }));
    }

    //check if the user already logged-in
    readCookie = async () => {
        try {
            console.log('--- in readCookie function ---');
            const res = await axios.get(`${this.apiUrl}/read_cookie`, this.axiosConfig);

            if (res.data.role && res.data.role === "student") {
                this.props.history.push('/student/' + res.data._id);
            }

        } catch (e) {
            console.log(e);
        }
    }
    
    render(){
        return (
            <div>
                <div className="container p-0 absolute-centered">
                    <form method="GET" action="/" className="mb-2">
                        <button className="btn btn-primary">
                            <i style={this.iconStyle} className="bi bi-arrow-left-square-fill"></i>
                        </button>
                    </form>

                    <div className="p-5 shadowed">

                        {this.state.error && this.state.error.msg && 
                            <Alert variant={'danger'}>{this.state.error.msg}. Try again or <Alert.Link href="/student/signup">sign up.</Alert.Link></Alert>
                        }

                        <h1 className="mb-4">Login:</h1>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input name="email" onChange={e => this.setStateByKey(e.target.value, 'email')} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input name="password" onChange={e => this.setStateByKey(e.target.value, 'password')} type="password" className="form-control" id="password" placeholder="Password"/>
                        </div>

                        <button onClick={this.auth} type="submit" className="btn btn-primary">Submit</button>
                    </div>

                    <div className="row no-gutters">
                        <div className="w-100 colour-block-2">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(StudentLogin);
