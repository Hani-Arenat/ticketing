import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import Phone from "./components/Phone/Phone";
import Select from "./components/Select/Select";
import Ticket from "./components/Ticket/Ticket";

import "./App.css";

function App() {
  return (
    <div className="container">
      <div className='pages-parent'>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/advanced-phone">
              <Phone />
            </Route>
            <Route exact path="/searchable-select">
              <Select />
            </Route>
            <Route exact path="/ticket">
              <Ticket />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
