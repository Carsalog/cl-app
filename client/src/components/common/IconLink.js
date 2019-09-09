import React from 'react';
import Icon from './Icon';

class IconLink extends React.Component {

  state = {color: ""};

  setStyle = x => this.setState({color: x});

  render() {

    const {item} = this.props;

    return (item.active &&
      <a href={item.url}
         className="icon__social"
         rel="nofollow noopener noreferrer"
         target="_blank"
         style={this.state}
         onMouseLeave={() => this.setStyle("")}
         onMouseEnter={() => this.setStyle(item.color)}>
        <Icon icon={item.icon} view={item.view}/>
      </a>
    );
  }
}

export default IconLink;
