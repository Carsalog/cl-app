import React from 'react';


export const Icon = ({icon, view}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={view}>
    <path fill="currentColor" d={icon}/>
  </svg>
);

export default Icon;