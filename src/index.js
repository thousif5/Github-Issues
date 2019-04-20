import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "./App";
import BodyContainer from "./components/BodyContainer";
import App2 from "./App2";

const home = (dat) => {
  return <App>data={dat}</App>
}

const pageCont = (dat) => {
  return <App2>data={dat}</App2>
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
