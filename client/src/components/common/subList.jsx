import React from 'react';
import ItemsList from './itemsList';

export default ({models, onModelSelect, model, make}) => {
  if (make) return (
      <React.Fragment>
        <hr/>
        <ItemsList items={models} onItemSelect={onModelSelect} currentItem={model} />
      </React.Fragment>
    );
  return <i />;
};