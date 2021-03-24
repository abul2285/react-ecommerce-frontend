import React, { useEffect, useState } from 'react';
import ProductCard from '../cards/ProductCard.jsx';
import { getProducts, getProductsCount } from '../../functions/product';
import LoadingCard from '../cards/LoadingCard.jsx';
import { Pagination } from 'antd';

const NewArrivals = ({ title }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts('createdAt', 'desc', page);
      setLoading(false);
      setProducts(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className='display-4 text-center p-2 my-3 jumbotron'>{title}</div>
      <div className='container'>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className='row'>
            {products.map((product) => (
              <div className='col-md-4 pb-3' key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='row'>
        <div className='col-md-4 offset-md-4 text-center pt-2 p-3'>
          <Pagination
            current={page}
            onChange={setPage}
            total={(productsCount / 3) * 10}
          />
        </div>
      </div>
    </>
  );
};

export default NewArrivals;
