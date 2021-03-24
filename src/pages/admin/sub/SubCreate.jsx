import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategories } from '../../../functions/category';
import { createSub, deleteSub, getSubs } from '../../../functions/sub';

const SubCreate = () => {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState('');
  const [form] = Form.useForm();

  const handleSubmit = ({ name }) => {
    setLoading(true);
    createSub({ name, parent: category }, auth.token)
      .then(({ data }) => {
        setLoading(false);
        form.resetFields();
        notification.success({
          title: `You have created ${data.name} category`,
          description: `You have created ${data.name} category`,
        });
        loadSubs();
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
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((res) => setCategories(res.data));

  const loadSubs = () => getSubs().then((res) => setSubs(res.data));

  const handleDelete = (slug) => {
    if (window.confirm(`Are you sure to delete ${slug} sub category`)) {
      deleteSub(slug, auth.token)
        .then(({ data }) => {
          setLoading(false);
          notification.success({
            title: `You have deleted ${data.name} sub category`,
            description: `You have deleted ${data.name} sub category`,
          });
          loadSubs();
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
            <h4>Create Sub Category</h4>
          )}
          <p>Category</p>
          <div className='form-group'>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className='form-control mb-4'>
              <option>Please Select a category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <p>Sub Category</p>
          <CategoryForm
            handleSubmit={handleSubmit}
            bntLabel='Crate Category'
            form={form}
          />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {subs.filter(searched(keyword)).map((s) => (
            <div className='alert alert-secondary' key={s._id}>
              {s.name}
              <Link to={`/admin/sub/${s.slug}`}>
                <span className='btn bnt-sm float-right'>
                  <EditOutlined className='text-primary' />
                </span>
              </Link>
              <span
                className='btn bnt-sm float-right'
                onClick={() => handleDelete(s.slug)}>
                <DeleteOutlined className='text-danger' />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
