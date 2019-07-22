import React from 'react';


const AdvanceSearchForm = () => {

  return (
    <form action="/search">
      <div className="row">
        <div className="col">
          <input type="text" className="form-control" placeholder="Make" />
        </div>
        <div className="col">
          <input type="text" className="form-control" placeholder="Model" />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input type="text" className="form-control" placeholder="Zip code" />
        </div>
        <div className="col">
          <input type="text" className="form-control" placeholder="Year" />
        </div>
      </div>
      <div className="input-group">
        <button className="btn btn-primary" id="basic-addon2">SHOW ME</button>
      </div>
    </form>
  );
};

export default AdvanceSearchForm;