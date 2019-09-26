import React from "react";
import {connect} from "react-redux";
import UserInterface from "../common/UserInterface";
import {register} from "../../services/user";
import {setMessage} from '../../actions';
import auth from "../../services/auth";


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
    const {user, history, path, onSetMessage, info} = this.props;
    if (user) {
      auth.retrieveUser(res.data.token);
      history.replace(path.profile);
    } else {
      onSetMessage({type: 'info', message: info._1});
      history.replace(path.login);
    }
  };

  onFailure = () => {
    const {onSetMessage, errors} = this.props;
    onSetMessage({type: 'error', message: errors._1});
  };

  doSubmit = () => {
    const data = {...this.state.data};
    delete data.passwordConf;
    register(data).then(res => {
      if (!res || !res.data) this.onFailure();
      else this.handleResponse(res);
    })
  };


  render() {

    const {text, path} = this.props;

    return (
      <div className="register">
        <div className="register__container">
          <form onSubmit={this.handleSubmit} className="form">
          <h1 className="register__header">{text.header}</h1>
          <div className="form__group">
            {this.renderInput(text.email, text.email, null, true, this.handleEmail)}
          </div>
          <div className="form__group">
            {this.renderInput(text.firstName.name, text.firstName.label)}
          </div>
          <div className="form__group">
            {this.renderInput(text.lastName.name, text.lastName.label)}
          </div>
          <div className="form__group">
            {this.renderInput(text.phone.name, text.phone.label)}
          </div>
          <div className="form__group">
            {this.renderInput(text.password.name, text.password.label, text.password.type)}
          </div>
          <div className="form__group">
            {this.renderInput(text.passwordConf.name, text.passwordConf.label, text.passwordConf.type)}
          </div>
          <div className="form__group">
            {this.renderButton(text.button)}
          </div>
          <hr/>
          <div className="register__link">
            {this.renderLink(text.link, path.login)}
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    user: state.user,
    messages: state.config.messages,
    text: state.config.pages.register,
    path: state.config.path,
    errors: state.config.register.errors,
    info: state.config.register.info
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSetMessage: msg => dispatch(setMessage(msg))
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Register);