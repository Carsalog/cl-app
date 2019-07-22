import React, {Component} from 'react';
import {connect} from 'react-redux';
import ItemsList from "../common/itemsList";
import SubList from "../common/subList";
import PostsContainer from "./PostsContainer";
import Pagination from "../common/pagination";
import generateUrl from "../../utils/generateUrl";
import {cookies} from "../../loader";
import {getMakes, getPosts, setMake, setMessage, setModel} from "../../actions";


class PostsList extends Component {
  state = {
    pageSize: 9,
    currentPage: 1,
    currentMake: null,
    currentModel: null
  };

  componentDidMount() {

    const url = generateUrl();

    const {state, city, zip} = this.props;
    if (zip) {
      if (cookies.get("zip")) cookies.remove("zip");
      cookies.set('zip', zip._id, { path: '/' });
    }
    if (!(Object.keys(state).length && Object.keys(city).length) && !zip) {
      this.props.onSetMessage({error: "Zip code, the state, and the city isn't defined"});
      this.props.history.replace("/");
      return null;
    }

    this.props.onGetMakes(this.props.config.urls.makes);

    this.props.onGetPosts(url);
  }

  handlePageChange = page => this.setState({currentPage: page});

  handleSetMake = make => {
    this.props.onSetModel(null);
    this.props.onSetMake(make);
    this.props.onGetPosts(generateUrl());
  };

  handleSetModel = model => {
    this.props.onSetModel(model);
    this.props.onGetPosts(generateUrl());
  };

  render() {
    const {make, model, state, city, posts} = this.props;
    const models = make ? make.models : [];

    const {pageSize, currentPage} = this.state;

    return (
      <React.Fragment>
        <div className="col-lg-2">
          <div className="btn btn-light w100 mb-3" onClick={() => this.props.history.push("/")}>
            <span className="text-capitalize pr-2">{city.name},</span>
            <span aria-current="page" className="pr-2">{state.abbreviation}</span>
            <span className="badge badge-pill badge-dark">{posts.length}</span>
          </div>

          <ItemsList
            items={this.props.makes}
            onItemSelect={this.handleSetMake}
            currentItem={make}
          />
          <SubList
            models={models}
            onModelSelect={this.handleSetModel}
            model={model}
            make={make}
          />
        </div>
        <div className="col-lg-8">
          {posts.length > 0 && (
            <div>
              <PostsContainer />
              <Pagination
                amount={this.props.posts.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          )}
          {posts.length === 0 && (<div className="h5">Cannot find cars</div>)}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    zip: state.zip,
    posts: state.posts,
    makes: state.makes,
    config: state.config,
    make: state.make,
    state: state.state,
    city: state.city,
    model: state.model
  };
}

function dispatchToMethods(dispatch) {
  return {
    onGetPosts: url => dispatch(getPosts(url)),
    onGetMakes: url => dispatch(getMakes(url)),
    onSetMake: make => dispatch(setMake(make)),
    onSetModel: model => dispatch(setModel(model)),
    onSetMessage: message => dispatch(setMessage(message))
  };
}

export default connect(
  mapStateToProps,
  dispatchToMethods
)(PostsList);
