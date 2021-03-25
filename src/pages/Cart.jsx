import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCartInCheckout from '../components/cards/ProductCartInCheckout';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const getTotalPrice = () => cart.reduce((a, c) => a + c.price * c.count, 0);
  const showCartItems = () => (
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Brand</th>
          <th>Color</th>
          <th>Count</th>
          <th>Shipping</th>
          <th>Remove</th>
        </tr>
      </thead>
      {cart.map((product) => (
        <ProductCartInCheckout key={product._id} {...product} />
      ))}
    </table>
  );

  return (
    <div className='container-fluid pt-2'>
      <div className='row'>
        <div className='col-md-8'>
          <h4>Cart / {cart.length} products</h4>
          {!cart.length ? (
            <p>
              No Product in cart. <Link to='/shop'>Continue shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className='col-md-4'>
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c) => (
            <div key={c._id}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          <p>
            Total : <b>${getTotalPrice()}</b>
          </p>
          <hr />
          {isAuthenticated ? (
            <Button type='link'>Procced to checkout</Button>
          ) : (
            <Button type='link'>
              <Link to={{ pathname: '/login', state: { from: 'cart' } }}>
                Login to checkout
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
