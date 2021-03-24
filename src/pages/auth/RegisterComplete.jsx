import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { createOrUpdateUser } from '../../functions/auth';
import { authTypes } from '../../redux/types';

const CompleteRegistation = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      notification.error({
        title: 'Please Enter Email and Password',
        description: 'Please Enter Email and Password',
      });
      return;
    }

    if (password.length < 6) {
      notification.error({
        title: 'Password must be at least 6 characters long',
        description: 'Password must be at least 6 characters long',
      });
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log(result.user.emailVerified);
      if (result.user.emailVerified) {
        localStorage.removeItem('registerEmail');
        const user = auth.currentUser;
        user.updatePassword(password);
        const { token } = user.getIdTokenResult();
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
          })
          .catch((err) => console.log(err));
        console.log('push');
        history.push('/');
      }
    } catch (error) {
      notification.error({
        title: error,
        description: error,
      });
    }
  };

  useEffect(() => {
    setEmail(localStorage.getItem('registerEmail'));
  }, []);

  const registerCompleteForm = () => (
    <form onSubmit={handleSubmit}>
      <input value={email} type='email' className='form-control' disabled />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        autoFocus
        className='form-control'
      />
      <button className='btn btn-raised'>Complete Registation</button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register Complete</h4>
          {registerCompleteForm()}
        </div>
      </div>
    </div>
  );
};

export default CompleteRegistation;
