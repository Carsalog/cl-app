import React from 'react';
import {connect} from 'react-redux';
import Form from '../common/form';
import auth from '../../services/auth';
import {setMessage} from '../../actions'
import {loginSchema} from '../common/schemas';


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
    const {user, history, onSetMessage, messages} = this.props;
    if (user) {
      onSetMessage({
        type: 'error',
        message: messages.loginAlready
      });
      history.push(this.props.path.home);
    }
  }

  handleLoginFail = () => {

    const {data} = this.state;

    // Clean password
    data.password = '';
    this.setState({ login: false, data });
  };


  componentDidUpdate(prevProps, prevState, snapshot) {
    const {user, message} = this.props;
    if (user)
      return this.props.history.push(this.props.path.profile);
    if (this.state.login && message && message.type === 'error')
      return this.handleLoginFail();
  }

  doSubmit = () => {
    this.setState({login: true});
    this.props.onSetMessage(null);
    return auth.login(this.state.data)
      .then(res => auth.retrieveUser(res));
  };


  render() {
    const {text, path} = this.props;
    return (
      <div className="login">
        <div className="login__container">
          {this.state.login &&
          <div className="loader">{text.loading}</div>}
          {!this.state.login && (
            <form onSubmit={this.handleSubmit} className="form">
              <h1 className="login__header">{text.header}</h1>
              <div className="form__group">
                {this.renderInput(text.email, text.email, null, true)}
              </div>
              <div className="form__group">
                {this.renderInput(text.password, text.password, text.password)}
              </div>
              <div className="login__button">
                {this.renderButton(text.header)}
              </div>
              <hr className="login__hr"/>
              <div className="login__link">
                {this.renderLink(text.registerLink, path.register)}
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    user: state.user,
    token: state.token,
    message: state.message,
    messages: state.messages,
    path: state.config.path,
    text: state.config.pages.login
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSetMessage: msg => dispatch(setMessage(msg))
  };
}


export default connect(
  mapStateToProps, mapDispatchToProps
)(Login);