import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPost, removePost, setMessage, setMyPosts} from "../../actions";
import ImageView from "../common/ImageView";


class RemovePost extends Component {

  componentDidMount() {

    const {user, post, urls, match, history, onGetPost} = this.props;

    if (!post) onGetPost(`${urls.posts}/${match.params.id}`);

    if (!user.su && user._id !== post.author._id) {
      this.props.onSetMessage({error: "You cannot remove this post"});
      history.replace("/profile");
    }
  }

  removeFromMyPosts = postId => {
    const posts = this.props.myPosts.filter(item => item._id !== postId);
    this.props.onSetMyPosts(posts);
  };

  handleResponse = res => {
    const {post, history, onSetMessage} = this.props;

    onSetMessage(res);
    this.removeFromMyPosts(post._id);
    history.replace("/profile");
  };

  handleRemove = () => {

    const {post, urls} = this.props;

    removePost(`${urls.posts}/${post._id}`).then(res => {
      if (res && res.data) this.handleResponse(res.data);
    });
  };

  handleCancel = () => this.props.history.push("/profile");

  render() {

    const {post, base} = this.props;

    return (
      <div className="container page-height">
        <div className="row justify-content-md-center">
          <div className="col-lg-6">
            <h1 className="h4">Remove the car</h1>
            <p>Are you sure that you want to remove following car?</p>
            <strong>{post.year} {post.make.name} {post.model.name}</strong>
            <ImageView classes="my-2" images={post.images} base={base}/>
          </div>
        </div>
        <div className="row mt-1 justify-content-md-center">
          <div className="col-sm-3">
            <button onClick={this.handleRemove}
                    className="btn btn-danger w100"
                    type="button">REMOVE</button>
          </div>
          <div className="col-sm-3">
            <button onClick={this.handleCancel}
                    className="btn btn-info w100"
                    type="button">CANCEL</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    post: state.post,
    myPosts: state.myPosts,
    base: state.config.base,
    urls: state.config.urls
  };
}

export default connect(
  mapStateToProps,
  dispatch => ({
    onGetPost: url => dispatch(getPost(url)),
    onSetMessage: msg => dispatch(setMessage(msg)),
    onSetMyPosts: posts => dispatch(setMyPosts(posts))
  })
)(RemovePost);
