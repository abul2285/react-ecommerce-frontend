import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SingleProduct from '../components/products/SingleProduct';
import {
  getProduct,
  productStar,
  getRelatedProducts,
} from '../functions/product';
import ProductCard from '../components/cards/ProductCard.jsx';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { slug } = match.params;
  const [star, setStar] = useState(0);
  const { isAuthenticated, auth } = useSelector((state) => state.user);

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (isAuthenticated && product.ratings) {
      const hasStar = product.ratings.find(
        (r) => r.postedBy.toString() === auth._id.toString()
      );
      hasStar && setStar(hasStar.star);
    }
  }, [auth?._id, isAuthenticated, product?.ratings]);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      getRelatedProducts(res.data._id).then((res) =>
        setRelatedProducts(res.data)
      );
    });
  };

  const onStartClick = (newRating, name) => {
    productStar(name, newRating, auth.token).then((res) => {
      console.log({ res });
      setStar(newRating);
      loadSingleProduct();
    });
  };

  return (
    <div className='container'>
      <div className='row pt-5'>
        <SingleProduct
          product={product}
          onStartClick={onStartClick}
          star={star}
        />
      </div>

      <div className='row pt-3 pb-5'>
        <div className='col text-center py-5'>
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
      <div className='row pb-5'>
        {relatedProducts.length ? (
          relatedProducts.map((product) => (
            <div className='col-md-4' key={product._id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className='text-center'> No related Product Available</div>
        )}
      </div>
    </div>
  );
};

export default Product;
