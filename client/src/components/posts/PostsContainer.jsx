import React, {Component} from 'react';
import {connect} from "react-redux";
import PostCard from "./PostCard";


class PostsContainer extends Component {

  render() {

  const {posts, base} = this.props;

  return (
      <React.Fragment>
        {posts.length && posts.map(post =>
          <PostCard post={post} key={post._id} base={base} />
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    posts: state.posts,
    base: state.config.base
  })
)(PostsContainer);
