import React from 'react';
import './App.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';

import {BrowserRouter}from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import Routess from './config/Routess';


function App() {
  return (
    <div>
      
        <BrowserRouter >
          <Header></Header>
          <Routess></Routess>
          <Footer></Footer>
        </BrowserRouter>
      
    </div>

  );
}

export default App;
