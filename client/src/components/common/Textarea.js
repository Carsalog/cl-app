import React from "react";


const Textarea = ({name, label, error, classes, ...rest}) => {
  const textareaClasses = error ? "form-control border-danger" : "form-control";
  const cls = classes ? classes : "form-group input-height pt-4";
  return (
    <div className={cls}>
      <textarea
        {...rest}
        className={textareaClasses}
        name={name}
        id={name}
        aria-describedby={`${name}Help`}
      />
      {error && <small id={`${name}Help`} className="form-text text-danger">{error}</small>}
    </div>
  );
};

export default Textarea;