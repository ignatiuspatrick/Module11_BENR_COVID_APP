import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Login from "layouts/Login.js";
import Register from "layouts/Register.js";
import RestoOwnerDash from "layouts/RestoOwnerDash.js";
import SanitServiceDash from "layouts/SanitServiceDash.js";
import isAuthenticated from "./auth.js"

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();


const PrivateRouteRo = ({ component: Component, ...rest }) => (
  <Route 
    {...rest} 
    render={props => (
    isAuthenticated.getAuthRo() ? (<Component {...props} /> )
                              : (<Redirect to={{pathname: "/login"}} />)
  )} />
)
const PrivateRouteSs = ({ component: Component, ...rest }) => (
  <Route 
    {...rest} 
    render={props => (
    isAuthenticated.getAuthSs() ? (<Component {...props} /> )
                              : (<Redirect to={{pathname: "/login"}} />)
  )} />
)


ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRouteRo path="/rodash" component={RestoOwnerDash} />
      <PrivateRouteSs path="/ssdash" component={SanitServiceDash} />
      <Redirect from="/" to="/login" />
      {/* configure login sessions */}
    </Switch>
  </Router>,
  document.getElementById("root")
);