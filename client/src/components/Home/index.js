import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import Icon from '../common/Icon';

export function mapStateToProps(state) {
  return {
    greeting: state.config.pages.home.greeting,
    buyText: state.config.pages.home.buyText,
    sellText: state.config.pages.home.sellText,
    car: state.config.icons.car,
    moneyBag: state.config.icons.moneyBag
  };
}

export class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home__flexbox container">
          <div className="home__greeting">{this.props.greeting}</div>
          <Link to="/buy" className="home__link" id="buy">
            <h1 className="home__header">{this.props.buyText}</h1>
            <div className="home__icon-box">
              <Icon {...this.props.car} />
            </div>
          </Link>
          <Link to="/profile" className="home__link" id="sell">
            <h1 className="home__header">{this.props.sellText}</h1>
            <div className="home__icon-box">
              <Icon {...this.props.moneyBag} />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Home);