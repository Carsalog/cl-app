import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  getMake,
  getStates,
  getTransmissions,
  getUsersPosts,
  setMessage,
  setPost,
  setState,
  setCities,
  getState} from "../../actions";

import DisplayPosts from "../common/DisplayPosts";


class MyPosts extends Component {


  componentDidMount() {
    const {onGetUsersPosts, urls, user} = this.props;
    onGetUsersPosts(`${urls.posts}/by/user/${user._id}`);
  }

  handleView = _id => this.props.history.push(`/posts/${_id}`);


  handleEdit = post => {

    const {history, onSetPost, states, urls, transmissions} = this.props;

    onSetPost(post);

    this.props.onGetMake(`${urls.makes}/by/name/${post.car.make}`);

    if (!states.length) this.props.onGetStates(`${urls.states}`);
    if (!transmissions.length) this.props.onGetTransmissions(`${urls.transmissions}`);

    getState(`${urls.states}/${post.state._id}`).then(res => {
      if (res && res.data) {
        this.props.onSetState(res.data);
        this.props.onSetCities(res.data.cities);
      }
    });

    history.push(`/posts/edit/${post._id}`)
  };

  handleDelete = post => {
    const {history, onSetPost} = this.props;
    onSetPost(post);
    history.push(`/posts/remove/${post._id}`);
  };

  render() {
    const {myPosts} = this.props;
    return (
      <DisplayPosts
        posts={myPosts}
        onView={this.handleView}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete} />
    );
  }
}

function mapStateToProps(state) {
  return {
    myPosts: state.myPosts,
    transmissions: state.transmissions,
    states: state.states,
    urls: state.config.urls,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  dispatch => ({
    onGetUsersPosts: url => dispatch(getUsersPosts(url)),
    onGetTransmissions: url => dispatch(getTransmissions(url)),
    onSetMessage: msg => dispatch(setMessage(msg)),
    onSetPost: post => dispatch(setPost(post)),
    onSetState: state => dispatch(setState(state)),
    onGetStates: url => dispatch(getStates(url)),
    onSetCities: cities => dispatch(setCities(cities)),
    onGetMake: url => dispatch(getMake(url))
  })
)(MyPosts);
