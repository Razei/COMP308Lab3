import {Link, withRouter} from 'react-router-dom';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import StudentAddCourse from './StudentCourseManagement';

class StudentHome extends React.Component {
    state = {screen: ''};
    constructor(props){
        super();
        this.state = props.screen || '';
        this.title = props.title;
        this.indexData = props.data;
    }

    updateScreen = (text) => {
        this.setState({screen: text});
    };

    render(){
        switch(this.state.screen) {
            case 'add':
                // pass updateScreen function to child
                return <StudentAddCourse updateScreen={this.updateScreen}/>;
            case 'update':
                return 'Test';
            case 'drop':
                return 'Test';
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
                                            <a key={index} onClick={() => this.setState({screen: item.screen})} className={`col-12 custom-card shadowed ${style}`}>
                                                <div className="p-4">
                                                    <i className={item.icon}/>
                                                    <span className="ml-4">{item.linkText}</span>
                                                </div>
                                            </a>
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
}

export default withRouter(StudentHome);