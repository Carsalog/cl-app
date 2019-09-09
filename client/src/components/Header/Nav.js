import React from 'react';
import UserNav from './UserNav';
import Logo from './Logo';

export const Nav = () => (
  <nav className="nav">
    <input type="checkbox" className="nav__checkbox" id="nav__toggle"/>
    <label htmlFor="nav__toggle" className="nav__button">
      <span className="nav__burger"/>
    </label>
    <div className="nav__background"/>
    <div className="nav__wrapper">
      <Logo/>
    </div>
    <ul className="nav__menu">
      <UserNav/>
    </ul>
  </nav>
);


export default Nav;
