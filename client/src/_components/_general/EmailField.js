/*
 * author:
 * url:
 * 
 * In the EmailField component, we are simply rendering a FormField component and passing an email validation function 
 * to the validator prop. We are using the validate() method of the isemail package for the email validation.
 * 
 * Also notice that all other props except the type and validator props are transferred from the EmailField component 
 * to the FormField component.
 */

import React from "react";
import PropTypes from "prop-types";
import eValidator from "email-validator"; //TODO change to the same email checker that we are leveraging in the backend

import FormField from "./FormField";

const EmailField = props => {
  // prevent passing type and validator props from this component to the rendered form field component
  const { type, validator, ...restProps } = props;

  // validateEmail function using the validate() method of the isemail package
  const validateEmail = value => {
    if (!eValidator.validate(value)) throw new Error("Email is invalid");
  };

  // pass the validateEmail to the validator prop
  return <FormField type="text" validator={validateEmail} {...restProps} />;
};

EmailField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node,
  onStateChanged: PropTypes.func
};

export default EmailField;
