import React from 'react';
import PropTypes from "prop-types";
import ActionsList from './ActionsList';


export const PostItem = ({post, onView, onDelete, onEdit}) => (
  <tr>
    <td className="posts__list-price-box">
      <span className="posts__list-price">${post.price}</span>
    </td>
    <td>
      <span onClick={() => onView(post._id)} className="posts__list-text">
        {post.year} {post.make.name} {post.car.model}
      </span>
    </td>
    <td>
      <ActionsList onEdit={onEdit} onDelete={onDelete} post={post} />
    </td>
  </tr>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default PostItem;