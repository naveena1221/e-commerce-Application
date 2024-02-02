import React, { useEffect} from 'react';
import AdminHeader from './AdminHeader';
import { useDispatch, useSelector } from 'react-redux';
import {ProductIDCreator, allProductCreator } from '../../redux/ActionCreator/ActionCreator';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';


function Admin() {
  const dispatch=useDispatch();
  const adminStore=useSelector((state)=> state);
  const navigate=useNavigate();
  



    const getProductsInAdmin=async()=>{
      const response=await fetch(`https://fakestoreapi.com/products`,{method:'GET'});
      const data=await response.json();
        dispatch(allProductCreator(data));
    }

    useEffect(function(){
      getProductsInAdmin();
    },[dispatch, getProductsInAdmin, adminStore.shoppingFeature.AllProducts])

    const handleDelete = (productId) => {
      fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((json) => {
          
          const updatedProducts = adminStore.shoppingFeature.AllProducts.filter((product) => product.id !== productId);
        dispatch(allProductCreator(updatedProducts));
       
          notification.success({
            message: 'Product Deleted',
            description: ` ${json.title} has been deleted successfully.`,
            
          });
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        
          notification.error({
            message: 'Error',
            description: 'Failed to delete the product. Please try again.',
          });
        });
      
  };

  const handleUpdate = (productId) => {
   dispatch(ProductIDCreator(productId));
   navigate('/UpdateProduct');
    
  };
    

  return (
    <>
    <AdminHeader />

<div style={{ backgroundColor: '#d1d1f6', textAlign: 'center', minHeight: '91.2vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowX: 'hidden' }}>
  <h1>Welcome Admin</h1>
  <table style={{margin:'50px 200px'}}>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {adminStore.shoppingFeature.AllProducts && adminStore.shoppingFeature.AllProducts.map((product) => (
                    <tr key={product.id}>
                        <td><img style={{width:'100px',height:'100px'}} src={product.image} alt={product.title} /></td>
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td>
                            <button style={{margin:'5px',backgroundColor:'green',padding:'10px', borderRadius:'10px'}} onClick={() => handleUpdate(product.id)}>Update</button>
                            <button style={{margin:'5px',backgroundColor:'red',padding:'10px', borderRadius:'10px'}} onClick={() => handleDelete(product.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

 
</div>
    </>
    
  );
}

export default Admin;
