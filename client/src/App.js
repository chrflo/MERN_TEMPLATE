import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from 'react-redux'; //wraps around everything and provides our app the store
import jwt from 'jwt-decode';

import store from './_store/store';
import setAuthToken from './_utils/setAuthToken';
import { setCurrentUser, logout } from './_actions/authActions'

//bring in the components
import Navbar from "./_components/_layout/Navbar";
import Landing from "./_components/_layout/Landing";
import Footer from "./_components/_layout/Footer";
import Login from "./_components/_auth/Login";
import Registration from "./_components/_auth/Registration";

// bring in the stylesheet
import "./App.css";

//logic to check to see if the bearer token exists in local storage 
if (localStorage.token) {
  const currentTime = Date.now() / 1000; // need to div by 1000 since the time form out server is EPOCH seconds not millisecodns

  //make sure to thse the token again
  setAuthToken(localStorage.token);

  //decode the token just like we did within login
  const token = jwt(localStorage.token);

  //check to see if the token has expired, if so, redirect to login
  if (token.exp < currentTime) {
    //let's make the user log in again
    store.dispatch(logout());
  } else {
    //now, let's set the current user
    store.dispatch(setCurrentUser(token));
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            {/* Set up the homepage "landing page"; **make sure that the 'exact path'
          * goes to the exact component 
          */}
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/registration" component={Registration} />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
