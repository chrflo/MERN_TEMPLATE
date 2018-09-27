import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      //TODO: format to make sure it is always at the end of the page
      <footer className="bg-dark text-white mt-5 p-4 text-center">
        {/* Copyright &copy; {new Date().getFullYear()} MERN TEMPLATE */}
      </footer>
    );
  }
}

export default Footer;
