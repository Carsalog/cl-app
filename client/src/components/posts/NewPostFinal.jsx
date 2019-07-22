import React from 'react';
import {connect} from 'react-redux';
import ImageUpload from "../common/ImageUpload";
import {addTag, setPost} from "../../actions";
import {finalSchema} from "../common/schemas";
import Tags from "../common/Tags";
import PostInterface from "../common/PostInterface";


export class NewPostFinal extends PostInterface {

  constructor(props) {
    super(props);

    this.state = {
      data: {
        tag: '',
        images: []
      },
      errors: {}
    };

    this.schema = finalSchema()
  }



  doSubmit = e => {
    e.preventDefault();
    const images = [...this.state.data.images.map(item => item.file)];
    console.log(images);
    console.log(this.state);
  };


  render() {
    const {images, tag} = this.state.data;
    const {tags} = this.props.post;
    const error = this.state.errors.tag ? this.state.errors.tag : null;
    return (
      <div className="container page-height">
        <form onSubmit={this.doSubmit}>
          <div className="row">
            <Tags
              tags={tags}
              tag={tag}
              onTagChange={this.handleTagChange}
              onRemoveTag={this.handleRemoveTag}
              error={error}/>
            <ImageUpload
              images={images}
              base={this.props.base}
              onImageAdd={this.handleAddImage}
              onImageRemove={this.handleRemoveImage}/>
            <div className="col-12">
              {this.renderButton("DONE")}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    base: state.config.base,
    post: state.post,
    myPosts: state.myPosts,
    urls: state.config.urls,
    message: state.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddTag: tag => dispatch(addTag(tag)),
    onSetPost: post => dispatch(setPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPostFinal);
