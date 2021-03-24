import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { Form, Input, Button, notification } from 'antd';
import { auth } from '../../firebase';
const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ password }) => {
    console.log({ password });
    try {
      await auth.currentUser.updatePassword(password);
      setLoading(false);
      notification.success({
        title: 'Password updated successfully',
        description: 'Password updated successfully',
      });
    } catch (error) {
      console.log({ error });
      setLoading(false);
      notification({
        title: error.message,
        description: error.message,
      });
    }
  };
  const updatepasswordForm = () => (
    <Form onFinish={handleSubmit}>
      <Form.Item name='password' label='Your Password'>
        <Input.Password size='large' placeholder='Enter new Password' />
      </Form.Item>
      <Button type='primary' size='large' htmlType='submit'>
        Submit
      </Button>
    </Form>
  );
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <UserNav />
        </div>
        <div className='col'>
          {loading ? (
            <p className='text-danger'>loading</p>
          ) : (
            <>
              <h3>Update Password</h3>
              {updatepasswordForm()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
