import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { notification } from 'antd';
import React from 'react';
import ModalImage from 'react-modal-image';
import { useDispatch } from 'react-redux';

const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];

const ProductCartInCheckout = ({
  title,
  price,
  brand,
  color,
  count,
  shipping,
  quantity,
  _id,
  images,
}) => {
  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, i) => {
      if (product._id === _id) {
        cart[i].color = e.target.value;
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({ type: 'ADD_TO_CART', payload: cart });
  };

  const handleRemove = () => {
    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, i) => {
      if (product._id === _id) {
        cart.splice(i, 1);
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({ type: 'ADD_TO_CART', payload: cart });
  };

  const handleQuantity = (e) => {
    const count = e.target.value < 1 ? 1 : e.target.value;

    if (count > quantity) {
      return notification.error({
        title: `You can't select more than ${quantity}`,
        description: `You can't select more than ${quantity}`,
      });
    }

    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, i) => {
      if (product._id === _id) {
        cart[i].count = count;
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({ type: 'ADD_TO_CART', payload: cart });
  };
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: '100px', height: 'auto' }}>
            {images?.length ? (
              <ModalImage small={images[0].url} large={images[0].url} />
            ) : (
              'Image'
            )}
          </div>
        </td>
        <td>{title}</td>
        <td>${price}</td>
        <td>{brand}</td>
        <td>
          <select className='form-control' onChange={handleColorChange}>
            {color ? (
              <option value={color}>{color}</option>
            ) : (
              <option>Please Select</option>
            )}
            {colors
              .filter((c) => c !== color)
              .map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
          </select>
        </td>
        <td className='text-center'>
          <input
            className='form-control'
            type='number'
            value={count}
            onChange={handleQuantity}
          />
        </td>
        <td>
          {shipping === 'Yes' ? (
            <CheckCircleOutlined className='text-success' />
          ) : (
            <CloseCircleOutlined className='text-danger' />
          )}
        </td>
        <td className='text-center'>
          <CloseOutlined
            className='text-danger'
            style={{ cursor: 'pointer' }}
            onClick={handleRemove}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCartInCheckout;
