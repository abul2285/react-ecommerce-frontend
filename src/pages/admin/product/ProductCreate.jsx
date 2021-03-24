import React, { useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { Badge, Form, notification } from 'antd';
import { createProduct } from '../../../functions/product';
import { useSelector } from 'react-redux';
import ProductCreateOrUpdateForm from '../../../components/forms/ProductCreateForm';
import ImageUpload from '../../../components/forms/ImageUpload';
import Avatar from 'antd/lib/avatar/avatar';
import axios from 'axios';

const ProductCreate = () => {
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const authtoken = user?.auth?.token;

  const handleSubmit = (values) => {
    setLoading(true);
    createProduct({ ...values, images }, authtoken)
      .then(({ data }) => {
        form.resetFields();
        notification.success({
          title: `You have created a new Product`,
          description: `You have created a new Product`,
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log({ err });
        if (err.response.status === 400)
          notification.error({
            title: err.response.data,
            description: err.response.data,
          });
      });
  };

  const handleImageRemove = (id) => {
    setLoading(true);
    const public_id = id.split('/')[1];
    axios
      .delete(`/removeimage/${public_id}`, { headers: { authtoken } })
      .then(() => {
        setImages((prevImages) =>
          prevImages.filter((img) => img.public_id !== id)
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger mb-4 mt-3'>loading...</h4>
          ) : (
            <h4 className='mb-3 mt-3'>Create new product</h4>
          )}

          {images.map((img) => (
            <Badge
              count='X'
              key={img.public_id}
              onClick={() => handleImageRemove(img.public_id)}
              style={{ cursor: 'pointer' }}>
              <Avatar size={80} src={img.url} className='ml-4' shape='square' />
            </Badge>
          ))}
          <div className='mb-3'>
            <ImageUpload
              token={user.auth.token}
              setImages={setImages}
              setLoading={setLoading}
              authtoken={authtoken}
            />
          </div>
          <ProductCreateOrUpdateForm handleSubmit={handleSubmit} form={form} />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
