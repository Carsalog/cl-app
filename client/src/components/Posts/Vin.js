import React from 'react';
import {connect} from 'react-redux';
import Form from '../common/form';
import CarCard from './CarCard';
import {getCar, setCar, getMake, getTransmissions} from '../../actions';
import {vinSchema} from '../common/schemas';


export class Vin extends Form {

  constructor(props) {
    super(props);
    this.state = {
      data: {vin: ''},
      errors: {}
    };
    this.schema = vinSchema();
  }

  doSubmit = () => {
    const {urls} = this.props;
    const {vin} = this.state.data;
    this.props.onGetCar(`${urls.cars}/by/vin/${vin}`);
  };

  handleConfirm = () => {
    const {urls, car} = this.props;
    this.props.onGetMake(`${urls.makes}/by/name/${car.make}`);
    this.props.onGetTransmissions(`${urls.transmissions}`);
    this.props.history.push('/posts/new/body')
  };

  render() {

    const {car, text, onCancel} = this.props;

    return (
      <div className="posts__vin">
        <div className="posts__vin-container">
          {car && <CarCard
            car={car}
            onConfirm={this.handleConfirm}
            onCancel={onCancel}/>}
          {!car &&
          <form onSubmit={this.handleSubmit} className="form">
            <h1 className="h5">{text.header}</h1>
            <div className="form__group">
              {this.renderInput(text.name, text.name, 'text', true)}
            </div>
            <div className="form__group">
              {this.renderButton(text.button)}
            </div>
          </form>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    car: state.car,
    base: state.config.base,
    urls: state.config.urls,
    text: state.config.pages.vin
  };
}

export default connect(
  mapStateToProps,
  dispatch => ({
    onGetCar: url => dispatch(getCar(url)),
    onGetTransmissions: url => dispatch(getTransmissions(url)),
    onCancel: () => dispatch(setCar(null)),
    onGetMake: url => dispatch(getMake(url))
  })
)(Vin);
