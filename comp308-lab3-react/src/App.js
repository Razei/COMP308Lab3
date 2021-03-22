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



function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" ><Home name={"Course Evaluation"}/></Route>
              <Route path="/student/login"><LoginStudent/></Route>
              <Route path="/student/signup"><StudentSignUp/></Route>
              <Route path="/student/:studentId"><Home name={"Student Home"}/></Route>
          </Switch>
      </Router>
  );
}

export default App;
