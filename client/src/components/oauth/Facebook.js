import React, {Component} from 'react';
import {connect} from 'react-redux';
import http from "../../services/http";
import {setMessage} from "../../actions";


class Facebook extends Component {


  componentDidMount() {
    const {user, history, facebook, onSetMessage} = this.props;
    const FB = window.FB;

    if (user) return history.replace("/profile");
    if (!FB) return history.replace("/");

    FB.init(facebook);

    FB.login(() => {
      const response = FB.getAuthResponse();
      if (response) {
        http.post("/auth/facebook", {code: response.accessToken}).then(res => {
          console.log(res);
        });
      } else {
        onSetMessage({error: "Cannot reach to Facebook, try it later"});
        history.replace("/");
      }
    });


    // FB.login(function (response) {
    //   if (response.authResponse) {
    //     FB.api('/me', function (response) {
    //       console.log(response);
    //
    //     });
    //
    //   } else console.error('User cancelled login or did not fully authorize.');
    //
    // });
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    facebook: state.config.provider.facebook
  };
}

export default connect(
  mapStateToProps,
  dispatch => ({
    onSetMessage: msg => dispatch(setMessage(msg))
  })
)(Facebook);
