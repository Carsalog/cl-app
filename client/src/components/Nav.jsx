import React from 'react';
import UserNav from './common/UserNav';
import {Link} from 'react-router-dom';

class Nav extends  React.Component {

  state = { navBar: true };

  handleNavBar = () => this.setState({navBar: !this.state.navBar});

  render () {

    const {navBar} = this.state;
    const classes = navBar ? "collapse navbar-collapse" : "navbar-collapse";

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <Link className="navbar-brand h4" to="/" id="logo">
          <span className="base-color">C</span>
          <span>arsalog</span>
        </Link>
        <button className="navbar-toggler"
                onClick={this.handleNavBar}
                type="button"
                data-toggle="collapse"
                data-target="navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"> </span>
        </button>
        <div className={classes} id="navbarNavAltMarkup">
          <div className="navbar-nav"> </div>
          <div className="navbar-nav ml-auto">
            <UserNav/>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
