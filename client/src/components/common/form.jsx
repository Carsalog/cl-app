import React, {Component} from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import Textarea from "./Textarea";
import {Link} from "react-router-dom";
import {store} from "../../loader";


class Form extends Component {

  state = {
    data: {},
    errors: {}
  };

  messages = store.getState().config.messages;

  validate = () => {

    const {error} = Joi.validate(this.state.data, this.schema, {abortEarly: false});
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };


  validateProperty = ({name, value}) => {

    let message;

    const {error} = Joi.validate({[name]: value}, {[name]: this.schema[name]});

    if (error) message = error.details[0].message;

    return error ? message : null;
  };


  handleChange = ({currentTarget: input}) => {

    const {data, errors} = this.state;

    const errorMessage = this.validateProperty(input);
    let value = input.value;

    if (input.name === "description") {
      if (/[<>]+/.test(value)) errors[input.name] = this.messages.descriptionRulesError;
      value = value.replace(/[\s"']*(http[s]*:\/\/.*)[\s*"']*/, '')
    }
    data[input.name] = value;

    // Set error message
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    // Password custom message
    if (errors.password) errors.password = this.messages.pwdRulesError;

    // Checks that passwords equal
    if (this.state.data.passwordConf) this.validatePasswords(input, errors);

    this.setState({data, errors});
  };

  handleSubmit = e => {

    e.preventDefault();

    const errors = this.validate();
    this.setState({errors: errors || {}});

    return errors ? null : this.doSubmit();
  };

  validatePasswords = (input, errors) => {
    const {password, passwordConf} = this.state.data;
    const equal = password !== passwordConf;
    const passwordError = input.name === "password" && passwordConf.length && equal;
    const passwordsValid = input.name === "password" && passwordConf.length && !equal;

    if (passwordError) errors.passwordConf = this.messages.pwdMatchError;
    if (passwordsValid) errors.passwordConf = undefined;


    if (input.name === "passwordConf") {
      if (equal) errors.passwordConf = this.messages.pwdMatchError;
      else errors.passwordConf = undefined;
      this.setState({errors});
    }
  };

  renderButton = label => <button
    disabled={this.validate()}
    type="submit"
    className="btn btn-primary w100">{label}</button>;


  renderSelect(name, label, options, onChange) {

    const {data, errors} = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={onChange}
        error={errors[name]}
      />
    );
  }

  renderLink = (label, url, onClick = () => {
  }) =>
    (<Link to={url} className="text-uppercase link-gray" onClick={onClick} id={label}>{label}</Link>);

  renderInput(name, label, type = "text", af = false,
              onBlur = () => {
              }, onChange = null, inputClasses = null) {
    const {data, errors} = this.state;
    let classes, handleChange, error = errors[name];

    if (onChange) handleChange = onChange;
    else handleChange = this.handleChange;

    if (inputClasses) classes = inputClasses;
    else classes = error ? "form-control border-danger" : "form-control";

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={handleChange}
        classes={classes}
        onBlur={onBlur}
        autoFocus={af}
        error={error}
      />
    );
  }

  renderTextarea(name, label, af = false, classes) {
    const {data, errors} = this.state;
    return (
      <Textarea
        name={name}
        value={data[name]}
        label={label}
        classes={classes}
        onChange={this.handleChange}
        autoFocus={af}
        error={errors[name]}
      />
    );
  }
}

export default Form;