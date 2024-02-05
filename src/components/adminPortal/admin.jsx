import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import { useDispatch, useSelector } from 'react-redux';
import { ProductIDCreator, allProductCreator } from '../../redux/ActionCreator/ActionCreator';
import { notification, Modal, Button } from 'antd';
import UpdateProductModal from './UpdateProductModal';
import { getProducts, deleteProduct } from '../APICall/APICalls';

function Admin() {
  const dispatch = useDispatch();
  const adminStore = useSelector((state) => state);

  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      dispatch(allProductCreator(data));
    } catch (error) {
      console.error('Error fetching products in Admin:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  const handleDelete = async (productId) => {
    try {
      const json = await deleteProduct(productId);
      const updatedProducts = adminStore.shoppingFeature.AllProducts.filter((product) => product.id !== productId);
      dispatch(allProductCreator(updatedProducts));

      notification.success({
        message: 'Product Deleted',
        description: `${json.title} has been deleted successfully.`,
      });
    }catch(error) {
        console.error('Error deleting product:', error);

        notification.error({
          message: 'Error',
          description: 'Failed to delete the product. Please try again.',
        });
      };
  };

  const handleUpdate = (productId) => {
    dispatch(ProductIDCreator(productId));
    setModalVisible(true); // Open the modal
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
  };

  return (
    <>
      <AdminHeader />

      <div style={{ backgroundColor: '#d1d1f6', textAlign: 'center', minHeight: '91.2vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowX: 'hidden' }}>
        <h1>Welcome Admin</h1>
        <table style={{ margin: '50px 200px' }}>
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
                <td><img style={{ width: '100px', height: '100px' }} src={product.image} alt={product.title} /></td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                  <button style={{ margin: '5px', backgroundColor: 'green', padding: '10px', borderRadius: '10px' }} onClick={() => handleUpdate(product.id)}>Update</button>
                  <button style={{ margin: '5px', backgroundColor: 'red', padding: '10px', borderRadius: '10px' }} onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render the UpdateProductModal */}
      <UpdateProductModal visible={modalVisible} onClose={closeModal} />
    </>
  );
}

export default Admin;
