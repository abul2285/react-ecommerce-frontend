import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { Form, Input, InputNumber, Button, notification, Table } from 'antd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
} from '../../../functions/coupon';
import { useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';

const CouponCreate = () => {
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [form] = Form.useForm();
  const { auth } = useSelector((state) => state.user);

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (values) => {
    console.log({ values });

    setLoading(true);
    createCoupon(values, auth.token)
      .then((res) => {
        form.resetFields();
        loadAllCoupons();
        setLoading(false);
        notification.success({
          title: 'Coupon Created',
          description: 'Coupon Created',
        });
      })
      .catch((err) => console.log({ err }));
  };

  const handleDeleteCoupon = (id) => {
    if (window.confirm('Delete?')) {
      setLoading(true);
      deleteCoupon(id, auth.token).then((res) => {
        setLoading(false);
        loadAllCoupons();
      });
    }
  };

  const data = [];
  coupons.forEach((coupon, i) => {
    data.push({
      key: i,
      name: coupon.name,
      expiry: `${new Date(coupon.expiry).toLocaleDateString()}`,
      discount: `${coupon.discount}%`,
      action: (
        <DeleteOutlined
          onClick={() => handleDeleteCoupon(coupon._id)}
          style={{
            width: '30px',
            height: '30px',
            color: 'red',
          }}
        />
      ),
    });
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: 'Expiry',
      dataIndex: 'expiry',
      key: 'expiry',
      width: '40%',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNav />
        </div>
        <div className='col-md-7'>
          <h4>Create Coupon</h4>
          <Form onFinish={handleSubmit} form={form}>
            <Form.Item name='name' label='Name' required>
              <Input size='large' />
            </Form.Item>
            <Form.Item name='discount' label='Discount %' required>
              <InputNumber size='large' />
            </Form.Item>
            <Form.Item label='DatePicker' name='expiry'>
              <DatePicker selected={new Date()} />
            </Form.Item>
            <Button htmlType='submit' size='large'>
              {' '}
              Save
            </Button>
          </Form>
          <br />
          <br />
          <Table columns={columns} dataSource={data} bordered />
        </div>
      </div>
    </div>
  );
};

export default CouponCreate;
