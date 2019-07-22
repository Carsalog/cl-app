import {Component} from 'react';
import auth from "../services/auth";

class Logout extends Component {

  componentDidMount() {
    auth.logout();
    this.props.history.replace("/");
  }

  render() {
    return null;
  }
}

export default Logout;