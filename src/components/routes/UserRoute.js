import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  if (isAuthenticated) {
    return <Route {...rest} />;
  }
  return <LoadingToRedirect />;
};

export default UserRoute;
