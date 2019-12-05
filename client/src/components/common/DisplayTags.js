import React from 'react';


export const DisplayTags = ({tags, show}) => (
  <div className="form__group">
    {tags.length > 0 && (
      <div className="tag__container">
        {tags.map(tag =>
          <div className="tag tag--pointer" key={tag._id}>
            <span className="tag__text" onClick={() => show(tag)}>{tag.name}</span>
          </div>
        )}
      </div>
    )}
  </div>
);

export default DisplayTags;