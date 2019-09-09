import React from 'react';
import {Link} from "react-router-dom";


export const RenderLink = ({url, title}) => (
  <li>
    <Link to={url} className="footer__link">{title}</Link>
  </li>
);

export default RenderLink;