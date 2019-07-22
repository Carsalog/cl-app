import React from 'react';
import PropTypes from 'prop-types';

export const CarCard = ({car, onConfirm, onCancel}) => {
  return (
    <div>
      <h3 className="h4 text-center mb-3">Is this your car?</h3>
      <table className="table table-striped">
        <thead>
        <tr>
          <th scope="col">name</th>
          <th scope="col">value</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>VIN</td>
          <td>{car.vin}</td>
        </tr>
        <tr>
          <td>Make</td>
          <td>{car.make}</td>
        </tr>
        <tr>
          <td>Model</td>
          <td>{car.model}</td>
        </tr>
        <tr>
          <td>Fuel</td>
          <td>{car.fuel}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td>{car.type}</td>
        </tr>
        <tr>
          <td>Year</td>
          <td>{car.year}</td>
        </tr>
        </tbody>
      </table>
      <div className="row mt-3">
        <div className="col-6 px-1">
          <button className="btn btn-success w100" onClick={onConfirm}>Yes</button>
        </div>
        <div className="col-6 px-1">
          <button className="btn btn-danger w100" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

CarCard.propTypes = {
  car: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default CarCard;
