import {withRouter} from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import {Form, Button, InputGroup, FormLabel} from 'react-bootstrap';

class StudentsByCourse extends React.Component {
    state = {
        students: [],
        selectedCourse: ''
    };
    constructor(){
        super();
        this.headers = ['First Name', 'Last Name', 'Email', 'Course Code', 'Course Name'];
        this.apiUrl = "http://localhost:3001";
        this.iconStyle = {
            color: 'white',
            fontSize: '1.5rem',
        };
        this.allCourses = [];
    }


    componentWillMount() {
        axios.get(`${this.apiUrl}/courses`).then((result) => {
            this.allCourses = result.data;
            this.forceUpdate();
        }).catch((error) => console.log(error));
    }

    ShowStudents = () => {
        return this.state.students.map((student, index)=> {
            return (
                <tr key={index}>
                    <td>
                        {student.firstName}
                    </td>

                    <td>
                        {student.lastName}
                    </td>

                    <td style={{textAlign: "right;"}}>
                        {student.email}
                    </td>

                    <td style={{textAlign: "right;"}}>
                        {student.courses.map(course => {
                            return <div>{course.courseCode}</div>
                        })}
                    </td>

                    <td style={{textAlign: "right;"}}>
                        {student.courses.map(course => {
                            return <div>{course.courseName}</div>
                        })}
                    </td>
                </tr>
            );
        });
    }

    onSelectChange = (e) =>{
        axios.get(`${this.apiUrl}/students/${e.target.value}`).then((result)=>{
            const students = (result.data);

            if (students.length > 0){
                this.setStateByKey(students, 'students');
            } else {
                this.setStateByKey([], 'students');
            }
        });
    }

    setStateByKey = (value, key) => {
        this.setState(prevState => ({...prevState, [key]: value }));
    }

    render() {
        return (
            <div className="absolute-centered">

                <Button className="mb-4" variant="primary" onClick={() => this.props.updateScreen('')}>
                    <i style={this.iconStyle} className="bi bi-arrow-left-square-fill"></i>
                </Button>

                <div className="table-responsive shadowed rounded-custom">
                    <div className="col-auto my-2">
                        <FormLabel className="mr-2">Course:</FormLabel>
                        <Form.Control style={{width: "auto"}} defaultValue={''} required onChange={(e) => this.onSelectChange(e)} as="select" custom>
                            <option value="" disabled hidden>Choose a course</option>
                            {
                                this.allCourses.map((course, index) => {
                                    return <option key={index} value={course._id}>{course.courseName}</option>
                                })
                            }
                        </Form.Control>           
                    </div>

                    <div className="tableTitle gradient-3 d-flex justify-content-center align-items-center">
                        <span>Students by Course</span>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                {this.headers.map(header => {
                                    return <th>{header}</th>
                                })}
                            </tr>
                        </thead>

                        {this.state.students.length > 0 ? 
                            <tbody>
                                <this.ShowStudents/>
                            </tbody>   
                            : 
                            <tbody>
                                <tr>
                                    <td className="text-center" colSpan={this.headers.length}>None</td>
                                </tr>
                            </tbody>
                        }
                        
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(StudentsByCourse);