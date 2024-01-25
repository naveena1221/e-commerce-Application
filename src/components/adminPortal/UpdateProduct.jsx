import React, { useState, useEffect } from 'react';
import { Button, Input, notification, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import AdminHeader from './AdminHeader';

const { Option } = Select;

function UpdateProduct() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productData, setProductData] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });

  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

  useEffect(() => {
    if (selectedProduct) {
      fetch(`https://fakestoreapi.com/products/${selectedProduct}`)
        .then((res) => res.json())
        .then((json) => {
          setProductData({
            id: json.id,
            title: json.title,
            description: json.description,
            price: json.price.toString(), 
            category: json.category,
            image: json.image,
          });
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
        });
    }
  }, [selectedProduct]);

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productData.id}`, {
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
      console.log(json);

      notification.success({
        message: 'Product Updated',
        description: 'The product details have been updated successfully.',
      });
      setProductData({
        title: '',
        description: '',
        price: '',
        category: '',
        image: null,
      });
      setSelectedProduct(null);
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
        <label>Select Product ID:</label>
        <Select
          value={selectedProduct}
          style={{ width: '120px', marginBottom: '16px' }}
          onChange={(value) => setSelectedProduct(value)}
        >
          {numbers.map((number) => (
            <Option key={number} value={number}>
              {number}
            </Option>
          ))}
        </Select>

        {selectedProduct && (
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
              <TextArea
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px', justifyContent: 'start' }}>
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
