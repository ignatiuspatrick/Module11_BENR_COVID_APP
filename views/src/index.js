/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Login from "layouts/Login.js";
import Register from "layouts/Register.js";
import RestoOwnerDash from "layouts/RestoOwnerDash.js";
import SanitServiceDash from "layouts/SanitServiceDash.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/rodash" component={RestoOwnerDash} />
      <Route path="/ssdash" component={SanitServiceDash} />
      <Redirect from="/" to="/login" />
      {/* configure login sessions */}
    </Switch>
  </Router>,
  document.getElementById("root")
);
