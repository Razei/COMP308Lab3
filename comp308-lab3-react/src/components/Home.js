import {Link, withRouter} from 'react-router-dom';
import React from 'react';

function Home(props) {
    // constant index data for home page
    const title = props.title;
    const indexData = props.data;
    

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
                                <Link key={index} to={item.link} className={`col-12 custom-card shadowed ${style}`}>
                                    <div className="p-4">
                                        <i className={item.icon}/>
                                        <span className="ml-4">{item.linkText}</span>
                                    </div>
                                </Link>
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
}

export default withRouter(Home);
