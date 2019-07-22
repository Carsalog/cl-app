import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Posts from "./components/Posts";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Profile from "./components/Profile";
import OAuth from "./components/OAuth";
import NotFound from "./components/NotFound";
import Search from "./components/Search";
import Base from "./components/Base";

const Router = () => (
  <Switch>
    <Route path="/posts" component={Posts}/>
    <Route path="/login" component={Login}/>
    <Route path="/logout" component={Logout}/>
    <Route path="/register" component={Register}/>
    <Route path="/oauth" component={OAuth}/>
    <Route path="/search" component={Search}/>
    <ProtectedRoute path="/profile" component={Profile}/>
    <Route path="/not-found" component={NotFound}/>
    <Route path="/" exact component={Base}/>
    <Redirect from="*" to="/not-found"/>
  </Switch>
);

export default Router;
