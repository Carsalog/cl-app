import React from 'react';


const Tags = ({tags, tag, onTagChange, onRemoveTag, error}) => (
  <div className="form__group">
    {tags.length > 0 && (
      <div className="tag__container">
        {tags.map(tag =>
          <div className="tag" key={tag._id}>
            {onRemoveTag &&
            <span
              onClick={() => onRemoveTag(tag)}
              className="tag__button">&times;</span>
            }
            <span className="tag__text">{tag.name}</span>
          </div>
      )}
      </div>
    )}
    {onTagChange &&
      <input
        type="text"
        name="tag"
        placeholder="Add tag"
        autoFocus={true}
        value={tag}
        className="form__input" onChange={onTagChange}/>
    }
    {error && <small id={`tagHelp`} className="form__text--error">{error}</small>}
  </div>
);

export default Tags;
