import React from 'react';
import Nav from './Nav';


export const Header = props => (
  <header className="header">
    <Nav {...props}/>
  </header>
);


export default Header;