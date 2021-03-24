import {Redirect, withRouter} from 'react-router-dom';
import React from 'react';
import StudentCourseManagement from './StudentCourseManagement';
import StudentCourses from './StudentCourses';
import StudentList from "./StudentList";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import StudentsByCourse from './StudentsByCourse';

class StudentHome extends React.Component {
    state = {screen: ''};
    
    constructor(props){
        super(props);
        this.state = props.screen || '';
        this.title = props.title;
        this.indexData = props.data;
        
    }

    updateScreen = (text) => {
        this.setState({screen: text});
    };

    changePage = (link) =>{
        this.props.history.push(link);
    }

    RenderPages = () => {
        switch(this.state.screen) {
            case 'add':
                // pass updateScreen function to child
                return <StudentCourseManagement updateScreen={this.updateScreen} key="manage"/>;
            case 'view':
                return <StudentCourses updateScreen={this.updateScreen} key="list"/>;
            case 'signout':
                axios.post('http://localhost:3001/signout',{}, {withCredentials: true});
                return <Redirect to='/'  />;
            case 'list-student-courses':
                return <StudentsByCourse updateScreen={this.updateScreen}/>;
            case 'list':
                return <StudentList updateScreen={this.updateScreen}/>;
            default: 
                console.log(this.state);
                return(
                    <div>
                        <div className="bg-image-container">
                            <div className="bg-image"/>
                        </div>
            
                        <div className="absolute-centered shadowed">
                            <div className="row p-5 card-container">
                                <div className="col-12 mb-4">
                                    <h1>{this.title}</h1>
                                </div>
            
                                {
                                    this.indexData?.map((item, index) => {
                                        let style = "";
                                        if (index !== this.indexData.length - 1) {
                                            style = "mb-4"
                                        }
            
                                        return (
                                            <Button variant="light" key={index} onClick={() => this.setState({screen: item.screen})} className={`col-12 text-left custom-card shadowed ${style}`}>
                                                <div className="p-4">
                                                    <i className={item.icon}/>
                                                    <span className="ml-4">{item.linkText}</span>
                                                </div>
                                            </Button>
                                        );
                                    })
                                }
                            </div>
            
                            <div className="row no-gutters">
                                <div className="w-100 colour-block-2"/>
                            </div>
                        </div>
                    </div>
                );
        };
    } 

    render(){
        return <this.RenderPages/>;
    }
}

export default withRouter(StudentHome);