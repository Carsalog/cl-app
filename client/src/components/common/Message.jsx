import React, {Component} from 'react';
import {connect} from "react-redux";
import {delMessage} from '../../actions';


export class Message extends Component {

  render() {

    const {message} = this.props;

    const Alert = () => {
      let type = "", alert = "";
      let classes = "alert alert-dismissible fade show";
      if (message.error) {
        classes += " alert-danger";
        type = "Error";
        alert = message.error;
      } else if (message.info) {
        classes += " alert-info";
        type = "Info";
        alert = message.info;
      }
      return (
        <div className={classes} role="alert">
          <strong>{type}:</strong> {alert}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={this.props.onDelMessage}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    };

    return <div className="container">{message && <Alert/>}</div>;
  }
}

export default connect(
  state => ({message: state.message}),
  dispatch => ({onDelMessage: () => dispatch(delMessage())})
)(Message);