import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';

const Register = ({ history }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) history.push('/');
  }, [history, isAuthenticated]);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    notification.success({
      title: `Email has sent to ${email}. Please check your email to login.`,
      description: `Email has sent to ${email}. Please check your email to login.`,
    });

    localStorage.setItem('registerEmail', email);
    setEmail('');
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type='email'
        autoFocus
        className='form-control'
      />
      <button className='btn btn-raised'>Register</button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
