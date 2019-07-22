import React from 'react';
import PropTypes from 'prop-types';
import {Carousel} from "react-responsive-carousel";


const ImageView = ({images, classes, base}) => (
  <React.Fragment>
    {images.length > 0 && (
      <div className={classes}>
        <Carousel>
          {images.map(image => (
            <div key={image._id}>
              <img srcSet={base + image.url} alt={`Carsolog ${image._id}`}/>
            </div>
          ))}
        </Carousel>
      </div>
    )}
    {images.length === 0 && (
      <div className={classes}>
        <img srcSet="/img/no-photo.png" alt="none"/>
      </div>
    )}
  </React.Fragment>
);


ImageView.propTypes = {
  images: PropTypes.array.isRequired,
  classes: PropTypes.string.isRequired,
  base: PropTypes.string.isRequired
};

export default ImageView;
