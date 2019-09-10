import React from 'react';
import {connect} from 'react-redux';
import PlaceInterface from '../common/PlaceInterface';
import {getStates, getState, setCities} from '../../actions';
import {placeSchema} from '../common/schemas';


export class RightSite extends PlaceInterface {

  constructor(props) {

    super(props);

    this.state = {
      data: {state: '', city: ''},
      errors: {}
    };

    this.schema = placeSchema();
  }

  componentDidMount() {

    const {state, city, states, urls} = this.props;
    const data = {...this.state.data};
    if (state) {
      data.state = state._id;
      getState(`/states/${state._id}`).then(res => {
        if (res && res.data)
          return this.props.onSetCities(res.data.cities);
      });
      if (city) data.city = city._id;
      this.setState({data});
    }

    if (!states.length) this.props.onGetStates(`${urls.states}?amount=60`);
  }

  doSubmit = () => this.props.history.push(this.props.urls.posts);


  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className="base__header">State and city</h1>
        {this.renderStates()}
        {this.renderCities()}
        <div className="form__btn-container">
          {this.renderButton('submit')}
        </div>
      </form>
    );
  }
}

export function mapStateToProps(state) {
  return {
    state: state.state,
    states: state.states,
    city: state.city,
    cities: state.cities,
    urls: state.config.urls
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onGetStates: url => dispatch(getStates(url)),
    onSetCities: cities => dispatch(setCities(cities))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(RightSite);