import React, { useEffect } from 'react';
import './App.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';

import {BrowserRouter}from 'react-router-dom';
import { useState } from "react";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import {useCookies} from 'react-cookie';
import Routess from './config/Routess';
import Starting from './pages/Starting';


function App() {
  const [token,setToken]=useCookies(["user-token"]);

  useEffect(()=>{
    console.log(token["user-token"]);
  },[])
  return (
    
    <div>
      
      {token["user-token"]?
        <BrowserRouter>
          <Header></Header>
          <Routess></Routess>
          <Footer></Footer>
        </BrowserRouter> 
      :<Starting></Starting>}
    </div>

  );
}

export default App;
