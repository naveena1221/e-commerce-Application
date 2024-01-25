import React, { useState } from 'react';
import { Button, notification, Select } from 'antd';
import AdminHeader from './AdminHeader';

export default function DeleteProduct() {
const { Option } = Select;
    const [selectedUser, setSelectedUser] = useState(null); 
    const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
  
    const handleDeleteProduct = () => {
      fetch(`https://fakestoreapi.com/users/${selectedUser}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
       
          notification.success({
            message: 'Product Deleted',
            description: `Product with user ID ${selectedUser} has been deleted successfully.`,
            
          });
          setSelectedUser(null);
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        
          notification.error({
            message: 'Error',
            description: 'Failed to delete the product. Please try again.',
          });
        });
    };
  
    return (
        <>
        <AdminHeader />
<div style={{ backgroundColor: '#d1d1f6', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowX: 'hidden' }}>
        <h2>Delete Product</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label>Select User ID:</label>
          <Select
            defaultValue={selectedUser}
            style={{ width: '120px', marginBottom: '16px' }}
            onChange={(value) => setSelectedUser(value)}
          >
            {numbers.map((number) => (
              <Option key={number} value={number}>
                {number}
              </Option>
            ))}
          </Select>
          <Button type="primary" onClick={handleDeleteProduct} style={{ margin: '8px' }}>
            Delete Product
          </Button>
        </div>
      </div>
        </>
      
    );
}
