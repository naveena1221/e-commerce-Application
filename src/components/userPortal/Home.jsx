import React from 'react';
import '../../../src/App.css';
import Header from './Header';
import { Carousel,Row, Col } from 'antd';
import womenImage from '../../Women image.jpg';
import MenImage from '../../Men image.jpg';
import ring from '../../ring image.jpg';
import tv from '../../tv image.jpg';
import { CreditCardOutlined, UndoOutlined, DollarCircleOutlined } from '@ant-design/icons';
function Home() {
  const imgStyle = {
    height: '500px',
    width: '100%',
    objectFit: 'cover',

  };
  return (
    <div className='home' style={{overflow:'hidden', backgroundColor:'#d1d1f6'}}>
        <Header />
        <div>
        <Carousel autoplay>
    <div >
      <img src={womenImage} alt='women image' style={imgStyle} />
    </div>
    <div>
    <img src={MenImage} alt='men image' style={imgStyle} />
    </div>
    <div>
    <img src={ring} alt='ring image' style={imgStyle} />
    </div>
    <div>
    <img src={tv} alt='tv image' style={imgStyle} />
    </div>
  </Carousel>
        </div>
        <div className="details" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <div style={{ textAlign: 'center', paddingTop: '19px' }}>
              <DollarCircleOutlined style={{ fontSize: '30px', marginBottom: '10px' }} />
              <div>Free Shipping</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center', padding: '19px' }}>
              <CreditCardOutlined style={{ fontSize: '30px', marginBottom: '10px' }} />
              <div>COD Available</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center', paddingTop: '19px' }}>
              <UndoOutlined style={{ fontSize: '30px', marginBottom: '10px' }} />
              <div>Free & easy Returns</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Home