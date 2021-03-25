import { Card, Skeleton } from 'antd';
import React from 'react';

const LoadingCard = ({ count }) => {
  const card = () => {
    let loadingCard = [];
    for (let i = 0; i < count; i++) {
      loadingCard.push(
        <div className='col-md-4' key={i}>
          <Card>
            <Skeleton active />
          </Card>
        </div>
      );
    }
    return loadingCard;
  };

  return <div className='row'>{card()}</div>;
};

export default LoadingCard;
