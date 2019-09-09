import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import RenderList from './RenderList';
import Social from './Social';


export function mapStateToProps(state) {
  return {
    follow: state.config.footer.follow,
    resources: state.config.footer.resources,
    about: state.config.footer.about,
    copyright: state.config.footer.copyright
  };
}

export class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__block container">
          <div className="footer__flexbox">
            <div className="footer__unit footer__unit--icons">
              <h5 className="footer__icons-header">{this.props.follow.header}</h5>
              <div className="footer__wrapper">
                <Social />
              </div>
            </div>
            <div className="footer__unit">
              <RenderList {...this.props.resources}/>
            </div>
            <div className="footer__unit">
              <RenderList {...this.props.about}/>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="footer__copyright">
            <span className="footer__copyright-text">{this.props.copyright.text}</span>
            <Link
              to={this.props.copyright.link.url}
              className="footer__copyright-link">{this.props.copyright.link.title}</Link>
          </div>
        </div>
      </footer>
    );
  }
}

export default connect(
  mapStateToProps,
)(Footer);