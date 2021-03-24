import { StarOutlined } from '@ant-design/icons';
import { Modal, notification } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

const RatingModal = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const history = useHistory();
  const { slug } = useParams();

  const handleRating = () => {
    if (isAuthenticated) {
      setShowModal(true);
    } else {
      history.push({
        pathname: '/login',
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleRating}>
        <StarOutlined className='text-danger' /> <br />
        {isAuthenticated ? 'Leave rating' : 'Login to leave rating'}
      </div>
      <Modal
        title='Leave Your Rating'
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => {
          setShowModal(false);
          notification.success({
            title: 'Thanks for your review. It will apper soon',
            description: 'Thanks for your review. It will apper soon',
          });
        }}
        centered>
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
