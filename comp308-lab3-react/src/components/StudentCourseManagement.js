import React from 'react';
import axios from 'axios';
import {Spinner, Jumbotron, Form, Button, InputGroup} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class StudentCourseManagement extends React.Component {
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
        this.allCourses = [];
        this.selectedCourses = [];
    }


    componentDidMount() {
        axios.post(`${this.apiUrl}/studentCourses/${this.props.match.params.studentId}`).then((result) => {
            this.selectedCourses = result.data;
            this.setShowLoading(false);
            // this.props.history.push('/show/' + result.data._id)
        }).catch((error) => this.setShowLoading(false));

        axios.get(`${this.apiUrl}/getStudent/${this.props.match.params.studentId}`).then((result)=>{
            this.selectedCourses = (result.data.courses);
        });

        axios.get(`${this.apiUrl}/courses`).then((result) => {
            this.allCourses = result.data;
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

    onChange = (e, id) => {
        e.persist();
        const course = {...this.state.course, id: id, [e.target.name]: e.target.value}
        this.setState(prevState => ({...prevState, course: course }));
    }

    onSelectChange = (e) => {
        e.persist();

        let courses = JSON.parse(JSON.stringify(this.state.courses));
        const keys = courses.map(course => Object.keys(course)[0]);
        const index = keys.findIndex(key => key === e.target.name);

        if (index != -1){
            courses[index] = {[keys[index]]: e.target.value};
        } else {
            courses.push({[`${e.target.name}`]: e.target.value});
        }

        this.setState(prevState => ({...prevState, courses: courses }));
    }

    changeCourseCount = (value, name) => {
        this.setState(prevState => ({...prevState, formControlCount: this.state.formControlCount + value}));

        if (name){
            let courses = JSON.parse(JSON.stringify(this.state.courses));
            const keys = courses.map(course => Object.keys(course)[0]);
            const index = keys.findIndex(key => key === name);
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

                        <Form onSubmit={this.saveCourse}>
                            {
                                Array.from(Array(this.state.formControlCount).keys()).map((_, index) => {
                                    const name = `course-${index}`;
                                    return (
                                        <InputGroup key={index} className="mb-2">
                                            {/* {
                                                this.selectedCourses.length > 0 ? 
                                                this.selectedCourses.map(c => {
                                                    return (
                                                        <Form.Control value={c} defaultValue={''} required name={name} onChange={this.onSelectChange} as="select" custom>
                                                            <option value="" disabled hidden>Choose a course</option>
                                                            {
                                                                this.allCourses.map((course, index) => {
                                                                    return <option key={index} value={course._id}>{course.courseName}</option>
                                                                })
                                                            }
                                                        </Form.Control>
                                                    )
                                                }) : 
                                                
                                            } */}

                                                <Form.Control defaultValue={''} required name={name} onChange={this.onSelectChange} as="select" custom>
                                                    <option value="" disabled hidden>Choose a course</option>
                                                    {
                                                        this.allCourses.map((course, index) => {
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
                                <Button variant="success" onClick={() => this.changeCourseCount(1)}>
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