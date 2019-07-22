import React from 'react';
import {connect} from 'react-redux';
import {postSchema} from "../common/schemas";
import PlaceInterface from "../common/PlaceInterface";
import {createPost, getCar, getStates, setCar, setCity, setMake, setModel, setMyPosts, setPost} from "../../actions";

export class NewPostBody extends PlaceInterface {

  constructor(props) {
    super(props);

    this.state = {
      data: {
        description: '',
        state: '',
        city: '',
        model: '',
        transmission: '',
        mileage: '',
        price: ''
      },
      errors: {}
    };

    this.props = props;

    this.schema = postSchema();
  }

  componentDidMount() {

    const {states, onGetStates, make, model, city, state, car} = this.props;
    const {urls} = this.props.config;

    if (!car) return this.props.history.replace("/posts/new");

    const data = {...this.state.data};

    if (!states.length) onGetStates(`${urls.states}`);
    if (state._id) data.state = state._id;
    if (city._id) data.city = city._id;
    if (make) data.make = make._id;
    if (model) data.model = model._id;

    this.setState({data, errors: this.state.errors});
  }

  handleAddPost = post => {
    const posts = this.props.myPosts.push(post);
    this.props.onSetMyPosts(posts);
  };

  doSubmit = () => {

    const {urls} = this.props.config;
    const {onSetPost} = this.props;
    const data = {...this.state.data};

    data.make = this.props.make._id;
    data.model = this.props.model._id;
    data.car = this.props.car._id;
    data.year = this.props.car.year;

    createPost(`${urls.posts}`, data).then(res => {
      if (res && res.data) {
        onSetPost(res.data);
        this.handleAddPost(res.data);
        this.props.history.push("/posts/new/final");
      }});
  };

  render() {

    const {make, transmissions} = this.props;

    const models = make ? make.models : [];

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="row">
          <div className="col-12 text-center">
            <h1 className="h4">Fill in the fields</h1>
          </div>
          <div className="col-12 pb-4">
            {this.renderTextarea("description", "Description", true)}
          </div>
          <div className="col-md-6">
            <div className="form-group">
              {make && <span className="input-group-text">{make.name}</span>}
            </div>
          </div>
          <div className="col-md-6">
            {transmissions.length > 0 &&
            this.renderSelect("transmission", "Transmission", transmissions, this.handleSelectTransmission)}
          </div>
          <div className="col-md-6">
            {this.renderModels(models)}
          </div>
          <div className="col-md-6">
            {this.renderInput("mileage", "Mileage")}
          </div>
          <div className="col-md-6">
            {this.renderInput("price", "Price")}
          </div>
          <div className="col-md-6">
            {this.renderStates()}
          </div>
          <div className="col-md-6">
            {this.renderCities()}
          </div>
          <div className="col-12 mt-3">
            <div className="row">
              <div className="col-6 px-1">
                {this.renderButton("Continue")}
              </div>
              <div className="col-6 px-1">
                <button className="btn btn-danger w100" type="button"
                        onClick={this.handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.state,
    states: state.states,
    city: state.city,
    cities: state.cities,
    transmissions: state.transmissions,
    make: state.make,
    model: state.model,
    car: state.car,
    myPosts: state.myPosts,
    config: state.config
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSetMake: make => dispatch(setMake(make)),
    onSetModel: model => dispatch(setModel(model)),
    onGetStates: url => dispatch(getStates(url)),
    onSetCity: city => dispatch(setCity(city)),
    onGetCar: url => dispatch(getCar(url)),
    onSetCar: car => dispatch(setCar(car)),
    onSetPost: post => dispatch(setPost(post)),
    onSetMyPosts: posts => dispatch(setMyPosts(posts)),
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostBody);
