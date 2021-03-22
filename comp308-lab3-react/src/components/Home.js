import {Link, withRouter} from 'react-router-dom';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import StudentAddCourse from './StudentAddCourse';
function Home(props) {
    // constant index data for home page
    const [screen, setScreen] = useState();
    const title = props.title;
    const indexData = props.data;

    switch(screen) {
        case 'add':
            return <StudentAddCourse/>;
        case 'update':
            return 'Test';
        case 'drop':
            return 'Test';
        default: 
            console.log(screen);
            return(
                <div>
                    <div className="bg-image-container">
                        <div className="bg-image"/>
                    </div>
        
                    <div className="absolute-centered shadowed">
                        <div className="row p-5 card-container">
                            <div className="col-12 mb-4">
                                <h1>{title}</h1>
                            </div>
        
                            {
                                indexData?.map((item, index) => {
                                    let style = "";
                                    if (index !== indexData.length - 1) {
                                        style = "mb-4"
                                    }
        
                                    return (
                                        <a key={index} onClick={() => setScreen(item.screen)} className={`col-12 custom-card shadowed ${style}`}>
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
            )
    };
    
}

export default withRouter(Home);
