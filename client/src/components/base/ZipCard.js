import React from 'react';


export const ZipCard = ({zip, zipMsg, renderLink, zipConfirm}) => (
  <div className="card border-info mt-5" style={{width: "100%"}}>
    <div className="card-body">
      <h5 className="card-title">Show cars in:</h5>
      <h6 className="card-subtitle mb-2 text-muted">
        <span>{zip._id} </span>
        <span className="text-capitalize">{zip.city.name}, </span>
        <span>{zip.state.abbreviation}</span>
      </h6>
      <p className="card-text">{zipMsg}</p>
      {renderLink("confirm", "/posts", zipConfirm)}
    </div>
  </div>
);


export default ZipCard;