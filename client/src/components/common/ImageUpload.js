import React from 'react';
import Images from "./Images";


const ImageUpload = ({images, base, onImageAdd, onImageRemove}) => (
  <div className="row">
    <div className="col-lg-2 px-3">
      <label htmlFor="upload" className="upload link-blue pointer text-center">
        <i className="fa fa-cloud-upload upload-icon" aria-hidden="true"> </i>
        <div className="image-label">ADD IMAGES</div>
      </label>
      <input type='file' id='upload' onChange={onImageAdd} multiple/>
    </div>
    {images.length > 0 &&
    <Images images={images} base={base} removeImage={onImageRemove}/>}
  </div>
);


export default ImageUpload;
