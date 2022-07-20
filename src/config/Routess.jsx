import React from 'react';

import {Route,Routes} from 'react-router-dom';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import Home from '../pages/Home';

const Routess = () => {
    
    return (
        
        <Routes>
            <Route path="/:category/search/:keyword"
            element={<Catalog/>}></Route>
            <Route path="/:category/:id"
            element={<Detail/>}></Route>
            <Route path="/:category"
            element={<Catalog/>}></Route>
            <Route path="/" 
            element={<Home/>}></Route>
        </Routes>
    );
}

export default Routess;