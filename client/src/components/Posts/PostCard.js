import React from "react";
import {Link} from "react-router-dom";


const PostCard = ({post, base}) => {

  const src = post.images.length ? base + post.images[0].url : "/img/no-photo.png";
  const text = post.description;
  const description = (text.length > 300) ? text.substr(0, 300-1) + '...' : text;

  return (
    <div className="card item-shadow" key={post._id}>
      <Link to={`/posts/${post._id}`}>
        <div className="card-header h5">
          <div className="float-right">${post.price}</div>
          {post.car.make} {post.car.model} {post.car.year}
        </div>
        <div className="row">
          <div className="col-md-4 pl-4 pt-4">
            <img className="card-img-top"
                 srcSet={src}
                 alt="Card cap"/>
          </div>
          <div className="col-md-8">
            <div className="card-body row">
              <div className="col-md-6"><b className="text-uppercase">fuel:</b> {post.car.fuel}</div>
              <div className="col-md-6"><b className="text-uppercase">trim level:</b> {post.car.model}</div>
              <div className="col-md-6"><b className="text-uppercase">body type:</b> {post.car.type}</div>
              <div className="col-md-6"><b className="text-uppercase">mileage:</b> {post.mileage} miles</div>
              <p className="col-12"><b className="text-uppercase">description: </b>{description}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;