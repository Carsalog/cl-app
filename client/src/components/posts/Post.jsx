import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {getPost, setPost} from "../../actions";
import {formatDate} from "../../utils/tools";
import ImageView from "../common/ImageView";
import ContactSeller from "../posts/ContactSeller";


class Post extends Component {

  componentDidMount() {
    const {post, posts, onGetPost, onSetPost, params} = this.props;
    const {urls} = this.props.config;

    if (!post && !posts.length) onGetPost(`${urls.posts}/${params.id}`);
    if (posts.length) {
      const post = posts.find(x => x._id === params.id);
      if (post) onSetPost(post)
    }
  }

  render() {

    const {post, base, user} = this.props;

    let title, date;

    if (post) {
      const {year, make, model} = post.car;

      title = `${year} ${make} ${model}`;
      const d = formatDate(post.date);
      date = `${d.month}/${d.day}/${d.year} ${d.hours}:${d.minutes}:${d.seconds}`;
    }

    return (
      <div className="container-fluid page-height">
        <div className="row">
          <div className="col-lg-8">
            {post && (
              <div className="row">
                <div className="col-12">
                  <span className="float-right small pt-1">{date}</span>
                  <h1 className="h5 text-uppercase small-header">
                    <span className="mr-2">{title}</span>
                    <span className="">${post.price}</span>
                  </h1>
                </div>
                <ImageView images={post.images} classes="col-12" base={base}/>
                <div className="col-md-12">
                  <table className="table table-striped small-size">
                    <thead>
                    <tr>
                      <th scope="col">name</th>
                      <th scope="col">value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>MAKE</td>
                      <td>{post.car.make}</td>
                    </tr>
                    <tr>
                      <td>MODEL</td>
                      <td>{post.car.model}</td>
                    </tr>
                    <tr>
                      <td>YEAR</td>
                      <td>{post.car.year}</td>
                    </tr>
                    <tr>
                      <td>TRANSMISSION</td>
                      <td>{post.transmission.type}</td>
                    </tr>
                    <tr>
                      <td>FUEL</td>
                      <td>{post.car.fuel}</td>
                    </tr>
                    <tr>
                      <td>BODY TYPE</td>
                      <td>{post.car.type}</td>
                    </tr>
                    <tr>
                      <td>MILEAGE</td>
                      <td>{post.mileage} miles</td>
                    </tr>
                    <tr>
                      <td>VIN</td>
                      <td className="overflow">{post.car.vin}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-12">
                  <hr/>
                  <p>{post.description}</p>
                  <hr/>
                </div>
                <div className="col-12">
                  {post.tags.map(item => (
                    <Link to="#" className="link-gray text-uppercase p-4" key={item._id}>{item.name}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="col-lg-4">
            {post && <ContactSeller user={user} post={post} />}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    params: ownProps.match.params,
    user: state.user,
    zip: state.zip,
    base: state.config.base,
    posts: state.posts,
    post: state.post,
    makes: state.makes,
    config: state.config,
    make: state.make,
    state: state.state,
    city: state.city,
    model: state.model
  }),
  dispatch => ({
    onGetPost: url => dispatch(getPost(url)),
    onSetPost: post => dispatch(setPost(post))
  })
)(Post);