import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategories } from '../../../functions/category';
import {
  createSub,
  deleteSub,
  getSub,
  getSubs,
  updateSub,
} from '../../../functions/sub';

const SubUpdate = ({ history, match }) => {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => state.user);
  const { slug } = match.params;

  const [form] = Form.useForm();
  const handleSubmit = ({ name }) => {
    setLoading(true);
    updateSub(slug, { name, parent: category }, auth.token)
      .then(({ data }) => {
        setLoading(false);
        // form.resetFields();
        notification.success({
          title: `You have created ${data.name} sub category`,
          description: `You have created ${data.name} sub category`,
        });
        history.push('/admin/sub');
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
    loadSub();
  }, [slug]);

  const loadCategories = () =>
    getCategories().then((res) => setCategories(res.data));

  const loadSub = () =>
    getSub(slug).then((res) => {
      form.setFieldsValue({ name: res.data.sub.name });
      setCategory(res.data.sub.parent);
    });

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
            <h4>Update Sub Category</h4>
          )}
          <p>Category</p>
          <div className='form-group'>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className='form-control mb-4'>
              <option>Please Select a category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option
                    key={c._id}
                    value={c._id}
                    selected={c._id === category}>
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
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
