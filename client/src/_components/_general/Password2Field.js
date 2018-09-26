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

import FormField from "./FormField";

class Password2Field extends Component {
  constructor(props) {
    super(props);

    // initialize internal component state
    this.state = { password: "", strength: 0 };

    this.validateMatching = value => {
      // ensure that the passwords match
      if (value !== this.props.orgPassword) {
        throw new Error("Passwords do not match");
      }
    };
  }

  stateChanged = state => {
    // update the internal state using the updated state from the form field

    this.setState(
      {
        password: state.value
      },
      () => this.props.onStateChanged(state)
    );
  };

  render() {
    const {
      type,
      validator,
      onStateChanged,
      children,
      ...restProps
    } = this.props;

    return (
      <Fragment>
        <div className="position-relative">
          {/** Pass the validation and stateChanged functions as props to the form field **/}
          <FormField
            type="password"
            validator={this.validateMatching}
            onStateChanged={this.stateChanged}
            {...restProps}
          >
            {children}
          </FormField>
        </div>
      </Fragment>
    );
  }
}

Password2Field.propTypes = {
  label: PropTypes.string,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node,
  onStateChanged: PropTypes.func,
  orgPassword: PropTypes.string.isRequired
};

export default Password2Field;
