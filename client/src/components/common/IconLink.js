import React from 'react';
import {Link} from "react-router-dom";

class IconLink extends React.Component {

  state = {color: ""};

  setStyle = x => this.setState({color: x});

  render() {

    const {item} = this.props;

    return (item.active &&
      <Link to={item.url}
            className="soc-icon"
            style={this.state}
            onMouseLeave={() => this.setStyle("")}
            onMouseEnter={() => this.setStyle(item.color)}>
        <i className={item.class} aria-hidden="true"> </i>
      </Link>
    );
  }
}

export default IconLink;
