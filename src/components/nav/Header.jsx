import React, { useState } from 'react';
import { Badge, Menu, notification } from 'antd';
import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authTypes } from '../../redux/types';
import { auth } from '../../firebase';
import Search from '../forms/Search';
const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated, auth: user } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    try {
      dispatch({ type: authTypes.LOG_OUT.REQUEST });
      auth.signOut();
      dispatch({ type: authTypes.LOG_OUT.SUCCESS });
      history.push('/login');
    } catch (error) {
      dispatch({ type: authTypes.LOG_OUT.FAILURE });
      notification.error({
        title: error.message,
        description: error.message,
      });
    }
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>Home</Link>
      </Item>

      <Item key='shop' icon={<ShoppingOutlined />}>
        <Link to='/shop'>Shop</Link>
      </Item>

      <Item key='cart' icon={<ShoppingOutlined />}>
        <Link to='/cart'>
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      {!isAuthenticated ? (
        <>
          <Item
            key='register'
            icon={<UserAddOutlined />}
            className='float-right'>
            <Link to='/register'>Register</Link>
          </Item>
          <Item key='login' icon={<UserOutlined />} className='float-right'>
            <Link to='/login'>Login</Link>
          </Item>
        </>
      ) : (
        <SubMenu
          key='setting'
          icon={<SettingOutlined />}
          title={user.email.split('@')[0]}
          className='float-right'>
          {user && user.role === 'admin' && (
            <Menu.Item key='me'>
              <Link to='/admin/dashboard'>Dashboard</Link>
            </Menu.Item>
          )}
          {user && user.role === 'subscriber' && (
            <Menu.Item key='me2'>
              <Link to='/user/history'>Dashboard</Link>
            </Menu.Item>
          )}
          <Menu.Item key='me3' icon={<LogoutOutlined />} onClick={handleLogout}>
            Log Out
          </Menu.Item>
        </SubMenu>
      )}
      <span className='float-right p-1'>
        <Search />
      </span>
    </Menu>
  );
};

export default Header;
