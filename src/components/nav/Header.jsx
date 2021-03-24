import React, { useState } from 'react';
import { Menu, notification } from 'antd';
import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authTypes } from '../../redux/types';
import { auth } from '../../firebase';
const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated, auth: user } = useSelector((state) => state.user);

  const handleClick = (e) => {
    console.log('click ', e);
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
            <Menu.Item>
              <Link to='/admin/dashboard'>Dashboard</Link>
            </Menu.Item>
          )}
          {user && user.role === 'subscriber' && (
            <Menu.Item>
              <Link to='/user/history'>Dashboard</Link>
            </Menu.Item>
          )}
          <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>
            Log Out
          </Menu.Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
