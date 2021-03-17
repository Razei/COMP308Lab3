import './App.css';
import Home from "./components/Home";
import LoginStudent from "./components/LoginStudent";
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
          </Switch>
      </Router>
  );
}

export default App;
