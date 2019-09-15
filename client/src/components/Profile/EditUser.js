import React from 'react';
import {connect} from 'react-redux';
import {update} from "../../services/user";
import UserInterface from "../common/UserInterface";


class EditUser extends UserInterface {
  constructor(props) {
    super();

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
      if (res) this.props.history.push("/profile/me");
    })
  };

  render() {
    return (
      <div className="container flex-center page-hight">
        <form onSubmit={this.handleSubmit} className="w-min-500">
          <h1 className="h3">Edit my info</h1>
          <hr/>
          {this.renderInput("email", "Email", "text", false, this.handleEmail)}
          {this.renderInput("firstName", "First name")}
          {this.renderInput("lastName", "Last name")}
          {this.renderInput("phone", "Phone number")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("passwordConf", "Confirm password", "password")}
          {this.renderButton("UPDATE")}
          <hr/>
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
