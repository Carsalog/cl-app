import React from "react";
import {connect} from "react-redux";
import Icons from "./common/Icons";
import UserInterface from "./common/UserInterface";
import {register} from "../services/user";
import auth from "../services/auth";


export class Register extends UserInterface {

  state = {
    data: {
      email: '',
      password: '',
      passwordConf: '',
      firstName: '',
      lastName: '',
      phone: ''
    },
    errors: {}
  };


  componentDidMount() {
    const {user, messages} = this.props;
    const data = {...this.state.data};
    const errors = {...this.state.errors};
    if (user) {
      if (user.firstName && user.firstName.length > 0) data.firstName = user.firstName;
      else errors.firstName = messages.firstNameError;
      if (user.lastName && user.lastName.length > 0) data.lastName = user.lastName;
      else errors.lastName = messages.lastNameError;
      if (user.email && user.email.length > 0) data.email = user.email;
      else errors.email = messages.emailError;
      if (user.phone && user.phone.length > 0) data.phone = user.phone;
      else errors.phone = messages.phoneError;
      this.setState({ data, errors });
    }
  }


  handleResponse = res => {
    if (res && res.data) {
      if (this.props.user) {
        auth.retrieveUser(res.data.token);
        this.props.history.replace("/profile")
      }
      else this.props.history.replace("/login")
    }
  };


  doSubmit = () => {
    const data = {...this.state.data};
    delete data.passwordConf;
    register(data).then(res => this.handleResponse(res))
  };


  render() {

    return (
      <div className="container page-hight">
        <div className="row justify-content-md-center">
          <form onSubmit={this.handleSubmit} className="col-sm-12 col-md-8 col-lg-5">
          <h1 className="h3">Sign up</h1>
          <hr/>
          {this.renderInput("email", "Email", "text", true, this.handleEmail)}
          {this.renderInput("firstName", "First name")}
          {this.renderInput("lastName", "Last name")}
          {this.renderInput("phone", "Phone number")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("passwordConf", "Confirm password", "password")}
          {this.renderButton("Sign up")}
          <hr/>
          <span className="h4 w100 flex-center text-muted">or</span>
          <hr/>
          <span className="col-6 d-inline-block">
            <div className="flex-center">
              {this.renderLink("sign in", "/login")}
            </div>
          </span>
          <span className="col-6 d-inline-block">
            <Icons classes="link-gray mr-3 h4"/>
          </span>
        </form>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
    messages: state.config.messages
  })
)(Register);