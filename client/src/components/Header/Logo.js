import React, {Component} from 'react';
import {connect} from 'react-redux';
import Icon from "../common/Icon";
import {Link} from "react-router-dom";

export function mapStateToProps(state) {
  return {
    logo: state.config.header.logo,
    www: state.config.header.www,
  };
}

export class Logo extends Component {
  render() {
    return (
      <Link className="nav__logo" to={this.props.www} onClick={this.props.closeMenu}>
        <Icon {...this.props.logo} />
      </Link>
    );
  }
}

export default connect(
  mapStateToProps,
)(Logo);