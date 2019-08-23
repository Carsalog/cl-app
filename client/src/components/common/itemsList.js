import React from 'react';
import Item from './Item';


const ItemsList = props => {
  const {items, onItemSelect, currentItem, property = "_id"} = props;

  return (
    <ul className="list-group mb-3">
      {items.map(item => <Item
        key={item._id}
        currentItem={currentItem}
        item={item}
        property={property} onItemSelect={onItemSelect}/>)}
    </ul>
  );
};

export default ItemsList;