import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

class StudentAddCourse extends React.Component {
    constructor(props){
        super();
        this.iconStyle = {
            color: 'white',
            fontSize: '1.5rem',
        };
    }

    render(){
        return( 
            <div>
                <form method="GET" action="/" className="mb-2">
                    <button className="btn btn-primary">
                        <i style={this.iconStyle} className="bi bi-arrow-left-square-fill"></i>
                    </button>
                </form>
    
                <Button onClick={() => this.props.updateScreen('test')}>
    
                </Button>
                
                <Jumbotron>
                    <Form >
                        <Form.Group>
                        </Form.Group>
                    </Form>
                </Jumbotron>
            </div>
        );
    }   
}

export default withRouter(StudentAddCourse);