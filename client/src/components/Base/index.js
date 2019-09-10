import React from 'react';
import LeftSite from './LeftSite';
import RightSite from './RightSite';


const Base = props => (
  <main className="container">
    <div className="base">
      <div className="base__left"><LeftSite /></div>
      <div className="base__center" id="or">
        <div className="base__header">or</div>
      </div>
      <div className="base__right">
        <RightSite history={props.history}/>
      </div>
    </div>
  </main>
);

export default Base;