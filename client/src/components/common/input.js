import React from "react";


const Input = ({name, label, error, classes, ...rest}) => {
  return (
    <React.Fragment>
      <input
        {...rest}
        className={classes}
        name={name}
        id={name}
        aria-describedby={`${name}Help`}
        placeholder={label}/>
      {error && <small id={`${name}Help`} className="form__text form__text--error">{error}</small>}
    </React.Fragment>
  );
};

export default Input;