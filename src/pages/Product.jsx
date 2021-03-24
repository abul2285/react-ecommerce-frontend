import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import SingleProduct from '../components/products/SingleProduct';
import { getProduct } from '../functions/product';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, []);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => setProduct(res.data));
  };

  return (
    <div className='container'>
      <div className='row pt-5'>
        <SingleProduct product={product} />
      </div>

      <div className='row'>
        <div className='col text-center py-5'>
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
