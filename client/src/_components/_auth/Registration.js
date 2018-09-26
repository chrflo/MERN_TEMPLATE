import React, { Component } from "react";
import FormField from "../_general/FormField";
import EmailField from "../_general/EmailField";
import PasswordField from "../_general/PasswordField";
import Password2Field from "../_general/Password2Field";
import axios from 'axios';
import classnames from 'classnames';

import "../../_styles/password.css";

class Registration extends Component {
  constructor(props) {
    super(props);

    /*
     * handleChange, while in and belonging to this,
     * gets passed to the form field or custom form field, 
     * anything that occurs inside the this' state will not 
     * take effect until the form component returns
     */
    this.handleChange = formState => {
      const { fieldName, value, errors } = formState;
      const data = this.state;

      this.setState({
        ...data, //fill the state with the current state data
        [fieldName]: value, //overwrite the field that we want
        inputErrors: { [fieldName]: errors.length === 0 }, // set and update the corresponding error
        errors: {
          // make sure that we reset the errors for the property when there is a state change
          [fieldName]: ''
        }
      });

    };

    this.onSubmit = event => {
      event.preventDefault();

      const user = {
        name: this.state.name,
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      }

      console.log(user);
      //let's register the user
      //*** proxy value was added to the pacakge JSON so we dont need to add the full route
      axios.post('api/users/register', user)
        .then(res => {
          console.log("State: ");
          console.log(res.data);
          return res;
        })
        .catch(err => {
          console.log(err.response.data);
          const { property, message } = err.response.data;

          this.setState({
            errors: {
              [property]: message
            }
          });

          console.log("State: ");
          console.log(this.state);
        })
    }

    this.state = {
      name: "",
      userName: "",
      email: "",
      password: "",
      password2: "",
      submitted: false,
      inputErrors: {},
      errors: {}
    };
  }

  /*
   * Each field will have to have its own component state within the field 
   */
  render() {
    //TODO: add in the length checker that we have in the server
    const validateFullname = value => {
      const regex = /^[a-z]{2,}(\s[a-z]{2,})+$/i;
      if (!regex.test(value)) throw new Error("Fullname is invalid");
    };

    /*
     * TODO: on form submit, if there are errors from the server, we will have to update the 
     * error, we can do this by assigning that to a property in the form field so that it updates 
     * eg:
     *  <FormField
     *              label={this.state.name}
     */
    const { errors } = this.state;

    return (
      <div className="Registration">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your WODLogger account</p>
              <form action="create-profile.html" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <FormField
                    type="text"
                    fieldId="name"
                    placeholder="Enter Fullname"
                    validator={validateFullname}
                    onStateChanged={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <FormField
                    type="text"
                    fieldId="userName"
                    placeholder="Enter Username"
                    onStateChanged={this.handleChange}
                    apiError={this.state.errors.userName}
                    required
                  />
                </div>
                <div className="form-group">
                  <EmailField
                    fieldId="email"
                    placeholder="Enter Email Address"
                    onStateChanged={this.handleChange}
                    apiError={this.state.errors.email}
                    required
                  />
                </div>
                <div className="form-group">
                  <PasswordField
                    fieldId="password"
                    placeholder="Enter Password"
                    onStateChanged={this.handleChange}
                    apiError={this.state.errors.password}
                    required
                  />
                </div>
                <div className="form-group">
                  <Password2Field
                    fieldId="password2"
                    placeholder="Re-enter Password"
                    onStateChanged={this.handleChange}
                    orgPassword={this.state.password}
                    apiError={this.state.errors.password2}
                    required
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
