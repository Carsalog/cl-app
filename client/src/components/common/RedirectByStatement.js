import React from 'react';
import {Redirect} from "react-router-dom";
import {store} from "../../loader";
import {setMessage} from "../../actions";


export default (statement, path, message) => {
  if (statement) {
    if (message) store.dispatch(setMessage(message));
    return <Redirect to={path}/>;
  }
  return null;
};
