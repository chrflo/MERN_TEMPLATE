/*
 * author:
 * url:
 * 
 * We finally got to use the zxcvbn JavaScript password strength estimator package in this component. The package exports a zxcvbn() function that takes a (password: string) as its first argument and returns an object with several properties for the password strength estimation. In this tutorial, we would be concerned only with the score property, which is an integer from 0 - 4 (useful for implementing a strength bar).
 * 0 - too guessable
 * 1 - very guessable
 * 2 - somewhat guessable
 * 3 - safely unguessable
 * 4 - very unguessable
 * 
 * TODO:
 * - add in the password regex that we leverage in the backend
 * - add in hover over for the text
 */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import zxcvbn from "zxcvbn";
import ReactTooltip from "react-tooltip";

import FormField from "./FormField";

import Tooltip from "rc-tooltip";

class PasswordField extends Component {
  constructor(props) {
    super(props);
    const { minStrength = 3, thresholdLength = 7 } = props;

    // set the regex that the user must match their password against
    this.regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,12}$/gm;

    // set default minStrength to 3 if not a number or not specified
    // minStrength must be a a number between 0 - 4
    // the intent here is to disallow a user to proceed if it does not meet a min stength req
    this.minStrength =
      typeof minStrength === "number"
        ? Math.max(Math.min(minStrength, 5), 0)
        : 3;

    // set default thresholdLength to 6 if not a number or not specified
    // thresholdLength must be a minimum value of 6

    this.thresholdLength =
      typeof thresholdLength === "number" ? Math.max(thresholdLength, 6) : 6;

    // initialize internal component state
    this.state = { password: "", strength: 0 };
  }

  stateChanged = state => {
    // update the internal state using the updated state from the form field

    this.setState(
      {
        password: state.value,
        strength: zxcvbn(state.value).score
      },
      () => this.props.onStateChanged(state)
    );
  };

  validatePasswordStrong = value => {
    // ensure password is long enough
    if (value.length <= this.thresholdLength)
      throw new Error("Password is short");

    // ensure password is strong enough using the zxcvbn library
    if (zxcvbn(value).score < this.minStrength)
      throw new Error("Password is weak");
  };

  render() {
    const {
      type,
      validator,
      onStateChanged,
      children,
      ...restProps
    } = this.props;
    const { password, strength } = this.state;

    const passwordLength = password.length;
    const passwordStrong = strength >= this.minStrength;
    const passwordLong = passwordLength > this.thresholdLength;

    // dynamically set the password length counter class
    const counterClass = [
      "badge badge-pill",
      passwordLong
        ? passwordStrong
          ? "badge-success"
          : "badge-warning"
        : "badge-danger"
    ]
      .join(" ")
      .trim();

    // password strength meter is only visible when password is not empty
    const strengthClass = [
      "strength-meter mt-2",
      passwordLength > 0 ? "visible" : "invisible"
    ]
      .join(" ")
      .trim();

    return (
      <Fragment>
        <div className="position-relative">
          {/** Pass the validation and stateChanged functions as props to the form field **/}
          <FormField
            type="password"
            validator={this.validatePasswordStrong}
            onStateChanged={this.stateChanged}
            {...restProps}
          >
            {children}
            {/** Render the password strength meter **/}
            <div className={strengthClass}>
              <div className="strength-meter-fill" data-strength={strength} />
            </div>
          </FormField>

          <div className="position-absolute password-count mx-3">
            {/** Render the password length counter indicator **/}
            <span className={counterClass}>
              {passwordLength
                ? passwordLong
                  ? `${this.thresholdLength}+`
                  : passwordLength
                : ""}
            </span>
          </div>
        </div>
      </Fragment>
    );
  }
}

PasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node,
  onStateChanged: PropTypes.func,
  minStrength: PropTypes.number,
  thresholdLength: PropTypes.number
};

export default PasswordField;
