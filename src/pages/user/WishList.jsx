import React, { useEffect, useState } from 'react';
import { useSelector, useDispathc } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getWishList, removeFromWishList } from '../../functions/user';
import UserNav from '../../components/nav/UserNav';
import { CloseCircleOutlined } from '@ant-design/icons';

const WishList = () => {
  const [wishList, setWishList] = useState([]);
  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    loadWishList();
  }, []);

  const loadWishList = () =>
    getWishList(user.auth.token).then((res) => {
      setWishList(res.data.wishList);
    });

  const handleRemoveWishList = (productId) => {
    removeFromWishList(productId, user.auth.token).then((res) => {
      loadWishList();
      history.push('/user/wishlist');
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col-md-10'>
          {wishList.map((p) => {
            return (
              <div key={p._id} className='alert alert-secondary'>
                <Link to={`/product/${p.slug}`}>{p.title}</Link>
                <span
                  className='btn btn-sm float-right'
                  onClick={() => handleRemoveWishList(p._id)}>
                  <CloseCircleOutlined className='text-danger' />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WishList;
