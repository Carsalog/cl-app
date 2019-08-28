import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import PostItem from './PostItem';

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
        {posts.map(post => <PostItem
          key={post._id}
          post={post}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />)}
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
