import Home from "./components/Home";
import LoginStudent from "./components/StudentLogin";
import StudentSignUp from "./components/StudentSignUp";
import StudentHome from "./components/StudentHome";
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";


// constant index data for home page
const indexData = [{
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

// constant index data for home page
const studentHomeData = [{
        icon: "bi bi-journal-plus",
        link: "/student/login",
        linkText: "Add Course"
    },
    {
        icon: "bi bi-journal-text",
        link: "#",
        linkText: "Update Course"
    },
    {
        icon: "bi bi-journal-x",
        link: "#",
        linkText: "Drop Course"
    },
];

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" ><Home name={"Course Evaluation"} data={indexData}/></Route>
              <Route path="/student/login"><LoginStudent/></Route>
              <Route path="/student/signup"><StudentSignUp/></Route>
              <Route path="/student/:studentId"><Home name={"Student Home"} data={studentHomeData}/></Route>
          </Switch>
      </Router>
  );
}

export default App;
