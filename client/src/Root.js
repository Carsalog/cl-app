import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from "react-router-dom";
import {store} from "./loader";


export default children => (
  <Provider store={store}>
    <BrowserRouter><Route path="/" component={children}/></BrowserRouter>
  </Provider>
);
