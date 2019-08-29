import React from 'react';
import {connect} from 'react-redux';
import Form from "../common/form";
import CarCard from "./CarCard";
import {getCar, setCar, getMake, getTransmissions} from "../../actions";
import {vinSchema} from "../common/schemas";


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
    this.props.history.push("/posts/new/body")
  };

  render() {

    const {car} = this.props;

    return (
      <div className="container page-height">
        <div className="row justify-content-md-center">
          <div className="col-sm-12 col-md-8 col-lg-6">
            {car && <CarCard
              car={car}
              onConfirm={this.handleConfirm}
              onCancel={this.props.onCancel}/>}
            {!car &&
            <form onSubmit={this.handleSubmit}>
              <h1 className="h5 mt-5">Enter Vehicle Identification Number</h1>
              <div className="py-1">
                {this.renderInput("vin", "VIN", "text", true)}
              </div>
              <div className="py-1">
                {this.renderButton("NEXT")}
              </div>
            </form>
            }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    car: state.car,
    base: state.config.base,
    urls: state.config.urls
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
