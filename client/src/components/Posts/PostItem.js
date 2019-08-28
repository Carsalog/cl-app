import React from 'react';
import PropTypes from "prop-types";


export const PostItem = ({post, onView, onDelete, onEdit}) => (
  <tr>
    <td>
      <span onClick={() => onView(post._id)} className="pointer link-gray p-1">
        {post.year} {post.make.name} {post.car.model} ${post.price}
      </span>
    </td>
    <td>
      <span onClick={() => onEdit(post)} className="pointer link-blue p-1">
        <i className="fa fa-cog" aria-hidden="true"/>
      </span>
      <span onClick={() => onDelete(post)} className="pointer link-red p-1">
        <i className="fa fa-trash" aria-hidden="true"/>
      </span>
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