import React from "react";
import {connect} from "react-redux";
import Form from "./common/form";
import Icons from "./common/Icons";
import auth from "../services/auth";
import {setMessage} from "../actions"
import {loginSchema} from "./common/schemas";


export class Login extends Form {

  constructor(props) {
    super(props);
    this.state = {
      data: {email: '', password: ''},
      errors: {},
      login: false
    };

    this.schema = loginSchema();
  }


  componentDidMount() {
    if (this.props.user) {
      this.props.onLoggedIn();
      this.props.history.push("/");
    }
  }

  handleLoginFail = () => {
    const {data} = this.state;
    data.password = '';
    this.setState({
      login: false,
      data
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.login) {
      const {message, user} = this.props;
      if (message && message.error) this.handleLoginFail();
      if (user) this.props.history.push('/profile');
    }
  }

  doSubmit = () => {
    this.setState({login: true});
    this.props.onSetMessage(null);
    auth.login(this.state.data)
      .then(res => auth.retrieveUser(res))
      .catch(err => this.props.onSetMessage(err));
  };


  render() {
    return (
      <div className="container page-height">
        <div className="row justify-content-md-center">
          {this.state.login && !this.props.token && <div>Login...</div>}
          {this.state.login && this.props.token && <div>Token received!</div>}
          {!this.state.login && (
            <form onSubmit={this.handleSubmit} className="col-sm-12 col-md-8 col-lg-5">
              <h1 className="h3 text-muted text-center">Sign In</h1>
              <hr/>
              <div className="h70">
                {this.renderInput("email", "Email", "text", true)}
              </div>
              <div className="h70">
                {this.renderInput("password", "Password", "password")}
              </div>
              {this.renderButton("Sign in")}
              <hr/>
              <span className="h4 w100 flex-center text-muted">or</span>
              <hr/>
              <span className="col-6 d-inline-block">
              <div className="flex-center">
                {this.renderLink("sign up", "/register")}
              </div>
              </span>
                  <span className="col-6 d-inline-block">
                <Icons classes="link-gray mr-3 h4"/>
              </span>
            </form>
          )}
        </div>
      </div>
    );
  }
}


export default connect(
  state => ({
    user: state.user,
    token: state.token,
    message: state.message
  }),
  dispatch => ({
    onLoggedIn: () => dispatch(setMessage({error: "You are already logged in"})),
    onSetMessage: msg => dispatch(setMessage(msg))
  })
)(Login);