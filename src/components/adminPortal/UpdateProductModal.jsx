import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, InputNumber, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { allProductCreator } from '../../redux/ActionCreator/ActionCreator';
import { getProductById, updateProduct } from '../APICall/APICalls';

function UpdateProductModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const productIdFromRedux = useSelector((state) => state.shoppingFeature.ProductID);
  const allProducts = useSelector((state) => state.shoppingFeature.AllProducts);

  const [productData, setProductData] = useState({
    id: '',
    title: '',
    description: '',
    price: 0,
    category: '',
    image: '',
  });

  

  const getToUpdate = async (productId) => {
    try {
        const data= await getProductById(productId);  
      setProductData({
        id: data.id,
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
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
      const updatedProduct= await updateProduct(productIdFromRedux, productData);

      const updatedProducts = allProducts.map((product) =>
        product.id === productIdFromRedux ? updatedProduct : product
      );
      dispatch(allProductCreator(updatedProducts));

      notification.success({
        message: 'Product Updated',
        description: 'The product details have been updated successfully.',
      });

      onClose(); // Close the modal after updating
    } catch (error) {
      console.error('Error updating product details:', error);

      notification.error({
        message: 'Error',
        description: 'Failed to update the product details. Please try again.',
      });
    }
  };

  return (
    <Modal
      title="Update Product Details"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdateProduct}>
          Update
        </Button>,
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px' }}>
          <label>Title:</label>
          <Input
            placeholder="Title"
            name="title"
            value={productData.title}
            onChange={(e) => setProductData({ ...productData, title: e.target.value })}
            style={{ margin: '8px', width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px' }}>
  <label>Description:</label>
  <Input
    placeholder="Description"
    name="description"
    value={productData.description}
    onChange={(e) => setProductData({ ...productData, description: e.target.value })}
    type="textarea"
    rows={10}
    style={{ margin: '8px', width: '100%' }}
  />
</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px' }}>
          <label>Price:</label>
          <InputNumber
            placeholder="Price"
            name="price"
            value={productData.price}
            onChange={(value) => setProductData({ ...productData, price: value })}
            style={{ margin: '8px', width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px' }}>
          <label>Category:</label>
          <Input
            placeholder="Category"
            name="category"
            value={productData.category}
            onChange={(e) => setProductData({ ...productData, category: e.target.value })}
            style={{ margin: '8px', width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '16px' }}>
          <label>Image:</label>
          <Input
            placeholder="Image URL"
            name="image"
            value={productData.image}
            onChange={(e) => setProductData({ ...productData, image: e.target.value })}
            style={{ margin: '8px', width: '100%' }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default UpdateProductModal;
