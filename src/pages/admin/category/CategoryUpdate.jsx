import { notification, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CategoryForm from '../../../components/forms/CategoryForm';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategory, updateCategory } from '../../../functions/category';

const CategoryUpdate = ({ history, match }) => {
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const { slug } = match.params;

  const handleSubmit = ({ name }) => {
    setLoading(true);
    updateCategory(slug, { name }, auth.token)
      .then(({ data }) => {
        setLoading(false);
        form.resetFields();
        notification.success({
          title: `You have updated ${data.name} category`,
          description: `You have updated ${data.name} category`,
        });
        history.push('/admin/category');
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
        if (err.response.status === 403)
          notification.error({
            title: err.response.data,
            description: err.response.data,
          });
      });
  };

  useEffect(() => {
    getCategory(slug)
      .then((res) => {
        form.setFieldsValue({ name: res.data.name });
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
        if (err.response.status === 403)
          notification.error({
            title: err.response.data,
            description: err.response.data,
          });
      });
  }, [form, slug]);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>loading...</h4>
          ) : (
            <h4>Update Category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            bntLabel='Update Category'
            form={form}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
