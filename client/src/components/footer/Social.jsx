import React from 'react';
import {connect} from "react-redux";
import IconLink from "../common/IconLink";

export const Social = ({social}) => social.map(item => <IconLink item={item} key={item._id} />);

export default connect(state => ({social: state.config.social}))(Social);