import Home from "./components/Home";
import LoginStudent from "./components/StudentLogin";
import StudentSignUp from "./components/StudentSignUp";
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import StudentHome from "./components/StudentHome";


// constant index data for home page
const indexData = [{
        icon: "bi bi-box-arrow-in-right",
        link: "/student/login",
        linkText: "Sign In as Student",
        screen: "login"
    },
    {
        icon: "bi bi-person-plus-fill",
        link: "/student/signup",
        linkText: "Sign Up as Student",
        screen: "signup"
    },
];

// constant index data for home page
const studentHomeData = [
    {
        icon: "bi bi-journal-text",
        link: "#",
        linkText: "Course Management",
        screen: "add"
    },

    {
        icon: "bi bi-journals",
        link: "#",
        linkText: "View Courses",
        screen: "view"
    },

    {
        icon: "bi bi-people-fill",
        link: "/student/list",
        linkText: "List All Students",
        screen: "list"
    },

    {
        icon: "bi bi-door-open",
        link: "#",
        linkText: "Log Out",
        screen: "signout"
    },
    

];

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" ><Home title={"Course Evaluation"} data={indexData} screen={'index'}/></Route>
              <Route path="/student/login"><LoginStudent/></Route>
              <Route path="/student/signup"><StudentSignUp/></Route>
              <Route path="/student/:studentId"><StudentHome title={"Student Home"} data={studentHomeData}/></Route>
          </Switch>
      </Router>
  );
}

export default App;
