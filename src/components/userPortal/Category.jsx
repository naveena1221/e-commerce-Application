import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col } from 'antd';
import Header from './Header';
import { Link } from 'react-router-dom';
import Meta from 'antd/es/card/Meta';
import { ProductIDCreator, productsBasedOnCategoryCreator } from '../../redux/ActionCreator/ActionCreator';
import { getProdByCategory } from '../APICall/APICalls';

const Category = () => {
  const categorySelectorStore = useSelector((state) => state);
  const dispatch = useDispatch();
  const debouncedCategory = useDebounce(categorySelectorStore.shoppingFeature.categorySelector, 300);

  const getProductsByCategory = async () => {
    try {
      const data = await getProdByCategory(debouncedCategory);
      dispatch(productsBasedOnCategoryCreator(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (debouncedCategory) {
      getProductsByCategory();
    }
  }, [debouncedCategory]);

  const handleCardClick = (id) => {
    dispatch(ProductIDCreator(id));
  };
  const renderDescription = (description, id) => {
    const maxLength = 100; // You can adjust the maximum length as needed
    const isLongDescription = description.length > maxLength;

    return (
      <>
        {isLongDescription ? (
          <>
            {`${description.substring(0, maxLength)}... `}
            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleCardClick(id)}>
              Read More
            </span>
          </>
        ) : (
          description
        )}
      </>
    );
  };


  return (
    <>
      <Header />
      <div style={{ padding: '2rem', backgroundColor: '#d1d1f6' }}>
        <Row gutter={[16, 16]}>
          {categorySelectorStore.shoppingFeature.productBasedOnCategory.map((product) => (
            <Col span={8} key={product.id}>
              <Link to='/Product'>
                <Card
                  hoverable
                  style={{ width: '100%', marginBottom: '1rem', height: '100%' }}
                  cover={
                    <img
                      alt={product.title}
                      src={product.image}
                      style={{
                        width: '100px',
                        height: '100px',
                        margin: '5px',
                        marginLeft: '200px',
                      }}
                      onClick={() => {
                        handleCardClick(product.id);
                      }}
                    />
                  }
                >
                  <Meta title={product.title} description={renderDescription(product.description, product.id)} />
                  <h2>Price: ${product.price}</h2>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default Category;
