import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, InputNumber } from 'antd';
import { getCategories } from '../../functions/category';
import { getCategorySubs } from '../../functions/product';
const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
const brands = ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'];
const { Option } = Select;

const ProductCreateOrUpdateForm = ({
  handleSubmit,
  form,
  initialValues = {},
  isUpdate,
}) => {
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    loadCategories();
    if (initialValues?.category?._id) {
      processSubs(initialValues.category._id);
    }
  }, [initialValues?.category?._id]);

  const loadCategories = () =>
    getCategories().then((res) => setCategories(res.data));

  const processSubs = (val) => {
    setShowSub(true);
    getCategorySubs(val)
      .then((res) => {
        if (val === initialValues?.category?._id) {
          const subs = initialValues.subs.map((sub) => sub._id);
          form.setFieldsValue({
            subs,
          });
        } else {
          form.setFieldsValue({ subs: [] });
        }
        setSubOptions(res.data);
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <Form layout='vertical' onFinish={handleSubmit} form={form}>
      <Form.Item name='title' label='Title' rolse={[]}>
        <Input size='large' placeholder='Ex: Lenove Pro 2021' />
      </Form.Item>
      <Form.Item name='description' label='Description' rolse={[]}>
        <Input
          size='large'
          placeholder='Ex: This the best Laptop of 2021 but has a low price.'
        />
      </Form.Item>
      <Form.Item name='price' label='Price' rolse={[]}>
        <InputNumber size='large' placeholder='Ex: 40500' />
      </Form.Item>
      <Form.Item name='shipping' label='Shipping' rolse={[]}>
        <Select size='large' placeholder='Please Select'>
          <Option value='Yes'>Yes</Option>
          <Option value='No'>No</Option>
        </Select>
      </Form.Item>
      <Form.Item name='quantity' label='Quantity' rolse={[]}>
        <InputNumber size='large' placeholder='Ex: 50' />
      </Form.Item>
      <Form.Item name='color' label='Color' rolse={[]}>
        <Select size='large' placeholder='Please Select'>
          {colors.map((c) => (
            <Option value={c} key={c}>
              {c}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name='brand' label='Brand' rolse={[]}>
        <Select size='large' placeholder='Please Select'>
          {brands.map((b) => (
            <Option value={b} key={b}>
              {b}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name='category' label='Category' rolse={[]}>
        <Select size='large' onChange={processSubs} placeholder='Please Select'>
          {categories.map((c) => (
            <Option value={c._id} key={c._id}>
              {c.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {showSub && (
        <Form.Item name='subs' label='Sub Category' rolse={[]}>
          <Select size='large' placeholder='Please Select' mode='multiple'>
            {subOptions.map((s) => {
              return (
                <Option value={s._id} key={s._id}>
                  {s.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      )}
      <Button type='primary' htmlType='submit' size='large'>
        {isUpdate ? 'Update' : 'Save'}
      </Button>
    </Form>
  );
};

export default ProductCreateOrUpdateForm;
