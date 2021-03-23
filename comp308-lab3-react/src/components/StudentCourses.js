
import React from 'react';

import {Spinner, Jumbotron, Form, Button, InputGroup} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class StudentCourses extends React.Component {

    state = {
        courses: [],
        showLoading: false,
        formControlCount: 1,
    }
    constructor(){
        super();
        this.iconStyle = {
            color: 'white',
            fontSize: '1.5rem',
        };
        this.apiUrl = "http://localhost:3001";
        this.courses = [];
    }
   
    componentDidMount() {
        /*
        axios.get(`${this.apiUrl}/getStudent/${this.props.match.params.studentId}`).then((result)=>{
            console.log(result.data);
            this.setShowLoading(false);
        });*/
        this.setState();
        axios.get(`${this.apiUrl}/courses`).then((result) => {
            this.courses = result.data;
            this.setShowLoading(false);
            // this.props.history.push('/show/' + result.data._id)
        }).catch((error) => this.setShowLoading(false));
       
    }

    render() {
        return <div>
            <div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Course Name</th>
        <th scope="col">Course Code</th>
        <th scope="col">Section</th>
        <th scope="col">Semester</th>
      </tr>
      <tr>
          <td>{this.props.match.params.studentId}</td>
          </tr>
    </thead>
    <tbody>
     
    </tbody>
  </table>
</div>
        </div>;
    }
}

export default withRouter(StudentCourses);