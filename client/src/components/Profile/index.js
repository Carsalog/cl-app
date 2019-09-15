import React from 'react';
import {Route, Switch} from "react-router-dom";
import Sidebar from "./Profile/Sidebar";
import Me from "./Profile/Me";
import MyPosts from "./Profile/MyPosts";
import EditUser from "./Profile/EditUser";


export const Profile = ({history}) => (
  <div className="container-fluid page-height">
    <div className="row">
      <div className="col-lg-3">
        <Sidebar history={history}/>
      </div>
      <div className="col-lg-9">
        <Switch>
          <Route path="/profile/me/edit" exact component={EditUser}/>
          <Route path="/profile/me" exact component={Me}/>
          <Route path="/profile/cars" component={MyPosts}/>
          <Route path="/profile" component={MyPosts}/>
        </Switch>
      </div>
    </div>
  </div>
);

export default Profile;