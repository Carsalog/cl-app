import React from 'react';
import LeftSite from './base/LeftSite';
import RightSite from './base/RightSite';


const Base = props => (
  <main className="container page-height">
    <div className="row pt-5">
      <div className="col-md-5 col-lg-5">
        <LeftSite/>
      </div>
      <div className="col-2 flex-center h1 text-muted" id="or">or</div>
      <div className="col-md-5 col-lg-5">
        <RightSite history={props.history}/>
      </div>
    </div>
  </main>
);

export default Base;