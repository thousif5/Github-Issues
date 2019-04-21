import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "./App";
import BodyContainer from "./components/BodyContainer";
import AppPagination from "./AppPagination";

const home = (dat) => {
  return <App>data={dat}</App>
}

const pageCont = (dat) => {
  return <AppPagination>data={dat}</AppPagination>
}

const routing = (
  <Router>
    <div>
      <Switch>
        <Route path="/" component = {home} exact />
        <Route path = "/page/:pageNo" component = {pageCont} exact />
        <Route path="/issue/:id" component = {BodyContainer} exact />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
