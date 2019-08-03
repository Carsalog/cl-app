import React from 'react';
import NavLink from './NavLink';


export default ({su}) => su ? <NavLink
  path="/settings"
  iconStyle="fa fa-cog"
  text="Admin panel"
  textStyle="icon-text pr-2"/> : null;

