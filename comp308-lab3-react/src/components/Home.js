import {withRouter} from 'react-router-dom';
import React, {useState} from 'react';

function Home() {
    // constant index data for home page
    const indexData = [
        {
            icon: "bi bi-box-arrow-in-right",
            link: "/student/login",
            linkText: "Sign In as Student"
        },

        {
            icon: "bi bi-person-plus-fill",
            link: "/student/signup",
            linkText: "Sign Up as Student"
        },
        {
            icon: "bi bi-shield-lock",
            link: "/admin/login",
            linkText: "Admin Portal"
        },
    ];

    return (
        <div>
            <div className="bg-image-container">
                <div className="bg-image"/>
            </div>

            <div className="absolute-centered shadowed">
                <div className="row no-gutters">
                    <div className="row p-5 card-container">
                        <div className="col-12 mb-4">
                            <h1>Course Evaluation</h1>
                        </div>

                        {
                            indexData?.map((item, index) => {
                                let style = "";
                                if (index !== indexData.length - 1) {
                                    style = "mb-4"
                                }

                                return (
                                    <a href={item.link} className={"col-12 custom-card shadowed" + style}>
                                        <div className="p-4">
                                            <i className="<%=item.icon%>"/>
                                            <span className="ml-4">{item.linkText}</span>
                                        </div>
                                    </a>
                                );
                            })
                        }

                        <div className="row no-gutters">
                            <div className="w-100 colour-block-2"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Home);
