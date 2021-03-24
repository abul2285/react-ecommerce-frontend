import React, { useEffect } from 'react';
import { Button, Form, Input, notification } from 'antd';
import {
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { auth, googleAuthProvider } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { authTypes } from '../../redux/types';
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth';

const Login = ({ history }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const roleBaseRedirect = (role) => {
    if (role === 'admin') {
      history.push('/admin/dashboard');
    } else {
      history.push('/user/history');
    }
  };

  useEffect(() => {
    if (isAuthenticated) history.push('/');
  }, [history, isAuthenticated]);
  const dispatch = useDispatch();
  const handleSubmit = async ({ email, password }) => {
    try {
      dispatch({
        type: authTypes.LOG_IN.REQUEST,
      });
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const { token } = await user.getIdTokenResult();
      createOrUpdateUser(token)
        .then(({ data }) => {
          dispatch({
            type: authTypes.LOG_IN.SUCCESS,
            payload: {
              _id: data._id,
              name: data.name,
              email: user.email,
              role: data.role,
              token,
            },
          });
          roleBaseRedirect(data.role);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log({ error });
      dispatch({
        type: authTypes.LOG_IN.FAILURE,
        payload: 'user not found',
      });
      notification.error({
        title: error.message,
        description: error.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      dispatch({
        type: authTypes.LOG_IN.REQUEST,
      });
      const { user } = await auth.signInWithPopup(googleAuthProvider);
      const { token } = await user.getIdTokenResult();
      createOrUpdateUser(token)
        .then(({ data }) => {
          dispatch({
            type: authTypes.LOG_IN.SUCCESS,
            payload: {
              _id: data._id,
              name: data.name,
              email: user.email,
              role: data.role,
              token,
            },
          });
          notification.success({
            title: 'You have loged in successfully',
            description: 'You have loged in successfully',
          });
          roleBaseRedirect(data.role);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log({ error });
      dispatch({
        type: authTypes.LOG_IN.FAILURE,
        payload: 'user not found',
      });
      notification.error({
        title: error.message,
        description: error.message,
      });
    }
  };

  const loginForm = () => (
    <Form className='login-form' onFinish={handleSubmit} layout='vertical'>
      <Form.Item
        name='email'
        label='Your Email'
        rules={[
          { required: true, message: 'Please input your Email!' },
          { type: 'email', message: 'Email is not valid' },
        ]}>
        <Input
          type='email'
          size='large'
          prefix={<UserOutlined className='login-email-input' />}
          placeholder='Your Email'
        />
      </Form.Item>
      <Form.Item
        label='Your Password'
        name='password'
        rules={[
          { required: true, message: 'Please input your Password!' },
          { min: 6, message: 'Password must be greater than 6 character' },
        ]}>
        <Input
          prefix={<LockOutlined className='login-password-input' />}
          type='password'
          placeholder='Password'
          size='large'
        />
      </Form.Item>
      <Button
        type='primary'
        shape='round'
        block
        htmlType='submit'
        size='large'
        icon={<MailOutlined />}
        className='my-2'>
        Log in with Email/Password
      </Button>
    </Form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Login</h4>
          {loginForm()}

          <Button
            type='danger'
            shape='round'
            block
            htmlType='button'
            size='large'
            onClick={handleGoogleLogin}
            icon={<GoogleOutlined />}
            className='my-2'>
            Log in with Google
          </Button>
          <Link to='/forgot/password' className='float-right text-danger'>
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
