import React from "react";

export default props =>
  props.images.map(image =>
    <div key={image._id} className="col-lg-2">
      <div className="preview">
        <span
          onClick={() => props.removeImage(image)}
          className="pointer link-red close-icon">
          <i className="fa fa-times" aria-hidden="true"> </i>
        </span>
        <img src={`${props.base}${image.url}`} style={{width: "170px"}} className="img-thumbnail" alt=""/>
      </div>
    </div>
  );