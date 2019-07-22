import React, {Component} from 'react';
import {connect} from 'react-redux';
import http from "../../services/http";
import auth from "../../services/auth";
import {setUser, setToken} from "../../actions";


class Google extends Component {


  callback = res => {

    const {history, onSetUser, onSetToken} = this.props;

    if (res.error) return history.replace("/");

    if (res && res.access_token)
      http.post("/auth/google", {code: res.code})
        .then(response => {
          if (response && response.data) {

            if (response.data.token) {
              const {token} = response.data;
              onSetToken(token);
              http.setJwt(token);
              auth.retrieveUser(token);
              return history.replace("/profile");
            } else {
              onSetUser(response.data);
              return history.replace("/register");
            }
          } else history.replace("/");

        });
  };


  componentDidMount() {

    const {google, history} = this.props;
    const gapi = window.gapi;

    if (!gapi) return history.replace("/");

    gapi.client.setApiKey(google.apiKey);
    gapi.client.load('plus', 'v1', function () {
    });

    const params = {...google};
    params.callback = this.callback;

    gapi.auth.signIn(params);
  }

  render() {
    return (
      <div className="container page-height">
        <div className="dark-background"></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    google: state.config.provider.google
  };
}

export default connect(
  mapStateToProps,
  dispatch => ({
    onSetUser: user => dispatch(setUser(user)),
    onSetToken: token => dispatch(setToken(token)),
  })
)(Google);
