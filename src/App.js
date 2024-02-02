
import './App.css';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import LandingPage from './components/landingComponent/LandingPage';
import SignIn from '../src/components/landingComponent/SignIn';
import SignUp from '../src/components/landingComponent/SignUp';
import Admin from './components/adminPortal/admin';
import Home from './components/userPortal/Home';
import AllProducts from './components/userPortal/AllProducts';
import Product from './components/userPortal/product';
import Cart from './components/userPortal/Cart';
import Category from './components/userPortal/Category';
import { useEffect, useState } from 'react';
import AddProduct from '../src/components/adminPortal/AddProduct';

import UpdateProduct from './components/adminPortal/UpdateProduct';



function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem('authenticated') === 'true';
  });

  useEffect(() => {
    const storedAuthenticated = localStorage.getItem('authenticated') === 'true';
    setAuthenticated(storedAuthenticated);
  }, []);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/SignIn" element={<SignIn setAuthenticated={setAuthenticated} />} />
      <Route path="/SignUp" element={<SignUp />} />
      
      
      {authenticated ? (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path='/AddProduct' element={<AddProduct />} />
            <Route path='/UpdateProduct' element={<UpdateProduct />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/AllProducts" element={<AllProducts />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/category" element={<Category />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/SignUp" />} />
        )}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
