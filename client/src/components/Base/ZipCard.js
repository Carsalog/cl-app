import React from 'react';

export const ZipCard = ({zip, zipMsg, renderLink, zipConfirm, resetZip}) => (
  <div className="zip__card">
    <div className="zip__card-body">
      <div className="zip__card-address">
        <span className="zip__card-code">{zip._id} </span>
        <span className="zip__card-city">{zip.city.name}, </span>
        <span className="zip__card-state">{zip.state.abbreviation}</span>
      </div>
      <p className="zip__card-text">{zipMsg}</p>
      <div className="zip__link-box">
        <div className="zip__link zip__link--cancel" onClick={resetZip}>cancel</div>
        {renderLink("confirm", "/posts", zipConfirm, "zip__link zip__link--confirm")}
      </div>
    </div>
  </div>
);


export default ZipCard;