import React, {Component} from 'react';
import {connect} from 'react-redux';
import http from "../services/http";
import SearchForm from "./common/SearchForm";

class Search extends Component {

  state = {
    advance: false,
    query: this.props.location.search,
    results: []
  };


  componentDidMount() {

    const queryLength = this.state.query.length > 0;
    this.props.history.push("/search");
    if (queryLength) http.get(`/search${this.state.query}`).then(res => {
      if (res && res.data) this.setState({results: res.data});
    });
  }

  handleSearchType = () => {
    const state = {...this.state};
    state.advance = !state.advance;
    this.setState(state);
  };


  render() {
    const {results, query} = this.state;
    const amount = results.length > 0;
    const queryLength = query.length > 0;
    console.log(query);
    return (
      <div className="container page-height">
        <div className="row">
          <div className="col-md-12">
            <SearchForm />
            {queryLength && <h1 className="h4">Search results</h1>}
            {amount && (
              results.map(item => (
                <div className="" key={item._id}>{item.name}</div>
              ))
            )}
            {!amount && queryLength && (
              <div>
                <div>Cannot find anything with given query</div>
                <div>Try to find a car?</div>
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={this.handleSearchType}>ADVANCE SEARCH</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(Search);
