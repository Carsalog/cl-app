import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

const DisplayPosts = ({posts, onView, onEdit, onDelete}) => (
  <React.Fragment>
    {posts.length === 0 && (
      <div className="col-12">
        <h1 className="h5">You don't have any cars</h1>
        <Link to="/posts/new" className="btn btn-success">ADD CAR</Link>
      </div>
    )}
    {posts.length > 0 && (
      <table className="table">
        <thead>
        <tr>
          <th scope="col">car</th>
          <th scope="col">actions</th>
        </tr>
        </thead>
        <tbody>
        {posts.map(post => (
          <tr key={post._id}>
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
        ))}
        </tbody>
      </table>
    )}
  </React.Fragment>
);

DisplayPosts.propTypes = {
  posts: PropTypes.array.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default DisplayPosts;
