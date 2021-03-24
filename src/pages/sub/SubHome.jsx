import React, { useEffect, useState } from 'react';
import LoadingCard from '../../components/cards/LoadingCard';
import ProductCard from '../../components/cards/ProductCard';
import { getSub } from '../../functions/sub';

const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, [slug]);

  return (
    <>
      {loading ? (
        <div className='display-4 text-center p-2 my-3 jumbotron'>loading</div>
      ) : (
        <div className='display-4 text-center p-2 my-3 jumbotron'>
          {products.length} Products in "{sub.name}" sub category
        </div>
      )}
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
    </>
  );
};

export default SubHome;
