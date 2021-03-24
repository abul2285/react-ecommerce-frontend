import React from 'react';
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AvarageRating from '../products/AvarageRating';

const { Meta } = Card;

const ProductCard = ({ product, handleRemoveProduct }) => {
  const { images, title, description, slug } = product;
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
            src={
              images[0]?.url ||
              'http://ninajohansson.se/wp-content/themes/koji/assets/images/default-fallback-image.png'
            }
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
          <>
            <ShoppingCartOutlined className='text-danger' /> <br /> Add to cart
          </>,
        ]}>
        <Meta title={title} description={description} />
      </Card>
    </>
  );
};

export default ProductCard;
