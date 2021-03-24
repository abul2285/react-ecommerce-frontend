import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';

const Home = () => {
  return (
    <>
      <Jumbotron text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
      <NewArrivals title='New Arrivals' />
      <BestSellers title='Best Sellers' />
    </>
  );
};

export default Home;
