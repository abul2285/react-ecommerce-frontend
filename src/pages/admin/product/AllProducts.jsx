import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import AdminDashboardCard from '../../../components/cards/AdminDashboardCard.jsx';
import AdminNav from '../../../components/nav/AdminNav';
import { deleteProduct, getProductsByCount } from '../../../functions/product';
import { useSelector } from 'react-redux';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProductsByCount(10);
      setLoading(false);
      setProducts(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleRemoveProduct = async (slug) => {
    try {
      const { data } = await deleteProduct(slug, user.auth.token);
      notification.success({
        title: `${data.title} has been deleted`,
        description: `${data.title} has been deleted`,
      });
      loadAllProducts();
    } catch (error) {
      console.log({ error });
      if (error.response.status === 400)
        notification.error({
          title: error.response.data,
          description: error.response.data,
        });
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNav />
        </div>
        <div className='col'>
          <h3>All Products</h3>
          <div className='row'>
            {loading ? (
              <p className='text-danger'>loading...</p>
            ) : (
              <>
                {products.map((product) => (
                  <div className='col-md-4 pb-3' key={product._id}>
                    <AdminDashboardCard
                      product={product}
                      handleRemoveProduct={handleRemoveProduct}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
