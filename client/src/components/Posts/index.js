import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Vin from './Vin';
import NewPostBody from './NewPostBody';
import EditMyPost from './EditMyPost';
import RemovePost from './RemovePost';
import NewPostFinal from './NewPostFinal';
import PostsList from './PostsList';
import Post from "./Post";
import ProtectedRoute from "../common/ProtectedRoute";


export class Posts extends Component {

  render() {
    return (
      <main className="container-fluid">
        <div className="row page-height">
          <Switch>
            <ProtectedRoute path="/posts/remove/:id" component={RemovePost}/>
            <ProtectedRoute path="/posts/edit/:id" component={EditMyPost}/>
            <ProtectedRoute path="/posts/new/body" component={NewPostBody}/>
            <ProtectedRoute path="/posts/new/final" component={NewPostFinal}/>
            <ProtectedRoute path="/posts/new" component={Vin}/>
            <Route path="/posts/:id" component={Post}/>
            <Route path="/posts" exact component={PostsList}/>
          </Switch>
        </div>
      </main>
    );
  }
}

export default Posts;