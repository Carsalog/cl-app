import React from "react";


const Select = ({name, label, options, error, ...rest}) => {
  const classes = error ? "form-control text-capitalize border-danger" : "form-control text-capitalize";
  return (
    <div className="form-group">
      <select name={name} id={name} {...rest} className={classes}>
        <option value="">Select {name}</option>
        {options.map(option => (
          <option value={option._id} key={option._id} className="text-capitalize">{option.name}</option>
        ))}
      </select>
      {error && <small id={`${name}Help`} className="form-text text-danger">{error}</small>}
    </div>
  );
};

export default Select;