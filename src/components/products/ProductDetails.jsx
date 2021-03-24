import { List, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const ProductDetails = ({
  price,
  category = {},
  subs = [],
  color,
  brand,
  shipping,
  sold,
  quantity,
}) => {
  return (
    <>
      <List.Item>
        <Text>Price</Text>
        <Text>${price}</Text>
      </List.Item>

      <List.Item>
        <Text>Category</Text>
        <Link to={`category/${category.slug}`} className=''>
          <Text className='text-primary'>{category.name}</Text>
        </Link>
      </List.Item>
      <List.Item>
        <Text>Sub Categories</Text>
        {subs.map((sub) => (
          <Link to={`/sub/${sub.slug}`} key={sub._id}>
            <Text className='text-primary'>{sub.name}</Text>
          </Link>
        ))}
      </List.Item>
      <List.Item>
        <Text>Shipping</Text>
        <Text>{shipping}</Text>
      </List.Item>
      <List.Item>
        <Text>Color</Text>
        <Text>{color}</Text>
      </List.Item>
      <List.Item>
        <Text>Brand</Text>
        <Text>{brand}</Text>
      </List.Item>
      <List.Item>
        <Text>Availabel</Text>
        <Text>{quantity}</Text>
      </List.Item>
      <List.Item>
        <Text>Sold</Text>
        <Text>{sold}</Text>
      </List.Item>
    </>
  );
};

export default ProductDetails;
