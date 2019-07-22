import React from 'react';


const ItemsList = props => {
  const {items, onItemSelect, currentItem, property = "_id"} = props;

  return (
    <ul className="list-group mb-3">
      {items.map(item =>
        <li
          className={currentItem && item[property] === currentItem[property] ? "pointer list-group-item active" : "pointer list-group-item"}
          key={item[property]}
          onClick={() => onItemSelect(item)}
        >{item.name}</li>)}
    </ul>
  );
};

export default ItemsList;