import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { Badge, Form, notification } from 'antd';
import { getProduct, updateProduct } from '../../../functions/product';
import { useSelector } from 'react-redux';
import ProductCreateOrUpdateForm from '../../../components/forms/ProductCreateForm';
import ImageUpload from '../../../components/forms/ImageUpload';
import Avatar from 'antd/lib/avatar/avatar';
import axios from 'axios';

const ProductUpdate = ({ match, history }) => {
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const authtoken = user?.auth?.token;

  const handleSubmit = (values) => {
    setLoading(true);
    updateProduct(match.params.slug, { ...values, images }, user.auth.token)
      .then(({ data }) => {
        setLoading(false);
        form.resetFields();
        notification.success({
          title: `You have updated Product`,
          description: `You have updated Product`,
        });
        history.push('/admin/products');
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

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const { data } = await getProduct(match.params.slug);
      form.setFieldsValue({
        ...data,
        category: data.category._id,
        subs: data.subs.map((sub) => sub._id),
      });
      setImages(data.images);
      setInitialValues(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
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
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Update product</h4>
          )}

          {images.map((img) => (
            <Badge
              count='X'
              key={img.public_id}
              onClick={() => handleImageRemove(img.public_id)}
              style={{ cursor: 'pointer' }}>
              <Avatar size={80} src={img.url} className='ml-2' shape='square' />
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
          <ProductCreateOrUpdateForm
            handleSubmit={handleSubmit}
            form={form}
            isUpdate
            initialValues={initialValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
