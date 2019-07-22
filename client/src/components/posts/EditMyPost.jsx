import React from 'react';
import {connect} from 'react-redux';
import PostInterface from "../common/PostInterface";
import {addTag, setMessage, setPost, setMyPosts} from ".././../actions";
import {postSchema} from "../common/schemas";
import http from "../../services/http";
import Tags from "../common/Tags";
import ImageUpload from "../common/ImageUpload";


class EditMyPost extends PostInterface {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        tag: '',
        description: '',
        transmission: '',
        state: '',
        city: '',
        mileage: '',
        price: '',
        tags: [],
        images: []
      },
      errors: {}
    };

    this.schema = postSchema();
  }


  componentDidMount() {

    const {post, urls, match} = this.props;

    if (!post) http.get(`${urls.posts}/${match.params.id}`)
      .then(res => this.checkResponse(res));
    else this.setData(post);
  }

  handleResponse = res => {

    const {state, city} = res;

    this.props.onSetPost(res);
    this.onSetState(state);
    this.onSelectState({currentTarget: {name: "state", value: state._id}});
    this.onSetCity(city);
    this.checkUser(res);
  };

  checkResponse = res => {

    if (res && res.data) this.handleResponse(res.data);
  };

  checkUser = post => {

    const {user, history} = this.props;

    if (!user.su && user._id !== post.author._id)
    {
      this.props.onSetMessage({error: "You cannot edit this post"});
      history.replace("/profile");
    }
    else this.setData(post);
  };

  setData = post => {

    const data = {...this.state.data};

    data.description = post.description;
    data.state = post.state._id;
    data.city = post.city._id;
    data.model = post.model._id;
    data.transmission = post.transmission._id;
    data.mileage = String(post.mileage);
    data.price = String(post.price);
    data.images = post.images;

    this.setState({data, errors: this.state.errors}, this.validate);
  };

  handleDataPrepare = () => {
    const data = {...this.state.data};
    const {post} = this.props;
    delete data.tag;

    data.car = post.car._id;
    data.make = post.make._id;
    data.year = post.year;
    data.isActive = true;
    data.tags = post.tags.map(tag => tag._id);
    data.images = data.images.map(img => img._id);
    return data;
  };

  doSubmit = () => {
    const {urls, history, myPosts, onSetPost, onSetMyPosts} = this.props;
    const data = this.handleDataPrepare();
    http.put(`${urls.posts}/${this.props.post._id}`, data).then(res => {
      if (res && res.data) {
        onSetPost(null);
        const posts = [...myPosts.map(post => {
          if (post._id === res.data) return res.data;
          return post;
        })];
        onSetMyPosts(posts);
        history.replace("/profile");
      }
    })
  };

  render() {

    const {make, transmissions, base, post} = this.props;
    const {tag, images} = this.state.data;
    const error = this.state.errors.tag ? this.state.errors.tag : null;
    const models = make ? make.models : [];

    return (
      <div className='container'>
        <form className="row" onSubmit={this.handleSubmit}>
          <div className="col-12 text-center">
            <h1 className="h4">Edit info</h1>
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
          <div className="col-12">
            {post && <Tags
              tags={post.tags}
              tag={tag}
              onTagChange={this.handleTagChange}
              onRemoveTag={this.handleRemoveTag}
              error={error}/>}
          </div>
          <div className="col-12">
            <ImageUpload
              images={images}
              base={base}
              onImageAdd={this.handleAddImage}
              onImageRemove={this.handleRemoveImage}/>
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
    post: state.post,
    myPosts: state.myPosts,
    user: state.user,
    states: state.states,
    cities: state.cities,
    transmissions: state.transmissions,
    make: state.make,
    model: state.model,
    car: state.car,
    urls: state.config.urls,
    base: state.config.base
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSetMessage: msg => dispatch(setMessage(msg)),
    onAddTag: tag => dispatch(addTag(tag)),
    onSetPost: post => dispatch(setPost(post)),
    onSetMyPosts: posts => dispatch(setMyPosts(posts))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMyPost);
