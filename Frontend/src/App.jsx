import './App.css';
 import React from 'react';
 import {Login,Signup,Home, CreateProduct, MyProducts, Cart, ProductDetails, Profile, CreateAddress} from "./Routes/Routes"
 import { BrowserRouter, Routes, Route } from "react-router-dom";
 function App() {
   return (
    <BrowserRouter>
     <Routes>
     <Route path="/cart" element={<Cart/>} />
     <Route path="/product/:id" element={<ProductDetails />} />
     <Route path="/profile" element={<Profile />} />
     <Route path='/create-address' element={<CreateAddress />} />
    </Routes>
     </BrowserRouter>
   );
 }
 
 export default App;