import React, {Component} from 'react';
import {connect} from "react-redux";
import Icons from "./Icons";
import AdminButton from "./AdminButton";
import NavLink from "./NavLink";


export class UserNav extends Component {

  render() {
    const {user} = this.props;
    console.log(user);
    if (user) return (
      <React.Fragment>
        <NavLink path="/profile"
                 iconStyle="fa fa-user"
                 text={user.firstName + " " + user.lastName}
                 textStyle="pr-1"/>
        <AdminButton su={user.su} />
        <NavLink path="/logout"
                 iconStyle="fa fa-sign-out"
                 text="Sign out"
                 textStyle="icon-text pr-2"/>
      </React.Fragment>);
    else return (
      <React.Fragment>
        <Icons classes="nav-item nav-link" text={true}/>
        <NavLink path="/login"
                 iconStyle="fa fa-sign-in"
                 text="Sign in"
                 textStyle="icon-text pr-2"/>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  })
)(UserNav);