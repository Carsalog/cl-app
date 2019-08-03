import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";


class Icons extends Component {

  render() {

    const {oauth, classes, text} = this.props;

    return oauth.map(item => ( item.active &&
        <Link to={item.url} className={classes} key={item._id}>
          {text && <span className="icon-text pr-2">{item.text}</span>}
          <i className={item.classes} aria-hidden="true" />
        </Link>
      )
    );
  }
}

export default connect(
  (state, ownProps) => ({
    classes: ownProps.classes,
    text: ownProps.text,
    oauth: state.config.oauth,
  })
)(Icons);