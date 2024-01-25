import React, { useEffect, useState, useMemo } from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import { AddToCartCreator, ProductDetailsCreator } from '../../redux/ActionCreator/ActionCreator';

const Product = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const productDetailStore = useSelector((state) => state);

  const getProductDetailsByID = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${productDetailStore.shoppingFeature.ProductID}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const productDetails = await res.json();
      dispatch(ProductDetailsCreator(productDetails));
    } catch (error) {
      console.error('Error fetching product details:', error);
      await retryNetworkCall();
    } finally {
      setLoading(false);
    }
  };

  const retryNetworkCall = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${productDetailStore.shoppingFeature.ProductID}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const productDetails = await res.json();
      dispatch(ProductDetailsCreator(productDetails));
    } catch (error) {
      console.error('Error retrying network call:', error);
      
    } finally {
     
      setLoading(false);
    }
  };

  
  const memoizedGetProductDetails = useMemo(() => getProductDetailsByID, [
    dispatch,
    productDetailStore.shoppingFeature.ProductDetials,
    productDetailStore.shoppingFeature.ProductID,
  ]);

  useEffect(() => {
    memoizedGetProductDetails();
  }, []);

  const addHandle = () => {
    const productDetails = productDetailStore.shoppingFeature.ProductDetials;

    if (productDetails) {
      const { id, title, price, image } = productDetails;
      console.log(productDetails, 'Product Details');
      dispatch(AddToCartCreator({ id, title, price, image }));
    }
  };

  return (
    <>
      <Header />
      {loading ? (
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div className="main" style={{ display: 'flex', gap: '80px', padding: '2.5rem', backgroundColor: '#d1d1f6', minHeight: '79.9vh',overflowY:'auto' }}>
          <div className="image">
            <img style={{ width: '30rem', height: '30rem' }} src={productDetailStore.shoppingFeature.ProductDetials.image} alt="product image" loading="lazy" />
          </div>
          <div className="Content">
            <h2>{productDetailStore.shoppingFeature.ProductDetials.title}</h2>
            <p>
              <b>category: </b>
              {productDetailStore.shoppingFeature.ProductDetials.category}{' '}
            </p>
            <p>
              <b>Description: </b> {productDetailStore.shoppingFeature.ProductDetials.description}
            </p>
            <strong>Price: ${productDetailStore.shoppingFeature.ProductDetials.price}</strong>
            <p>
              <b>Rating: </b>
              {productDetailStore.shoppingFeature.ProductDetials.rating.rate}/5, Given by {productDetailStore.shoppingFeature.ProductDetials.rating.count} members
            </p>

            <Button type="primary" onClick={addHandle}>
              ADD to Cart
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
