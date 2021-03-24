import React from 'react';
import axios from 'axios';
import {Spinner, Jumbotron, Form, Button, InputGroup} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class StudentCourseManagement extends React.Component {
    state = {
        courses: [''],
        sectionNumbers: [''],
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
        axios.get(`${this.apiUrl}/getStudent/${this.props.match.params.studentId}`).then((result)=>{
            const selectedCourses = (result.data.courses);
            
            if (selectedCourses.length > 0){
                let sections = [];
                selectedCourses.forEach(element => {
                    const course = this.getCourseById(element)?.section;
                    if (course){
                        sections.push(course);
                    }
                });


                this.setStateByKey(sections, 'sectionNumbers');;
                this.setStateByKey(selectedCourses, 'courses');
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
        const data = this.state.courses.map((id, index) => {
            let found = this.allCourses.find(course => course._id === id);
            if (found) {
                const variable = {...found, section: this.state.sectionNumbers[index]};
                return variable;
            }
        });
        
        axios.post(`${this.apiUrl}/student/${this.props.match.params.studentId}/courses`, data).then(() => {
            this.setStateByKey(false, 'showLoading');
        }).catch((error) => this.setStateByKey(false, 'showLoading'));
    }

    getCourseById = (id) =>{
        return this.allCourses.find(course => course._id === id);
    }


    onSelectChange = (e, index) => {
        e.persist();

        let courses = JSON.parse(JSON.stringify(this.state.courses));
        courses[index] = e.target.value;
        this.setStateByKey(courses, 'courses');
    }

    onSectionNumberChange = (e, index) => {
        e.persist();

        let sections = JSON.parse(JSON.stringify(this.state.sectionNumbers));
        e.target.value = e.target.value.padStart(3, '0');
        sections[index] = e.target.value;
        this.setStateByKey(sections, 'sectionNumbers');
    }

    addCourse = (e) => {
        let courses = JSON.parse(JSON.stringify(this.state.courses));
        let sections = JSON.parse(JSON.stringify(this.state.sectionNumbers));

        courses.push('');
        sections.push('000');

        this.setStateByKey(courses, 'courses');
        this.setStateByKey(sections, 'sectionNumbers');        
    }

    deleteCourse = (index) => {
        let courses = JSON.parse(JSON.stringify(this.state.courses));
        let sections = JSON.parse(JSON.stringify(this.state.sectionNumbers));

        courses.splice(index, 1);
        sections.splice(index, 1);

        this.setStateByKey(courses, 'courses');
        this.setStateByKey(sections, 'sectionNumbers');
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
                                this.state.courses.map((id, index) => {
                                    // const name = `course-${index}`;
                                    return (
                                        <InputGroup key={index} className="mb-2">
                                            <Form.Control value={id} defaultValue={''} required onChange={(e) => this.onSelectChange(e, index)} as="select" custom>
                                                <option value="" disabled hidden>Choose a course</option>
                                                {
                                                    this.allCourses.map((course, index) => {
                                                        return <option key={index} value={course._id}>{course.courseName}</option>
                                                    })
                                                }
                                            </Form.Control>
                                            
                                            <Form.Control min="0" defaultValue={this.state.sectionNumbers[index]} required onChange={(e) => this.onSectionNumberChange(e, index)} type="number"/>

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