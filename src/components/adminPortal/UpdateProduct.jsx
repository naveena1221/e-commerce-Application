// UpdateProduct.js

import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import { useDispatch, useSelector } from 'react-redux';
import { notification, Button, Input } from 'antd';
import { allProductCreator } from '../../redux/ActionCreator/ActionCreator';
import { useNavigate } from 'react-router-dom';

function UpdateProduct() {
  const UpdateStore = useSelector((state) => state);
  const dispatch = useDispatch();
  const productIdFromRedux = UpdateStore.shoppingFeature.ProductID;
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });

  const getToUpdate = async (productId) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`, { method: 'GET' });
      const data = await response.json();
      setProductData({
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price.toString(),
        category: data.category,
        image: data.image,
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    if (productIdFromRedux) {
      getToUpdate(productIdFromRedux);
    }
  }, [productIdFromRedux]);

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productIdFromRedux}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const json = await response.json();
      const updatedProducts = UpdateStore.shoppingFeature.AllProducts.map((product) =>
        product.id === productIdFromRedux ? json : product
      );
  
      // Dispatch action to update the product list in the Redux store
      dispatch(allProductCreator(updatedProducts));
  
      notification.success({
        message: 'Product Updated',
        description: 'The product details have been updated successfully.',
      });
  
      // Reset the form or take other actions as needed
      setProductData({
        id: '',
        title: '',
        description: '',
        price: '',
        category: '',
        image: '',
      });
  
      // Wait for the state to be updated before navigating
      setTimeout(() => {
        navigate('/admin');
      }, 0);
    } catch (error) {
      console.error('Error updating product details:', error);
  
      notification.error({
        message: 'Error',
        description: 'Failed to update the product details. Please try again.',
      });
    }
  };
  
  

  return (
    <>
      <AdminHeader />
      <div style={{ backgroundColor: '#d1d1f6', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowX: 'hidden' }}>
        <h2>Update Product Details</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {productIdFromRedux && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px' }}>
                <label>Title:</label>
                <Input
                  placeholder="Title"
                  name="title"
                  value={productData.title}
                  onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                  style={{ margin: '8px', width: '600px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px' }}>
                <label>Description:</label>
                <Input.TextArea
                  placeholder="Description"
                  name="description"
                  value={productData.description}
                  onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                  rows={10}
                  style={{ margin: '8px', width: '600px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px' }}>
                <label>Price:</label>
                <Input
                  placeholder="Price"
                  name="price"
                  value={productData.price}
                  onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                  style={{ margin: '8px', width: '600px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px' }}>
                <label>Category:</label>
                <Input
                  placeholder="Category"
                  name="category"
                  value={productData.category}
                  onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                  style={{ margin: '8px', width: '600px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px' }}>
                <label>Image:</label>
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={productData.image}
                  onChange={(e) => setProductData({ ...productData, image: e.target.value })}
                  style={{ margin: '8px', width: '600px' }}
                />
              </div>

              <Button type="primary" onClick={handleUpdateProduct} style={{ margin: '8px' }}>
                Update Product Details
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
