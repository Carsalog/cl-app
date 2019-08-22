import React from 'react';


const Item = ({currentItem, property, item, onItemSelect}) => <li
  className={currentItem && item[property] === currentItem[property]
    ? "pointer list-group-item active" : "pointer list-group-item"}
  key={item[property]}
  onClick={() => onItemSelect(item)}
>{item.name}</li>;

export default Item;