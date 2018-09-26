import React, { Component } from "react";
import FormField from "../_general/FormField";
import EmailField from "../_general/EmailField";
import PasswordField from "../_general/PasswordField";
import Password2Field from "../_general/Password2Field";

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
      const { fieldName, value } = formState;
      const data = this.state;

      this.setState({
        ...data,
        [fieldName]: value,
        errors: { [fieldName]: formState.errors.length === 0 }
      });

      console.debug(this.state);
    };

    this.state = {
      name: "",
      userName: "",
      email: "",
      password: "",
      password2: "",
      submitted: false,
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

    return (
      <div className="Registration">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your WODLogger account</p>
              <form action="create-profile.html">
                <div className="form-group">
                  <FormField
                    label={this.state.name}
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
                    required
                  />
                </div>
                <div className="form-group">
                  <EmailField
                    fieldId="email"
                    placeholder="Enter Email Address"
                    onStateChanged={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <PasswordField
                    fieldId="password"
                    placeholder="Enter Password"
                    onStateChanged={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <Password2Field
                    fieldId="password2"
                    placeholder="Re-enter Password"
                    onStateChanged={this.handleChange}
                    orgPassword={this.state.password}
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
