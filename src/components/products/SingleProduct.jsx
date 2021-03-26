import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Card, Tabs, Tooltip, Image } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import AvarageRating from './AvarageRating';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import laptop from '../../images/default-laptop.jpg';

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStartClick, star }) => {
  const { images, title, description, _id } = product;
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
      <div className='col-md-7'>
        {images?.length ? (
          <Carousel>
            {images?.map((i) => (
              <img
                src={i.url}
                key={i.public_id}
                alt={i.pulbic_id}
                height='450px'
              />
            ))}
          </Carousel>
        ) : (
          <Image src={laptop} />
        )}

        <Tabs type='card'>
          <TabPane tab='Description' key='1'>
            {description}
          </TabPane>
          <TabPane tab='More' key='2'>
            You can call on xxx xxx xxx to learn more.
          </TabPane>
        </Tabs>
      </div>
      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>
        {product?.ratings?.length > 0 ? (
          <AvarageRating ratings={product.ratings} />
        ) : (
          <div className='pt-1 pb-3 text-center text-danger'>No Rating Yet</div>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className='text-danger' /> <br /> Add to
                cart
              </a>
            </Tooltip>,
            <Link to='/'>
              <HeartOutlined className='text-info' /> <br /> Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStarts={5}
                rating={star}
                changeRating={onStartClick}
                isSeletable={true}
                starRatedColor='red'
              />
            </RatingModal>,
          ]}>
          <ProductDetails {...product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
