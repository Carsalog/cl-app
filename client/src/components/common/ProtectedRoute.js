import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {store} from "../../loader";
import {setMessage} from "../../actions";


const ProtectedRoute = ({path, component: Component, render, ...rest}) => {

  const state = store.getState();

  return (
    <Route {...rest} render={props => {

      if (!state.user) {
        const msg = state.config.messages.loginError;
        store.dispatch(setMessage({error: msg}));
        return <Redirect to="/login"/>;
      }
      return Component ? <Component {...props} /> : render(props);
    }}/>
  );
};

export default ProtectedRoute;
