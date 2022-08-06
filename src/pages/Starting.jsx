import React from 'react';
import { useState } from "react";

import {BrowserRouter}from 'react-router-dom';
import Login from '../components/authentification/Login';
import Signup from '../components/authentification/Signup';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';



const Starting=()=> {

    const [newUser,setNewUser]=useState(true);
    const signNew=(newUser)=> {
        setNewUser(newUser);
    }

    return (
        <div>
                {
                    newUser?
                    <Login newUser={signNew}/>
                    :<Signup newUser={signNew}></Signup>
                }
        </div>
    );
}

export default Starting;