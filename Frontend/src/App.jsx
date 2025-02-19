/* eslint-disable no-unused-vars */

// import './App.css';
import React from 'react';
import { Home, Login, Signup, CreateProduct,MyProducts } from "./Routes/Routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/create-product' element={<CreateProduct />} />
        <Route path='/myproduct' element={<MyProducts/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
