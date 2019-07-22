import React from 'react';
import {connect} from "react-redux";
import IconLink from "../common/IconLink";

export class Social extends React.Component {

  render() {
    // const {social} = this.props.config;
    return this.props.config.social.map(item => <IconLink item={item} key={item._id} />);
  }
}

export default connect(state => ({config: state.config}))(Social);