import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAccessToken } from "./redux/slice";

import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import getQueryParams from "./utils/getQueryParams";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import UserOnlyRoute from './components/routes/UserOnlyRoute';
import GuestOnlyRoute from './components/routes/GuestOnlyRoute';
import Error404 from './pages/404';

type paramType = {
  [key: string]: string;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { access_token = null } = getQueryParams(window.location.hash) as paramType;
    if (access_token) dispatch(updateAccessToken(access_token));
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <UserOnlyRoute path="/create-playlist">
          <HomePage />
        </UserOnlyRoute>
        <GuestOnlyRoute exact path="/">
          <LoginPage />
        </GuestOnlyRoute>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
