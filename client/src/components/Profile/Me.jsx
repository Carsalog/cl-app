import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

export class Me extends Component {

  render() {
    const {user} = this.props;
    return (
      <div className="row">
        <div className="col-12 mb-5">
          <table className="table table-striped">
            <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">value</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>first name</td>
              <td>{user.firstName}</td>
            </tr>
            <tr>
              <td>last name</td>
              <td>{user.lastName}</td>
            </tr>
            <tr>
              <td>phone</td>
              <td>{user.phone}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <Link to="/profile/me/edit" className="btn btn-success w100">EDIT</Link>
        </div>
        <div className="col-6">
          <Link to="/profile/me/remove" className="btn btn-danger w100">REMOVE</Link>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user })
)(Me);
