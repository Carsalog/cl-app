import React from 'react';
import {connect} from "react-redux";
import PlaceInterface from "../common/PlaceInterface";
import {getStates} from "../../actions";
import {placeSchema} from "../common/schemas";


class RightSite extends PlaceInterface {

  constructor(props) {

    super(props);

    this.state = {
      data: {state: "", city: ""},
      errors: {}
    };

    this.schema = placeSchema();
  }

  componentDidMount() {

    const {state, city, states, urls} = this.props;
    const data = {...this.state.data};

    if (Object.keys(state).length) {
      data.state = state._id;
      this.setState({data});
    }

    if (Object.keys(state).length && Object.keys(city).length) {
      data.city = city._id;
      this.setState({data});
    }

    if (!states.length) this.props.onGetStates(`${urls.states}`);
  }

  doSubmit = () => this.props.history.push("/posts");


  render () {

    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className="modal-header h3 text-muted flex-center">State and city</h1>
        {this.renderStates()}
        {this.renderCities()}
        {this.renderButton("submit")}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.state,
    states: state.states,
    city: state.city,
    cities: state.cities,
    urls: state.config.urls
  };
}

export default connect(
  mapStateToProps,
  dispatch => ({
    onGetStates: url => dispatch(getStates(url))
  })
)(RightSite);