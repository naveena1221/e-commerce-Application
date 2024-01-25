import { HomeFilled, LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Badge, Menu } from "antd";
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {  categorySelectCreator } from "../../redux/ActionCreator/ActionCreator";
import { persistor } from "../../redux/Store/Store";

export default function Header() {
  const pathname = window.location.pathname;
  const cartItems = useSelector((state) => state.shoppingFeature.AddToCart);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('cartItems');
    console.log('After logout:', localStorage.getItem('cartItems'));
    localStorage.removeItem('authenticated');
    persistor.purge();
    localStorage.removeItem('persist:root');
    window.location.reload(true);
    navigate('/SignUp');
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const handleCancelLogout = () => {

    setShowLogoutConfirmation(false);
  };
  const handleConfirmLogout = () => {
    handleLogout();
    setShowLogoutConfirmation(false);
  };
  const handleCategoryClick=(category)=>{
    dispatch(categorySelectCreator(category))
  }


  return (
    <div className="header">
      <Menu mode='horizontal'style={{backgroundColor:'#734f96',height:'60px',color:'white',fontSize:'20px',justifyContent:'space-evenly',alignItems:'center'}} selectedKeys={[pathname]} >
      <Menu.Item style={{ pointerEvents: 'none' }} >
          <strong>NM Store</strong>
          </Menu.Item>


        <Menu.Item key='/Home'  >
          <Link to='/Home' >
            <HomeFilled style={{ fontSize: '20px' }} />
          </Link>
        </Menu.Item>

        <Menu.Item key='/AllProducts'   >
          <Link to='/AllProducts' >Products</Link>
          </Menu.Item>

          <Menu.Item key='category'  >
          <Menu.SubMenu key="subCategory" title="category">
          <Menu.Item key="women"><Link to='/category' onClick={() => handleCategoryClick("women's clothing")}>Women</Link></Menu.Item>
          <Menu.Item key="Men"><Link to='/category' onClick={() => handleCategoryClick("men's clothing")}>Men</Link></Menu.Item>
          <Menu.Item key="jewelry"><Link to='/category' onClick={() => handleCategoryClick('jewelery')}>Jewelery</Link></Menu.Item>
          <Menu.Item key="electronics"><Link to='/category' onClick={() => handleCategoryClick('electronics')}>Electronics</Link></Menu.Item>
        </Menu.SubMenu>
          </Menu.Item>

         
          <Menu.Item key='Logout' onClick={handleLogoutClick}>
            <LogoutOutlined style={{ fontSize: '20px' }} />
         
          
        </Menu.Item>
        <Modal
            title="Logout Confirmation"
            visible={showLogoutConfirmation}
            onOk={handleConfirmLogout}
            onCancel={handleCancelLogout}
          >
            <p>Are you sure you want to logout?</p>
          </Modal>


          <Menu.Item key='cart'>
          <Link to='/Cart'>
              <Badge count={cartItems.length} showZero>
                <Avatar shape='square' size='large'>
                  <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                </Avatar>
              </Badge>
            </Link>
          </Menu.Item>


      </Menu>

    </div>
  )
}
