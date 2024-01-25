import React from 'react';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import '../../../src/App.css';
import backgroundImage from '../../LandingImage.jpg'
import { Button } from 'antd';


const containerStyle = {
    width: '100vw',
    height: '100vh',
    background: `url(${backgroundImage}) center/cover no-repeat`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    textAlign: 'center',
  };
  
  const contentStyle = {
    maxWidth: '80%',
  };
  
  function LandingPage() {
    return (
      <div style={containerStyle}>
        <div style={contentStyle}>
          <h1 style={{fontSize:'3rem'}}>Welcome to NM Store</h1>
          <p style={{fontSize:'1.5rem',color:"white"}}>Please signin or signup if you are a new customer</p>
          <Button type="primary" style={{margin:'10px'}}><Link to="/signin">Sign In</Link></Button>
         <Button type="primary" style={{margin:'10px'}}><Link to="/signup">Sign Up</Link></Button> 
        </div>
      </div>
    );
  }
  
  export default LandingPage;