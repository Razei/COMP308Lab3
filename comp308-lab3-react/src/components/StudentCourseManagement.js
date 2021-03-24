import React from 'react';
import axios from 'axios';
import {Spinner, Jumbotron, Form, Button, InputGroup} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class StudentCourseManagement extends React.Component {
    state = {
        courses: [''],
        showLoading: false,
    }

    constructor(){
        super();
        this.iconStyle = {
            color: 'white',
            fontSize: '1.5rem',
        };
        this.apiUrl = "http://localhost:3001";
        this.allCourses = [];
    }


    componentDidMount() {
        axios.post(`${this.apiUrl}/studentCourses/${this.props.match.params.studentId}`).then((result) => {
            this.selectedCourses = result.data;
        }).catch((error) => console.log(error));

        axios.get(`${this.apiUrl}/getStudent/${this.props.match.params.studentId}`).then((result)=>{
            const selectedCourses = (result.data.courses);

            if (selectedCourses.length > 0){
                this.setStateByKey(selectedCourses, 'courses');;
            }
        });

        axios.get(`${this.apiUrl}/courses`).then((result) => {
            this.allCourses = result.data;
        }).catch((error) => console.log(error));
    }

    setStateByKey = (value, key) => {
        this.setState(prevState => ({...prevState, [key]: value }));
    }

    saveCourse = (e) => {
        this.setStateByKey(true, 'showLoading');
        e.preventDefault();
        const data = this.state.courses;

        axios.post(`${this.apiUrl}/student/${this.props.match.params.studentId}/courses`, data).then(() => {
            this.setStateByKey(false, 'showLoading');
        }).catch((error) => this.setStateByKey(false, 'showLoading'));
    };

    onSelectChange = (e, index) => {
        e.persist();

        let courses = JSON.parse(JSON.stringify(this.state.courses));
        courses[index] = e.target.value;
        this.setStateByKey(courses, 'courses');
    }

    addCourse = (e) => {
        let courses = JSON.parse(JSON.stringify(this.state.courses));
        courses.push(e.target.value);
        this.setStateByKey(courses, 'courses');
    }

    deleteCourse = (index) => {
        let courses = JSON.parse(JSON.stringify(this.state.courses));
        courses.splice(index, 1);
        this.setStateByKey(courses, 'courses');
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

                        <Form onSubmit={this.saveCourse}>
                            {
                                this.state.courses.map((course, index) => {
                                    // const name = `course-${index}`;
                                    return (
                                        <InputGroup key={index} className="mb-2">
                                            <Form.Control value={course} defaultValue={''} required onChange={(e) => this.onSelectChange(e, index)} as="select" custom>
                                                <option value="" disabled hidden>Choose a course</option>
                                                {
                                                    this.allCourses.map((course, index) => {
                                                        return <option key={index} value={course._id}>{course.courseName}</option>
                                                    })
                                                }
                                            </Form.Control>
                                            

                                            <InputGroup.Append>
                                                <Button variant="outline-danger" onClick={() => this.deleteCourse(index)}>
                                                    <i style={{fontSize: '1rem', color:'unset'}} className="bi bi-trash-fill"></i>
                                                </Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    )
                                })
                            }

                            <Form.Group>
                                <Button variant="success" onClick={(e) => this.addCourse(e)}>
                                    <i style={this.iconStyle} className="bi bi-journal-plus"></i>
                                </Button>
                            </Form.Group>
                            
                            <hr/>
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