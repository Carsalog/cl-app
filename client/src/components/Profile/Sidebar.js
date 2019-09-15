import React, {Component} from 'react';
import {connect} from 'react-redux';
import ItemsList from "../common/itemsList";


class Sidebar extends Component {

  state = {
    currentItem: null
  };

  handleSelectItem = item => {
    this.setState({currentItem: item});
    this.props.history.push(item.url);
  };

  render() {
    return <ItemsList items={this.props.menu}
                   onItemSelect={this.handleSelectItem}
                   currentItem={this.state.currentItem}
                   property="url"/>;
  }
}

export default connect(
  (state, ownProps) => ({
    history: ownProps.history,
    menu: state.config.user.menu
  }),
)(Sidebar);
