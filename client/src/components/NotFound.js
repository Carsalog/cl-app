import React from "react";
import {Link} from "react-router-dom";
import SearchForm from "../components/common/SearchForm";


export const NotFound = props => {

  const back = () => props.history.goBack();

  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found__body">
          <div className="not-found__top">
            <h1 className="not-found__header">{props.header}</h1>
            <p className="not-found__message">{props.text}</p>
          </div>
          <div className="col-10 mb-4">
            <SearchForm />
          </div>
          <div className="not-found__btn-box">
            <button className="btn btn__info btn--up" onClick={back}>{props.btnBack}</button>
            <Link to="/" className="btn btn__info btn--up">{props.btnHome}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default NotFound;