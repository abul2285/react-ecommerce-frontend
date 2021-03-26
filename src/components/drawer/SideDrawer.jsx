import { Drawer, Image } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import laptop from '../../images/default-laptop.jpg';

const SideDrawer = () => {
  const { cart, drawer } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const imageStyle = {
    height: '80px',
    width: '100%',
    objectFit: 'cover',
    objectPosition: 'top',
  };

  return (
    <Drawer
      visible={drawer}
      onClose={() => dispatch({ type: 'SET_VISIBLE', payload: false })}>
      {cart.map((c) => (
        <div className='row' key={c._id}>
          <div className='col'>
            {c.images?.length ? (
              <>
                <Image src={c.images[0]?.url} style={imageStyle} />
                <p className='bg-secondary text-light text-center'>
                  {c.title} x {c.count}
                </p>
              </>
            ) : (
              <>
                <Image src={laptop} style={imageStyle} />
                <p className='bg-secondary text-light text-center'>
                  {c.title} x {c.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to='/cart'>
        <button
          onClick={() => dispatch({ type: 'SET_VISIBLE', payload: false })}
          className='text-center btn btn-block btn-primary btn-raised'>
          Go to Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
