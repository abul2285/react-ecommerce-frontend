import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import AdminNav from '../../../components/nav/AdminNav';
import {
  createCategory,
  deleteCategory,
  getCategories,
} from '../../../functions/category';

const CategoryCreate = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState('');
  const [form] = Form.useForm();

  const handleSubmit = ({ name }) => {
    setLoading(true);
    createCategory({ name }, auth.token)
      .then(({ data }) => {
        setLoading(false);
        form.resetFields();
        notification.success({
          title: `You have created ${data.name} category`,
          description: `You have created ${data.name} category`,
        });
        loadCategories();
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
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((res) => setCategories(res.data));

  const handleDelete = (slug) => {
    if (window.confirm(`Are you sure to delete ${slug} category`)) {
      deleteCategory(slug, auth.token)
        .then(({ data }) => {
          setLoading(false);
          notification.success({
            title: `You have deleted ${data.name} category`,
            description: `You have deleted ${data.name} category`,
          });
          loadCategories();
        })
        .catch((err) => {
          console.log({ err });
          if (err.response.status === 403) setLoading(false);
          notification.error({
            title: err.response.data,
            description: err.response.data,
          });
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
            <h4>Create Category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            bntLabel='Crate Category'
            form={form}
          />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {categories.filter(searched(keyword)).map((c) => (
            <div className='alert alert-secondary' key={c._id}>
              {c.name}
              <Link to={`/admin/category/${c.slug}`}>
                <span className='btn bnt-sm float-right'>
                  <EditOutlined className='text-primary' />
                </span>
              </Link>
              <span
                className='btn bnt-sm float-right'
                onClick={() => handleDelete(c.slug)}>
                <DeleteOutlined className='text-danger' />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
