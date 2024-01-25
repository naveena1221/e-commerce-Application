import { HomeFilled } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminHeader() {
    const navigate=useNavigate();
    const pathname = window.location.pathname;

    const handleLogout = () => {
     
        localStorage.removeItem('userDetails');
        localStorage.removeItem('authenticated');
        navigate('/signup');
      };

  return (
    <div className="adminHeader">
      <Menu mode='horizontal'style={{backgroundColor:'#734f96',height:'60px',color:'white',fontSize:'20px',justifyContent:'space-evenly',alignItems:'center'}} selectedKeys={[pathname]} >
      <Menu.Item style={{ pointerEvents: 'none' }} >
          <strong>NM Store</strong>
          </Menu.Item>


        <Menu.Item key='/admin'  >
          <Link to='/admin' >
            <HomeFilled style={{ fontSize: '20px' }} />
          </Link>
        </Menu.Item>
        <Menu.Item key='/AddProduct'  >
          <Link to='/AddProduct' >
            Add Product
          </Link>
        </Menu.Item>
        <Menu.Item key='/DeleteProduct'  >
          <Link to='/DeleteProduct' >
            Delete Product
          </Link>
        </Menu.Item>
        <Menu.Item key='/UpdateProduct'  >
          <Link to='/UpdateProduct' >
            Update Product
          </Link>
        </Menu.Item>
        <Menu.Item  >
        <Button type="link" onClick={handleLogout} style={{ fontSize: '20px',color:'white' }} >
        Logout
      </Button>
      </Menu.Item>

        

        


      </Menu>

    </div>
  )
}
