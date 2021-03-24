import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Card, Tabs } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProductDetails from './ProductDetails';

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { images, title, description } = product;
  return (
    <>
      <div className='col-md-7'>
        <Carousel>
          {images?.map((i) => (
            <img src={i.url} key={i.public_id} alt={i.pulbic_id} />
          ))}
        </Carousel>
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
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className='text-success' /> <br /> Add to
              Cart
            </>,
            <Link to='/'>
              <HeartOutlined className='text-info' /> <br /> Add to Wishlist
            </Link>,
          ]}>
          <ProductDetails {...product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
