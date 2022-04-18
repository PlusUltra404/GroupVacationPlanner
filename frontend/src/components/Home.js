import React, { Component } from "react";
import Header from "./Header";
import "./Home.css";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <Header />
        <div class="home-container">
          <h1>Vacation Planner</h1>
          <p>Welcome to the Vacation planner!</p>
          <ul></ul>
          <p>Filler Text Here</p>
        </div>
      </div>
    );
  }
}

export default Home;
