import {withRouter} from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class StudentList extends React.Component {
    state = {students: []};
    constructor(){
        super();
        this.headers = ['First Name', 'Last Name', 'Email', 'Courses'];
        this.apiUrl = "http://localhost:3001";
        this.iconStyle = {
            color: 'white',
            fontSize: '1.5rem',
        };
    }

    componentDidMount() {
        axios.get(`${this.apiUrl}/students`).then((result) => {
            this.setState({students: result});
            // this.props.history.push('/show/' + result.data._id);
        }).catch((error) => console.log(error));
    }

    ShowStudents = () => {
        return this.state.students.map((student, index)=> {
            return (
                <tr key={index}>
                    <td style={{textAlign: "right;"}}>
                        {student.firstName}
                    </td>

                    <td style={{textAlign: "right;"}}>
                        <form className="d-inline">
                            <button className="btn btn-danger">
                                <i style={this.iconStyle} className="bi bi-trash-fill"></i>
                            </button>
                        </form>
                    </td>

                    <td style={{textAlign: "right;"}}>
                        <form className="d-inline">
                            <button className="btn btn-danger">
                                <i style={this.iconStyle} className="bi bi-trash-fill"></i>
                            </button>
                        </form>
                    </td>

                    <td style={{textAlign: "right;"}}>
                        <form className="d-inline">
                            <button className="btn btn-danger">
                                <i style={this.iconStyle} className="bi bi-trash-fill"></i>
                            </button>
                        </form>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="absolute-centered">
                <Button className="mb-4" variant="primary" onClick={() => this.props.updateScreen('')}>
                    <i style={this.iconStyle} className="bi bi-arrow-left-square-fill"></i>
                </Button>

                <div className="table-responsive shadowed rounded-custom">
                    <div className="tableTitle gradient-1 d-flex justify-content-between align-items-center">
                        <span></span>
                        <span>Table Title</span>
                        <Button style={{color: "white"}} className="d-flex"><i className="bi bi-plus-circle mr-2"></i> Add New</Button>
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

export default withRouter(StudentList);