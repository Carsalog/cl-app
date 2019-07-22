import {getTag, updatePost} from "../../actions";
import PlaceInterface from "./PlaceInterface";
import http from "../../services/http";

class PostInterface extends PlaceInterface {

  handleAddTag = tag => {
    const {urls, post, onSetPost} = this.props;
    const tags = [...post.tags.map(tag => tag._id)];

    if (tags.indexOf(tag._id) === -1) {

      this.props.onAddTag(tag);

      tags.push(tag._id);

      updatePost(`${urls.posts}/${post._id}`, {tags}).then(res => {
        if (res && res.data) {
          onSetPost(res.data);
        }
      });
    }
  };

  handleTagChange = e => {
    const {data, errors} = {...this.state};
    const input = e.currentTarget;
    this.handleChange(e);

    if (!/^\s?(\w{2,30})[\s,]$/.test(input.value)) {
      data.tag = input.value;
      this.setState({data, errors});
    } else {
      const tag = input.value.trim().replace(/(,$)/g, "");
      getTag(`${this.props.urls.tags}/by/name/${tag}`)
        .then(res => {
          if (res && res.data) {
            data.tag = "";
            this.setState({data, errors});
            this.handleAddTag(res.data);
          }
        });
    }
  };

  handleRemoveTag = tag => {

    const {urls, post, onSetPost} = this.props;
    const tags = [...post.tags.map(tag => tag._id)].filter(item => item !== tag._id);

    updatePost(`${urls.posts}/${post._id}`, {tags}).then(res => {
      if (res && res.data) onSetPost(res.data);
    });
  };

  handleAddImage = ({target: input}) => {

    const data = {...this.state.data};
    const files = Array.from(input.files);
    const {post} = this.props;
    let form = new FormData();
    files.forEach(file => form.append('images', file));

    const contentType = {
      headers: {'Content-Type': `multipart/form-data`}
    };

    http.post(`/images/by/post/${post._id}`, form, contentType).then(res => {
      if (res && res.data) {
        data.images = res.data;
        this.setState({data});
      }
    });
  };

  handleRemoveImage = img => {
    const data = {...this.state.data};
    data.images = data.images.filter(image => image !== img);
    this.setState({data});
  };
}


export default PostInterface;
