import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Spinner, Jumbotron, Form, Button, InputGroup} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class StudentCourseManagement extends React.Component {
    state = {
        courses: [],
        showLoading: false,
        formControlCount: 1,
    }

    constructor(props){
        super();
        this.iconStyle = {
            color: 'white',
            fontSize: '1.5rem',
        };
        this.apiUrl = "http://localhost:3001";
        this.courses = [];
    }


    componentDidMount() {
        axios.get(`${this.apiUrl}/courses`).then((result) => {
            this.courses = result.data;
            this.setShowLoading(false);
            // this.props.history.push('/show/' + result.data._id)
        }).catch((error) => this.setShowLoading(false));
    }


    saveCourse = (e) => {
        this.setShowLoading(true);
        e.preventDefault();
        const data = this.state.courses.map(course => Object.values(course)[0]);

        axios.post(`${this.apiUrl}/student/${this.props.match.params.studentId}/courses`, data).then((result) => {
            this.setShowLoading(false);
            // this.props.history.push('/show/' + result.data._id);
        }).catch((error) => this.setShowLoading(false));
    };

    onChange = (e) => {
        e.persist();
        const course = {...this.state.course, [e.target.name]: e.target.value}

        this.setState(prevState => ({...prevState, course: course }));
    }

    onSelectChange = (e) => {
        e.persist();

        const courses = this.state.courses;
        const index = courses.findIndex(course => course.name === e.target.name);
        courses.splice(index, 0, {[e.target.name]: e.target.value});
        this.setState(prevState => ({...prevState, courses: courses }));
    }

    changeCourseCount = (value, name) => {
        this.setState(prevState => ({...prevState, formControlCount: this.state.formControlCount + value}));
        
        if (name){
            const courses = this.state.courses;
            const index = courses.findIndex(course => course.name === name);
            courses.splice(index, 1);
            this.setState(prevState => ({...prevState, courses: courses }));
        }
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
                        <h1 className="mb-4">Course Management</h1>
                        
                        <Button className="mb-4" variant="primary" onClick={() => this.changeCourseCount(1)}>
                            <i style={this.iconStyle} className="bi bi-journal-plus mr-3"></i> Add New
                        </Button>

                        <Form onSubmit={this.saveCourse}>
                            {
                                Array.from(Array(this.state.formControlCount).keys()).map((_, index) => {
                                    const name = `course-${index}`;
                                    return (
                                        <InputGroup key={index} className="mb-2">
                                            <Form.Control defaultValue={''} required name={name} onChange={this.onSelectChange} as="select" custom>
                                                <option value="" disabled hidden>Choose a course</option>
                                                {
                                                    this.courses.map((course, index) => {
                                                        return <option key={index} value={course._id}>{course.courseName}</option>
                                                    })
                                                }
                                            </Form.Control>

                                            <InputGroup.Append>
                                                <Button variant="outline-danger" onClick={() => this.changeCourseCount(-1, name)}>
                                                    <i style={{fontSize: '1rem', color:'unset'}} className="bi bi-trash-fill"></i>
                                                </Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    )
                                })
                            }
                            <Form.Group>
                                
                            </Form.Group>

                            {/* <Form.Group>
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
                            </Form.Group> */}

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

export default withRouter(StudentCourseManagement);