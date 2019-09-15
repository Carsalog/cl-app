import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from "react-router-dom";
import Google from "./oauth/Google";
import Facebook from "./oauth/Facebook";

class OAuth extends Component {
  render() {
    return (
      <Switch>
        <Route path="/oauth/google" component={Google} />
        <Route path="/oauth/facebook" component={Facebook} />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(OAuth);
