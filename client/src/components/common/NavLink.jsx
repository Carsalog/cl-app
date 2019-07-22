import React from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


const NavLink = ({path, iconStyle, text, textStyle}) => (
  <Link className="nav-item nav-link" to={path}>
    {text && <span className={textStyle}>{text}</span>}
    <i className={iconStyle} aria-hidden="true"> </i>
  </Link>
);

NavLink.propTypes = {
  path: PropTypes.string.isRequired,
  iconStyle: PropTypes.string.isRequired,
  text: PropTypes.string,
  textStyle: PropTypes.string
};

export default NavLink;