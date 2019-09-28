import React, {Component} from 'react';
import {connect} from 'react-redux';
import Icon from '../common/Icon';


export function mapStateToProps(state) {
  return {
    edit: state.config.icons.edit,
    remove: state.config.icons.remove
  };
}

export class ActionsList extends Component {
  render() {
    const {onEdit, onDelete, post, edit, remove} = this.props;
    return (
      <div className="posts__list-center">
        <span onClick={() => onEdit(post)} className="posts__list-link posts__list-link--info">
          <Icon {...edit} />
        </span>
        <span onClick={() => onDelete(post)} className="posts__list-link posts__list-link--remove">
          <Icon {...remove}/>
        </span>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(ActionsList);