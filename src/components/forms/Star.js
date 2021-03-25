import React from 'react';
import StarRating from 'react-star-ratings';

const Star = ({ onStarClick, numberOfStars }) => {
  return (
    <>
      <StarRating
        changeRating={() => onStarClick(numberOfStars)}
        numberOfStars={numberOfStars}
        starHoverColor='red'
        starEmptyColor='red'
        starDimension='20px'
        starSpacing='2px'
      />
      <br />
    </>
  );
};

export default Star;
