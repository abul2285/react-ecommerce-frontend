import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AvarageRating from '../products/AvarageRating';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import laptop from '../../images/default-laptop.jpg';

const { Meta } = Card;

const ProductCard = ({ product, handleRemoveProduct }) => {
  const { images, title, description, slug, price } = product;
  const [tooltip, setTooltip] = useState('Click To Add');
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.push({
      ...product,
      count: 1,
    });

    const unique = _.uniqWith(cart, _.isEqual);
    dispatch({ type: 'ADD_TO_CART', payload: unique });
    dispatch({ type: 'SET_VISIBLE', payload: true });
    localStorage.setItem('cart', JSON.stringify(unique));
    setTooltip('Added');
  };

  return (
    <>
      {product?.ratings?.length > 0 ? (
        <AvarageRating ratings={product.ratings} />
      ) : (
        <div className='pt-1 pb-3 text-center text-danger'>No Rating Yet</div>
      )}
      <Card
        cover={
          <img
            src={images[0]?.url || laptop}
            alt={images[0]?.public_id || 'fallback alt'}
            style={{ height: '150px', objectFit: 'cover' }}
            className='p-1'
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className='text-warning' />
            <br /> View product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className='text-danger' /> <br />
              {product.quantity < 1 ? 'Out of stock' : 'Add to Cart'}
            </a>
          </Tooltip>,
        ]}>
        <Meta title={`${title}-$${price}`} description={description} />
      </Card>
    </>
  );
};

export default ProductCard;
