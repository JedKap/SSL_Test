import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.hydrate(
  <Router>
    <Switch>
      <Route path="/" children={<App />} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
