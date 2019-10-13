import React from 'react';
import {connect} from 'react-redux';
import {update} from '../../services/user';
import UserInterface from '../common/UserInterface';


class EditUser extends UserInterface {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: props.user.email,
        password: '',
        passwordConf: '',
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        phone: props.user.phone
      },
      errors: {}
    };
  }

  doSubmit = () => {
    const data = {...this.state.data};
    delete data.passwordConf;
    update(data).then(res => {
      if (res) this.props.history.push('/profile/me');
    })
  };

  render() {
    return (
      <div className="container profile profile--edit">
        <form onSubmit={this.handleSubmit} className="form">
          <div className="form__group">
            <h1 className="profile__header">Edit my info</h1>
          </div>
          <div className="form__flexbox">
            <div className="form__short">
              {this.renderInput('email', 'Email', 'text', false, this.handleEmail)}
            </div>
            <div className="form__short">
              {this.renderInput('phone', 'Phone number')}
            </div>
            <div className="form__short">
              {this.renderInput('firstName', 'First name')}
            </div>
            <div className="form__short">
              {this.renderInput('lastName', 'Last name')}
            </div>
            <div className="form__short">
              {this.renderInput('password', 'Password', 'password')}
            </div>
            <div className="form__short">
              {this.renderInput('passwordConf', 'Confirm password', 'password')}
            </div>
          </div>
          <hr className="profile__hr"/>
          <div className="form__wrapper">
            {this.renderButton('update')}
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
)(EditUser);
