import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
// import Footer from "./components/layout/Footer";
import Landing from "./components/Landing/Landing";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <Navbar /> */}
          <Route exact path="/" component={Landing} />
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default App;
