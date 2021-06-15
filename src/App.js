import "./assets/css/main.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  Header,
  Login,
  AdminHome,
  ManageTeacher,
  ManageStudent,
  TeacherHome,
  TeacherManageStudent,
  NotFound,
  Footer,
} from "./page";

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
          <Header />
          <Switch>
            <Route exact path="/admin/dashboard" component={AdminHome} />
            <Route
              exact
              path="/admin/manage/teacher"
              component={ManageTeacher}
            />
            <Route
              exact
              path="/admin/manage/student"
              component={ManageStudent}
            />
            <Route exact path="/teacher/dashboard" component={TeacherHome} />
            <Route
              exact
              path="/teacher/manage/student"
              component={TeacherManageStudent}
            />
            <Route exact path="/" component={Login} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    );
  }
}

export default Hello;
