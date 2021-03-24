import React from 'react';
import StarRating from 'react-star-ratings';

const AvarageRating = ({ ratings }) => {
  const rating = ratings.reduce((a, c) => a + c.star, 0) / ratings.length;
  return (
    <div className='pt-1 pb-3 text-center'>
      <StarRating
        starDimension='20px'
        starSpacing='2px'
        starRatedColor='red'
        rating={rating}
        edition={false}
      />
      ({ratings.length})
    </div>
  );
};

export default AvarageRating;
