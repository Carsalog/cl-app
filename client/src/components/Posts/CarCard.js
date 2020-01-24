import React from 'react';
import PropTypes from 'prop-types';

export const CarCard = ({car, onConfirm, onCancel}) => {
  return (
    <div className="posts__vin-car-card">
      <h3 className="posts__vin-header">Is this your car?</h3>
      <table className="table">
        <thead>
        <tr>
          <th>name</th>
          <th>value</th>
        </tr>
        </thead>
        <tbody className="posts__vin-tbody">
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
      <div className="posts__vin-buttons">
        <div className="posts__vin-buttons-block">
          <button className="btn btn__warning" onClick={onCancel}>No</button>
        </div>
        <div className="posts__vin-buttons-block">
          <button className="btn btn__info" onClick={onConfirm}>Yes</button>
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
