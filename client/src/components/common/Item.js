import React from 'react';


const Item = ({currentItem, property, item, onItemSelect}) => <li
  className={currentItem && item[property] === currentItem[property]
    ? "items-list__item items-list__item--active" : "items-list__item"}
  key={item[property]}
  onClick={() => onItemSelect(item)}
>{item.name}</li>;

export default Item;