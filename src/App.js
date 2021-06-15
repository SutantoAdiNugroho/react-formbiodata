import "./assets/css/main.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Biodata, NotFound } from "./page";

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

class Hello extends React.Component {
  render() {
    let theme = createMuiTheme({
      typography: {
        fontFamily: ["Oxygen", "sans-serif"].join(","),
        subtitle1: {
          fontSize: 19,
        },
        subtitle2: {
          fontSize: 14,
          fontStyle: "italic",
          color: "#E22C2C",
        },
      },
    });
    theme = responsiveFontSizes(theme);

    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Biodata} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default Hello;
