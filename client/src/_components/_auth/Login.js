import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FormField from '../_general/FormField';
import isEmpty from '../../_utils/isObjectEmpty'
import { login } from '../../_actions/authActions'
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      const { fieldName, value, errors } = event;
      const state = this.state;
      console.log(state);

      this.setState({
        ...state,
        [fieldName]: value,
        errors: { [fieldName]: errors.length === 0 }
      });
    };

    this.onSubmit = event => {
      event.preventDefault();

      const user = {
        id: this.state.id,
        password: this.state.password
      }

      this.props.login(user, this.props.history);
    }

    /*
     * Since we are using Redux and the properties are form the respective reducers
     * Add a new life cylce method to check when the component recieves new properties 
     * so that we are able to update the state accordingly 
     */
    this.componentWillReceiveProps = (nextProps) => {
      //let's see if the user is logged in and if so move to the dashboard
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
      }

      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      }
    }

    this.state = {
      id: '',
      password: '',
      isAuthenticated: '',
      errors: {}
    };

    this.highlightOff = true;
  }

  //TODO: errors
  render() {
    //Let's validate the the input is not empty
    const validateInput = fieldId => value => {
      if (isEmpty(value)) {
        throw new Error(`${fieldId} cannot be empty.`);
      }
    };

    return (
      <div className="Login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <FormField
                    type="text"
                    label="Email or Username"
                    fieldId="id"
                    placeholder="Enter email or user id"
                    onStateChanged={this.handleChange}
                    highlightOff={this.highlightOff}
                    validator={validateInput("ID")}
                    required
                  />
                </div>
                <div className="form-group">
                  <FormField
                    label="Password"
                    fieldId="password"
                    type="password"
                    placeholder="Enter password"
                    onStateChanged={this.handleChange}
                    highlightOff={this.highlightOff}
                    validator={validateInput("Password")}
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

//get the auth state into component
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object
}

export default connect(mapStateToProps, { login })(withRouter(Login));
