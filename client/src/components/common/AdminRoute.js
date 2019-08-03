import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {store} from "../../loader";
import {setMessage} from "../../actions";

const AdminRoute = ({path, component: Component, render, ...rest}) => {
  const state = store.getState();
  return (
    <Route {...rest} render={props => {
      if (!state.user) {
        store.dispatch(setMessage({
          error: state.config.messages.loginError
        }));
        return <Redirect to="/login"/>;
      }
      if (!state.user.su) {
        store.dispatch(setMessage({
          error: state.config.messages.permissionError
        }));
        return <Redirect to="/profile"/>;
      }
      return Component ? <Component {...props} /> : render(props);
    }}/>
  );
};

export default AdminRoute;
