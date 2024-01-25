import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import { useDispatch } from 'react-redux';
import {allProductCreator } from '../../redux/ActionCreator/ActionCreator';


function Admin() {
  const dispatch=useDispatch();

    const getProductsInAdmin=async()=>{
      const response=await fetch(`https://fakestoreapi.com/products`,{method:'GET'});
      const data=await response.json();
        dispatch(allProductCreator(data));
    }

    useEffect(function(){
      getProductsInAdmin();
    },[])
 

  return (
    <>
    <AdminHeader />

<div style={{ backgroundColor: '#d1d1f6', textAlign: 'center', minHeight: '91.2vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowX: 'hidden' }}>
  <h1>Welcome Admin</h1>
 
</div>
    </>
    
  );
}

export default Admin;
