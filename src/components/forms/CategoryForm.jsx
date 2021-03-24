import React from 'react';
import { Form, Input, Button } from 'antd';
const CategoryForm = ({ handleSubmit, bntLabel, form }) => (
  <Form
    className='login-form'
    onFinish={handleSubmit}
    layout='vertical'
    form={form}>
    <Form.Item
      name='name'
      required
      rules={[{ required: true, message: 'Please input your Category!' }]}>
      <Input type='type' size='large' placeholder='Category name' />
    </Form.Item>

    <Button type='primary' htmlType='submit' size='large' className='mb-5'>
      {bntLabel}
    </Button>
  </Form>
);

export default CategoryForm;
