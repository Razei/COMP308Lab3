import logo from './logo.svg';
import './App.css';
import Home from "./components/Home";
import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {
  return (
      <Router>
        <Home/>
      </Router>
  );
}

export default App;
