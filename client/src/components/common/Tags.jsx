import React from 'react';


const Tags = ({tags, tag, onTagChange, onRemoveTag, error}) => (
  <div className="input-group mb-5 border-bottom">
    {tags.length > 0 && tags.map(tag =>
      <span className="badge badge-primary tag-badge mr-2" key={tag._id}>
        <span
          onClick={() => onRemoveTag(tag)}
          className="pointer link-white float-right">
          <i className="fa fa-times" aria-hidden="true"> </i>
        </span>
        <span className="px-1 text-uppercase">{tag.name}</span>
      </span>
    )}
    <input
      type="text"
      name="tag"
      placeholder="Add tags"
      autoFocus={true}
      value={tag}
      className="tags-input" onChange={onTagChange}/>
    {error && <small id={`tagHelp`} className="form-text text-danger">{error}</small>}
  </div>
);

export default Tags;
