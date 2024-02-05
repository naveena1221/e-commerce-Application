import React, { useEffect } from 'react'
import Header from './Header'
import { Card, Row, Col,Skeleton } from "antd";
import { ProductIDCreator, allProductCreator } from '../../redux/ActionCreator/ActionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../APICall/APICalls';

export default function AllProducts() {
  const { Meta } = Card;
  const dispatch=useDispatch();
  const storeData=useSelector((state)=>state);


  const getAllProducts=async()=>{
    try {
      const data = await getProducts();
      dispatch(allProductCreator(data));
    } catch (error) {
      console.error('Error fetching all products:', error);
    }

  }
  useEffect(function(){
    getAllProducts();
  },[])
  console.log(storeData);

  const handleClick=(id)=>{
    dispatch(ProductIDCreator(id));
  }


  return (
    <>
    <Header />
    <div style={{ padding: "2rem",backgroundColor:'#d1d1f6' }}>
      <Row gutter={[16, 16]}>
        {storeData.shoppingFeature.AllProducts ? (
        storeData.shoppingFeature.AllProducts?.map((ele)=>(
          <Col span={8}>
            <Link to='/Product'>
          <Card
          hoverable
          style={{ width: "100%", marginBottom: "1rem", height: "100%" }}
          cover={
            <img
              alt="example"
              src={ele.image}
              style={{
                width: "100px",
                height: "100px",
                margin: "5px",
                marginLeft: "200px",
                }} 
            />
          }
          key={ele.id}
          onClick={() => { handleClick(ele.id) }}
        >
          <Meta
                      title={ele.title}
                      description={
                        <div
                          style={{
                            maxHeight: '60px', 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {ele.description}
                        </div>
                      }
                      style={{
                        textAlign: 'center',
                        height: '60px', 
                      }}
                    />
          <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                      <h2>Price: ${ele.price}</h2>
                    </div>
        </Card>
        </Link>
        
      </Col>
        )
        )):(
          <Col span={8}>
            <Skeleton active />
          </Col>
        )}
        
          
        
      </Row>
    </div>
    </>
    
  )
}
