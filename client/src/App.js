import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

//bring in the components
import Navbar from "./_components/_layout/Navbar";
import Landing from "./_components/_layout/Landing";
import Footer from "./_components/_layout/Footer";
import Login from "./_components/_auth/Login";
import Registration from "./_components/_auth/Registration";

// bring in the stylesheet
import "./App.css";

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
