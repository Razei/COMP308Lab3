import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

class StudentAddCourse extends React.Component {
    state = {
        course: { _id: '', courseCode: '', courseName: '', section: '', semester: ''},
        showLoading: false,
    }

    constructor(props){
        super();
        this.iconStyle = {
            color: 'white',
            fontSize: '1.5rem',
        };
        this.apiUrl = "http://localhost:3001/course";
    }

    saveCourse = (e) => {
        this.setShowLoading(true);
        e.preventDefault();
        const data = this.state.course;

        delete data._id;

        axios.post(this.apiUrl, data).then((result) => {
            this.setShowLoading(false);
            this.props.history.push('/show/' + result.data._id)
        }).catch((error) => this.setShowLoading(false));
    };

    onChange = (e) => {
        e.persist();
        const course = {...this.state.course, [e.target.name]: e.target.value}

        this.setState(prevState => ({...prevState, course: course }));
    }

    setShowLoading = (value) => {
        this.setState(prevState => ({...prevState, showLoading: value }));
    }

    render(){
        return( 
            <div className="absolute-centered">
                <Button className="mb-4" variant="primary" onClick={() => this.props.updateScreen('')}>
                    <i style={this.iconStyle} className="bi bi-arrow-left-square-fill"></i>
                </Button>
                <div className="shadowed">
                    <Jumbotron>
                        <Form onSubmit={this.saveCourse}>
                            <Form.Group>
                                <Form.Label>Course Code</Form.Label>
                                <Form.Control required type="text" name="courseCode" id="courseCode" value={this.state.course.courseCode} onChange={this.onChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Course Name</Form.Label>
                                <Form.Control required type="text" name="courseName" id="courseName" value={this.state.course.courseName} onChange={this.onChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Section</Form.Label>
                                <Form.Control required type="text" name="section" id="section" value={this.state.course.section} onChange={this.onChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Semester</Form.Label>
                                <Form.Control required type="number" name="semester" id="semester" value={this.state.course.semester} onChange={this.onChange} />
                            </Form.Group>

                            {this.state.showLoading ? 
                                <Button variant="primary" disabled>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    <span className="sr-only">Loading...</span>
                                </Button> :
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            }
                        </Form>
                    </Jumbotron>
                </div>
            </div>
        );
    }   
}

export default withRouter(StudentAddCourse);