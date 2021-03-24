import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import CategoryList from '../components/category/CategoryList';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import SubList from '../components/sub/SubList';

const Home = () => {
  return (
    <>
      <Jumbotron text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
      <NewArrivals title='New Arrivals' />
      <BestSellers title='Best Sellers' />
      <CategoryList title='Categories' />
      <SubList title='Sub Categories' />
    </>
  );
};

export default Home;
