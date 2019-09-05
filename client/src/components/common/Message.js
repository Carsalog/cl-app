import React, {Component} from 'react';
import {connect} from "react-redux";
import {setMessage} from '../../actions';


export class Message extends Component {

  render() {
    const {message, onCleanMessage} = this.props;
    return (
      <div className="container">
        {message && (
          <div className={`message message__border--${message.type}`}>
            <span className={`message__button message__button--${message.type}`}
                  onClick={onCleanMessage} />
            <p className={`message__text--${message.type}`}>
              {message.message}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {message: state.message};
}

export function mapDispatchToProps(dispatch) {
  return {
    onCleanMessage: () => dispatch(setMessage(null))
  }
}

export default connect(
   mapStateToProps, mapDispatchToProps
)(Message);