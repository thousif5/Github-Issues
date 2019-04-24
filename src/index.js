import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./reducers/Combine";
import "./index.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Redirect from "./Redirect";
import BodyContainer from "./components/BodyContainer";
import App from "./App";

const home = dat => {
  return <Redirect>data={dat}</Redirect>;
};

const pageCont = dat => {
  return <App>data={dat}</App>;
};
// const initialState = {};
const store = createStore(reducer, applyMiddleware(thunk));

const routing = (
  <Provider store = {store}>
    <Router>
      <div>
        <Switch>
          <Route path="/" component={home} exact />
          <Route path="/page/:pageNo" component={pageCont} exact />
          <Route path="/issue/:id" component={BodyContainer} exact />
        </Switch>
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));
