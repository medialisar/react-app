import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAccessToken } from "./redux/slice";

import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import getQueryParams from "./utils/getQueryParams";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { access_token = null } = getQueryParams(window.location.hash);
    if (access_token) dispatch(updateAccessToken(access_token));
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/create-playlist" component={HomePage}></Route>
          <Route path="/" component={LoginPage}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
