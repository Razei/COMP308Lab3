import Home from "./components/Home";
import LoginStudent from "./components/LoginStudent";
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
              <Route exact path="/" ><Home/></Route>
              <Route path="/student/login"><LoginStudent/></Route>
              <Route path="/student/signup"><StudentSignUp/></Route>
              <Route path="/student/:studentId"><StudentHome/></Route>
          </Switch>
      </Router>
  );
}

export default App;
