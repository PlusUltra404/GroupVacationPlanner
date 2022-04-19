import React, { useState, useEffect } from "react";
import Home from "./Home";
import { Component } from "react";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./Register";
import NavMenu from "./NavMenu";
import Login from "./Login";
import APIService from './APIService'
import useToken from './useToken'
import Calender from "./fullcalender";
import Message from './Message'
import Modal from "./messagepage";
import Calender from "./fullcalender";

const apiservice = new APIService() ;

  function App() {
    const { token, removeToken, setToken } = useToken();
      return (
        <div id="App">
          <Routes>
        <Route path="/login" element={<Login apiservice={apiservice} />} />
        <Route path="/" element={<Calender />} />
        <Route path="/register" element={<Register apiservice={apiservice} />} />
      </Routes>
       {/*}   <NavMenu token={removeToken}/>
          {!token && token!=="" &&token!== undefined?  
          <Login setToken={setToken} />
          :(
          <>
            <Routes>
              <Route path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
            </Routes>
          </>
          )} */}
        {/*  <h2>Welcome to React Router Tutorial</h2>
            
          <Routes>
              <Route path="/" element={<NavMenu />} />
                  <Route path="/login" element={<Login apiservice = {apiservice}  />} />
                  <Route path="/register" element={<Register apiservice = {apiservice} />} />
              
          </Routes>
          */}
            
            
        </div>
      );
    
  }
  export default App;
