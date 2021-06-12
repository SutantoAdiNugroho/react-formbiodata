import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Login, NotFound } from "./page";

class Hello extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default Hello;
