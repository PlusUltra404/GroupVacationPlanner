import React, { useState, useEffect } from "react";
import Home from "./Home";
import { Component } from "react";
import Navbar from "./Navbar";
import Login from "./Login";
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Preferences from './Preferences';


import Registration from "./Registration";



  class App extends Component {
    render() {
      return (
        <div id="App">
            <h2>Welcome to React Router Tutorial</h2>
            
            <Routes>
                <Route path="/" element={<Navbar />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                
            </Routes>

            
            
        </div>
      );
    }
  }
  export default App;