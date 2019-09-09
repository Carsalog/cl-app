import React from 'react';
import RenderLink from "./RenderLink";

export const RenderList = ({header, links}) => (
  <div className="footer__wrapper">
    <h5 className="footer__header">{header}</h5>
    <ul className="footer__list">
      {links.map(link => <RenderLink key={link.title} {...link} />)}
    </ul>
  </div>
);

export default RenderList;