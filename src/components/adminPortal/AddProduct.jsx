import React, { useState } from 'react';
import { Button, Input, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import AdminHeader from './AdminHeader';
import { addProductApi } from '../APICall/APICalls';

function Admin() {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddProduct = async () => {
    try {
      const json = await addProductApi(productData);


      notification.success({
        message: 'Product Added',
        description: 'The product has been added successfully.',
      });
      setProductData({
        title: '',
        description: '',
        price: '',
        category: '',
        image: null,
      });
    } catch (error) {
      console.error('Error adding product:', error);

      notification.error({
        message: 'Error',
        description: 'Failed to add the product. Please try again.',
      });
    }
  };


  return (
    <>
    <AdminHeader />
<div style={{ backgroundColor: '#d1d1f6', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowX: 'hidden' }}>
      <h2>Add Product</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px' }}>
          <label>Title:</label>
          <Input
            placeholder="Title"
            name="title"
            value={productData.title}
            onChange={handleChange}
            style={{ margin: '8px', width: '600px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px' }}>
          <label>Description:</label>
          <TextArea
            placeholder="Description"
            name="description"
            value={productData.description}
            onChange={handleChange}
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
            onChange={handleChange}
            style={{ margin: '8px', width: '600px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px' }}>
          <label>Category:</label>
          <Input
            placeholder="Category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            style={{ margin: '8px', width: '600px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px',justifyContent:'start' }}>
          <label>Upload Image: <input type="file" id="myFile" name="filename" /></label>
          
        </div>
        <Button type="primary" onClick={handleAddProduct} style={{ margin: '8px' }}>
          Add Product
        </Button>
      </div>
    </div>
    </>
    
  );
}

export default Admin;
