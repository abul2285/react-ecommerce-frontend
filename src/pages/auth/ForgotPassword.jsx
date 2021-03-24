import { notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('', history);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) history.push('/');
  }, [history, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await auth.sendPasswordResetEmail(email, config);
      notification.success({
        title: `Check ${email} to reset password link`,
        description: `Check ${email} to reset password link`,
      });
      setEmail('');
    } catch (error) {
      notification.error({
        title: error.message,
        description: error.message,
      });
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type='email'
        autoFocus
        className='form-control'
        placeholder='Enter recovery email'
      />
      <button className='btn btn-raised'>Send Email</button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Forgot Password</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
