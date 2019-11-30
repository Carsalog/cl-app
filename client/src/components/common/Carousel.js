import React, {Component} from 'react';

class Carousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      img: ""
    }
  }

  componentDidMount() {
    this.setState({img: this.props.images[0].url})
  }


  setImage = img => {
    this.setState({img: img.url});
  };

  render() {
    const {base, images} = this.props;
    return (
      <div className="carousel">
        <div className="carousel__main-img">
          <img srcSet={base + this.state.img} alt="" />
        </div>
        <div className="carousel__flexbox">
          {images.map(image => <div
            key={image._id}
            onClick={() => this.setImage(image)}
            className="carousel__prev">
              <img
                srcSet={base + image.url}
                alt={`Carsalog ${image._id}`}
                />
          </div>)}
        </div>

      </div>
    );
  }
}

export default Carousel;