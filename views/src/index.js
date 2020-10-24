import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Login from "layouts/Login.js";
import RegisterRo from "layouts/RegisterAsRo.js";
import RegisterSs from "layouts/RegisterAsSs.js";
import RestoOwnerDash from "layouts/RestoOwnerDash.js";
import SanitServiceDash from "layouts/SanitServiceDash.js";
import PrivateRouteRo from "./PrivateRouteRo";
import PrivateRouteSs from "./PrivateRouteSs";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/registerRo" component={RegisterRo} />
      <Route exact path="/registerSs" component={RegisterSs} />
      <PrivateRouteRo path="/rodash" component={RestoOwnerDash} />
      <PrivateRouteSs path="/ssdash" component={SanitServiceDash} />
      <Redirect from="/" to="/login" />
      {/* configure login sessions */}
    </Switch>
  </Router>,
  document.getElementById("root")
);