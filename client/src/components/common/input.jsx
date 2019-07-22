import React from "react";


const Input = ({name, label, error, classes, ...rest}) => {
  return (
    <div className="form-group">
      <input
        {...rest}
        className={classes}
        name={name}
        id={name}
        aria-describedby={`${name}Help`}
        placeholder={label}/>
      {error && <small id={`${name}Help`} className="form-text text-danger">{error}</small>}
    </div>
  );
};

export default Input;