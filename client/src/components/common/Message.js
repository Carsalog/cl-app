import React, {Component} from 'react';
import {connect} from "react-redux";
import {setMessage} from '../../actions';


export class Message extends Component {

  render() {

    return (
      <div className="container">
        {this.props.message && (
          <div className={`alert alert-${this.props.message.type} alert-dismissible fade show mt-5`} role="alert">
            <strong>{this.props.message.type}</strong> {this.props.message.message}
            <button type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close" onClick={this.props.onCleanMessage}>
              <span aria-hidden="true">&times;</span>
            </button>
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