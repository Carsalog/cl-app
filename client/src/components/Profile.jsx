import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Sidebar from "./profile/Sidebar";
import Me from "./profile/Me";
import MyPosts from "./profile/MyPosts";
import EditUser from "./profile/EditUser";


export class Profile extends Component {

  render() {
    return (
      <div className="container-fluid page-height">
        <div className="row">
          <div className="col-lg-3">
            <Sidebar history={this.props.history} />
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
  }
}

export default Profile;