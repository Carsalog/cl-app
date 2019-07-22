import React from "react";
import {Link} from "react-router-dom";
import SearchForm from "../components/common/SearchForm";


const NotFound = props => {

  const back = () => props.history.goBack();

  return (
    <div className="container page-height">
      <div className="row justify-content-center text-muted jumbotron">
        <div className="col-12 text-center mb-5">
          <h1 className="not-found-title">404</h1>
          <h2 className="h4">SORRY</h2>
          <div className="my-4">The page you're looking for was not found</div>
        </div>
        <div className="col-10 mb-4">
          <SearchForm />
        </div>
        <div className="col-5">
          <Link to="/" className="btn btn-primary w100">HOME <span className="sm-screen-hide">PAGE</span></Link>
        </div>
        <div className="col-5">
          <button className="btn btn-primary w100" onClick={back}>GO BACK</button>
        </div>
      </div>
    </div>
  );
};


export default NotFound;